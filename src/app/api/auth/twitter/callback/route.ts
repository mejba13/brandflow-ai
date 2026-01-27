import { NextRequest, NextResponse } from "next/server";
import { TWITTER_CONFIG } from "@/lib/social/types";
import type { TwitterTokenResponse, TwitterProfile } from "@/lib/social/types";

// Twitter OAuth 2.0 callback endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.TWITTER_REDIRECT_URI || `${baseUrl}/api/auth/twitter/callback`;

  // Handle errors from Twitter
  if (error) {
    console.error("Twitter OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Missing authorization code or state")}`
    );
  }

  const clientId = process.env.TWITTER_CLIENT_ID;
  const clientSecret = process.env.TWITTER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Twitter OAuth not configured")}`
    );
  }

  // Get code_verifier from the state data (passed via URL query param)
  const codeVerifier = searchParams.get("code_verifier");

  if (!codeVerifier) {
    // The code_verifier should be sent from client-side storage
    // For now, redirect with error - client needs to handle PKCE state
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?twitter_pkce_callback=true&code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
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
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to exchange authorization code")}`
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
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch Twitter profile")}`
      );
    }

    const profile: TwitterProfile = await profileResponse.json();

    // Create account data to pass to the client
    const accountData = {
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
    };

    // Encode account data for URL (will be processed by client)
    const encodedData = encodeURIComponent(
      Buffer.from(JSON.stringify(accountData)).toString("base64")
    );

    // Redirect back to accounts page with success data
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?twitter_connected=true&data=${encodedData}`
    );
  } catch (err) {
    console.error("Twitter OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
