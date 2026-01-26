import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  subscriptions,
  usageRecords,
  aiCreditTransactions,
  invoices,
} from "@/lib/db/schema";

import { router, orgProcedure } from "../trpc";

export const subscriptionRouter = router({
  // Get current subscription
  getCurrent: orgProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: eq(subscriptions.organizationId, ctx.organizationId),
      with: {
        invoices: {
          orderBy: [desc(invoices.createdAt)],
          limit: 5,
        },
      },
    });

    return subscription;
  }),

  // Get usage records
  getUsage: orgProcedure
    .input(
      z.object({
        featureType: z.enum(["ai_credits", "posts", "social_accounts"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const conditions = [eq(usageRecords.organizationId, ctx.organizationId)];

      if (input.featureType) {
        conditions.push(eq(usageRecords.featureType, input.featureType));
      }

      const records = await ctx.db.query.usageRecords.findMany({
        where: and(...conditions),
        orderBy: [desc(usageRecords.periodStart)],
      });

      return records;
    }),

  // Get current AI credits balance
  getAiCreditsBalance: orgProcedure.query(async ({ ctx }) => {
    const latestTransaction = await ctx.db.query.aiCreditTransactions.findFirst({
      where: eq(aiCreditTransactions.organizationId, ctx.organizationId),
      orderBy: [desc(aiCreditTransactions.createdAt)],
    });

    return latestTransaction?.balance ?? 0;
  }),

  // Get AI credit transactions history
  getAiCreditTransactions: orgProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().uuid().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const items = await ctx.db.query.aiCreditTransactions.findMany({
        where: eq(aiCreditTransactions.organizationId, ctx.organizationId),
        orderBy: [desc(aiCreditTransactions.createdAt)],
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

  // Record AI credit usage
  useAiCredits: orgProcedure
    .input(
      z.object({
        amount: z.number().positive(),
        description: z.string().optional(),
        referenceId: z.string().optional(),
        referenceType: z
          .enum(["content_generation", "image_generation", "variation", "analysis"])
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Get current balance
      const latestTransaction = await ctx.db.query.aiCreditTransactions.findFirst({
        where: eq(aiCreditTransactions.organizationId, ctx.organizationId),
        orderBy: [desc(aiCreditTransactions.createdAt)],
      });

      const currentBalance = latestTransaction?.balance ?? 0;

      if (currentBalance < input.amount) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Insufficient AI credits",
        });
      }

      const newBalance = currentBalance - input.amount;

      const [transaction] = await ctx.db
        .insert(aiCreditTransactions)
        .values({
          organizationId: ctx.organizationId,
          type: "usage",
          amount: -input.amount,
          balance: newBalance,
          description: input.description,
          referenceId: input.referenceId,
          referenceType: input.referenceType,
        })
        .returning();

      return transaction;
    }),

  // Get invoices
  getInvoices: orgProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const subscription = await ctx.db.query.subscriptions.findFirst({
        where: eq(subscriptions.organizationId, ctx.organizationId),
      });

      if (!subscription) return [];

      const invoiceList = await ctx.db.query.invoices.findMany({
        where: eq(invoices.subscriptionId, subscription.id),
        orderBy: [desc(invoices.createdAt)],
        limit: input.limit,
      });

      return invoiceList;
    }),

  // Get plan limits
  getPlanLimits: orgProcedure.query(async ({ ctx }) => {
    const subscription = await ctx.db.query.subscriptions.findFirst({
      where: eq(subscriptions.organizationId, ctx.organizationId),
    });

    // Default limits based on plan
    const planLimits = {
      starter: {
        aiCredits: 100,
        postsPerMonth: 30,
        socialAccounts: 3,
        teamMembers: 1,
      },
      pro: {
        aiCredits: 500,
        postsPerMonth: 150,
        socialAccounts: 10,
        teamMembers: 5,
      },
      business: {
        aiCredits: 2000,
        postsPerMonth: -1, // unlimited
        socialAccounts: -1, // unlimited
        teamMembers: -1, // unlimited
      },
    };

    // Get plan from metadata or default to starter
    const plan = (subscription?.metadata as { plan?: string })?.plan ?? "starter";

    return planLimits[plan as keyof typeof planLimits] ?? planLimits.starter;
  }),
});
