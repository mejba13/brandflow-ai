"use client";

import Link from "next/link";
import { Sparkles, ArrowUpRight, Heart } from "lucide-react";
import { PlatformIcons } from "@/components/icons/platform-icons";

type FooterLink = {
  label: string;
  href: string;
  badge?: string;
};

const footerLinks: Record<string, FooterLink[]> = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "API", href: "/api-docs" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers", badge: "Hiring" },
    { label: "Press Kit", href: "/press" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "Help Center", href: "/help" },
    { label: "Guides", href: "/guides" },
    { label: "Templates", href: "/templates" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
    { label: "Security", href: "/security" },
  ],
};

const socialLinks = [
  { icon: PlatformIcons.Twitter, href: "https://twitter.com/brandflowai", label: "Twitter" },
  { icon: PlatformIcons.LinkedIn, href: "https://linkedin.com/company/brandflowai", label: "LinkedIn" },
  { icon: PlatformIcons.Facebook, href: "https://facebook.com/brandflowai", label: "Facebook" },
  { icon: PlatformIcons.Instagram, href: "https://instagram.com/brandflowai", label: "Instagram" },
];

export function LandingFooter() {
  return (
    <footer className="relative bg-[#0f172a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#6366f1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0468D7] via-[#6366f1] to-[#ec4899] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">
                  BrandFlow<span className="text-[#6366f1]">AI</span>
                </span>
              </Link>

              <p className="mb-6 max-w-xs leading-relaxed" style={{ color: "#cbd5e1" }}>
                Transform your content into platform-perfect posts with AI-powered
                automation. Your brand, every platform, zero effort.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 hover:bg-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
                    style={{ color: "#ffffff" }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-4" style={{ color: "#ffffff" }}>{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 hover:text-white transition-colors"
                        style={{ color: "#cbd5e1" }}
                      >
                        {link.label}
                        {link.badge && (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-[#10b981]/20 text-[#10b981]">
                            {link.badge}
                          </span>
                        )}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-1" style={{ color: "#ffffff" }}>Stay up to date</h4>
              <p className="text-sm" style={{ color: "#cbd5e1" }}>
                Get the latest news, tips, and product updates delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-[#64748b] focus:outline-none focus:border-[#6366f1] transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0468D7] to-[#6366f1] text-white font-semibold hover:from-[#0356b3] hover:to-[#4f46e5] transition-all shadow-lg shadow-[#6366f1]/25"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              &copy; {new Date().getFullYear()} BrandFlow AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm" style={{ color: "#94a3b8" }}>
              <span className="flex items-center gap-1.5">
                Made with <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899]" /> for marketers
              </span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
