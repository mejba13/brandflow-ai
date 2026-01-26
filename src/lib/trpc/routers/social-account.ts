import { eq, and, isNull } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { socialAccounts, brandKits, brandAssets } from "@/lib/db/schema";

import { router, orgProcedure } from "../trpc";

export const socialAccountRouter = router({
  // List all social accounts for organization
  list: orgProcedure.query(async ({ ctx }) => {
    const accounts = await ctx.db.query.socialAccounts.findMany({
      where: and(
        eq(socialAccounts.organizationId, ctx.organizationId),
        isNull(socialAccounts.deletedAt)
      ),
    });

    return accounts;
  }),

  // Get social account by ID
  getById: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const account = await ctx.db.query.socialAccounts.findFirst({
        where: and(
          eq(socialAccounts.id, input.id),
          eq(socialAccounts.organizationId, ctx.organizationId),
          isNull(socialAccounts.deletedAt)
        ),
      });

      if (!account) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Social account not found",
        });
      }

      return account;
    }),

  // Disconnect social account (soft delete)
  disconnect: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(socialAccounts)
        .set({
          status: "revoked",
          deletedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(socialAccounts.id, input.id),
            eq(socialAccounts.organizationId, ctx.organizationId)
          )
        );

      return { success: true };
    }),

  // Get brand kits
  getBrandKits: orgProcedure.query(async ({ ctx }) => {
    const kits = await ctx.db.query.brandKits.findMany({
      where: eq(brandKits.organizationId, ctx.organizationId),
      with: {
        assets: true,
      },
    });

    return kits;
  }),

  // Create brand kit
  createBrandKit: orgProcedure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        isDefault: z.boolean().optional(),
        colors: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              hex: z.string(),
              usage: z.string().optional(),
            })
          )
          .optional(),
        fonts: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              usage: z.string(),
              weights: z.array(z.string()),
            })
          )
          .optional(),
        voiceDescription: z.string().optional(),
        toneAttributes: z.array(z.string()).optional(),
        targetAudience: z.string().optional(),
        industry: z.string().optional(),
        doList: z.array(z.string()).optional(),
        dontList: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // If this is set as default, unset other defaults
      if (input.isDefault) {
        await ctx.db
          .update(brandKits)
          .set({ isDefault: false })
          .where(eq(brandKits.organizationId, ctx.organizationId));
      }

      const [kit] = await ctx.db
        .insert(brandKits)
        .values({
          organizationId: ctx.organizationId,
          name: input.name,
          isDefault: input.isDefault ?? false,
          colors: input.colors ?? [],
          fonts: input.fonts ?? [],
          voiceDescription: input.voiceDescription,
          toneAttributes: input.toneAttributes ?? [],
          targetAudience: input.targetAudience,
          industry: input.industry,
          doList: input.doList ?? [],
          dontList: input.dontList ?? [],
        })
        .returning();

      return kit;
    }),

  // Update brand kit
  updateBrandKit: orgProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(1).max(255).optional(),
        isDefault: z.boolean().optional(),
        colors: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              hex: z.string(),
              usage: z.string().optional(),
            })
          )
          .optional(),
        fonts: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
              usage: z.string(),
              weights: z.array(z.string()),
            })
          )
          .optional(),
        voiceDescription: z.string().optional(),
        toneAttributes: z.array(z.string()).optional(),
        targetAudience: z.string().optional(),
        industry: z.string().optional(),
        doList: z.array(z.string()).optional(),
        dontList: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...updates } = input;

      // If this is set as default, unset other defaults
      if (updates.isDefault) {
        await ctx.db
          .update(brandKits)
          .set({ isDefault: false })
          .where(eq(brandKits.organizationId, ctx.organizationId));
      }

      const [kit] = await ctx.db
        .update(brandKits)
        .set({
          ...updates,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(brandKits.id, id),
            eq(brandKits.organizationId, ctx.organizationId)
          )
        )
        .returning();

      return kit;
    }),

  // Delete brand kit
  deleteBrandKit: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(brandKits)
        .where(
          and(
            eq(brandKits.id, input.id),
            eq(brandKits.organizationId, ctx.organizationId)
          )
        );

      return { success: true };
    }),

  // Add brand asset
  addBrandAsset: orgProcedure
    .input(
      z.object({
        brandKitId: z.string().uuid(),
        name: z.string().min(1).max(255),
        type: z.enum(["logo", "icon", "image", "document"]),
        url: z.string().url(),
        thumbnailUrl: z.string().url().optional(),
        fileSize: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Verify brand kit belongs to org
      const kit = await ctx.db.query.brandKits.findFirst({
        where: and(
          eq(brandKits.id, input.brandKitId),
          eq(brandKits.organizationId, ctx.organizationId)
        ),
      });

      if (!kit) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Brand kit not found",
        });
      }

      const [asset] = await ctx.db
        .insert(brandAssets)
        .values({
          brandKitId: input.brandKitId,
          name: input.name,
          type: input.type,
          url: input.url,
          thumbnailUrl: input.thumbnailUrl,
          fileSize: input.fileSize,
        })
        .returning();

      return asset;
    }),

  // Delete brand asset
  deleteBrandAsset: orgProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      // Get asset and verify ownership through brand kit
      const asset = await ctx.db.query.brandAssets.findFirst({
        where: eq(brandAssets.id, input.id),
        with: {
          brandKit: true,
        },
      });

      if (!asset || asset.brandKit.organizationId !== ctx.organizationId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Asset not found",
        });
      }

      await ctx.db.delete(brandAssets).where(eq(brandAssets.id, input.id));

      return { success: true };
    }),
});
