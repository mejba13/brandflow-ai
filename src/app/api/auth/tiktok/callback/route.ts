import { NextRequest, NextResponse } from "next/server";
import { TIKTOK_CONFIG } from "@/lib/social/types";
import type { TikTokTokenResponse, TikTokProfile } from "@/lib/social/types";

// TikTok OAuth callback endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.TIKTOK_REDIRECT_URI || `${baseUrl}/api/auth/tiktok/callback`;

  // Handle errors from TikTok
  if (error) {
    console.error("TikTok OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Missing authorization code or state")}`
    );
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET;

  if (!clientKey || !clientSecret) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("TikTok OAuth not configured")}`
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(TIKTOK_CONFIG.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("TikTok token exchange failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to exchange authorization code")}`
      );
    }

    const tokenData: TikTokTokenResponse = await tokenResponse.json();

    // Fetch user profile using the access token
    const profileUrl = new URL(TIKTOK_CONFIG.profileUrl);
    profileUrl.searchParams.set("fields", "open_id,union_id,avatar_url,display_name,username");

    const profileResponse = await fetch(profileUrl.toString(), {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error("TikTok profile fetch failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch TikTok profile")}`
      );
    }

    const profile: TikTokProfile = await profileResponse.json();

    // Create account data to pass to the client
    const accountData = {
      platform: "tiktok",
      platformAccountId: profile.data.user.open_id,
      displayName: profile.data.user.display_name,
      username: profile.data.user.username || profile.data.user.display_name,
      avatarUrl: profile.data.user.avatar_url,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresIn: tokenData.expires_in,
      scopes: tokenData.scope.split(","),
      openId: tokenData.open_id,
      state,
    };

    // Encode account data for URL (will be processed by client)
    const encodedData = encodeURIComponent(
      Buffer.from(JSON.stringify(accountData)).toString("base64")
    );

    // Redirect back to accounts page with success data
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?tiktok_connected=true&data=${encodedData}`
    );
  } catch (err) {
    console.error("TikTok OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
