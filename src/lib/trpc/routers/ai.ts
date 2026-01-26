import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, desc } from "drizzle-orm";

import {
  generatePlatformContent,
  generateAllPlatformVariations,
  generateContentImage,
  PLATFORM_CONFIGS,
  type BrandVoice,
} from "@/lib/ai";
import { brandKits, aiCreditTransactions } from "@/lib/db/schema";

import { router, orgProcedure } from "../trpc";

const platformSchema = z.enum([
  "linkedin",
  "facebook",
  "twitter",
  "instagram",
  "pinterest",
  "tiktok",
]);

// Credit costs for AI operations
const AI_CREDIT_COSTS = {
  contentGeneration: 1,
  imageGeneration: 5,
  variationGeneration: 1,
} as const;

export const aiRouter = router({
  // Generate content for a single platform
  generateContent: orgProcedure
    .input(
      z.object({
        content: z.string().min(1).max(10000),
        platform: platformSchema,
        brandKitId: z.string().uuid().optional(),
        includeHashtags: z.boolean().default(true),
        includeEmojis: z.boolean().default(true),
        contentType: z
          .enum(["thought-leadership", "promotional", "educational", "engagement", "announcement"])
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check AI credits
      const balance = await checkAiCredits(ctx.db, ctx.organizationId);
      if (balance < AI_CREDIT_COSTS.contentGeneration) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Insufficient AI credits",
        });
      }

      // Get brand voice if brand kit provided
      let brandVoice: BrandVoice | undefined;
      if (input.brandKitId) {
        const kit = await ctx.db.query.brandKits.findFirst({
          where: eq(brandKits.id, input.brandKitId),
        });
        if (kit) {
          brandVoice = {
            description: kit.voiceDescription ?? undefined,
            toneAttributes: kit.toneAttributes ?? undefined,
            targetAudience: kit.targetAudience ?? undefined,
            industry: kit.industry ?? undefined,
            doList: kit.doList ?? undefined,
            dontList: kit.dontList ?? undefined,
          };
        }
      }

      // Generate content
      const generated = await generatePlatformContent({
        sourceContent: input.content,
        platform: input.platform,
        brandVoice,
        includeHashtags: input.includeHashtags,
        includeEmojis: input.includeEmojis,
        contentType: input.contentType,
      });

      // Deduct credits
      await deductAiCredits(
        ctx.db,
        ctx.organizationId,
        AI_CREDIT_COSTS.contentGeneration,
        "content_generation",
        `Generated ${input.platform} content`
      );

      return generated;
    }),

  // Generate content for all platforms
  generateAllVariations: orgProcedure
    .input(
      z.object({
        content: z.string().min(1).max(10000),
        platforms: z.array(platformSchema).min(1).max(6),
        brandKitId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const totalCost = input.platforms.length * AI_CREDIT_COSTS.variationGeneration;

      // Check AI credits
      const balance = await checkAiCredits(ctx.db, ctx.organizationId);
      if (balance < totalCost) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Insufficient AI credits. Need ${totalCost}, have ${balance}`,
        });
      }

      // Get brand voice if brand kit provided
      let brandVoice: BrandVoice | undefined;
      if (input.brandKitId) {
        const kit = await ctx.db.query.brandKits.findFirst({
          where: eq(brandKits.id, input.brandKitId),
        });
        if (kit) {
          brandVoice = {
            description: kit.voiceDescription ?? undefined,
            toneAttributes: kit.toneAttributes ?? undefined,
            targetAudience: kit.targetAudience ?? undefined,
            industry: kit.industry ?? undefined,
            doList: kit.doList ?? undefined,
            dontList: kit.dontList ?? undefined,
          };
        }
      }

      // Generate all variations
      const generated = await generateAllPlatformVariations(
        input.content,
        input.platforms,
        brandVoice
      );

      // Deduct credits
      await deductAiCredits(
        ctx.db,
        ctx.organizationId,
        totalCost,
        "content_generation",
        `Generated content for ${input.platforms.length} platforms`
      );

      return generated;
    }),

  // Generate an image for content
  generateImage: orgProcedure
    .input(
      z.object({
        content: z.string().min(1).max(5000),
        platform: platformSchema,
        brandKitId: z.string().uuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check AI credits
      const balance = await checkAiCredits(ctx.db, ctx.organizationId);
      if (balance < AI_CREDIT_COSTS.imageGeneration) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Insufficient AI credits for image generation",
        });
      }

      // Get brand colors if brand kit provided
      let brandColors: string[] | undefined;
      if (input.brandKitId) {
        const kit = await ctx.db.query.brandKits.findFirst({
          where: eq(brandKits.id, input.brandKitId),
        });
        if (kit?.colors) {
          brandColors = kit.colors.map((c) => c.hex);
        }
      }

      // Generate image
      const generated = await generateContentImage(input.content, input.platform, brandColors);

      // Deduct credits
      await deductAiCredits(
        ctx.db,
        ctx.organizationId,
        AI_CREDIT_COSTS.imageGeneration,
        "image_generation",
        `Generated image for ${input.platform} content`
      );

      return generated;
    }),

  // Get platform configurations
  getPlatformConfigs: orgProcedure.query(() => {
    return PLATFORM_CONFIGS;
  }),

  // Get AI credit costs
  getCreditCosts: orgProcedure.query(() => {
    return AI_CREDIT_COSTS;
  }),
});

// Helper functions
async function checkAiCredits(db: typeof import("@/lib/db").db, organizationId: string): Promise<number> {
  const latestTransaction = await db.query.aiCreditTransactions.findFirst({
    where: eq(aiCreditTransactions.organizationId, organizationId),
    orderBy: [desc(aiCreditTransactions.createdAt)],
  });

  return latestTransaction?.balance ?? 0;
}

async function deductAiCredits(
  db: typeof import("@/lib/db").db,
  organizationId: string,
  amount: number,
  referenceType: string,
  description: string
): Promise<void> {
  const currentBalance = await checkAiCredits(db, organizationId);
  const newBalance = currentBalance - amount;

  await db.insert(aiCreditTransactions).values({
    organizationId,
    type: "usage",
    amount: -amount,
    balance: newBalance,
    description,
    referenceType,
  });
}
