"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  Quote,
  MessageCircle,
  Play,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Heart,
  CheckCircle2,
} from "lucide-react";

// Featured testimonial with video
const featuredTestimonial = {
  id: 0,
  quote:
    "BrandFlow AI didn't just save us time—it transformed our entire content strategy. We went from struggling to post once a week to having a consistent, engaging presence across all platforms. Our engagement is up 312% and our team finally has time to focus on strategy instead of execution.",
  author: "Jennifer Walsh",
  role: "VP of Marketing",
  company: "ScaleUp Technologies",
  companyLogo: "ST",
  rating: 5,
  avatar: "JW",
  gradient: "from-[#6366f1] via-[#8b5cf6] to-[#a855f7]",
  metrics: [
    { label: "Engagement Increase", value: "312%" },
    { label: "Time Saved Weekly", value: "15hrs" },
    { label: "Content Output", value: "10x" },
  ],
  hasVideo: true,
};

const testimonials = [
  {
    id: 1,
    quote:
      "The AI understands our brand voice perfectly. Every piece of content feels authentically us, just created 10x faster.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechStart Inc.",
    rating: 5,
    avatar: "SC",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    metric: { value: "10x", label: "Faster" },
    verified: true,
  },
  {
    id: 2,
    quote:
      "40% engagement boost from AI-generated images alone. The ROI paid for itself in the first week.",
    author: "Marcus Johnson",
    role: "Social Media Manager",
    company: "CreativeHub",
    rating: 5,
    avatar: "MJ",
    gradient: "from-[#ec4899] to-[#f43f5e]",
    metric: { value: "40%", label: "More Engagement" },
    verified: true,
  },
  {
    id: 3,
    quote:
      "Like having a marketing team in my pocket. As a solopreneur, this is invaluable.",
    author: "Emily Rodriguez",
    role: "Founder",
    company: "Bloom Wellness",
    rating: 5,
    avatar: "ER",
    gradient: "from-[#10b981] to-[#059669]",
    metric: { value: "5hrs", label: "Saved Weekly" },
    verified: true,
  },
  {
    id: 4,
    quote:
      "Our reach tripled in 2 months. The scheduling AI knows exactly when our audience is active.",
    author: "David Park",
    role: "Content Lead",
    company: "GrowthLab",
    rating: 5,
    avatar: "DP",
    gradient: "from-[#f59e0b] to-[#f97316]",
    metric: { value: "3x", label: "Reach" },
    verified: true,
  },
  {
    id: 5,
    quote:
      "Finally, platform-native content without the hassle. LinkedIn, Instagram, TikTok—all perfect.",
    author: "Lisa Thompson",
    role: "Brand Strategist",
    company: "Pulse Agency",
    rating: 5,
    avatar: "LT",
    gradient: "from-[#06b6d4] to-[#0ea5e9]",
    metric: { value: "6", label: "Platforms" },
    verified: true,
  },
];

// Company logos for social proof
const companyLogos = [
  { name: "TechStart", abbr: "TS" },
  { name: "CreativeHub", abbr: "CH" },
  { name: "GrowthLab", abbr: "GL" },
  { name: "Pulse Agency", abbr: "PA" },
  { name: "Nova Studios", abbr: "NS" },
  { name: "Bloom", abbr: "BW" },
  { name: "ScaleUp", abbr: "SU" },
  { name: "Venture Co", abbr: "VC" },
];

const stats = [
  { value: 10000, suffix: "+", label: "Happy Users", icon: Users },
  { value: 2, suffix: "M+", label: "Posts Created", icon: Zap },
  { value: 98, suffix: "%", label: "Satisfaction", icon: Heart },
  { value: 4.9, suffix: "/5", label: "Rating", icon: Star },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [counters, setCounters] = useState(stats.map(() => 0));

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

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounters(stats.map((stat) => Math.floor(stat.value * eased)));

      if (step >= steps) {
        clearInterval(timer);
        setCounters(stats.map((stat) => stat.value));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div
          className="absolute top-20 left-[10%] w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)",
            animation: "float 10s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-20 right-[10%] w-[600px] h-[600px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.10) 0%, transparent 70%)",
            animation: "float 12s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)",
            animation: "pulse-soft 8s ease-in-out infinite",
          }}
        />

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: i % 2 === 0 ? "#6366f1" : "#ec4899",
              top: `${15 + i * 18}%`,
              left: `${5 + i * 20}%`,
              opacity: 0.3,
              animation: `float ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6366f1]/10 to-[#ec4899]/10 border border-[#6366f1]/20 text-[#6366f1] text-sm font-semibold mb-8">
            <MessageCircle className="w-4 h-4" />
            <span>Customer Stories</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
          </div>

          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1]" style={{ color: "#0f172a" }}>
            Loved by{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              10,000+ Marketers
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none">
                <path d="M1 5.5C75 2 225 2 299 5.5" stroke="url(#grad2)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="grad2" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#6366f1"/>
                    <stop offset="0.5" stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h2>

          <p className="reveal text-xl text-[#64748b] leading-relaxed max-w-2xl mx-auto">
            Don&apos;t just take our word for it. See how BrandFlow AI is helping
            creators and businesses transform their social media presence.
          </p>
        </div>

        {/* Featured Testimonial - Large Hero Card */}
        <div className="reveal mb-12">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-[#e2e8f0] bg-white shadow-xl">
            {/* Gradient Border Glow */}
            <div className="absolute -inset-[1px] rounded-[2.5rem] bg-gradient-to-r from-[#6366f1]/20 via-[#a855f7]/20 to-[#ec4899]/20 blur-sm -z-10" />

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Video/Visual Section */}
              <div className="relative min-h-[300px] lg:min-h-[450px] bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center p-8 lg:p-12">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                      backgroundSize: "32px 32px",
                    }}
                  />
                </div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#6366f1]/30 rounded-full blur-[60px]" />
                <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#ec4899]/20 rounded-full blur-[80px]" />

                {/* Video Play Button */}
                <div className="relative z-10 text-center">
                  <button
                    className="group relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:bg-white/20"
                    style={{
                      boxShadow: "0 0 60px rgba(99, 102, 241, 0.3)",
                    }}
                  >
                    <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
                    <div className="absolute -inset-4 rounded-full border border-white/10 animate-pulse" />
                  </button>
                  <p className="mt-6 text-white/70 text-sm font-medium">Watch Success Story</p>

                  {/* Metrics Row */}
                  <div className="flex justify-center gap-6 mt-8">
                    {featuredTestimonial.metrics.map((metric, i) => (
                      <div
                        key={metric.label}
                        className="text-center"
                        style={{
                          animation: "fade-in-up 0.5s ease-out forwards",
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <div className="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-white/60">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-bold">
                    {featuredTestimonial.companyLogo}
                  </div>
                  <span className="text-white/90 text-sm font-medium">{featuredTestimonial.company}</span>
                </div>
              </div>

              {/* Right: Quote Section */}
              <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                {/* Decorative Quote */}
                <div className="absolute top-8 right-8 opacity-5">
                  <Quote className="w-32 h-32 text-[#6366f1]" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-[#fbbf24] text-[#fbbf24]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl text-[#0f172a] leading-relaxed mb-8 font-medium">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${featuredTestimonial.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}
                  >
                    {featuredTestimonial.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0f172a] text-lg">{featuredTestimonial.author}</span>
                      <CheckCircle2 className="w-5 h-5 text-[#6366f1]" />
                    </div>
                    <div className="text-[#64748b]">
                      {featuredTestimonial.role} at {featuredTestimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`reveal group relative rounded-[1.5rem] overflow-hidden border transition-all duration-500 cursor-pointer ${
                activeTestimonial === index
                  ? "border-[#6366f1]/30 shadow-xl shadow-[#6366f1]/10 scale-[1.02]"
                  : "border-[#e2e8f0] bg-white hover:border-[#6366f1]/20 hover:shadow-lg"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setActiveTestimonial(index)}
            >
              {/* Active Indicator */}
              {activeTestimonial === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#ec4899]/5" />
              )}

              {/* Hover Glow */}
              <div className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-[#6366f1]/20 via-transparent to-[#ec4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

              <div className="relative p-6 md:p-7 bg-white">
                {/* Top Row: Metric Badge & Rating */}
                <div className="flex items-start justify-between mb-4">
                  {/* Metric */}
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold bg-gradient-to-r ${testimonial.gradient} text-white shadow-lg`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    {testimonial.metric.value} {testimonial.metric.label}
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-[#0f172a] text-lg leading-relaxed mb-6 min-h-[80px]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t border-[#e2e8f0]">
                  <div
                    className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[#0f172a]">{testimonial.author}</span>
                      {testimonial.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#6366f1]" />
                      )}
                    </div>
                    <div className="text-sm text-[#64748b]">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeTestimonial === index
                  ? "w-8 bg-gradient-to-r from-[#6366f1] to-[#ec4899]"
                  : "bg-[#e2e8f0] hover:bg-[#cbd5e1]"
              }`}
            />
          ))}
        </div>

        {/* Company Logos Carousel */}
        <div className="reveal mb-16">
          <p className="text-center text-sm text-[#94a3b8] font-medium mb-8 uppercase tracking-wider">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {companyLogos.map((company, index) => (
              <div
                key={company.name}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[#f8fafc] transition-all duration-300"
                style={{
                  animation: isVisible ? "fade-in-up 0.5s ease-out forwards" : "none",
                  animationDelay: `${index * 0.05}s`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] flex items-center justify-center text-[#64748b] font-bold text-sm group-hover:from-[#6366f1]/10 group-hover:to-[#ec4899]/10 group-hover:text-[#6366f1] transition-all duration-300">
                  {company.abbr}
                </div>
                <span className="text-[#64748b] font-medium group-hover:text-[#0f172a] transition-colors">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Stats Row */}
        <div className="reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group relative text-center p-6 md:p-8 rounded-[1.5rem] bg-white border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-xl hover:shadow-[#6366f1]/5 transition-all duration-500"
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-[#6366f1]/5 to-[#ec4899]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1]/10 to-[#ec4899]/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#6366f1]" />
                    </div>

                    {/* Counter */}
                    <div
                      className="text-3xl md:text-4xl font-bold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {counters[index]}{stat.suffix}
                    </div>

                    <div className="text-sm text-[#64748b] font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal mt-16 text-center">
          <p className="text-[#64748b] mb-6">Join thousands of marketers who&apos;ve transformed their workflow</p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
          >
            <span>Start Your Success Story</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
