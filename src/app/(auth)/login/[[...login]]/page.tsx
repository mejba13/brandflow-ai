"use client";

import { Sparkles, Mail, Lock, ArrowRight, Loader2, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";

// Check if Clerk is configured
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey.startsWith("pk_");

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated, isLoading, demoCredentials } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred");
      setIsSubmitting(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail(demoCredentials.email);
    setPassword("demo123");
  };

  // If Clerk is configured, try to use it
  if (isClerkConfigured) {
    // Dynamically import and render Clerk SignIn
    const ClerkSignIn = require("@clerk/nextjs").SignIn;
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
            }}
          >
            <Sparkles className="w-7 h-7 text-[#6366f1]" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a]">Welcome back</h2>
          <p className="text-[#64748b] mt-2">Sign in to continue to BrandFlow AI</p>
        </div>

        {/* Clerk SignIn */}
        <ClerkSignIn
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
                "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] text-white font-semibold py-3.5 rounded-xl w-full transition-all duration-300 shadow-lg shadow-[#6366f1]/25",
              footerAction: "justify-center pt-4",
              footerActionText: "text-[#64748b]",
              footerActionLink: "text-[#6366f1] hover:text-[#4f46e5] font-semibold transition-colors",
              identityPreview: "rounded-xl border border-[#e2e8f0] bg-[#f8fafc]",
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
          path="/login"
          signUpUrl="/signup"
          forceRedirectUrl="/dashboard"
        />
      </div>
    );
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-[#6366f1] animate-spin" />
      </div>
    );
  }

  // Fallback UI when Clerk is not configured (custom auth)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
          }}
        >
          <Sparkles className="w-7 h-7 text-[#6366f1]" />
        </div>
        <h2 className="text-2xl font-bold text-[#0f172a]">Welcome back</h2>
        <p className="text-[#64748b] mt-2">Sign in to continue to BrandFlow AI</p>
      </div>

      {/* Demo Credentials Banner */}
      <div className="relative overflow-hidden rounded-xl border border-[#6366f1]/20 bg-gradient-to-r from-[#6366f1]/5 to-[#8b5cf6]/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#6366f1]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0f172a]">Demo Mode</p>
            <p className="text-xs text-[#64748b] mt-0.5">
              Use demo credentials to explore the dashboard
            </p>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-2 text-xs font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
            >
              Fill demo credentials →
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#6366f1]/30 transition-all duration-300 opacity-50 cursor-not-allowed"
          disabled
        >
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

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#6366f1]/30 transition-all duration-300 opacity-50 cursor-not-allowed"
          disabled
        >
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#475569] mb-2">Email address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
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
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e2e8f0] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 outline-none transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#e2e8f0] text-[#6366f1] focus:ring-[#6366f1]" />
            <span className="text-[#64748b]">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-[#6366f1] hover:text-[#4f46e5] font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.5)",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-[#64748b]">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-[#6366f1] hover:text-[#4f46e5] font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}
