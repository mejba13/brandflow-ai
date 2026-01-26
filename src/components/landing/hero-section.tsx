"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Sparkles, Zap, TrendingUp, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformIcons } from "@/components/icons/platform-icons";

const platforms = [
  { name: "LinkedIn", icon: PlatformIcons.LinkedIn, color: "#0A66C2" },
  { name: "Twitter/X", icon: PlatformIcons.Twitter, color: "#000000" },
  { name: "Facebook", icon: PlatformIcons.Facebook, color: "#1877F2" },
  { name: "Instagram", icon: PlatformIcons.Instagram, color: "#E4405F" },
  { name: "Pinterest", icon: PlatformIcons.Pinterest, color: "#E60023" },
  { name: "TikTok", icon: PlatformIcons.TikTok, color: "#000000" },
];

const stats = [
  { value: "10K+", label: "Active Users", icon: Users },
  { value: "2M+", label: "Posts Created", icon: TrendingUp },
  { value: "98%", label: "Time Saved", icon: Zap },
];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      return () => hero.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh - More vibrant */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#6366f1]/30 rounded-full blur-[150px] animate-pulse-soft" />
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#ec4899]/25 rounded-full blur-[120px] animate-pulse-soft delay-700" />
          <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[#06b6d4]/20 rounded-full blur-[100px] animate-pulse-soft delay-300" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-[#6366f1] rounded-full animate-float opacity-80" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-[#ec4899] rounded-full animate-float delay-200 opacity-80" />
        <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-[#06b6d4] rounded-full animate-float delay-500 opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#f97316] rounded-full animate-float delay-700 opacity-70" />

        {/* Cursor Glow Effect */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-10 animate-fade-in-down shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
            </span>
            AI-Powered Social Media Automation
            <Sparkles className="w-4 h-4 text-[#fbbf24]" />
          </div>

          {/* Main Headline - MUCH BIGGER & WHITE */}
          <h1 className="mb-8">
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold leading-[1.1] tracking-tight animate-fade-in-up"
              style={{
                color: "#ffffff",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)"
              }}
            >
              Your Brand.
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold leading-[1.1] tracking-tight animate-fade-in-up delay-100 mt-2"
              style={{
                color: "#ffffff",
                textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)"
              }}
            >
              Every Platform.
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-bold leading-[1.1] tracking-tight animate-fade-in-up delay-200 mt-2"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                animation: "gradient 4s ease infinite",
                textShadow: "none",
                filter: "drop-shadow(0 4px 30px rgba(99, 102, 241, 0.4))"
              }}
            >
              Zero Effort.
            </span>
          </h1>

          {/* Subtitle - Larger and more visible */}
          <p className="text-xl md:text-2xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-12 animate-fade-in-up delay-300 leading-relaxed font-medium">
            Transform a single piece of content into{" "}
            <span className="text-white font-semibold">6 platform-perfect posts</span> with
            AI-generated images, optimal scheduling, and lead tracking.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up delay-400">
            <Link href="/signup">
              <Button
                size="lg"
                className="relative overflow-hidden bg-white text-[#0f172a] hover:bg-white/95 font-bold px-10 py-7 text-lg rounded-2xl group min-w-[240px] shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold px-10 py-7 text-lg rounded-2xl group min-w-[240px] transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col items-center gap-4 mb-12 animate-fade-in-up delay-500">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </span>
              <span className="font-semibold text-white">4.9</span>
              <span>•</span>
              <span>Trusted by <span className="text-white font-semibold">300,000+</span> Users</span>
            </div>
            <div className="flex -space-x-2">
              {["SC", "MJ", "ER", "DP", "AK"].map((initials, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] border-2 border-[#0f172a] flex items-center justify-center text-white text-xs font-bold shadow-lg"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    zIndex: 5 - i
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
          </div>

          {/* Platform Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up delay-600">
            <span className="text-sm text-white/60 mr-2 font-medium">Works with:</span>
            {platforms.map((platform, index) => (
              <div
                key={platform.name}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/40 hover:bg-white/15 transition-all cursor-pointer"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <platform.icon className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors hidden sm:inline">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Preview - Floating Dashboard */}
        <div className="mt-20 md:mt-28 relative animate-fade-in-up delay-700">
          {/* Glow Effect Behind Dashboard */}
          <div className="absolute inset-0 -top-20 bg-gradient-to-t from-transparent via-[#6366f1]/15 to-transparent blur-3xl" />

          {/* Dashboard Mockup */}
          <div className="relative mx-auto max-w-5xl">
            <div className="bg-white/10 backdrop-blur-xl rounded-[32px] p-2 md:p-3 shadow-2xl border border-white/20 animate-float-slow">
              <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#0a0f1a] to-[#111827] border border-white/10">
                {/* Browser Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 border border-white/10">
                      <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                      <span className="text-xs text-white/50 font-mono">app.brandflow.ai/dashboard</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="aspect-[16/9] p-4 md:p-6">
                  <div className="h-full flex gap-4">
                    {/* Sidebar */}
                    <div className="hidden md:flex flex-col w-48 space-y-2">
                      <div className="h-10 bg-gradient-to-r from-[#6366f1]/40 to-[#6366f1]/20 rounded-xl border border-[#6366f1]/40" />
                      <div className="h-10 bg-white/10 rounded-xl hover:bg-white/15 transition-colors" />
                      <div className="h-10 bg-white/10 rounded-xl" />
                      <div className="h-10 bg-white/10 rounded-xl" />
                      <div className="flex-1" />
                      <div className="h-10 bg-white/10 rounded-xl" />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-4">
                      {/* Stats Cards - Bento Style */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#6366f1]/30 to-[#6366f1]/10 border border-[#6366f1]/30">
                          <div className="text-xs text-white/60 mb-1">Total Reach</div>
                          <div className="text-xl font-bold text-white">2.4M</div>
                          <div className="text-xs text-[#10b981] mt-1 font-medium">+24% this week</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#10b981]/30 to-[#10b981]/10 border border-[#10b981]/30">
                          <div className="text-xs text-white/60 mb-1">Engagement</div>
                          <div className="text-xl font-bold text-white">18.2%</div>
                          <div className="text-xs text-[#10b981] mt-1 font-medium">+12% this week</div>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f59e0b]/30 to-[#f59e0b]/10 border border-[#f59e0b]/30">
                          <div className="text-xs text-white/60 mb-1">Posts Scheduled</div>
                          <div className="text-xl font-bold text-white">47</div>
                          <div className="text-xs text-[#f59e0b] mt-1 font-medium">Next: 2h</div>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="h-32 rounded-2xl bg-white/10 border border-white/10 p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899]" />
                          <div className="flex-1">
                            <div className="h-3 w-32 bg-white/30 rounded mb-1" />
                            <div className="h-2 w-20 bg-white/15 rounded" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 w-full bg-white/15 rounded" />
                          <div className="h-2 w-3/4 bg-white/15 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 md:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 110C96 100 192 80 288 70C384 60 480 60 576 65C672 70 768 80 864 85C960 90 1056 90 1152 85C1248 80 1344 70 1392 65L1440 60V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
