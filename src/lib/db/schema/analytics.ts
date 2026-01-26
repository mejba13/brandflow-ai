import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, date, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "./users";
import { scheduledPosts, platformEnum } from "./content";
import { socialAccounts } from "./social-accounts";

// Post analytics (metrics for individual posts)
export const postAnalytics = pgTable("post_analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  scheduledPostId: uuid("scheduled_post_id")
    .references(() => scheduledPosts.id, { onDelete: "cascade" })
    .notNull(),
  impressions: integer("impressions").default(0).notNull(),
  reach: integer("reach").default(0).notNull(),
  engagements: integer("engagements").default(0).notNull(),
  likes: integer("likes").default(0).notNull(),
  comments: integer("comments").default(0).notNull(),
  shares: integer("shares").default(0).notNull(),
  saves: integer("saves").default(0).notNull(),
  clicks: integer("clicks").default(0).notNull(),
  videoViews: integer("video_views").default(0),
  engagementRate: real("engagement_rate"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Account analytics (daily metrics for social accounts)
export const accountAnalytics = pgTable("account_analytics", {
  id: uuid("id").primaryKey().defaultRandom(),
  socialAccountId: uuid("social_account_id")
    .references(() => socialAccounts.id, { onDelete: "cascade" })
    .notNull(),
  date: date("date").notNull(),
  followers: integer("followers").default(0).notNull(),
  followersGained: integer("followers_gained").default(0).notNull(),
  followersLost: integer("followers_lost").default(0).notNull(),
  impressions: integer("impressions").default(0).notNull(),
  reach: integer("reach").default(0).notNull(),
  profileViews: integer("profile_views").default(0).notNull(),
  websiteClicks: integer("website_clicks").default(0).notNull(),
  engagementRate: real("engagement_rate"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Organization analytics summary (aggregated metrics)
export const organizationAnalyticsSummary = pgTable("organization_analytics_summary", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  period: varchar("period", { length: 20 }).notNull(), // daily, weekly, monthly
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  totalReach: integer("total_reach").default(0).notNull(),
  totalImpressions: integer("total_impressions").default(0).notNull(),
  totalEngagements: integer("total_engagements").default(0).notNull(),
  totalFollowersGained: integer("total_followers_gained").default(0).notNull(),
  totalPostsPublished: integer("total_posts_published").default(0).notNull(),
  avgEngagementRate: real("avg_engagement_rate"),
  platformBreakdown: jsonb("platform_breakdown").$type<Record<string, unknown>>(),
  topPerformingPosts: jsonb("top_performing_posts").$type<string[]>().default([]),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Lead tracking
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  scheduledPostId: uuid("scheduled_post_id")
    .references(() => scheduledPosts.id, { onDelete: "set null" }),
  platform: platformEnum("platform").notNull(),
  sourceUrl: text("source_url"),
  leadType: varchar("lead_type", { length: 50 }), // click, form, message, comment
  contactInfo: jsonb("contact_info").$type<{ name?: string; email?: string; company?: string }>(),
  notes: text("notes"),
  status: varchar("status", { length: 50 }).default("new").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  capturedAt: timestamp("captured_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const postAnalyticsRelations = relations(postAnalytics, ({ one }) => ({
  scheduledPost: one(scheduledPosts, {
    fields: [postAnalytics.scheduledPostId],
    references: [scheduledPosts.id],
  }),
}));

export const accountAnalyticsRelations = relations(accountAnalytics, ({ one }) => ({
  socialAccount: one(socialAccounts, {
    fields: [accountAnalytics.socialAccountId],
    references: [socialAccounts.id],
  }),
}));

export const organizationAnalyticsSummaryRelations = relations(organizationAnalyticsSummary, ({ one }) => ({
  organization: one(organizations, {
    fields: [organizationAnalyticsSummary.organizationId],
    references: [organizations.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  organization: one(organizations, {
    fields: [leads.organizationId],
    references: [organizations.id],
  }),
  scheduledPost: one(scheduledPosts, {
    fields: [leads.scheduledPostId],
    references: [scheduledPosts.id],
  }),
}));

// Types
export type PostAnalytics = typeof postAnalytics.$inferSelect;
export type NewPostAnalytics = typeof postAnalytics.$inferInsert;
export type AccountAnalytics = typeof accountAnalytics.$inferSelect;
export type NewAccountAnalytics = typeof accountAnalytics.$inferInsert;
export type OrganizationAnalyticsSummary = typeof organizationAnalyticsSummary.$inferSelect;
export type NewOrganizationAnalyticsSummary = typeof organizationAnalyticsSummary.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
