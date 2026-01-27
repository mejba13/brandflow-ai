import { NextRequest, NextResponse } from "next/server";
import { INSTAGRAM_CONFIG } from "@/lib/social/types";
import type { FacebookTokenResponse, FacebookPagesResponse, InstagramBusinessAccount } from "@/lib/social/types";

// Instagram OAuth callback endpoint (via Facebook Graph API)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = process.env.INSTAGRAM_REDIRECT_URI || `${baseUrl}/api/auth/instagram/callback`;

  // Handle errors from Facebook
  if (error) {
    console.error("Instagram OAuth error:", error, errorDescription);
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
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Instagram OAuth not configured")}`
    );
  }

  try {
    // Exchange code for access token (using Facebook's token endpoint)
    const tokenUrl = new URL(INSTAGRAM_CONFIG.tokenUrl);
    tokenUrl.searchParams.set("client_id", clientId);
    tokenUrl.searchParams.set("client_secret", clientSecret);
    tokenUrl.searchParams.set("code", code);
    tokenUrl.searchParams.set("redirect_uri", redirectUri);

    const tokenResponse = await fetch(tokenUrl.toString());

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Instagram token exchange failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to exchange authorization code")}`
      );
    }

    const tokenData: FacebookTokenResponse = await tokenResponse.json();

    // Fetch user's Facebook Pages to find linked Instagram Business accounts
    const pagesUrl = new URL(INSTAGRAM_CONFIG.profileUrl);
    pagesUrl.searchParams.set("fields", "id,name,access_token,instagram_business_account");
    pagesUrl.searchParams.set("access_token", tokenData.access_token);

    const pagesResponse = await fetch(pagesUrl.toString());

    if (!pagesResponse.ok) {
      const errorData = await pagesResponse.text();
      console.error("Facebook pages fetch failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch Facebook pages")}`
      );
    }

    const pagesData: FacebookPagesResponse = await pagesResponse.json();

    // Find a page with an Instagram Business account linked
    const pageWithInstagram = pagesData.data.find(
      (page) => page.instagram_business_account?.id
    );

    if (!pageWithInstagram || !pageWithInstagram.instagram_business_account) {
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("No Instagram Business account found. Please link an Instagram Business account to a Facebook Page first.")}`
      );
    }

    // Fetch the Instagram Business account details
    const instagramId = pageWithInstagram.instagram_business_account.id;
    const igProfileUrl = new URL(`https://graph.facebook.com/v18.0/${instagramId}`);
    igProfileUrl.searchParams.set("fields", "id,username,name,profile_picture_url,followers_count");
    igProfileUrl.searchParams.set("access_token", pageWithInstagram.access_token);

    const igProfileResponse = await fetch(igProfileUrl.toString());

    if (!igProfileResponse.ok) {
      const errorData = await igProfileResponse.text();
      console.error("Instagram profile fetch failed:", errorData);
      return NextResponse.redirect(
        `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("Failed to fetch Instagram profile")}`
      );
    }

    const igProfile: InstagramBusinessAccount = await igProfileResponse.json();

    // Create account data to pass to the client
    const accountData = {
      platform: "instagram",
      platformAccountId: igProfile.id,
      displayName: igProfile.name || igProfile.username,
      username: igProfile.username,
      avatarUrl: igProfile.profile_picture_url,
      followers: igProfile.followers_count?.toString(),
      accessToken: pageWithInstagram.access_token, // Use Page access token for Instagram API
      expiresIn: tokenData.expires_in,
      scopes: INSTAGRAM_CONFIG.scopes,
      facebookPageId: pageWithInstagram.id,
      facebookPageName: pageWithInstagram.name,
      state,
    };

    // Encode account data for URL (will be processed by client)
    const encodedData = encodeURIComponent(
      Buffer.from(JSON.stringify(accountData)).toString("base64")
    );

    // Redirect back to accounts page with success data
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?instagram_connected=true&data=${encodedData}`
    );
  } catch (err) {
    console.error("Instagram OAuth callback error:", err);
    return NextResponse.redirect(
      `${baseUrl}/dashboard/accounts?error=${encodeURIComponent("An unexpected error occurred")}`
    );
  }
}
