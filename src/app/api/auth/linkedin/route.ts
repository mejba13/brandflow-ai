import { NextRequest, NextResponse } from "next/server";
import { LINKEDIN_CONFIG } from "@/lib/social/types";

// LinkedIn OAuth initiation endpoint
export async function GET(request: NextRequest) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/linkedin/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "LinkedIn OAuth not configured. Please set LINKEDIN_CLIENT_ID." },
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

  // Build LinkedIn authorization URL
  const authUrl = new URL(LINKEDIN_CONFIG.authUrl);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", LINKEDIN_CONFIG.scopes.join(" "));

  // Redirect to LinkedIn
  return NextResponse.redirect(authUrl.toString());
}
