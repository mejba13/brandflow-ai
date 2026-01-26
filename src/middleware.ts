import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if Clerk is configured
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey.startsWith("pk_");

// Auth cookie name (must match auth.ts)
const AUTH_COOKIE_NAME = "brandflow_session";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/api/webhooks",
  "/pricing",
  "/features",
  "/about",
  "/forgot-password",
  "/terms",
  "/privacy",
];

function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If Clerk is not configured, use custom auth check
  if (!isClerkConfigured) {
    // Allow public routes
    if (isPublicRoute(pathname)) {
      return NextResponse.next();
    }

    // Allow static files and API routes (except protected ones)
    if (
      pathname.startsWith("/_next") ||
      pathname.startsWith("/api/webhooks") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Check for custom auth session cookie
    const sessionCookie = request.cookies.get(AUTH_COOKIE_NAME);

    if (!sessionCookie?.value) {
      // Redirect to login if no session
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate the session cookie
    try {
      const user = JSON.parse(decodeURIComponent(sessionCookie.value));
      if (!user || !user.id) {
        throw new Error("Invalid session");
      }
      // Session is valid, continue
      return NextResponse.next();
    } catch {
      // Invalid session cookie, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      // Clear the invalid cookie
      response.cookies.delete(AUTH_COOKIE_NAME);
      return response;
    }
  }

  // Dynamic import Clerk middleware only when configured
  try {
    const { clerkMiddleware, createRouteMatcher } = await import("@clerk/nextjs/server");

    const isClerkPublicRoute = createRouteMatcher([
      "/",
      "/login(.*)",
      "/signup(.*)",
      "/api/webhooks(.*)",
      "/pricing",
      "/features",
      "/about",
    ]);

    return clerkMiddleware(async (auth, req) => {
      if (!isClerkPublicRoute(req)) {
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
