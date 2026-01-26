import { router } from "./trpc";
import { userRouter } from "./routers/user";
import { organizationRouter } from "./routers/organization";
import { contentRouter } from "./routers/content";
import { socialAccountRouter } from "./routers/social-account";
import { analyticsRouter } from "./routers/analytics";
import { subscriptionRouter } from "./routers/subscription";
import { aiRouter } from "./routers/ai";

export const appRouter = router({
  user: userRouter,
  organization: organizationRouter,
  content: contentRouter,
  socialAccount: socialAccountRouter,
  analytics: analyticsRouter,
  subscription: subscriptionRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;
