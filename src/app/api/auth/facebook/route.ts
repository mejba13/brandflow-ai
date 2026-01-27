import { NextRequest, NextResponse } from "next/server";
import { FACEBOOK_CONFIG } from "@/lib/social/types";

// Facebook OAuth initiation endpoint
export async function GET(request: NextRequest) {
  const clientId = process.env.META_APP_ID;
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/facebook/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Facebook OAuth not configured. Please set META_APP_ID." },
      { status: 500 }
    );
  }

  // Get the state from query params (passed from client)
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json(
      { error: "Missing state parameter" },
      { status: 400 }
    );
  }

  // Build Facebook authorization URL
  const authUrl = new URL(FACEBOOK_CONFIG.authUrl);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", FACEBOOK_CONFIG.scopes.join(","));
  authUrl.searchParams.set("response_type", "code");

  // Redirect to Facebook
  return NextResponse.redirect(authUrl.toString());
}
