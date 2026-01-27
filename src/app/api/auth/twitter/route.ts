import { NextRequest, NextResponse } from "next/server";
import { TWITTER_CONFIG } from "@/lib/social/types";

// Twitter OAuth 2.0 initiation endpoint (with PKCE)
export async function GET(request: NextRequest) {
  const clientId = process.env.TWITTER_CLIENT_ID;
  const redirectUri = process.env.TWITTER_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/twitter/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Twitter OAuth not configured. Please set TWITTER_CLIENT_ID." },
      { status: 500 }
    );
  }

  // Get the state and code_challenge from query params (passed from client)
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const codeChallenge = searchParams.get("code_challenge");

  if (!state) {
    return NextResponse.json(
      { error: "Missing state parameter" },
      { status: 400 }
    );
  }

  if (!codeChallenge) {
    return NextResponse.json(
      { error: "Missing code_challenge parameter (PKCE required for Twitter)" },
      { status: 400 }
    );
  }

  // Build Twitter authorization URL with PKCE
  const authUrl = new URL(TWITTER_CONFIG.authUrl);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", TWITTER_CONFIG.scopes.join(" "));
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  // Redirect to Twitter
  return NextResponse.redirect(authUrl.toString());
}
