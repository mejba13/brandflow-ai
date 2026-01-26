import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { subscriptions, organizations } from "@/lib/db/schema";

import { stripe, STRIPE_PLANS, type StripePlan } from "./client";

export async function createCustomer(organizationId: string, email: string, name: string) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: {
      organizationId,
    },
  });

  return customer;
}

export async function createCheckoutSession(
  organizationId: string,
  customerId: string,
  plan: StripePlan,
  successUrl: string,
  cancelUrl: string
) {
  const priceId = STRIPE_PLANS[plan].priceId;

  if (!priceId) {
    throw new Error(`No price ID configured for plan: ${plan}`);
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        organizationId,
        plan,
      },
    },
    metadata: {
      organizationId,
      plan,
    },
  });

  return session;
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

export async function cancelSubscription(subscriptionId: string, cancelAtPeriodEnd = true) {
  if (cancelAtPeriodEnd) {
    return stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
  }

  return stripe.subscriptions.cancel(subscriptionId);
}

export async function resumeSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}

export async function updateSubscriptionPlan(subscriptionId: string, newPriceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
    proration_behavior: "create_prorations",
  });
}

// Sync subscription from Stripe webhook
export async function syncSubscription(stripeSubscription: {
  id: string;
  customer: string | { id: string };
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  canceled_at: number | null;
  trial_start: number | null;
  trial_end: number | null;
  items: { data: Array<{ price: { id: string } }> };
  metadata: { organizationId?: string; plan?: string };
}) {
  const customerId =
    typeof stripeSubscription.customer === "string"
      ? stripeSubscription.customer
      : stripeSubscription.customer.id;

  const organizationId = stripeSubscription.metadata.organizationId;

  if (!organizationId) {
    console.error("No organizationId in subscription metadata");
    return null;
  }

  // Check if subscription exists
  const existingSubscription = await db.query.subscriptions.findFirst({
    where: eq(subscriptions.stripeSubscriptionId, stripeSubscription.id),
  });

  const subscriptionData = {
    organizationId,
    stripeCustomerId: customerId,
    stripeSubscriptionId: stripeSubscription.id,
    stripePriceId: stripeSubscription.items.data[0]?.price.id,
    status: stripeSubscription.status,
    currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
    currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
    cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end,
    canceledAt: stripeSubscription.canceled_at
      ? new Date(stripeSubscription.canceled_at * 1000)
      : null,
    trialStart: stripeSubscription.trial_start
      ? new Date(stripeSubscription.trial_start * 1000)
      : null,
    trialEnd: stripeSubscription.trial_end
      ? new Date(stripeSubscription.trial_end * 1000)
      : null,
    metadata: { plan: stripeSubscription.metadata.plan },
    updatedAt: new Date(),
  };

  if (existingSubscription) {
    const [updated] = await db
      .update(subscriptions)
      .set(subscriptionData)
      .where(eq(subscriptions.id, existingSubscription.id))
      .returning();
    return updated;
  }

  const [created] = await db.insert(subscriptions).values(subscriptionData).returning();

  // Update organization plan
  const plan = stripeSubscription.metadata.plan as StripePlan | undefined;
  if (plan && STRIPE_PLANS[plan]) {
    await db
      .update(organizations)
      .set({ plan, updatedAt: new Date() })
      .where(eq(organizations.id, organizationId));
  }

  return created;
}
