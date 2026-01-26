"use client";

import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
  Image,
  Clock,
  Target,
  Palette,
  Globe,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Users,
  MessageSquare,
  Heart,
  Share2,
  Eye,
  MousePointer,
  Layers,
  Wand2,
} from "lucide-react";

// Platform icons for the transformation visual
const platforms = [
  { name: "LinkedIn", color: "#0A66C2", shortName: "Li" },
  { name: "Twitter", color: "#1DA1F2", shortName: "X" },
  { name: "Facebook", color: "#1877F2", shortName: "Fb" },
  { name: "Instagram", color: "#E4405F", shortName: "Ig" },
  { name: "Pinterest", color: "#BD081C", shortName: "Pi" },
  { name: "TikTok", color: "#000000", shortName: "Tk" },
];

// Animated metrics for the analytics card
const metrics = [
  { label: "Engagement", value: "847%", icon: Heart, trend: "+12.5%" },
  { label: "Reach", value: "2.4M", icon: Eye, trend: "+8.3%" },
  { label: "Clicks", value: "156K", icon: MousePointer, trend: "+24.1%" },
];

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeMetric, setActiveMetric] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Cycle through metrics
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div className="absolute bottom-20 left-[5%] w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
            animation: "pulse-soft 6s ease-in-out infinite",
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 2 === 0 ? "#6366f1" : "#ec4899",
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              opacity: 0.4,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 border border-[#6366f1]/20 text-[#6366f1] text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Features</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          </div>

          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]" style={{ color: "#0f172a" }}>
            Everything You Need to{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dominate Social
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                <path d="M1 5.5C47 2 153 2 199 5.5" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#6366f1"/>
                    <stop offset="0.5" stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="reveal text-xl text-[#64748b] leading-relaxed max-w-2xl mx-auto">
            Built from the ground up with AI at the core—not bolted on as an afterthought.
            Experience the future of content creation and social media automation.
          </p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">

          {/* Feature 1: AI Content Transformation - Large Hero Card */}
          <div className="reveal col-span-12 lg:col-span-8 group">
            <div
              className="relative h-full min-h-[400px] md:min-h-[450px] rounded-[2rem] overflow-hidden border border-[#e2e8f0] bg-white transition-all duration-700 hover:border-[#6366f1]/30 hover:shadow-2xl hover:shadow-[#6366f1]/10"
            >
              {/* Animated Gradient Background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.05) 100%)",
                }}
              />

              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      }}
                    >
                      <Wand2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4">
                  AI Content Transformation
                </h3>
                <p className="text-lg text-[#64748b] mb-8 max-w-xl">
                  Transform a single piece of content into platform-perfect posts. Our AI adapts your message, tone, and format for maximum engagement on each platform.
                </p>

                {/* Visual Demo: Content Transformation Animation */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full max-w-lg">
                    {/* Source Content */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-40 rounded-xl bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-[#e2e8f0] p-3 shadow-lg"
                      style={{ animation: "float 4s ease-in-out infinite" }}
                    >
                      <div className="w-full h-2 rounded bg-[#6366f1]/30 mb-2" />
                      <div className="w-3/4 h-2 rounded bg-[#94a3b8]/30 mb-2" />
                      <div className="w-full h-2 rounded bg-[#94a3b8]/30 mb-2" />
                      <div className="w-1/2 h-2 rounded bg-[#94a3b8]/30" />
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-medium text-[#64748b]">
                        Your Content
                      </div>
                    </div>

                    {/* AI Processing Indicator */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                          animation: "pulse-soft 2s ease-in-out infinite",
                        }}
                      >
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      {/* Animated Rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-[#6366f1]/30 animate-ping" />
                      <div className="absolute -inset-2 rounded-full border border-[#6366f1]/20 animate-ping" style={{ animationDelay: "0.5s" }} />
                    </div>

                    {/* Platform Outputs */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                      {platforms.map((platform, index) => (
                        <div
                          key={platform.name}
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg transform transition-all duration-500 hover:scale-110"
                          style={{
                            backgroundColor: platform.color,
                            animation: `slideInRight 0.5s ease-out forwards`,
                            animationDelay: `${index * 0.1}s`,
                            opacity: isVisible ? 1 : 0,
                          }}
                        >
                          {platform.shortName}
                        </div>
                      ))}
                    </div>

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                        </linearGradient>
                      </defs>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                          key={i}
                          x1="35%"
                          y1="50%"
                          x2="75%"
                          y2={`${20 + i * 12}%`}
                          stroke="url(#lineGradient)"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                          className="animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Platform Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {platforms.map((platform) => (
                    <span
                      key={platform.name}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#e2e8f0] text-sm font-medium text-[#475569] transition-all duration-300 hover:border-[#6366f1]/30 hover:shadow-md cursor-pointer"
                    >
                      {platform.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: AI Image Generation - Vertical Card */}
          <div className="reveal col-span-12 md:col-span-6 lg:col-span-4 group">
            <div className="relative h-full min-h-[400px] md:min-h-[450px] rounded-[2rem] overflow-hidden border border-[#e2e8f0] bg-white transition-all duration-700 hover:border-[#ec4899]/30 hover:shadow-2xl hover:shadow-[#ec4899]/10">
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(244, 63, 94, 0.08) 100%)",
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                    }}
                  >
                    <Image className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#ec4899] to-[#f43f5e] opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                </div>

                <h3 className="text-xl font-bold text-[#0f172a] mb-3">
                  AI Image Generation
                </h3>
                <p className="text-[#64748b] mb-6">
                  Generate stunning, brand-consistent visuals tailored to each platform&apos;s optimal dimensions automatically.
                </p>

                {/* Visual Demo: Image Generation */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative w-full aspect-square max-w-[200px]">
                    {/* Generated Images Stack */}
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fce7f3] to-[#fdf2f8] border border-[#fbcfe8] transform rotate-6 transition-transform group-hover:rotate-12"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f5d0fe] to-[#fae8ff] border border-[#f0abfc] transform rotate-3 transition-transform group-hover:rotate-6"
                    />
                    <div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ec4899]/20 to-[#f43f5e]/20 border border-[#ec4899]/30 flex items-center justify-center transition-transform group-hover:rotate-0"
                    >
                      <div className="text-center">
                        <Layers className="w-10 h-10 text-[#ec4899] mx-auto mb-2" />
                        <span className="text-xs font-medium text-[#be185d]">AI Generated</span>
                      </div>
                    </div>

                    {/* Sparkle Effects */}
                    <Sparkles
                      className="absolute -top-2 -right-2 w-6 h-6 text-[#fbbf24]"
                      style={{ animation: "pulse-soft 1.5s ease-in-out infinite" }}
                    />
                    <Sparkles
                      className="absolute -bottom-1 -left-1 w-4 h-4 text-[#ec4899]"
                      style={{ animation: "pulse-soft 2s ease-in-out infinite", animationDelay: "0.5s" }}
                    />
                  </div>
                </div>

                {/* Dimension Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2.5 py-1 rounded-lg bg-[#fce7f3] text-[#be185d] text-xs font-medium">1:1 Square</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#fce7f3] text-[#be185d] text-xs font-medium">16:9 Wide</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#fce7f3] text-[#be185d] text-xs font-medium">9:16 Story</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Smart Scheduling - Medium Card */}
          <div className="reveal col-span-12 md:col-span-6 lg:col-span-4 group">
            <div className="relative h-full min-h-[280px] rounded-[2rem] overflow-hidden border border-[#e2e8f0] bg-white transition-all duration-700 hover:border-[#f59e0b]/30 hover:shadow-2xl hover:shadow-[#f59e0b]/10">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(249, 115, 22, 0.08) 100%)",
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                      }}
                    >
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fef3c7] text-[#d97706] text-xs font-semibold">
                    <Zap className="w-3 h-3" />
                    AI-Powered
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#0f172a] mb-2">Smart Scheduling</h3>
                <p className="text-[#64748b] text-sm mb-4">
                  AI analyzes your audience to find the perfect posting times for maximum engagement.
                </p>

                {/* Mini Calendar Visual */}
                <div className="flex-1 flex items-end">
                  <div className="w-full grid grid-cols-7 gap-1">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] text-[#94a3b8] font-medium">{day}</span>
                        <div
                          className={`mt-1 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                            [1, 3, 4].includes(i)
                              ? "bg-gradient-to-b from-[#f59e0b] to-[#f97316] text-white shadow-md"
                              : "bg-[#f8fafc] text-[#94a3b8]"
                          }`}
                          style={{
                            animation: [1, 3, 4].includes(i) ? "pulse-soft 2s ease-in-out infinite" : "none",
                            animationDelay: `${i * 0.2}s`,
                          }}
                        >
                          {i + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Analytics & Insights - Large Card */}
          <div className="reveal col-span-12 md:col-span-6 lg:col-span-5 group">
            <div className="relative h-full min-h-[280px] rounded-[2rem] overflow-hidden border border-[#e2e8f0] bg-white transition-all duration-700 hover:border-[#06b6d4]/30 hover:shadow-2xl hover:shadow-[#06b6d4]/10">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(14, 165, 233, 0.08) 100%)",
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500"
                      style={{
                        background: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
                      }}
                    >
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a]">Analytics & Insights</h3>
                    <p className="text-[#64748b] text-sm">Real-time performance tracking</p>
                  </div>
                </div>

                {/* Animated Metrics */}
                <div className="flex-1 flex items-center">
                  <div className="w-full grid grid-cols-3 gap-3">
                    {metrics.map((metric, index) => {
                      const Icon = metric.icon;
                      const isActive = index === activeMetric;
                      return (
                        <div
                          key={metric.label}
                          className={`relative p-4 rounded-2xl transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-[#06b6d4]/10 to-[#0ea5e9]/10 border-2 border-[#06b6d4]/30 scale-105"
                              : "bg-[#f8fafc] border border-transparent"
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-2 ${isActive ? "text-[#06b6d4]" : "text-[#94a3b8]"}`} />
                          <div className={`text-2xl font-bold ${isActive ? "text-[#0f172a]" : "text-[#64748b]"}`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-[#94a3b8]">{metric.label}</div>
                          {isActive && (
                            <div className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-semibold text-[#10b981]">
                              <TrendingUp className="w-3 h-3" />
                              {metric.trend}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5: Audience Targeting - Compact Card */}
          <div className="reveal col-span-12 md:col-span-6 lg:col-span-3 group">
            <div className="relative h-full min-h-[280px] rounded-[2rem] overflow-hidden border border-[#e2e8f0] bg-white transition-all duration-700 hover:border-[#10b981]/30 hover:shadow-2xl hover:shadow-[#10b981]/10">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.08) 100%)",
                }}
              />

              <div className="relative z-10 p-6 h-full flex flex-col">
                <div className="relative mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500"
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#0f172a] mb-2">Audience Targeting</h3>
                <p className="text-[#64748b] text-sm mb-4">
                  AI-driven insights to reach the right people.
                </p>

                {/* Audience Segments Visual */}
                <div className="flex-1 flex items-end">
                  <div className="w-full space-y-2">
                    {[
                      { label: "Professionals", pct: 85 },
                      { label: "Creators", pct: 72 },
                      { label: "Entrepreneurs", pct: 64 },
                    ].map((segment, i) => (
                      <div key={segment.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#64748b]">{segment.label}</span>
                          <span className="font-semibold text-[#10b981]">{segment.pct}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-[#f0fdf4] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: isVisible ? `${segment.pct}%` : "0%",
                              background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                              transitionDelay: `${i * 200}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Additional Features Strip */}
        <div className="reveal mt-16 md:mt-20">
          <div className="text-center mb-10">
            <span className="text-sm font-semibold text-[#6366f1] uppercase tracking-wider">And Much More</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {[
              { icon: Palette, label: "Brand Kit", desc: "Consistent voice" },
              { icon: Globe, label: "Multi-Language", desc: "Global reach" },
              { icon: Zap, label: "One-Click Publish", desc: "Instant sharing" },
              { icon: Calendar, label: "Content Calendar", desc: "Visual planning" },
              { icon: Lightbulb, label: "AI Suggestions", desc: "Smart ideas" },
              { icon: MessageSquare, label: "Auto-Replies", desc: "Engage faster" },
              { icon: Users, label: "Team Collab", desc: "Work together" },
              { icon: Share2, label: "Cross-Post", desc: "Share everywhere" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-lg hover:shadow-[#6366f1]/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1]/10 to-[#ec4899]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-[#6366f1]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a] text-sm">{feature.label}</div>
                    <div className="text-xs text-[#94a3b8]">{feature.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-16 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
          >
            <span>Explore All Features</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
