"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-[#e2e8f0]/50 shadow-lg shadow-black/[0.03]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0468D7] via-[#6366f1] to-[#ec4899] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#0468D7] to-[#ec4899] opacity-30 blur-md -z-10" />
              </div>
              <span
                className={cn(
                  "font-bold text-xl tracking-tight transition-colors",
                  scrolled ? "text-[#0f172a]" : "text-white"
                )}
              >
                BrandFlow<span className="text-[#6366f1]">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                    scrolled
                      ? "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                      : "hover:bg-white/10"
                  )}
                  style={scrolled ? {} : { color: "#ffffff", textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={cn(
                    "font-medium rounded-xl transition-all",
                    scrolled
                      ? "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  className={cn(
                    "font-semibold rounded-xl px-6 transition-all shadow-lg",
                    scrolled
                      ? "bg-gradient-to-r from-[#0468D7] to-[#6366f1] hover:from-[#0356b3] hover:to-[#4f46e5] text-white shadow-[#0468D7]/25"
                      : "bg-white text-[#0f172a] hover:bg-white/90 shadow-white/25"
                  )}
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "md:hidden p-2.5 rounded-xl z-10 transition-all",
                scrolled
                  ? "text-[#64748b] hover:bg-[#f1f5f9]"
                  : "text-white hover:bg-white/10"
              )}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-500",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-500 ease-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e8f0]">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0468D7] via-[#6366f1] to-[#ec4899] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-[#0f172a]">
                BrandFlow<span className="text-[#6366f1]">AI</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6">
            <nav className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 text-[#0f172a] font-medium rounded-xl hover:bg-[#f1f5f9] transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4 text-[#94a3b8] -rotate-90" />
                </Link>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="mt-8 pt-6 border-t border-[#e2e8f0] space-y-3">
              <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="secondary"
                  className="w-full justify-center rounded-xl font-medium py-3 border-[#e2e8f0]"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center rounded-xl font-semibold py-3 bg-gradient-to-r from-[#0468D7] to-[#6366f1] hover:from-[#0356b3] hover:to-[#4f46e5] shadow-lg">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 px-4 py-4 bg-[#f8fafc] rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#0f172a]">10,000+</div>
                  <div className="text-[#64748b]">Happy users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
