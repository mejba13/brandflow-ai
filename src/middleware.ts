import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk is configured
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey.startsWith("pk_");

export async function middleware(request: NextRequest) {
  // If Clerk is not configured, allow all routes
  if (!isClerkConfigured) {
    return NextResponse.next();
  }

  // Dynamic import Clerk middleware only when configured
  try {
    const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

    const isPublicRoute = createRouteMatcher([
      "/",
      "/login(.*)",
      "/signup(.*)",
      "/api/webhooks(.*)",
      "/pricing",
      "/features",
      "/about",
    ]);

    return clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    })(request, {} as any);
  } catch (error) {
    // If Clerk fails, allow the request
    console.warn("Clerk middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
