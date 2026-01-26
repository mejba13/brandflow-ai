import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { eq } from "drizzle-orm";

import { stripe, syncSubscription } from "@/lib/stripe";
import { db } from "@/lib/db";
import { invoices, subscriptions, aiCreditTransactions, organizations } from "@/lib/db/schema";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case "invoice.paid":
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing webhook ${event.type}:`, error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  // Access current_period through the subscription object
  const currentPeriod = (subscription as unknown as {
    current_period_start?: number;
    current_period_end?: number
  });

  await syncSubscription({
    id: subscription.id,
    customer: subscription.customer as string,
    status: subscription.status,
    current_period_start: currentPeriod.current_period_start ?? Math.floor(Date.now() / 1000),
    current_period_end: currentPeriod.current_period_end ?? Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    cancel_at_period_end: subscription.cancel_at_period_end,
    canceled_at: subscription.canceled_at,
    trial_start: subscription.trial_start,
    trial_end: subscription.trial_end,
    items: subscription.items,
    metadata: subscription.metadata as { organizationId?: string; plan?: string },
  });
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Update subscription status to canceled
  await db
    .update(subscriptions)
    .set({
      status: "canceled",
      canceledAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscription.id));

  // Downgrade organization to starter plan
  const organizationId = subscription.metadata.organizationId;
  if (organizationId) {
    await db
      .update(organizations)
      .set({ plan: "starter", updatedAt: new Date() })
      .where(eq(organizations.id, organizationId));
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  // Access subscription through the invoice object
  const invoiceWithSub = invoice as unknown as {
    subscription?: string | { id: string } | null
  };

  if (!invoiceWithSub.subscription) return;

  const subscriptionId = typeof invoiceWithSub.subscription === "string"
    ? invoiceWithSub.subscription
    : invoiceWithSub.subscription.id;

  // Find the subscription in our database
  const sub = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.stripeSubscriptionId, subscriptionId),
  });

  if (!sub) return;

  // Create or update invoice record
  const existingInvoice = await db.query.invoices.findFirst({
    where: eq(invoices.stripeInvoiceId, invoice.id),
  });

  const invoiceData = {
    subscriptionId: sub.id,
    stripeInvoiceId: invoice.id,
    amountDue: invoice.amount_due,
    amountPaid: invoice.amount_paid,
    currency: invoice.currency,
    status: invoice.status ?? "paid",
    invoiceUrl: invoice.hosted_invoice_url,
    pdfUrl: invoice.invoice_pdf,
    periodStart: invoice.period_start ? new Date(invoice.period_start * 1000) : null,
    periodEnd: invoice.period_end ? new Date(invoice.period_end * 1000) : null,
    dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
    paidAt: new Date(),
    updatedAt: new Date(),
  };

  if (existingInvoice) {
    await db.update(invoices).set(invoiceData).where(eq(invoices.id, existingInvoice.id));
  } else {
    await db.insert(invoices).values(invoiceData);
  }

  // Add AI credits for the new billing period
  const plan = sub.metadata as { plan?: string } | null;
  const planName = plan?.plan ?? "starter";
  const creditsToAdd = planName === "business" ? 2000 : planName === "pro" ? 500 : 100;

  // Get current balance
  const latestTransaction = await db.query.aiCreditTransactions.findFirst({
    where: eq(aiCreditTransactions.organizationId, sub.organizationId),
    orderBy: (t, { desc }) => [desc(t.createdAt)],
  });

  const currentBalance = latestTransaction?.balance ?? 0;

  // Add credits
  await db.insert(aiCreditTransactions).values({
    organizationId: sub.organizationId,
    type: "purchase",
    amount: creditsToAdd,
    balance: currentBalance + creditsToAdd,
    description: `Monthly AI credits - ${planName} plan`,
    referenceId: invoice.id,
    referenceType: "subscription_renewal",
  });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  // Access subscription through the invoice object
  const invoiceWithSub = invoice as unknown as {
    subscription?: string | { id: string } | null
  };

  if (!invoiceWithSub.subscription) return;

  const subscriptionId = typeof invoiceWithSub.subscription === "string"
    ? invoiceWithSub.subscription
    : invoiceWithSub.subscription.id;

  // Update subscription status
  await db
    .update(subscriptions)
    .set({
      status: "past_due",
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.stripeSubscriptionId, subscriptionId));
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const organizationId = session.metadata?.organizationId;
  const plan = session.metadata?.plan;

  if (!organizationId || !plan) return;

  // Update organization plan immediately after checkout
  await db
    .update(organizations)
    .set({
      plan: plan as "starter" | "pro" | "business",
      updatedAt: new Date(),
    })
    .where(eq(organizations.id, organizationId));
}
