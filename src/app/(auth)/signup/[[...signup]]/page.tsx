"use client";

import { Rocket, CheckCircle2, Gift, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Check if Clerk is configured
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey.startsWith("pk_");

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If Clerk is configured, use it
  if (isClerkConfigured) {
    const ClerkSignUp = require("@clerk/nextjs").SignUp;
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
            }}
          >
            <Rocket className="w-7 h-7 text-[#10b981]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a]">Start your free trial</h2>
          <p className="text-[#64748b] mt-2">No credit card required. Cancel anytime.</p>
        </div>

        {/* Trial Benefits */}
        <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#6366f1]/10 border border-[#10b981]/20">
          <Gift className="w-5 h-5 text-[#10b981]" />
          <span className="text-sm font-medium text-[#0f172a]">14-day free trial with all Pro features</span>
        </div>

        {/* Clerk SignUp */}
        <ClerkSignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 w-full bg-transparent",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#6366f1]/30 rounded-xl py-3.5 transition-all duration-300",
              socialButtonsBlockButtonText: "font-medium text-[#0f172a]",
              socialButtonsProviderIcon: "w-5 h-5",
              dividerLine: "bg-[#e2e8f0]",
              dividerText: "text-[#94a3b8] text-sm",
              formFieldLabel: "text-[#475569] font-medium text-sm",
              formFieldInput:
                "border border-[#e2e8f0] rounded-xl focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 py-3 px-4 transition-all duration-300",
              formButtonPrimary:
                "bg-gradient-to-r from-[#10b981] to-[#6366f1] hover:from-[#059669] hover:to-[#4f46e5] text-white font-semibold py-3.5 rounded-xl w-full transition-all duration-300 shadow-lg shadow-[#10b981]/25",
              footerAction: "justify-center pt-4",
              footerActionText: "text-[#64748b]",
              footerActionLink: "text-[#6366f1] hover:text-[#4f46e5] font-semibold transition-colors",
              formFieldSuccessText: "text-[#10b981]",
              formFieldErrorText: "text-[#ef4444]",
              alert: "rounded-xl border",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "blockButton",
            },
          }}
          routing="path"
          path="/signup"
          signInUrl="/login"
          forceRedirectUrl="/dashboard"
        />

        {/* What you get */}
        <div className="pt-4 border-t border-[#e2e8f0]">
          <p className="text-xs text-[#64748b] text-center mb-3">What&apos;s included in your trial:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {["Unlimited AI content", "6 platform publishing", "Smart scheduling", "Analytics dashboard"].map(
              (feature) => (
                <div key={feature} className="flex items-center gap-1.5 text-[#475569]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>{feature}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Terms */}
        <p className="text-xs text-center text-[#94a3b8]">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-[#6366f1] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#6366f1] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    );
  }

  // Fallback UI when Clerk is not configured
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
          }}
        >
          <Rocket className="w-7 h-7 text-[#10b981]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f172a]">Start your free trial</h2>
        <p className="text-[#64748b] mt-2">No credit card required. Cancel anytime.</p>
      </div>

      {/* Trial Benefits */}
      <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-xl bg-gradient-to-r from-[#10b981]/10 to-[#6366f1]/10 border border-[#10b981]/20">
        <Gift className="w-5 h-5 text-[#10b981]" />
        <span className="text-sm font-medium text-[#0f172a]">14-day free trial with all Pro features</span>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#6366f1]/30 transition-all duration-300">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span className="font-medium text-[#0f172a]">Continue with Google</span>
        </button>

        <button className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#6366f1]/30 transition-all duration-300">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="font-medium text-[#0f172a]">Continue with GitHub</span>
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-[#e2e8f0]" />
        <span className="text-sm text-[#94a3b8]">or continue with email</span>
        <div className="flex-1 h-px bg-[#e2e8f0]" />
      </div>

      {/* Email Form */}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#475569] mb-2">Full name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e2e8f0] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#475569] mb-2">Email address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e2e8f0] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#475569] mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e2e8f0] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #6366f1 100%)",
            boxShadow: "0 10px 30px -10px rgba(16, 185, 129, 0.5)",
          }}
        >
          <span>Create Account</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      {/* What you get */}
      <div className="pt-4 border-t border-[#e2e8f0]">
        <p className="text-xs text-[#64748b] text-center mb-3">What&apos;s included in your trial:</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["Unlimited AI content", "6 platform publishing", "Smart scheduling", "Analytics dashboard"].map(
            (feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-[#475569]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{feature}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-[#64748b]">
        Already have an account?{" "}
        <Link href="/login" className="text-[#6366f1] hover:text-[#4f46e5] font-semibold">
          Sign in
        </Link>
      </p>

      {/* Terms */}
      <p className="text-xs text-center text-[#94a3b8]">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-[#6366f1] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#6366f1] hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
