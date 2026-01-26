import { eq, and, desc, isNull } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  sourceContent,
  contentVariations,
  scheduledPosts,
  users,
} from "@/lib/db/schema";

import { router, orgProcedure } from "../trpc";

const platformSchema = z.enum([
  "linkedin",
  "facebook",
  "twitter",
  "instagram",
  "pinterest",
  "tiktok",
]);

export const contentRouter = router({
  // Create source content
  create: orgProcedure
    .input(
      z.object({
        title: z.string().min(1).max(500),
        content: z.string().min(1),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get user
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.clerkId, ctx.userId),
      });

      const [content] = await ctx.db
        .insert(sourceContent)
        .values({
          organizationId: ctx.organizationId,
          authorId: user?.id,
          title: input.title,
          content: input.content,
          tags: input.tags ?? [],
        })
        .returning();

      return content;
    }),

  // Get all content for organization
  list: orgProcedure
    .input(
      z.object({
        status: z.enum(["draft", "scheduled", "published", "failed"]).optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().uuid().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [
        eq(sourceContent.organizationId, ctx.organizationId),
        isNull(sourceContent.deletedAt),
      ];

      if (input.status) {
        conditions.push(eq(sourceContent.status, input.status));
      }

      const items = await ctx.db.query.sourceContent.findMany({
        where: and(...conditions),
        with: {
          author: true,
          variations: true,
        },
        orderBy: [desc(sourceContent.createdAt)],
        limit: input.limit + 1,
      });

      let nextCursor: string | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),

  // Get content by ID
  getById: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const content = await ctx.db.query.sourceContent.findFirst({
        where: and(
          eq(sourceContent.id, input.id),
          eq(sourceContent.organizationId, ctx.organizationId),
          isNull(sourceContent.deletedAt)
        ),
        with: {
          author: true,
          variations: {
            with: {
              scheduledPosts: true,
            },
          },
          mediaAssets: true,
        },
      });

      if (!content) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Content not found",
        });
      }

      return content;
    }),

  // Update content
  update: orgProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().min(1).max(500).optional(),
        content: z.string().min(1).optional(),
        status: z.enum(["draft", "scheduled", "published", "failed"]).optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      const [updated] = await ctx.db
        .update(sourceContent)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(sourceContent.id, id),
            eq(sourceContent.organizationId, ctx.organizationId)
          )
        )
        .returning();

      return updated;
    }),

  // Delete content (soft delete)
  delete: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(sourceContent)
        .set({
          deletedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(sourceContent.id, input.id),
            eq(sourceContent.organizationId, ctx.organizationId)
          )
        );

      return { success: true };
    }),

  // Create variation
  createVariation: orgProcedure
    .input(
      z.object({
        sourceContentId: z.string().uuid(),
        platform: platformSchema,
        content: z.string().min(1),
        hashtags: z.array(z.string()).optional(),
        aiModelUsed: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify source content belongs to org
      const source = await ctx.db.query.sourceContent.findFirst({
        where: and(
          eq(sourceContent.id, input.sourceContentId),
          eq(sourceContent.organizationId, ctx.organizationId)
        ),
      });

      if (!source) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Source content not found",
        });
      }

      const [variation] = await ctx.db
        .insert(contentVariations)
        .values({
          sourceContentId: input.sourceContentId,
          platform: input.platform,
          content: input.content,
          characterCount: input.content.length,
          hashtags: input.hashtags ?? [],
          aiModelUsed: input.aiModelUsed,
        })
        .returning();

      return variation;
    }),

  // Schedule a post
  schedulePost: orgProcedure
    .input(
      z.object({
        variationId: z.string().uuid(),
        socialAccountId: z.string().uuid(),
        scheduledAt: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .insert(scheduledPosts)
        .values({
          variationId: input.variationId,
          socialAccountId: input.socialAccountId,
          scheduledAt: input.scheduledAt,
          status: "scheduled",
        })
        .returning();

      return post;
    }),

  // Get scheduled posts
  getScheduledPosts: orgProcedure
    .input(
      z.object({
        status: z
          .enum(["pending", "scheduled", "publishing", "published", "failed"])
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Get all content for this org
      const orgContent = await ctx.db.query.sourceContent.findMany({
        where: eq(sourceContent.organizationId, ctx.organizationId),
        with: {
          variations: {
            with: {
              scheduledPosts: true,
            },
          },
        },
      });

      // Flatten scheduled posts
      const posts = orgContent.flatMap((content) =>
        content.variations.flatMap((variation) =>
          variation.scheduledPosts
            .filter((post) => !input.status || post.status === input.status)
            .map((post) => ({
              ...post,
              variation,
              sourceContent: content,
            }))
        )
      );

      return posts;
    }),
});
