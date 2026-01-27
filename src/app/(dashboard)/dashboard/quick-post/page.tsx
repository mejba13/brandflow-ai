"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ArrowLeft, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useSocial } from "@/lib/social/social-context";

export default function QuickPostPage() {
  const { accounts } = useSocial();
  const [tweetText, setTweetText] = React.useState("Hello from BrandFlow AI! Testing automated posting. 🚀");
  const [isPosting, setIsPosting] = React.useState(false);
  const [result, setResult] = React.useState<{
    success: boolean;
    message: string;
    url?: string;
  } | null>(null);

  const twitterAccount = accounts.find(
    (a) => a.platform === "twitter" && a.status === "connected"
  );

  const handlePost = async () => {
    if (!twitterAccount || !tweetText.trim()) return;

    setIsPosting(true);
    setResult(null);

    try {
      const response = await fetch("/api/social/twitter/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: tweetText,
          accessToken: twitterAccount.accessToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: "Tweet posted successfully!",
          url: data.tweet?.url,
        });
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to post tweet",
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Network error. Please try again.",
      });
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Quick Post to Twitter</h1>
          <p className="text-slate-600 mb-6">Test posting directly to your connected Twitter account</p>

          {/* Account Status */}
          {twitterAccount ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl mb-6">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="font-medium text-emerald-900">Connected as @{twitterAccount.username}</p>
                <p className="text-sm text-emerald-700">Ready to post</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl mb-6">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-900">No Twitter account connected</p>
                <Link href="/dashboard/accounts" className="text-sm text-amber-700 underline">
                  Connect account
                </Link>
              </div>
            </div>
          )}

          {/* Tweet Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tweet Content
            </label>
            <textarea
              value={tweetText}
              onChange={(e) => setTweetText(e.target.value)}
              rows={4}
              maxLength={280}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
              placeholder="What's happening?"
            />
            <p className="text-sm text-slate-500 mt-2">{280 - tweetText.length} characters remaining</p>
          </div>

          {/* Post Button */}
          <motion.button
            onClick={handlePost}
            disabled={isPosting || !twitterAccount || !tweetText.trim()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white bg-[#1DA1F2] hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isPosting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Posting to Twitter...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Post Tweet Now
              </>
            )}
          </motion.button>

          {/* Result */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl ${
                result.success
                  ? "bg-emerald-50 border border-emerald-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                )}
                <div>
                  <p className={`font-medium ${result.success ? "text-emerald-900" : "text-red-900"}`}>
                    {result.message}
                  </p>
                  {result.url && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1DA1F2] hover:underline mt-2 inline-block"
                    >
                      View Tweet on Twitter →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
