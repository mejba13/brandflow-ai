"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Star,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  Shield,
} from "lucide-react";

// Platform data for animated visualization with SVG icons
const platforms = [
  {
    name: "LinkedIn",
    color: "#0A66C2",
    x: 20,
    y: 15,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  },
  {
    name: "Twitter",
    color: "#000000",
    x: 75,
    y: 20,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    color: "#E4405F",
    x: 15,
    y: 70,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: "Facebook",
    color: "#1877F2",
    x: 80,
    y: 65,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: "TikTok",
    color: "#000000",
    x: 45,
    y: 85,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    )
  },
  {
    name: "Pinterest",
    color: "#BD081C",
    x: 85,
    y: 40,
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
        <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
      </svg>
    )
  },
];

// Testimonial for social proof
const testimonial = {
  quote: "BrandFlow AI transformed our content strategy. We now reach 10x more people with half the effort.",
  author: "Sarah Chen",
  role: "Marketing Director",
  company: "TechStart Inc.",
};

// Stats
const stats = [
  { value: "10K+", label: "Active Users", icon: Users },
  { value: "2M+", label: "Posts Created", icon: Zap },
  { value: "312%", label: "Avg. Growth", icon: TrendingUp },
];

// Features list
const features = [
  "AI-powered content transformation",
  "6 platforms, one click",
  "Smart scheduling optimization",
  "Brand voice consistency",
];

export function AuthLayoutVisuals() {
  const [mounted, setMounted] = useState(false);
  const [activeOrb, setActiveOrb] = useState(0);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveOrb((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e1b4b 100%)",
        }}
      />

      {/* Animated Mesh Gradient */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)",
            animation: "float 15s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
            animation: "pulse-soft 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating Platform Orbs with Logos */}
      {mounted && platforms.map((platform, index) => (
        <div
          key={platform.name}
          className="absolute transition-all duration-1000"
          style={{
            left: `${platform.x}%`,
            top: `${platform.y}%`,
            transform: `translate(-50%, -50%) scale(${activeOrb === index ? 1.15 : 0.9})`,
            zIndex: activeOrb === index ? 10 : 1,
          }}
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-xl transition-all duration-500 ${
              activeOrb === index ? "ring-2 ring-white/30" : ""
            }`}
            style={{
              backgroundColor: platform.color,
              animation: `float ${4 + index}s ease-in-out infinite`,
              animationDelay: `${index * 0.5}s`,
              boxShadow: activeOrb === index
                ? `0 0 30px ${platform.color}60`
                : `0 8px 24px rgba(0,0,0,0.25)`,
            }}
          >
            <div className="w-5 h-5 [&_svg]:w-5 [&_svg]:h-5">{platform.icon}</div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-8 xl:p-10 w-full">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#ec4899] opacity-30 blur-md -z-10" />
          </div>
          <span className="text-xl font-bold text-white">
            BrandFlow<span className="text-[#a855f7]">AI</span>
          </span>
        </Link>

        {/* Main Content */}
        <div className="space-y-6 max-w-md">
          {/* Headline */}
          <div>
            <h1
              className="text-xl xl:text-2xl font-bold leading-[1.3] mb-2"
              style={{ color: "#ffffff" }}
            >
              One Post,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Every Platform
              </span>
            </h1>
            <p className="text-sm text-white/60 leading-relaxed">
              AI-powered content that adapts to each social network.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-2.5">
            {features.map((feature, index) => (
              <div
                key={feature}
                className="flex items-center gap-2.5"
                style={{
                  animation: mounted ? "fade-in-up 0.5s ease-out forwards" : "none",
                  animationDelay: `${index * 0.1}s`,
                  opacity: mounted ? 1 : 0,
                }}
              >
                <div className="w-5 h-5 rounded-full bg-[#10b981]/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-[#10b981]" />
                </div>
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{
                    animation: mounted ? "fade-in-up 0.5s ease-out forwards" : "none",
                    animationDelay: `${0.4 + index * 0.1}s`,
                    opacity: mounted ? 1 : 0,
                  }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <Icon className="w-4 h-4 text-[#a855f7]" />
                    <span className="text-xl xl:text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs text-white/50">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Testimonial */}
        <div className="space-y-4">
          {/* Testimonial Card */}
          <div
            className="p-4 rounded-xl backdrop-blur-xl border border-white/10"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#fbbf24] text-[#fbbf24]" />
              ))}
            </div>
            <p className="text-sm text-white/90 italic mb-3">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center text-white font-bold text-xs">
                {testimonial.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-semibold text-white text-xs">{testimonial.author}</div>
                <div className="text-white/50 text-[11px]">{testimonial.role}, {testimonial.company}</div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Central Connection Point */}
        <circle cx="50%" cy="50%" r="4" fill="url(#lineGrad)" className="animate-pulse" />
        {platforms.map((platform, i) => (
          <line
            key={i}
            x1="50%"
            y1="50%"
            x2={`${platform.x}%`}
            y2={`${platform.y}%`}
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="5,5"
            opacity={activeOrb === i ? 0.8 : 0.2}
            className="transition-opacity duration-500"
          />
        ))}
      </svg>
    </div>
  );
}
