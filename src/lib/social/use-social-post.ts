"use client";

import { useState } from "react";
import { useSocial } from "./social-context";
import type { SocialPlatform } from "./types";

interface PostResult {
  success: boolean;
  platform: SocialPlatform;
  postId?: string;
  postUrl?: string;
  error?: string;
}

interface UsePostReturn {
  postToTwitter: (text: string) => Promise<PostResult>;
  postToAll: (text: string, platforms: SocialPlatform[]) => Promise<PostResult[]>;
  isPosting: boolean;
  error: string | null;
}

export function useSocialPost(): UsePostReturn {
  const { accounts } = useSocial();
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Post to Twitter/X
  const postToTwitter = async (text: string): Promise<PostResult> => {
    const twitterAccount = accounts.find(
      (a) => a.platform === "twitter" && a.status === "connected"
    );

    if (!twitterAccount) {
      return {
        success: false,
        platform: "twitter",
        error: "No Twitter account connected",
      };
    }

    try {
      setIsPosting(true);
      setError(null);

      const response = await fetch("/api/social/twitter/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          accessToken: twitterAccount.accessToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return {
          success: false,
          platform: "twitter",
          error: data.error,
        };
      }

      return {
        success: true,
        platform: "twitter",
        postId: data.tweet.id,
        postUrl: data.tweet.url,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to post tweet";
      setError(errorMessage);
      return {
        success: false,
        platform: "twitter",
        error: errorMessage,
      };
    } finally {
      setIsPosting(false);
    }
  };

  // Post to multiple platforms
  const postToAll = async (
    text: string,
    platforms: SocialPlatform[]
  ): Promise<PostResult[]> => {
    setIsPosting(true);
    setError(null);

    const results: PostResult[] = [];

    for (const platform of platforms) {
      if (platform === "twitter") {
        const result = await postToTwitter(text);
        results.push(result);
      }
      // Add other platforms here as they're implemented
      // else if (platform === "linkedin") { ... }
      // else if (platform === "facebook") { ... }
    }

    setIsPosting(false);
    return results;
  };

  return {
    postToTwitter,
    postToAll,
    isPosting,
    error,
  };
}
