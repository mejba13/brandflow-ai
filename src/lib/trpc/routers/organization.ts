import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { organizations, organizationMembers, users } from "@/lib/db/schema";

import { router, protectedProcedure, orgProcedure } from "../trpc";

export const organizationRouter = router({
  // Create a new organization
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        slug: z
          .string()
          .min(1)
          .max(100)
          .regex(/^[a-z0-9-]+$/),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get user ID
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.clerkId, ctx.userId),
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      // Check if slug is already taken
      const existingOrg = await ctx.db.query.organizations.findFirst({
        where: eq(organizations.slug, input.slug),
      });

      if (existingOrg) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Organization slug already exists",
        });
      }

      // Create organization
      const [org] = await ctx.db
        .insert(organizations)
        .values({
          name: input.name,
          slug: input.slug,
        })
        .returning();

      // Add user as owner
      await ctx.db.insert(organizationMembers).values({
        organizationId: org.id,
        userId: user.id,
        role: "owner",
        acceptedAt: new Date(),
      });

      return org;
    }),

  // Get organization by ID
  getById: orgProcedure.query(async ({ ctx }) => {
    const org = await ctx.db.query.organizations.findFirst({
      where: eq(organizations.id, ctx.organizationId),
      with: {
        members: {
          with: {
            user: true,
          },
        },
      },
    });

    return org;
  }),

  // Update organization
  update: orgProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255).optional(),
        logoUrl: z.string().url().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updatedOrg] = await ctx.db
        .update(organizations)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(organizations.id, ctx.organizationId))
        .returning();

      return updatedOrg;
    }),

  // Invite member
  inviteMember: orgProcedure
    .input(
      z.object({
        email: z.string().email(),
        role: z.enum(["admin", "editor", "viewer", "client"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Find user by email
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.email, input.email),
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found. They need to sign up first.",
        });
      }

      // Check if already a member
      const existingMember = await ctx.db.query.organizationMembers.findFirst({
        where: and(
          eq(organizationMembers.organizationId, ctx.organizationId),
          eq(organizationMembers.userId, user.id)
        ),
      });

      if (existingMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already a member of this organization",
        });
      }

      // Add member
      const [member] = await ctx.db
        .insert(organizationMembers)
        .values({
          organizationId: ctx.organizationId,
          userId: user.id,
          role: input.role,
        })
        .returning();

      return member;
    }),

  // Remove member
  removeMember: orgProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(organizationMembers)
        .where(
          and(
            eq(organizationMembers.organizationId, ctx.organizationId),
            eq(organizationMembers.userId, input.userId)
          )
        );

      return { success: true };
    }),

  // Get members
  getMembers: orgProcedure.query(async ({ ctx }) => {
    const members = await ctx.db.query.organizationMembers.findMany({
      where: eq(organizationMembers.organizationId, ctx.organizationId),
      with: {
        user: true,
      },
    });

    return members;
  }),
});
