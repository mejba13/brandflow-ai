"use client";

import * as React from "react";
import {
  getStoredAccounts,
  addAccount,
  removeAccount as removeStoredAccount,
  generateOAuthState,
  setOAuthState,
  getOAuthState,
  removeOAuthState,
  generateCodeVerifier,
  generateCodeChallenge,
} from "./storage";
import type { SocialAccount, SocialPlatform } from "./types";

interface SocialContextType {
  accounts: SocialAccount[];
  isLoading: boolean;
  connectAccount: (platform: SocialPlatform) => void;
  disconnectAccount: (accountId: string) => Promise<void>;
  refreshAccount: (accountId: string) => Promise<void>;
  processOAuthCallback: (params: URLSearchParams) => Promise<{ success: boolean; error?: string }>;
}

const SocialContext = React.createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = React.useState<SocialAccount[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load accounts on mount
  React.useEffect(() => {
    const stored = getStoredAccounts();
    setAccounts(stored);
    setIsLoading(false);
  }, []);

  // Connect to a social platform
  const connectAccount = React.useCallback(async (platform: SocialPlatform) => {
    // Generate state for CSRF protection
    const state = generateOAuthState();

    // For Twitter, we need PKCE support
    if (platform === "twitter") {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      // Store state with platform info and code verifier
      setOAuthState(state, { platform, returnUrl: window.location.href, codeVerifier });

      // Redirect to OAuth endpoint with code_challenge
      const oauthUrl = `/api/auth/${platform}?state=${state}&code_challenge=${codeChallenge}`;
      window.location.href = oauthUrl;
      return;
    }

    // Store state with platform info
    setOAuthState(state, { platform, returnUrl: window.location.href });

    // Redirect to OAuth endpoint
    const oauthUrl = `/api/auth/${platform}?state=${state}`;
    window.location.href = oauthUrl;
  }, []);

  // Disconnect an account
  const disconnectAccount = React.useCallback(async (accountId: string) => {
    const updated = removeStoredAccount(accountId);
    setAccounts(updated);
  }, []);

  // Refresh an account (re-authenticate)
  const refreshAccount = React.useCallback(async (accountId: string) => {
    const account = accounts.find((a) => a.id === accountId);
    if (account) {
      // Re-initiate OAuth flow for the platform
      connectAccount(account.platform);
    }
  }, [accounts, connectAccount]);

  // Process OAuth callback data
  const processOAuthCallback = React.useCallback(
    async (params: URLSearchParams): Promise<{ success: boolean; error?: string }> => {
      // Check for errors
      const error = params.get("error");
      if (error) {
        return { success: false, error };
      }

      const data = params.get("data");

      // Check for platform connections
      const platforms: { param: string; platform: SocialPlatform; profileUrlFn: (id: string, username?: string) => string }[] = [
        {
          param: "linkedin_connected",
          platform: "linkedin",
          profileUrlFn: (id) => `https://www.linkedin.com/in/${id}`,
        },
        {
          param: "twitter_connected",
          platform: "twitter",
          profileUrlFn: (_, username) => `https://twitter.com/${username}`,
        },
        {
          param: "facebook_connected",
          platform: "facebook",
          profileUrlFn: (id) => `https://facebook.com/${id}`,
        },
        {
          param: "instagram_connected",
          platform: "instagram",
          profileUrlFn: (_, username) => `https://instagram.com/${username}`,
        },
        {
          param: "pinterest_connected",
          platform: "pinterest",
          profileUrlFn: (_, username) => `https://pinterest.com/${username}`,
        },
        {
          param: "tiktok_connected",
          platform: "tiktok",
          profileUrlFn: (_, username) => `https://tiktok.com/@${username}`,
        },
      ];

      for (const { param, platform, profileUrlFn } of platforms) {
        const isConnected = params.get(param);

        if (isConnected && data) {
          try {
            // Decode the account data
            const decoded = JSON.parse(
              Buffer.from(decodeURIComponent(data), "base64").toString("utf-8")
            );

            // Validate state
            const storedState = getOAuthState(decoded.state);
            if (!storedState) {
              return { success: false, error: "Invalid OAuth state. Please try again." };
            }

            // Remove used state
            removeOAuthState(decoded.state);

            // Create account object
            const now = new Date().toISOString();
            const newAccount: SocialAccount = {
              id: `${platform}_${decoded.platformAccountId}_${Date.now()}`,
              platform,
              platformAccountId: decoded.platformAccountId,
              displayName: decoded.displayName,
              username: decoded.username || decoded.email || decoded.displayName,
              email: decoded.email,
              avatarUrl: decoded.avatarUrl,
              profileUrl: profileUrlFn(decoded.platformAccountId, decoded.username),
              accessToken: decoded.accessToken,
              refreshToken: decoded.refreshToken,
              tokenExpiresAt: decoded.expiresIn
                ? new Date(Date.now() + decoded.expiresIn * 1000).toISOString()
                : undefined,
              scopes: decoded.scopes || [],
              status: "connected",
              followers: decoded.followers || "—",
              lastSync: "Just now",
              createdAt: now,
              updatedAt: now,
            };

            // Add to storage
            const updated = addAccount(newAccount);
            setAccounts(updated);

            return { success: true };
          } catch (err) {
            console.error("Failed to process OAuth callback:", err);
            return { success: false, error: "Failed to process connection data" };
          }
        }
      }

      return { success: false, error: "No connection data found" };
    },
    []
  );

  return (
    <SocialContext.Provider
      value={{
        accounts,
        isLoading,
        connectAccount,
        disconnectAccount,
        refreshAccount,
        processOAuthCallback,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

export function useSocial() {
  const context = React.useContext(SocialContext);
  if (context === undefined) {
    throw new Error("useSocial must be used within a SocialProvider");
  }
  return context;
}
