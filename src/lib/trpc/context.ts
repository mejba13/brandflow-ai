import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export async function createContext() {
  const { userId: clerkUserId, orgId } = await auth();

  return {
    db,
    userId: clerkUserId,
    organizationId: orgId ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
