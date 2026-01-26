import { eq, and, between, desc } from "drizzle-orm";
import { z } from "zod";

import {
  postAnalytics,
  accountAnalytics,
  organizationAnalyticsSummary,
  leads,
  socialAccounts,
} from "@/lib/db/schema";

import { router, orgProcedure } from "../trpc";

export const analyticsRouter = router({
  // Get organization analytics summary
  getSummary: orgProcedure
    .input(
      z.object({
        period: z.enum(["daily", "weekly", "monthly"]).default("weekly"),
      })
    )
    .query(async ({ ctx, input }) => {
      const summaries = await ctx.db.query.organizationAnalyticsSummary.findMany({
        where: and(
          eq(organizationAnalyticsSummary.organizationId, ctx.organizationId),
          eq(organizationAnalyticsSummary.period, input.period)
        ),
        orderBy: [desc(organizationAnalyticsSummary.startDate)],
        limit: 12, // Last 12 periods
      });

      return summaries;
    }),

  // Get account analytics
  getAccountAnalytics: orgProcedure
    .input(
      z.object({
        socialAccountId: z.string().uuid(),
        startDate: z.date(),
        endDate: z.date(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Verify account belongs to org
      const account = await ctx.db.query.socialAccounts.findFirst({
        where: and(
          eq(socialAccounts.id, input.socialAccountId),
          eq(socialAccounts.organizationId, ctx.organizationId)
        ),
      });

      if (!account) return [];

      const analytics = await ctx.db.query.accountAnalytics.findMany({
        where: and(
          eq(accountAnalytics.socialAccountId, input.socialAccountId),
          between(
            accountAnalytics.date,
            input.startDate.toISOString().split("T")[0],
            input.endDate.toISOString().split("T")[0]
          )
        ),
        orderBy: [desc(accountAnalytics.date)],
      });

      return analytics;
    }),

  // Get post analytics
  getPostAnalytics: orgProcedure
    .input(z.object({ scheduledPostId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const analytics = await ctx.db.query.postAnalytics.findFirst({
        where: eq(postAnalytics.scheduledPostId, input.scheduledPostId),
        with: {
          scheduledPost: {
            with: {
              variation: {
                with: {
                  sourceContent: true,
                },
              },
            },
          },
        },
      });

      return analytics;
    }),

  // Get top performing posts
  getTopPosts: orgProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
        metric: z.enum(["engagements", "impressions", "reach", "clicks"]).default("engagements"),
      })
    )
    .query(async ({ ctx }) => {
      // This would need a more complex query joining through the content tables
      // For now, return from the summary
      const summary = await ctx.db.query.organizationAnalyticsSummary.findFirst({
        where: eq(organizationAnalyticsSummary.organizationId, ctx.organizationId),
        orderBy: [desc(organizationAnalyticsSummary.startDate)],
      });

      return summary?.topPerformingPosts ?? [];
    }),

  // Get leads
  getLeads: orgProcedure
    .input(
      z.object({
        status: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().uuid().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(leads.organizationId, ctx.organizationId)];

      if (input.status) {
        conditions.push(eq(leads.status, input.status));
      }

      const items = await ctx.db.query.leads.findMany({
        where: and(...conditions),
        orderBy: [desc(leads.capturedAt)],
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

  // Update lead status
  updateLeadStatus: orgProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.string().min(1).max(50),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [updated] = await ctx.db
        .update(leads)
        .set({
          status: input.status,
          notes: input.notes,
          updatedAt: new Date(),
        })
        .where(
          and(eq(leads.id, input.id), eq(leads.organizationId, ctx.organizationId))
        )
        .returning();

      return updated;
    }),

  // Get dashboard metrics
  getDashboardMetrics: orgProcedure.query(async ({ ctx }) => {
    const latestSummary = await ctx.db.query.organizationAnalyticsSummary.findFirst({
      where: eq(organizationAnalyticsSummary.organizationId, ctx.organizationId),
      orderBy: [desc(organizationAnalyticsSummary.startDate)],
    });

    const previousSummary = await ctx.db.query.organizationAnalyticsSummary.findFirst({
      where: eq(organizationAnalyticsSummary.organizationId, ctx.organizationId),
      orderBy: [desc(organizationAnalyticsSummary.startDate)],
      offset: 1,
    });

    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    return {
      totalReach: latestSummary?.totalReach ?? 0,
      reachChange: calculateChange(
        latestSummary?.totalReach ?? 0,
        previousSummary?.totalReach ?? 0
      ),
      totalImpressions: latestSummary?.totalImpressions ?? 0,
      impressionsChange: calculateChange(
        latestSummary?.totalImpressions ?? 0,
        previousSummary?.totalImpressions ?? 0
      ),
      totalEngagements: latestSummary?.totalEngagements ?? 0,
      engagementsChange: calculateChange(
        latestSummary?.totalEngagements ?? 0,
        previousSummary?.totalEngagements ?? 0
      ),
      avgEngagementRate: latestSummary?.avgEngagementRate ?? 0,
      engagementRateChange: calculateChange(
        latestSummary?.avgEngagementRate ?? 0,
        previousSummary?.avgEngagementRate ?? 0
      ),
      totalFollowersGained: latestSummary?.totalFollowersGained ?? 0,
      followersChange: calculateChange(
        latestSummary?.totalFollowersGained ?? 0,
        previousSummary?.totalFollowersGained ?? 0
      ),
      totalPostsPublished: latestSummary?.totalPostsPublished ?? 0,
    };
  }),
});
