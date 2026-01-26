"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Calendar,
  BarChart3,
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
  Brain,
  Rocket,
} from "lucide-react";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/icons/platform-icons";

// Platform configurations with official icons
const platforms = [
  { name: "LinkedIn", color: "#0A66C2", Icon: LinkedInIcon, followers: "1.2M" },
  { name: "X (Twitter)", color: "#000000", Icon: TwitterIcon, followers: "890K" },
  { name: "Facebook", color: "#1877F2", Icon: FacebookIcon, followers: "2.1M" },
  { name: "Instagram", color: "#E4405F", Icon: InstagramIcon, followers: "3.4M", gradient: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" },
  { name: "Pinterest", color: "#E60023", Icon: PinterestIcon, followers: "560K" },
  { name: "TikTok", color: "#000000", Icon: TikTokIcon, followers: "4.7M", gradient: "linear-gradient(45deg, #00f2ea, #ff0050)" },
];

// Animated metrics for the analytics card
const metrics = [
  { label: "Engagement", value: "847", suffix: "%", icon: Heart, trend: "+12.5%", color: "#ec4899" },
  { label: "Reach", value: "2.4", suffix: "M", icon: Eye, trend: "+8.3%", color: "#06b6d4" },
  { label: "Clicks", value: "156", suffix: "K", icon: MousePointer, trend: "+24.1%", color: "#10b981" },
];

// Counter animation component
function AnimatedCounter({ value, suffix, isVisible }: { value: string; suffix: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numValue = parseFloat(value);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = numValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numValue) {
        setDisplayValue(numValue);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numValue]);

  return (
    <span>
      {displayValue.toFixed(value.includes('.') ? 1 : 0)}{suffix}
    </span>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [activeMetric, setActiveMetric] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Cycle through metrics
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  // Cycle through platforms for animation
  useEffect(() => {
    if (!isInView || isHovering) return;
    const interval = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isInView, isHovering]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };


  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
      aria-labelledby="features-heading"
    >
      {/* Premium Multi-Layer Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #fafbff 0%, #f0f4ff 30%, #e8f0fe 60%, #f5f7ff 100%)",
          }}
        />

        {/* Mesh Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[900px] h-[900px] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.08) 40%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, rgba(244, 63, 94, 0.06) 40%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 60%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating Gradient Shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            style={{
              background: i % 2 === 0
                ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                : "linear-gradient(135deg, #ec4899, #f43f5e)",
              top: `${15 + i * 18}%`,
              left: `${5 + i * 20}%`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 4px 24px -4px rgba(99, 102, 241, 0.15)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-[#6366f1]" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
              AI-Powered Features
            </span>
            <motion.span
              className="w-2 h-2 rounded-full bg-[#10b981]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            id="features-heading"
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Everything You Need to{" "}
            <span className="relative inline-block">
              <span
                className="relative z-10"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dominate Social
              </span>
              <motion.svg
                className="absolute -bottom-3 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.path
                  d="M2 8C60 3 140 3 200 6C240 8 280 5 298 8"
                  stroke="url(#headerGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="headerGradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#6366f1"/>
                    <stop offset="0.5" stopColor="#8b5cf6"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-[#64748b] leading-relaxed max-w-2xl mx-auto"
          >
            Built from the ground up with AI at the core—not bolted on as an afterthought.
            Transform how you create, schedule, and analyze social media content.
          </motion.p>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">

          {/* Feature 1: AI Content Transformation - Hero Card */}
          <motion.article
            variants={itemVariants}
            className="col-span-12 lg:col-span-8 group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              className="relative h-full min-h-[480px] rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)",
                border: "1px solid rgba(99, 102, 241, 0.15)",
                boxShadow: "0 4px 40px -12px rgba(99, 102, 241, 0.15), 0 0 0 1px rgba(255,255,255,0.8) inset",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px -20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.2) inset",
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.06) 0%, transparent 50%)",
                }}
              />

              <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                      }}
                    >
                      <Wand2 className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-3 rounded-3xl"
                      animate={{ opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        filter: "blur(20px)",
                        zIndex: -1,
                      }}
                    />
                  </motion.div>
                  <motion.span
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                      color: "#059669",
                      border: "1px solid rgba(16, 185, 129, 0.2)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Rocket className="w-3 h-3" />
                      Most Popular
                    </span>
                  </motion.span>
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-4 tracking-tight">
                  AI Content Transformation
                </h3>
                <p className="text-lg text-[#64748b] mb-8 max-w-xl leading-relaxed">
                  Transform a single piece of content into platform-perfect posts. Our AI adapts your message, tone, and format for maximum engagement on each social network.
                </p>

                {/* Interactive Visual Demo */}
                <div className="flex-1 flex items-center justify-center py-4">
                  <div className="relative w-full max-w-2xl">
                    {/* Source Content Card */}
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-40 rounded-2xl p-4"
                      style={{
                        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                        border: "1px solid rgba(99, 102, 241, 0.15)",
                        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.1)",
                      }}
                      animate={{ y: [-10, 10, -10] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="space-y-2 mb-3">
                        <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]" />
                        <div className="w-4/5 h-2 rounded-full bg-[#e2e8f0]" />
                        <div className="w-full h-2 rounded-full bg-[#e2e8f0]" />
                        <div className="w-3/5 h-2 rounded-full bg-[#e2e8f0]" />
                      </div>
                      <div className="text-xs font-medium text-[#64748b] text-center pt-2 border-t border-[#f1f5f9]">
                        Your Content
                      </div>
                    </motion.div>

                    {/* AI Processing Core */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                          boxShadow: "0 0 60px rgba(99, 102, 241, 0.4)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ border: "2px solid rgba(255,255,255,0.3)" }}
                        />
                        <motion.div
                          className="absolute -inset-4 rounded-full"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                          style={{ border: "1px solid rgba(99, 102, 241, 0.3)" }}
                        />
                        <Brain className="w-9 h-9 text-white relative z-10" />
                      </motion.div>
                    </div>

                    {/* Platform Output Cards */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                      {platforms.map((platform, index) => {
                        const Icon = platform.Icon;
                        const isActive = index === activePlatform;
                        return (
                          <motion.div
                            key={platform.name}
                            className="relative"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: isActive ? 1.15 : 1,
                            }}
                            transition={{
                              delay: index * 0.1,
                              scale: { duration: 0.3 }
                            }}
                            whileHover={{ scale: 1.2, x: -5 }}
                          >
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg cursor-pointer"
                              style={{
                                background: platform.gradient || platform.color,
                                boxShadow: isActive
                                  ? `0 8px 24px -4px ${platform.color}80`
                                  : "0 4px 12px -2px rgba(0,0,0,0.15)",
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
                                >
                                  <div className="px-3 py-1.5 rounded-lg bg-white shadow-lg border border-[#e2e8f0]">
                                    <span className="text-xs font-semibold text-[#0f172a]">{platform.name}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Animated Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                      <defs>
                        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
                          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      {platforms.map((_, i) => (
                        <motion.path
                          key={i}
                          d={`M 170 ${140 + i * 0} Q 260 ${100 + i * 20} 340 ${60 + i * 35}`}
                          stroke="url(#flowGradient)"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="8 4"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 0.5 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* Platform Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {platforms.map((platform) => {
                    const Icon = platform.Icon;
                    return (
                      <motion.span
                        key={platform.name}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#e2e8f0] text-sm font-medium text-[#475569] cursor-pointer"
                        whileHover={{
                          scale: 1.05,
                          borderColor: platform.color,
                          boxShadow: `0 4px 20px -4px ${platform.color}40`,
                        }}
                      >
                        <Icon className="w-4 h-4" style={{ color: platform.color }} />
                        {platform.name}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* Feature 2: AI Image Generation - Vertical Card */}
          <motion.article variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4 group">
            <motion.div
              className="relative h-full min-h-[480px] rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(253,242,248,0.9) 100%)",
                border: "1px solid rgba(236, 72, 153, 0.15)",
                boxShadow: "0 4px 40px -12px rgba(236, 72, 153, 0.15)",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px -20px rgba(236, 72, 153, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(236, 72, 153, 0.1) 0%, transparent 60%)",
                }}
              />

              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                      boxShadow: "0 8px 32px -8px rgba(236, 72, 153, 0.5)",
                    }}
                  >
                    <Layers className="w-7 h-7 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold text-[#0f172a] mb-3 tracking-tight">
                  AI Image Generation
                </h3>
                <p className="text-[#64748b] mb-6 leading-relaxed">
                  Generate stunning, brand-consistent visuals tailored to each platform&apos;s optimal dimensions automatically.
                </p>

                {/* Visual Demo: Stacked Images */}
                <div className="flex-1 flex items-center justify-center py-4">
                  <div className="relative w-full aspect-square max-w-[220px]">
                    {/* Background layers */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)",
                        border: "1px solid rgba(236, 72, 153, 0.2)",
                      }}
                      animate={{ rotate: [8, 10, 8] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, #f5d0fe 0%, #fae8ff 100%)",
                        border: "1px solid rgba(192, 132, 252, 0.2)",
                      }}
                      animate={{ rotate: [4, 6, 4] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Main Image Card */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(253,242,248,0.9) 100%)",
                        border: "1px solid rgba(236, 72, 153, 0.2)",
                        boxShadow: "0 8px 32px -8px rgba(236, 72, 153, 0.2)",
                      }}
                      whileHover={{ rotate: 0, scale: 1.02 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-12 h-12 text-[#ec4899] mb-3" />
                      </motion.div>
                      <span className="text-sm font-semibold text-[#be185d]">AI Generated</span>
                      <span className="text-xs text-[#f472b6] mt-1">Brand Optimized</span>
                    </motion.div>

                    {/* Sparkle Effects */}
                    <motion.div
                      className="absolute -top-3 -right-3"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-[#fbbf24]" />
                    </motion.div>
                    <motion.div
                      className="absolute -bottom-2 -left-2"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <Sparkles className="w-5 h-5 text-[#ec4899]" />
                    </motion.div>
                  </div>
                </div>

                {/* Dimension Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { ratio: "1:1", label: "Square" },
                    { ratio: "16:9", label: "Wide" },
                    { ratio: "9:16", label: "Story" },
                  ].map((dim, i) => (
                    <motion.span
                      key={dim.ratio}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(244, 63, 94, 0.1) 100%)",
                        color: "#be185d",
                        border: "1px solid rgba(236, 72, 153, 0.2)",
                      }}
                      whileHover={{ scale: 1.1 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {dim.ratio} {dim.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* Feature 3: Smart Scheduling - Medium Card */}
          <motion.article variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-4 group">
            <motion.div
              className="relative h-full min-h-[320px] rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,251,235,0.9) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.15)",
                boxShadow: "0 4px 40px -12px rgba(245, 158, 11, 0.15)",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px -20px rgba(245, 158, 11, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                      boxShadow: "0 8px 24px -6px rgba(245, 158, 11, 0.5)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Clock className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className="w-3 h-3 text-[#d97706]" />
                    <span className="text-xs font-bold text-[#d97706]">AI-Powered</span>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-[#0f172a] mb-2 tracking-tight">Smart Scheduling</h3>
                <p className="text-[#64748b] text-sm mb-6 leading-relaxed">
                  AI analyzes your audience to find the perfect posting times for maximum engagement and reach.
                </p>

                {/* Calendar Visual */}
                <div className="flex-1 flex items-end">
                  <div className="w-full">
                    <div className="grid grid-cols-7 gap-1.5">
                      {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                        <div key={i} className="text-center">
                          <span className="text-[10px] text-[#94a3b8] font-semibold">{day}</span>
                          <motion.div
                            className={`mt-1.5 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              [1, 3, 4].includes(i)
                                ? "text-white"
                                : "bg-[#fef3c7]/50 text-[#d97706]"
                            }`}
                            style={{
                              background: [1, 3, 4].includes(i)
                                ? "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)"
                                : undefined,
                              boxShadow: [1, 3, 4].includes(i)
                                ? "0 4px 12px -2px rgba(245, 158, 11, 0.4)"
                                : undefined,
                            }}
                            whileHover={{ scale: 1.1 }}
                            animate={[1, 3, 4].includes(i) ? {
                              boxShadow: [
                                "0 4px 12px -2px rgba(245, 158, 11, 0.4)",
                                "0 4px 20px -2px rgba(245, 158, 11, 0.6)",
                                "0 4px 12px -2px rgba(245, 158, 11, 0.4)",
                              ]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          >
                            {i + 1}
                          </motion.div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* Feature 4: Analytics & Insights - Wide Card */}
          <motion.article variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-5 group">
            <motion.div
              className="relative h-full min-h-[320px] rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,254,255,0.9) 100%)",
                border: "1px solid rgba(6, 182, 212, 0.15)",
                boxShadow: "0 4px 40px -12px rgba(6, 182, 212, 0.15)",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px -20px rgba(6, 182, 212, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-6">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)",
                      boxShadow: "0 8px 24px -6px rgba(6, 182, 212, 0.5)",
                    }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <BarChart3 className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">Analytics & Insights</h3>
                    <p className="text-[#64748b] text-sm">Real-time performance tracking</p>
                  </div>
                </div>

                {/* Animated Metrics Grid */}
                <div className="flex-1 flex items-center">
                  <div className="w-full grid grid-cols-3 gap-3">
                    {metrics.map((metric, index) => {
                      const Icon = metric.icon;
                      const isActive = index === activeMetric;
                      return (
                        <motion.div
                          key={metric.label}
                          className="relative p-4 rounded-2xl cursor-pointer"
                          style={{
                            background: isActive
                              ? "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)"
                              : "rgba(248, 250, 252, 0.8)",
                            border: isActive
                              ? "2px solid rgba(6, 182, 212, 0.3)"
                              : "1px solid transparent",
                          }}
                          animate={{ scale: isActive ? 1.05 : 1 }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon
                            className={`w-5 h-5 mb-2 transition-colors duration-300`}
                            style={{ color: isActive ? metric.color : "#94a3b8" }}
                          />
                          <div className={`text-2xl font-bold transition-colors duration-300 ${isActive ? "text-[#0f172a]" : "text-[#64748b]"}`}>
                            {isInView ? (
                              <AnimatedCounter
                                value={metric.value}
                                suffix={metric.suffix}
                                isVisible={isInView}
                              />
                            ) : `${metric.value}${metric.suffix}`}
                          </div>
                          <div className="text-xs text-[#94a3b8] font-medium">{metric.label}</div>
                          <AnimatePresence>
                            {isActive && (
                              <motion.div
                                className="absolute top-2 right-2 flex items-center gap-0.5 text-[10px] font-bold"
                                style={{ color: "#10b981" }}
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                              >
                                <TrendingUp className="w-3 h-3" />
                                {metric.trend}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* Feature 5: Audience Targeting - Compact Card */}
          <motion.article variants={itemVariants} className="col-span-12 md:col-span-6 lg:col-span-3 group">
            <motion.div
              className="relative h-full min-h-[320px] rounded-[2rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(236,253,245,0.9) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                boxShadow: "0 4px 40px -12px rgba(16, 185, 129, 0.15)",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 20px 60px -20px rgba(16, 185, 129, 0.3)",
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative z-10 p-6 h-full flex flex-col">
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 8px 24px -6px rgba(16, 185, 129, 0.5)",
                  }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>

                <h3 className="text-lg font-bold text-[#0f172a] mb-2 tracking-tight">Audience Targeting</h3>
                <p className="text-[#64748b] text-sm mb-4 leading-relaxed">
                  AI-driven insights to reach the right people at the right time.
                </p>

                {/* Audience Segments Visual */}
                <div className="flex-1 flex items-end">
                  <div className="w-full space-y-3">
                    {[
                      { label: "Professionals", pct: 85, delay: 0 },
                      { label: "Creators", pct: 72, delay: 0.2 },
                      { label: "Entrepreneurs", pct: 64, delay: 0.4 },
                    ].map((segment) => (
                      <div key={segment.label}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-[#64748b] font-medium">{segment.label}</span>
                          <span className="font-bold text-[#10b981]">{segment.pct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-[#ecfdf5] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                            }}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${segment.pct}%` } : { width: 0 }}
                            transition={{ duration: 1.2, delay: segment.delay, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.article>

        </div>

        {/* Additional Features Strip */}
        <motion.div variants={itemVariants} className="mt-20">
          <div className="text-center mb-10">
            <span
              className="text-sm font-bold uppercase tracking-widest"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              And Much More
            </span>
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
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.label}
                  className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white cursor-pointer"
                  style={{
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 2px 8px -2px rgba(0,0,0,0.05)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 32px -8px rgba(99, 102, 241, 0.2)",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-5 h-5 text-[#6366f1]" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-[#0f172a] text-sm">{feature.label}</div>
                    <div className="text-xs text-[#94a3b8]">{feature.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <motion.a
            href="#pricing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 12px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 50px -10px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore All Features</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
          <p className="mt-4 text-sm text-[#94a3b8]">
            No credit card required • Free 14-day trial
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
