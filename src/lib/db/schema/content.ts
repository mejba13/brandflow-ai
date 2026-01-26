import { pgTable, uuid, varchar, text, timestamp, pgEnum, jsonb, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users, organizations } from "./users";

// Enums
export const contentStatusEnum = pgEnum("content_status", ["draft", "scheduled", "published", "failed"]);
export const platformEnum = pgEnum("platform", ["linkedin", "facebook", "twitter", "instagram", "pinterest", "tiktok"]);
export const postStatusEnum = pgEnum("post_status", ["pending", "scheduled", "publishing", "published", "failed"]);

// Source content (the original content before transformation)
export const sourceContent = pgTable("source_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  authorId: uuid("author_id")
    .references(() => users.id, { onDelete: "set null" }),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  status: contentStatusEnum("status").default("draft").notNull(),
  tags: jsonb("tags").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// Platform variations (AI-transformed content for each platform)
export const contentVariations = pgTable("content_variations", {
  id: uuid("id").primaryKey().defaultRandom(),
  sourceContentId: uuid("source_content_id")
    .references(() => sourceContent.id, { onDelete: "cascade" })
    .notNull(),
  platform: platformEnum("platform").notNull(),
  content: text("content").notNull(),
  characterCount: integer("character_count").notNull(),
  hashtags: jsonb("hashtags").$type<string[]>().default([]),
  aiModelUsed: varchar("ai_model_used", { length: 100 }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Scheduled posts
export const scheduledPosts = pgTable("scheduled_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  variationId: uuid("variation_id")
    .references(() => contentVariations.id, { onDelete: "cascade" })
    .notNull(),
  socialAccountId: uuid("social_account_id").notNull(), // References social_accounts table
  status: postStatusEnum("status").default("pending").notNull(),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  externalPostId: varchar("external_post_id", { length: 255 }), // ID from the platform
  errorMessage: text("error_message"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Media assets
export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  sourceContentId: uuid("source_content_id")
    .references(() => sourceContent.id, { onDelete: "set null" }),
  type: varchar("type", { length: 50 }).notNull(), // image, video, document
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  fileName: varchar("file_name", { length: 500 }),
  fileSize: integer("file_size"), // in bytes
  mimeType: varchar("mime_type", { length: 100 }),
  width: integer("width"),
  height: integer("height"),
  aiGenerated: jsonb("ai_generated").$type<{ prompt?: string; model?: string }>(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

// Relations
export const sourceContentRelations = relations(sourceContent, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [sourceContent.organizationId],
    references: [organizations.id],
  }),
  author: one(users, {
    fields: [sourceContent.authorId],
    references: [users.id],
  }),
  variations: many(contentVariations),
  mediaAssets: many(mediaAssets),
}));

export const contentVariationsRelations = relations(contentVariations, ({ one, many }) => ({
  sourceContent: one(sourceContent, {
    fields: [contentVariations.sourceContentId],
    references: [sourceContent.id],
  }),
  scheduledPosts: many(scheduledPosts),
}));

export const scheduledPostsRelations = relations(scheduledPosts, ({ one }) => ({
  variation: one(contentVariations, {
    fields: [scheduledPosts.variationId],
    references: [contentVariations.id],
  }),
}));

export const mediaAssetsRelations = relations(mediaAssets, ({ one }) => ({
  organization: one(organizations, {
    fields: [mediaAssets.organizationId],
    references: [organizations.id],
  }),
  sourceContent: one(sourceContent, {
    fields: [mediaAssets.sourceContentId],
    references: [sourceContent.id],
  }),
}));

// Types
export type SourceContent = typeof sourceContent.$inferSelect;
export type NewSourceContent = typeof sourceContent.$inferInsert;
export type ContentVariation = typeof contentVariations.$inferSelect;
export type NewContentVariation = typeof contentVariations.$inferInsert;
export type ScheduledPost = typeof scheduledPosts.$inferSelect;
export type NewScheduledPost = typeof scheduledPosts.$inferInsert;
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type NewMediaAsset = typeof mediaAssets.$inferInsert;
