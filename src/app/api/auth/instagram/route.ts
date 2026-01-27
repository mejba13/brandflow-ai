import { NextRequest, NextResponse } from "next/server";
import { INSTAGRAM_CONFIG } from "@/lib/social/types";

// Instagram OAuth initiation endpoint (via Facebook Graph API)
// Instagram Business accounts require authentication through Facebook
export async function GET(request: NextRequest) {
  const clientId = process.env.META_APP_ID;
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/instagram/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Instagram OAuth not configured. Please set META_APP_ID." },
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

  // Build Facebook authorization URL (Instagram uses Facebook OAuth)
  const authUrl = new URL(INSTAGRAM_CONFIG.authUrl);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", INSTAGRAM_CONFIG.scopes.join(","));
  authUrl.searchParams.set("response_type", "code");

  // Redirect to Facebook (for Instagram Business auth)
  return NextResponse.redirect(authUrl.toString());
}
