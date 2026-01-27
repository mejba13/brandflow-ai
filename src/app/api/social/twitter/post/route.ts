import { NextRequest, NextResponse } from "next/server";

// Twitter API v2 endpoint for posting tweets
const TWITTER_TWEET_URL = "https://api.twitter.com/2/tweets";

interface TweetRequest {
  text: string;
  accessToken: string;
}

interface TweetResponse {
  data: {
    id: string;
    text: string;
  };
}

// POST /api/social/twitter/post
export async function POST(request: NextRequest) {
  try {
    const body: TweetRequest = await request.json();
    const { text, accessToken } = body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Tweet text is required" },
        { status: 400 }
      );
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access token is required. Please connect your Twitter account first." },
        { status: 401 }
      );
    }

    // Check tweet length (Twitter limit is 280 characters)
    if (text.length > 280) {
      return NextResponse.json(
        { error: `Tweet is too long. Maximum is 280 characters, you have ${text.length}.` },
        { status: 400 }
      );
    }

    // Post tweet to Twitter API
    const response = await fetch(TWITTER_TWEET_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Twitter API error:", response.status, errorData);

      // Handle specific Twitter errors
      if (response.status === 401) {
        return NextResponse.json(
          { error: "Twitter token expired. Please reconnect your account." },
          { status: 401 }
        );
      }

      if (response.status === 403) {
        return NextResponse.json(
          { error: "Twitter API access denied. Check your app permissions." },
          { status: 403 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: errorData.detail || errorData.title || "Failed to post tweet" },
        { status: response.status }
      );
    }

    const tweetData: TweetResponse = await response.json();

    return NextResponse.json({
      success: true,
      tweet: {
        id: tweetData.data.id,
        text: tweetData.data.text,
        url: `https://twitter.com/i/web/status/${tweetData.data.id}`,
      },
    });
  } catch (error) {
    console.error("Tweet posting error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while posting the tweet" },
      { status: 500 }
    );
  }
}
