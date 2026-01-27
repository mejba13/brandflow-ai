import { NextRequest, NextResponse } from "next/server";
import { PINTEREST_CONFIG } from "@/lib/social/types";
import type { PinterestTokenResponse, PinterestProfile } from "@/lib/social/types";

// Pinterest OAuth callback endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.PINTEREST_REDIRECT_URI || `${baseUrl}/api/auth/pinterest/callback`;

  // Handle errors from Pinterest
  if (error) {
    console.error("Pinterest OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Missing authorization code or state")}`
    );
  }

  const clientId = process.env.PINTEREST_APP_ID;
  const clientSecret = process.env.PINTEREST_APP_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Pinterest OAuth not configured")}`
    );
  }

  try {
    // Exchange code for access token
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const tokenResponse = await fetch(PINTEREST_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Pinterest token exchange failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to exchange authorization code")}`
      );
    }

    const tokenData: PinterestTokenResponse = await tokenResponse.json();

    // Fetch user profile using the access token
    const profileResponse = await fetch(PINTEREST_CONFIG.profileUrl, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error("Pinterest profile fetch failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch Pinterest profile")}`
      );
    }

    const profile: PinterestProfile = await profileResponse.json();

    // Create account data to pass to the client
    const accountData = {
      platform: "pinterest",
      platformAccountId: profile.username,
      displayName: profile.username,
      username: profile.username,
      avatarUrl: profile.profile_image,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      scopes: tokenData.scope.split(","),
      state,
    };

    // Encode account data for URL (will be processed by client)
    const encodedData = encodeURIComponent(
      Buffer.from(JSON.stringify(accountData)).toString("base64")
    );

    // Redirect back to accounts page with success data
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?pinterest_connected=true&data=${encodedData}`
    );
  } catch (err) {
    console.error("Pinterest OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
