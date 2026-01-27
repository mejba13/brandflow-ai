// Social account types and interfaces

export type SocialPlatform = "linkedin" | "twitter" | "facebook" | "instagram" | "pinterest" | "tiktok";

export type AccountStatus = "connected" | "expired" | "error";

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  platformAccountId: string;
  displayName: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  profileUrl: string;
  accessToken: string;
  refreshToken?: string;
  tokenExpiresAt?: string;
  scopes: string[];
  status: AccountStatus;
  followers?: string;
  lastSync: string;
  createdAt: string;
  updatedAt: string;
}

// Platform OAuth configuration
export interface OAuthConfig {
  authUrl: string;
  tokenUrl: string;
  profileUrl: string;
  scopes: string[];
}

export interface OAuthState {
  platform: SocialPlatform;
  returnUrl: string;
  nonce: string;
  codeVerifier?: string; // For PKCE (Twitter)
}

// ==============================================
// LinkedIn Types
// ==============================================

export interface LinkedInProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture?: string;
  email?: string;
  email_verified?: boolean;
  locale?: {
    country: string;
    language: string;
  };
}

export interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope: string;
  token_type: string;
  id_token?: string;
}

export const LINKEDIN_CONFIG: OAuthConfig = {
  authUrl: "https://www.linkedin.com/oauth/v2/authorization",
  tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
  profileUrl: "https://api.linkedin.com/v2/userinfo",
  scopes: ["openid", "profile", "email", "w_member_social"],
};

// ==============================================
// Twitter/X Types (OAuth 2.0 with PKCE)
// ==============================================

export interface TwitterProfile {
  data: {
    id: string;
    name: string;
    username: string;
    profile_image_url?: string;
    public_metrics?: {
      followers_count: number;
      following_count: number;
      tweet_count: number;
    };
  };
}

export interface TwitterTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export const TWITTER_CONFIG: OAuthConfig = {
  authUrl: "https://twitter.com/i/oauth2/authorize",
  tokenUrl: "https://api.twitter.com/2/oauth2/token",
  profileUrl: "https://api.twitter.com/2/users/me",
  scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
};

// ==============================================
// Facebook Types
// ==============================================

export interface FacebookProfile {
  id: string;
  name: string;
  email?: string;
  picture?: {
    data: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export interface FacebookTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const FACEBOOK_CONFIG: OAuthConfig = {
  authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
  tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
  profileUrl: "https://graph.facebook.com/v18.0/me",
  scopes: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "public_profile", "email"],
};

// ==============================================
// Instagram Types (via Facebook Graph API)
// ==============================================

export interface InstagramBusinessAccount {
  id: string;
  username: string;
  name?: string;
  profile_picture_url?: string;
  followers_count?: number;
}

export interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  instagram_business_account?: {
    id: string;
  };
}

export interface FacebookPagesResponse {
  data: FacebookPage[];
}

export const INSTAGRAM_CONFIG: OAuthConfig = {
  authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
  tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
  profileUrl: "https://graph.facebook.com/v18.0/me/accounts",
  scopes: ["instagram_basic", "instagram_content_publish", "pages_show_list", "pages_read_engagement"],
};

// ==============================================
// Pinterest Types
// ==============================================

export interface PinterestProfile {
  username: string;
  account_type?: string;
  profile_image?: string;
  website_url?: string;
}

export interface PinterestTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope: string;
}

export const PINTEREST_CONFIG: OAuthConfig = {
  authUrl: "https://www.pinterest.com/oauth/",
  tokenUrl: "https://api.pinterest.com/v5/oauth/token",
  profileUrl: "https://api.pinterest.com/v5/user_account",
  scopes: ["boards:read", "pins:read", "pins:write", "user_accounts:read"],
};

// ==============================================
// TikTok Types
// ==============================================

export interface TikTokProfile {
  data: {
    user: {
      open_id: string;
      union_id?: string;
      avatar_url?: string;
      display_name: string;
      username?: string;
    };
  };
}

export interface TikTokTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  refresh_expires_in?: number;
  scope: string;
  open_id: string;
}

export const TIKTOK_CONFIG: OAuthConfig = {
  authUrl: "https://www.tiktok.com/v2/auth/authorize/",
  tokenUrl: "https://open.tiktokapis.com/v2/oauth/token/",
  profileUrl: "https://open.tiktokapis.com/v2/user/info/",
  scopes: ["user.info.basic", "video.upload", "video.publish"],
};

// ==============================================
// Helper function to get platform config
// ==============================================

export function getPlatformConfig(platform: SocialPlatform): OAuthConfig {
  switch (platform) {
    case "linkedin":
      return LINKEDIN_CONFIG;
    case "twitter":
      return TWITTER_CONFIG;
    case "facebook":
      return FACEBOOK_CONFIG;
    case "instagram":
      return INSTAGRAM_CONFIG;
    case "pinterest":
      return PINTEREST_CONFIG;
    case "tiktok":
      return TIKTOK_CONFIG;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }
}
