import { NextRequest, NextResponse } from "next/server";
import { PINTEREST_CONFIG } from "@/lib/social/types";

// Pinterest OAuth initiation endpoint
export async function GET(request: NextRequest) {
  const clientId = process.env.PINTEREST_APP_ID;
  const redirectUri = process.env.PINTEREST_REDIRECT_URI ||
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/pinterest/callback`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Pinterest OAuth not configured. Please set PINTEREST_APP_ID." },
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

  // Build Pinterest authorization URL
  const authUrl = new URL(PINTEREST_CONFIG.authUrl);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("scope", PINTEREST_CONFIG.scopes.join(","));
  authUrl.searchParams.set("response_type", "code");

  // Redirect to Pinterest
  return NextResponse.redirect(authUrl.toString());
}
