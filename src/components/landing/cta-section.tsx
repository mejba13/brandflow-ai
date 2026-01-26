"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Check, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
      }}
    >
      {/* Animated Gradient Mesh - More vibrant */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#6366f1]/30 rounded-full blur-[150px] animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#ec4899]/25 rounded-full blur-[120px] animate-pulse-soft delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#06b6d4]/15 rounded-full blur-[100px] animate-pulse-soft delay-300" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-[#6366f1] rounded-full animate-float opacity-70" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-[#ec4899] rounded-full animate-float delay-200 opacity-70" />
      <div className="absolute bottom-40 left-1/4 w-5 h-5 bg-[#06b6d4] rounded-full animate-float delay-500 opacity-50" />
      <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-[#f97316] rounded-full animate-float delay-700 opacity-60" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-10 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </span>
          Start Your Free 14-Day Trial
          <Zap className="w-4 h-4 text-[#fbbf24]" />
        </div>

        {/* Headline - MUCH BIGGER & WHITE */}
        <h2 className="reveal mb-8">
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            style={{
              color: "#ffffff",
              textShadow: "0 4px 30px rgba(0, 0, 0, 0.3)"
            }}
          >
            Ready to Transform Your
          </span>
          <span
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mt-2"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
              animation: "gradient 4s ease infinite",
              filter: "drop-shadow(0 4px 30px rgba(99, 102, 241, 0.4))"
            }}
          >
            Social Media Presence?
          </span>
        </h2>

        {/* Subtitle - Larger and more visible */}
        <p className="reveal text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Join thousands of creators and businesses who save hours every week with
          BrandFlow AI. <span className="text-white font-semibold">No credit card required.</span>
        </p>

        {/* CTA Buttons */}
        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup">
            <Button
              size="lg"
              className="relative overflow-hidden bg-white text-[#0f172a] hover:bg-white/95 font-bold px-10 py-7 text-lg rounded-2xl group min-w-[260px] shadow-2xl shadow-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link href="/demo">
            <Button
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 font-semibold px-10 py-7 text-lg rounded-2xl min-w-[260px] transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Schedule a Demo
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="reveal flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-white/70 mb-14">
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#10b981]/30 flex items-center justify-center">
              <Check className="w-3 h-3 text-[#10b981]" />
            </div>
            <span className="font-medium">No credit card required</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#10b981]/30 flex items-center justify-center">
              <Check className="w-3 h-3 text-[#10b981]" />
            </div>
            <span className="font-medium">Cancel anytime</span>
          </span>
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#10b981]/30 flex items-center justify-center">
              <Check className="w-3 h-3 text-[#10b981]" />
            </div>
            <span className="font-medium">24/7 support</span>
          </span>
        </div>

        {/* Social Proof */}
        <div className="reveal flex flex-col items-center">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
              ))}
            </span>
            <span className="font-bold text-white text-lg">4.9</span>
            <span className="text-white/60">rating</span>
          </div>

          {/* Avatars */}
          <div className="flex -space-x-3 mb-4">
            {[
              "from-[#6366f1] to-[#8b5cf6]",
              "from-[#ec4899] to-[#f43f5e]",
              "from-[#10b981] to-[#059669]",
              "from-[#f59e0b] to-[#f97316]",
              "from-[#06b6d4] to-[#0ea5e9]",
            ].map((gradient, i) => (
              <div
                key={i}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} border-3 border-[#0f172a] flex items-center justify-center text-white text-sm font-bold shadow-lg`}
                style={{ zIndex: 5 - i }}
              >
                {["SC", "MJ", "ER", "DP", "AK"][i]}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full bg-white/15 border-3 border-[#0f172a] flex items-center justify-center text-white/80 text-sm font-bold backdrop-blur-sm">
              +9K
            </div>
          </div>
          <p className="text-white/70 text-base font-medium">
            <span className="text-white font-bold">10,000+</span> marketers already transforming their content
          </p>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 md:h-28"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 70C1200 73.3 1320 66.7 1380 63.3L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}
