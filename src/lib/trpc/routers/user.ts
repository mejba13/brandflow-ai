import { eq } from "drizzle-orm";
import { z } from "zod";

import { users, organizationMembers } from "@/lib/db/schema";

import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  // Get current user
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.clerkId, ctx.userId),
      with: {
        organizationMemberships: {
          with: {
            organization: true,
          },
        },
      },
    });

    return user;
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(
      z.object({
        firstName: z.string().min(1).max(100).optional(),
        lastName: z.string().min(1).max(100).optional(),
        avatarUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedUser] = await ctx.db
        .update(users)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkId, ctx.userId))
        .returning();

      return updatedUser;
    }),

  // Get user's organizations
  getOrganizations: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.clerkId, ctx.userId),
    });

    if (!user) return [];

    const memberships = await ctx.db.query.organizationMembers.findMany({
      where: eq(organizationMembers.userId, user.id),
      with: {
        organization: true,
      },
    });

    return memberships.map((m) => ({
      ...m.organization,
      role: m.role,
    }));
  }),
});
