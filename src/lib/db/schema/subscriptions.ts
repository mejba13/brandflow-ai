import { pgTable, uuid, varchar, text, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { organizations } from "./users";

// Subscriptions (Stripe integration)
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }).notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).unique(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull(), // active, canceled, past_due, trialing, etc.
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  canceledAt: timestamp("canceled_at", { withTimezone: true }),
  trialStart: timestamp("trial_start", { withTimezone: true }),
  trialEnd: timestamp("trial_end", { withTimezone: true }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Usage tracking (for metered billing and limits)
export const usageRecords = pgTable("usage_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  featureType: varchar("feature_type", { length: 50 }).notNull(), // ai_credits, posts, social_accounts
  periodStart: timestamp("period_start", { withTimezone: true }).notNull(),
  periodEnd: timestamp("period_end", { withTimezone: true }).notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
  usageLimit: integer("usage_limit").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// AI credit transactions
export const aiCreditTransactions = pgTable("ai_credit_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  type: varchar("type", { length: 50 }).notNull(), // purchase, usage, bonus, refund
  amount: integer("amount").notNull(), // positive for credits added, negative for used
  balance: integer("balance").notNull(), // running balance after transaction
  description: text("description"),
  referenceId: varchar("reference_id", { length: 255 }), // ID of related entity (content, image, etc.)
  referenceType: varchar("reference_type", { length: 50 }), // content_generation, image_generation, etc.
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Invoices (synced from Stripe)
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  subscriptionId: uuid("subscription_id")
    .references(() => subscriptions.id, { onDelete: "cascade" })
    .notNull(),
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 255 }).unique().notNull(),
  amountDue: integer("amount_due").notNull(), // in cents
  amountPaid: integer("amount_paid").notNull(), // in cents
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  status: varchar("status", { length: 50 }).notNull(), // draft, open, paid, void, uncollectible
  invoiceUrl: text("invoice_url"),
  pdfUrl: text("pdf_url"),
  periodStart: timestamp("period_start", { withTimezone: true }),
  periodEnd: timestamp("period_end", { withTimezone: true }),
  dueDate: timestamp("due_date", { withTimezone: true }),
  paidAt: timestamp("paid_at", { withTimezone: true }),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [subscriptions.organizationId],
    references: [organizations.id],
  }),
  invoices: many(invoices),
}));

export const usageRecordsRelations = relations(usageRecords, ({ one }) => ({
  organization: one(organizations, {
    fields: [usageRecords.organizationId],
    references: [organizations.id],
  }),
}));

export const aiCreditTransactionsRelations = relations(aiCreditTransactions, ({ one }) => ({
  organization: one(organizations, {
    fields: [aiCreditTransactions.organizationId],
    references: [organizations.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  subscription: one(subscriptions, {
    fields: [invoices.subscriptionId],
    references: [subscriptions.id],
  }),
}));

// Types
export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type UsageRecord = typeof usageRecords.$inferSelect;
export type NewUsageRecord = typeof usageRecords.$inferInsert;
export type AiCreditTransaction = typeof aiCreditTransactions.$inferSelect;
export type NewAiCreditTransaction = typeof aiCreditTransactions.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
