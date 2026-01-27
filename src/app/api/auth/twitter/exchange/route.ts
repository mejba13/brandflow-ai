import { NextRequest, NextResponse } from "next/server";
import { TWITTER_CONFIG } from "@/lib/social/types";
import type { TwitterTokenResponse, TwitterProfile } from "@/lib/social/types";

// Twitter OAuth 2.0 token exchange endpoint (handles PKCE code_verifier from client)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code, state, codeVerifier } = body;

  if (!code || !state || !codeVerifier) {
    return NextResponse.json(
      { error: "Missing required parameters (code, state, codeVerifier)" },
      { status: 400 }
    );
  }

  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.TWITTER_REDIRECT_URI || `${baseUrl}/api/auth/twitter/callback`;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Twitter OAuth not configured" },
      { status: 500 }
    );
  }

  try {
    // Exchange code for access token with PKCE
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch(TWITTER_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Twitter token exchange failed:", errorData);
      return NextResponse.json(
        { error: "Failed to exchange authorization code", details: errorData },
        { status: 400 }
      );
    }

    const tokenData: TwitterTokenResponse = await tokenResponse.json();

    // Fetch user profile using the access token
    const profileResponse = await fetch(
      `${TWITTER_CONFIG.profileUrl}?user.fields=profile_image_url,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error("Twitter profile fetch failed:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch Twitter profile", details: errorData },
        { status: 400 }
      );
    }

    const profile: TwitterProfile = await profileResponse.json();

    // Return account data
    return NextResponse.json({
      success: true,
      account: {
        platform: "twitter",
        platformAccountId: profile.data.id,
        displayName: profile.data.name,
        username: profile.data.username,
        avatarUrl: profile.data.profile_image_url,
        followers: profile.data.public_metrics?.followers_count?.toString(),
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresIn: tokenData.expires_in,
        scopes: tokenData.scope.split(" "),
        state,
      },
    });
  } catch (err) {
    console.error("Twitter token exchange error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
