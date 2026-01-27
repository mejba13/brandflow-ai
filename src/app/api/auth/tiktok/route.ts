import { NextRequest, NextResponse } from "next/server";
import { TIKTOK_CONFIG } from "@/lib/social/types";

// TikTok OAuth initiation endpoint
export async function GET(request: NextRequest) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/tiktok/callback`;

  if (!clientKey) {
    return NextResponse.json(
      { error: "TikTok OAuth not configured. Please set TIKTOK_CLIENT_KEY." },
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

  // Build TikTok authorization URL
  const authUrl = new URL(TIKTOK_CONFIG.authUrl);
  authUrl.searchParams.set("client_key", clientKey);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", TIKTOK_CONFIG.scopes.join(","));
  authUrl.searchParams.set("response_type", "code");

  // Redirect to TikTok
  return NextResponse.redirect(authUrl.toString());
}
