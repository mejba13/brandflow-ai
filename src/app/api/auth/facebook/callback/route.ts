import { NextRequest, NextResponse } from "next/server";
import { FACEBOOK_CONFIG } from "@/lib/social/types";
import type { FacebookTokenResponse, FacebookProfile } from "@/lib/social/types";

// Facebook OAuth callback endpoint
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI || `${baseUrl}/api/auth/facebook/callback`;

  // Handle errors from Facebook
  if (error) {
    console.error("Facebook OAuth error:", error, errorDescription);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent(errorDescription || error)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Missing authorization code or state")}`
    );
  }

  const clientId = process.env.META_APP_ID;
  const clientSecret = process.env.META_APP_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Facebook OAuth not configured")}`
    );
  }

  try {
    // Exchange code for access token
    const tokenUrl = new URL(FACEBOOK_CONFIG.tokenUrl);
    tokenUrl.searchParams.set("client_id", clientId);
    tokenUrl.searchParams.set("client_secret", clientSecret);
    tokenUrl.searchParams.set("code", code);
    tokenUrl.searchParams.set("redirect_uri", redirectUri);

    const tokenResponse = await fetch(tokenUrl.toString());

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Facebook token exchange failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to exchange authorization code")}`
      );
    }

    const tokenData: FacebookTokenResponse = await tokenResponse.json();

    // Fetch user profile using the access token
    const profileUrl = new URL(FACEBOOK_CONFIG.profileUrl);
    profileUrl.searchParams.set("fields", "id,name,email,picture.type(large)");
    profileUrl.searchParams.set("access_token", tokenData.access_token);

    const profileResponse = await fetch(profileUrl.toString());

    if (!profileResponse.ok) {
      const errorData = await profileResponse.text();
      console.error("Facebook profile fetch failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch Facebook profile")}`
      );
    }

    const profile: FacebookProfile = await profileResponse.json();

    // Create account data to pass to the client
    const accountData = {
      platform: "facebook",
      platformAccountId: profile.id,
      displayName: profile.name,
      email: profile.email,
      avatarUrl: profile.picture?.data?.url,
      accessToken: tokenData.access_token,
      expiresIn: tokenData.expires_in,
      scopes: FACEBOOK_CONFIG.scopes,
      state,
    };

    // Encode account data for URL (will be processed by client)
    const encodedData = encodeURIComponent(
      Buffer.from(JSON.stringify(accountData)).toString("base64")
    );

    // Redirect back to accounts page with success data
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?facebook_connected=true&data=${encodedData}`
    );
  } catch (err) {
    console.error("Facebook OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
