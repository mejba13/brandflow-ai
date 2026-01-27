"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Twitter, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSocial } from "@/lib/social/social-context";
import { useSocialPost } from "@/lib/social/use-social-post";

export default function TestTweetPage() {
  const { accounts } = useSocial();
  const { postToTwitter, isPosting } = useSocialPost();
  const [tweetText, setTweetText] = React.useState("");
  const [result, setResult] = React.useState<{
    success: boolean;
    message: string;
    url?: string;
  } | null>(null);

  const twitterAccount = accounts.find(
    (a) => a.platform === "twitter" && a.status === "connected"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetText.trim()) return;

    setResult(null);
    const response = await postToTwitter(tweetText);

    if (response.success) {
      setResult({
        success: true,
        message: "Tweet posted successfully!",
        url: response.postUrl,
      });
      setTweetText("");
    } else {
      setResult({
        success: false,
        message: response.error || "Failed to post tweet",
      });
    }
  };

  const charactersLeft = 280 - tweetText.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/accounts"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Accounts
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Twitter className="w-8 h-8 text-[#1DA1F2]" />
            Test Tweet
          </h1>
          <p className="text-slate-600 mt-2">
            Post a test tweet to verify your Twitter connection works.
          </p>
        </div>

        {/* Connection Status */}
        {!twitterAccount ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900">
                  No Twitter Account Connected
                </h3>
                <p className="text-amber-700 mt-1">
                  Please connect your Twitter account first.
                </p>
                <Link href="/dashboard/accounts">
                  <Button className="mt-4" variant="secondary">
                    Connect Twitter Account
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Connected Account Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 mb-6"
            >
              <div className="flex items-center gap-4">
                {twitterAccount.avatarUrl ? (
                  <img
                    src={twitterAccount.avatarUrl}
                    alt={twitterAccount.displayName}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                    <Twitter className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-slate-900">
                    {twitterAccount.displayName}
                  </p>
                  <p className="text-slate-500">@{twitterAccount.username}</p>
                </div>
                <div className="ml-auto">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                    Connected
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tweet Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What's happening?
              </label>
              <textarea
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                placeholder="Write your tweet here..."
                rows={4}
                maxLength={280}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1DA1F2] focus:ring-2 focus:ring-[#1DA1F2]/20 outline-none resize-none text-slate-900"
              />
              <div className="flex items-center justify-between mt-4">
                <span
                  className={`text-sm ${
                    charactersLeft < 20
                      ? "text-red-500"
                      : charactersLeft < 50
                      ? "text-amber-500"
                      : "text-slate-500"
                  }`}
                >
                  {charactersLeft} characters left
                </span>
                <Button
                  type="submit"
                  disabled={isPosting || !tweetText.trim() || charactersLeft < 0}
                  className="bg-[#1DA1F2] hover:bg-[#1a8cd8]"
                >
                  {isPosting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Tweet
                    </>
                  )}
                </Button>
              </div>
            </motion.form>

            {/* Result Message */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 rounded-2xl p-6 ${
                  result.success
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  {result.success ? (
                    <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <h3
                      className={`font-semibold ${
                        result.success ? "text-emerald-900" : "text-red-900"
                      }`}
                    >
                      {result.success ? "Success!" : "Error"}
                    </h3>
                    <p
                      className={`mt-1 ${
                        result.success ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {result.message}
                    </p>
                    {result.url && (
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-3 text-[#1DA1F2] hover:underline"
                      >
                        View Tweet on Twitter →
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
