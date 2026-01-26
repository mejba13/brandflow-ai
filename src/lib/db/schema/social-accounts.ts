import { pgTable, uuid, varchar, text, timestamp, pgEnum, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "./users";
import { platformEnum } from "./content";

// Enums
export const connectionStatusEnum = pgEnum("connection_status", ["connected", "expired", "error", "revoked"]);

// Social accounts (connected platform accounts)
export const socialAccounts = pgTable("social_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  platformAccountId: varchar("platform_account_id", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }),
  displayName: varchar("display_name", { length: 255 }),
  profileUrl: text("profile_url"),
  avatarUrl: text("avatar_url"),
  accessToken: text("access_token"), // Encrypted
  refreshToken: text("refresh_token"), // Encrypted
  tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
  status: connectionStatusEnum("status").default("connected").notNull(),
  scopes: jsonb("scopes").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// Brand kit
export const brandKits = pgTable("brand_kits", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).default("Default").notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  colors: jsonb("colors").$type<{ id: string; name: string; hex: string; usage?: string }[]>().default([]),
  fonts: jsonb("fonts").$type<{ id: string; name: string; usage: string; weights: string[] }[]>().default([]),
  voiceDescription: text("voice_description"),
  toneAttributes: jsonb("tone_attributes").$type<string[]>().default([]),
  targetAudience: text("target_audience"),
  industry: varchar("industry", { length: 255 }),
  doList: jsonb("do_list").$type<string[]>().default([]),
  dontList: jsonb("dont_list").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Brand assets (logos, images, etc.)
export const brandAssets = pgTable("brand_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  brandKitId: uuid("brand_kit_id")
    .references(() => brandKits.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // logo, icon, image, document
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  fileSize: varchar("file_size", { length: 50 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const socialAccountsRelations = relations(socialAccounts, ({ one }) => ({
  organization: one(organizations, {
    fields: [socialAccounts.organizationId],
    references: [organizations.id],
  }),
}));

export const brandKitsRelations = relations(brandKits, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [brandKits.organizationId],
    references: [organizations.id],
  }),
  assets: many(brandAssets),
}));

export const brandAssetsRelations = relations(brandAssets, ({ one }) => ({
  brandKit: one(brandKits, {
    fields: [brandAssets.brandKitId],
    references: [brandKits.id],
  }),
}));

// Types
export type SocialAccount = typeof socialAccounts.$inferSelect;
export type NewSocialAccount = typeof socialAccounts.$inferInsert;
export type BrandKit = typeof brandKits.$inferSelect;
export type NewBrandKit = typeof brandKits.$inferInsert;
export type BrandAsset = typeof brandAssets.$inferSelect;
export type NewBrandAsset = typeof brandAssets.$inferInsert;
