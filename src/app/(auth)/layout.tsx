import { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthLayoutVisuals } from "@/components/auth/auth-layout-visuals";

export const metadata: Metadata = {
  title: {
    default: "Authentication | BrandFlow AI",
    template: "%s | BrandFlow AI",
  },
  description: "Sign in or create your BrandFlow AI account",
};

// Force dynamic rendering for auth pages (requires Clerk)
export const dynamic = "force-dynamic";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#0f172a]">
      {/* Left Side - Premium Visual Panel (Client Component) */}
      <AuthLayoutVisuals />

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #6366f1 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Gradient Accent */}
        <div
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0f172a]">
                BrandFlow<span className="text-[#6366f1]">AI</span>
              </span>
            </Link>
          </div>

          {/* Auth Form Container */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#6366f1]/5 border border-[#e2e8f0]">
            {children}
          </div>

          {/* Bottom Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link href="/privacy" className="text-[#64748b] hover:text-[#6366f1] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-[#e2e8f0]">|</span>
              <Link href="/terms" className="text-[#64748b] hover:text-[#6366f1] transition-colors">
                Terms of Service
              </Link>
              <span className="text-[#e2e8f0]">|</span>
              <Link href="/help" className="text-[#64748b] hover:text-[#6366f1] transition-colors">
                Help
              </Link>
            </div>
            <p className="text-xs text-[#94a3b8]">
              &copy; {new Date().getFullYear()} BrandFlow AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
