import Stripe from "stripe";

function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    // Return a mock/placeholder during build time
    // This will throw at runtime if actually used without a key
    console.warn("Missing STRIPE_SECRET_KEY environment variable");
  }

  return new Stripe(secretKey ?? "sk_test_placeholder", {
    apiVersion: "2025-12-15.clover",
    typescript: true,
  });
}

// Lazy initialization to avoid build-time errors
let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      _stripe = getStripeClient();
    }
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const STRIPE_PLANS = {
  starter: {
    name: "Starter",
    priceId: process.env.STRIPE_PRICE_ID_STARTER,
    features: [
      "100 AI credits/month",
      "30 posts/month",
      "3 social accounts",
      "Basic analytics",
      "Email support",
    ],
    limits: {
      aiCredits: 100,
      postsPerMonth: 30,
      socialAccounts: 3,
      teamMembers: 1,
    },
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRICE_ID_PRO,
    features: [
      "500 AI credits/month",
      "150 posts/month",
      "10 social accounts",
      "Advanced analytics",
      "Priority support",
      "Custom brand kit",
    ],
    limits: {
      aiCredits: 500,
      postsPerMonth: 150,
      socialAccounts: 10,
      teamMembers: 5,
    },
  },
  business: {
    name: "Business",
    priceId: process.env.STRIPE_PRICE_ID_BUSINESS,
    features: [
      "2000 AI credits/month",
      "Unlimited posts",
      "Unlimited social accounts",
      "White-label reports",
      "Dedicated support",
      "API access",
      "Custom integrations",
    ],
    limits: {
      aiCredits: 2000,
      postsPerMonth: -1, // unlimited
      socialAccounts: -1, // unlimited
      teamMembers: -1, // unlimited
    },
  },
} as const;

export type StripePlan = keyof typeof STRIPE_PLANS;
