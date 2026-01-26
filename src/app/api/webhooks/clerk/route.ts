import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, organizations, organizationMembers } from "@/lib/db/schema";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string; id: string }>;
    primary_email_address_id?: string;
    first_name?: string | null;
    last_name?: string | null;
    image_url?: string | null;
    deleted?: boolean;
  };
}

export async function POST(req: Request) {
  const headersList = await headers();
  const svixId = headersList.get("svix-id");
  const svixTimestamp = headersList.get("svix-timestamp");
  const svixSignature = headersList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let event: ClerkWebhookEvent;

  try {
    event = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "user.created":
        await handleUserCreated(event.data);
        break;

      case "user.updated":
        await handleUserUpdated(event.data);
        break;

      case "user.deleted":
        await handleUserDeleted(event.data);
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

async function handleUserCreated(data: ClerkWebhookEvent["data"]) {
  const primaryEmail = data.email_addresses?.find(
    (email) => email.id === data.primary_email_address_id
  );

  if (!primaryEmail) {
    console.error("No primary email found for user:", data.id);
    return;
  }

  // Create user in database
  const [user] = await db
    .insert(users)
    .values({
      clerkId: data.id,
      email: primaryEmail.email_address,
      firstName: data.first_name ?? null,
      lastName: data.last_name ?? null,
      avatarUrl: data.image_url ?? null,
    })
    .returning();

  // Create a default organization for the user
  const slug = generateSlug(
    data.first_name ?? primaryEmail.email_address.split("@")[0]
  );

  const [org] = await db
    .insert(organizations)
    .values({
      name: `${data.first_name ?? "My"}'s Workspace`,
      slug,
    })
    .returning();

  // Add user as owner of the organization
  await db.insert(organizationMembers).values({
    organizationId: org.id,
    userId: user.id,
    role: "owner",
    acceptedAt: new Date(),
  });

  console.log(`Created user ${user.id} with organization ${org.id}`);
}

async function handleUserUpdated(data: ClerkWebhookEvent["data"]) {
  const primaryEmail = data.email_addresses?.find(
    (email) => email.id === data.primary_email_address_id
  );

  const updateData: {
    email?: string;
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
    updatedAt: Date;
  } = {
    updatedAt: new Date(),
  };

  if (primaryEmail) {
    updateData.email = primaryEmail.email_address;
  }
  if (data.first_name !== undefined) {
    updateData.firstName = data.first_name;
  }
  if (data.last_name !== undefined) {
    updateData.lastName = data.last_name;
  }
  if (data.image_url !== undefined) {
    updateData.avatarUrl = data.image_url;
  }

  await db.update(users).set(updateData).where(eq(users.clerkId, data.id));

  console.log(`Updated user ${data.id}`);
}

async function handleUserDeleted(data: ClerkWebhookEvent["data"]) {
  // Soft delete the user
  await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.clerkId, data.id));

  console.log(`Soft deleted user ${data.id}`);
}

function generateSlug(name: string): string {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Add random suffix to ensure uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  return `${baseSlug}-${randomSuffix}`;
}
