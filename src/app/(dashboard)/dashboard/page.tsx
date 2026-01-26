"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  Users,
  FileText,
  ArrowUpRight,
  Plus,
  Sparkles,
  Zap,
  BarChart3,
  Target,
  Clock,
  ChevronRight,
  Flame,
  Eye,
  ArrowRight,
  CheckCircle2,
  Settings,
  Crown,
  Rocket,
  Heart,
} from "lucide-react";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import {
  seedCurrentUser,
  seedDashboardStats,
  seedScheduledPosts,
  seedAISuggestions,
  seedAnalyticsSummary,
  seedPlatformAnalytics,
} from "@/lib/seed-data";
import { PLATFORMS } from "@/lib/utils";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

// Enhanced KPI Stats with more visual appeal
const stats = [
  {
    label: "Scheduled Posts",
    value: seedDashboardStats.postsScheduled,
    change: 18,
    icon: Calendar,
    color: "#6366f1",
    lightColor: "#eef2ff",
    description: "Ready to publish",
  },
  {
    label: "Published",
    value: seedDashboardStats.postsThisWeek * 4,
    change: 12,
    icon: FileText,
    color: "#10b981",
    lightColor: "#ecfdf5",
    description: "This month",
  },
  {
    label: "Engagement",
    value: seedDashboardStats.engagementRate,
    change: seedAnalyticsSummary.engagementChange,
    icon: Heart,
    color: "#f43f5e",
    lightColor: "#fff1f2",
    description: "Average rate",
  },
  {
    label: "Followers",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    icon: Users,
    color: "#8b5cf6",
    lightColor: "#f5f3ff",
    description: "Gained this month",
  },
];

const upcomingPosts = seedScheduledPosts.slice(0, 4);
const aiSuggestions = seedAISuggestions.slice(0, 3);

// Quick action buttons data
const quickActions = [
  { icon: Plus, label: "New Post", href: "/dashboard/create", color: "#6366f1" },
  { icon: Calendar, label: "Schedule", href: "/dashboard/calendar", color: "#f59e0b" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", color: "#10b981" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings", color: "#64748b" },
];

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false);
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);
  const creditsPercent = (seedDashboardStats.aiCreditsUsed / seedDashboardStats.aiCreditsTotal) * 100;
  const creditsRemaining = seedDashboardStats.aiCreditsTotal - seedDashboardStats.aiCreditsUsed;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          animate={mounted ? { scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)",
            transform: "translate(20%, -30%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          animate={mounted ? { scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.03) 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />
      </div>

      <motion.div
        className="space-y-6 pb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Welcome Section */}
        <motion.section
          className="relative overflow-hidden rounded-[1.5rem]"
          variants={itemVariants}
        >
          {/* Premium Dark Gradient Background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #3730a3 100%)",
            }}
          />

          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 60%)",
                filter: "blur(80px)",
              }}
              animate={mounted ? {
                y: [0, 50, 0],
                x: [0, -30, 0],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
                filter: "blur(60px)",
              }}
              animate={mounted ? {
                y: [0, -40, 0],
                x: [0, 30, 0],
                scale: [1.1, 1, 1.1],
              } : {}}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)",
                filter: "blur(50px)",
              }}
              animate={mounted ? {
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3],
              } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Grid Pattern Overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={mounted ? {
                  y: [-20, 20, -20],
                  opacity: [0.2, 0.5, 0.2],
                } : {}}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-10 lg:px-10 lg:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="space-y-5">
                {/* Greeting Row */}
                <div className="flex items-center gap-4">
                  <span className="text-white/50 text-sm font-medium">{getTimeOfDay()},</span>
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)",
                      border: "1px solid rgba(74, 222, 128, 0.3)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Flame className="w-4 h-4 text-emerald-400" />
                    </motion.div>
                    <span className="text-emerald-400 text-sm font-semibold">7 day streak</span>
                  </motion.div>
                </div>

                {/* Main Headline */}
                <motion.h1
                  className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome back,{" "}
                  <span className="relative">
                    <span
                      className="relative z-10"
                      style={{
                        background: "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #f0abfc 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {seedCurrentUser.firstName}!
                    </span>
                  </span>
                </motion.h1>

                {/* Subtitle with Stats */}
                <motion.p
                  className="text-white/60 max-w-xl text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your content is performing well. You have{" "}
                  <span className="text-white font-semibold">{seedDashboardStats.postsScheduled} posts</span> scheduled
                  and engagement is up{" "}
                  <span className="text-emerald-400 font-semibold">+{seedAnalyticsSummary.engagementChange}%</span> this month.
                </motion.p>

                {/* Quick Actions */}
                <motion.div
                  className="flex flex-wrap gap-3 pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {quickActions.map((action, i) => (
                    <Link key={action.label} href={action.href}>
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                      >
                        <action.icon className="w-4 h-4" style={{ color: action.color }} />
                        {action.label}
                      </motion.button>
                    </Link>
                  ))}
                </motion.div>
              </div>

              {/* Right Side - CTA Buttons */}
              <div className="flex flex-col items-start lg:items-end gap-4">
                <div className="flex items-center gap-3">
                  <Link href="/dashboard/analytics">
                    <motion.button
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <BarChart3 className="w-4 h-4" />
                      Analytics
                    </motion.button>
                  </Link>
                  <Link href="/dashboard/create">
                    <motion.button
                      className="relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                        boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 12px 40px -8px rgba(99, 102, 241, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <Plus className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Create Post</span>
                    </motion.button>
                  </Link>
                </div>

                {/* Mini Stats in Hero */}
                <motion.div
                  className="flex items-center gap-6 px-5 py-3 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{seedDashboardStats.postsThisWeek}</p>
                    <p className="text-xs text-white/50">Posts this week</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-400">{seedAnalyticsSummary.totalEngagements}</p>
                    <p className="text-xs text-white/50">Engagements</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-violet-400">{seedAnalyticsSummary.totalReach}</p>
                    <p className="text-xs text-white/50">Total reach</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid - Enhanced Cards */}
        <motion.section
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredStat === index;

            return (
              <motion.div
                key={stat.label}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                variants={itemVariants}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ y: -4 }}
              >
                {/* Card Background */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${stat.lightColor} 0%, white 100%)`
                      : "white",
                  }}
                />

                {/* Border */}
                <div
                  className="absolute inset-0 rounded-2xl transition-all duration-300"
                  style={{
                    border: isHovered
                      ? `2px solid ${stat.color}30`
                      : "1px solid rgba(226, 232, 240, 0.8)",
                    boxShadow: isHovered
                      ? `0 20px 40px -12px ${stat.color}25`
                      : "0 4px 20px -4px rgba(0,0,0,0.05)",
                  }}
                />

                <div className="relative z-10 p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}cc 100%)`,
                        boxShadow: `0 8px 24px -6px ${stat.color}50`,
                      }}
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: stat.change >= 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        color: stat.change >= 0 ? "#059669" : "#dc2626",
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      {stat.change >= 0 ? "+" : ""}{stat.change}%
                    </motion.div>
                  </div>

                  {/* Value */}
                  <motion.p
                    className="text-3xl font-bold mb-1"
                    style={{ color: isHovered ? stat.color : "#0f172a" }}
                    transition={{ duration: 0.3 }}
                  >
                    {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                  </motion.p>

                  {/* Label & Description */}
                  <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.description}</p>

                  {/* Hover Arrow */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute bottom-4 right-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <ArrowRight className="w-5 h-5" style={{ color: stat.color }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* AI Credits Card - Premium Design */}
          <motion.section
            className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
              }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                  filter: "blur(40px)",
                }}
                animate={mounted ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-32 h-32 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={mounted ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] } : {}}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                      boxShadow: "0 8px 24px -6px rgba(99, 102, 241, 0.5)",
                    }}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-white font-semibold text-lg">AI Credits</p>
                    <p className="text-white/50 text-sm">Monthly allocation</p>
                  </div>
                </div>
                <motion.div
                  className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-emerald-400 text-xs font-bold">PRO</span>
                </motion.div>
              </div>

              {/* Credits Display */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-3">
                  <motion.span
                    className="text-5xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    {seedDashboardStats.aiCreditsUsed.toLocaleString()}
                  </motion.span>
                  <span className="text-white/40 text-lg">
                    / {seedDashboardStats.aiCreditsTotal.toLocaleString()}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative"
                    style={{
                      background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: mounted ? `${creditsPercent}%` : 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                  >
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-white/60 text-sm">
                    {creditsRemaining.toLocaleString()} remaining
                  </span>
                </div>
                <Link href="/dashboard/settings">
                  <motion.button
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/15 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Crown className="w-4 h-4 text-amber-400" />
                    Upgrade
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.section>

          {/* Upcoming Posts - Premium Bento Design */}
          <motion.section
            className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            {/* Premium Gradient Background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)",
              }}
            />

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -left-20 w-72 h-72 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
                  filter: "blur(50px)",
                }}
                animate={mounted ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
                animate={mounted ? {
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                } : {}}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                      boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.6)",
                    }}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Calendar className="w-7 h-7 text-white" />
                    {/* Pulse Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: "2px solid rgba(99, 102, 241, 0.5)" }}
                      animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">Upcoming Posts</h2>
                      <motion.span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={{
                          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)",
                          border: "1px solid rgba(99, 102, 241, 0.3)",
                          color: "#a5b4fc",
                        }}
                      >
                        {upcomingPosts.length} SCHEDULED
                      </motion.span>
                    </div>
                    <p className="text-white/50 text-sm">Your content pipeline for the next 7 days</p>
                  </div>
                </div>
                <Link href="/dashboard/calendar">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Calendar className="w-4 h-4" />
                    View Calendar
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-12 gap-4">
                {/* Timeline Sidebar */}
                <div className="col-span-12 md:col-span-4 relative">
                  {/* Timeline Card */}
                  <motion.div
                    className="relative rounded-2xl overflow-hidden h-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span className="text-white/70 text-sm font-medium">Schedule Overview</span>
                      </div>

                      {/* Mini Calendar */}
                      <div className="grid grid-cols-7 gap-1 mb-4">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div key={i} className="text-center text-[10px] text-white/30 font-medium py-1">
                            {day}
                          </div>
                        ))}
                        {[...Array(7)].map((_, i) => {
                          const hasPost = i === 1 || i === 3 || i === 5;
                          const isToday = i === 0;
                          return (
                            <motion.div
                              key={i}
                              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold relative ${
                                isToday ? "bg-indigo-500 text-white" : hasPost ? "bg-white/10 text-white" : "text-white/30"
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {26 + i}
                              {hasPost && !isToday && (
                                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-emerald-400" />
                              )}
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Stats */}
                      <div className="space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-white/50 text-xs">This Week</span>
                          <span className="text-white font-bold text-sm">{upcomingPosts.length} posts</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/50 text-xs">Best Time</span>
                          <span className="text-emerald-400 font-bold text-sm">9:00 AM</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/50 text-xs">Completion</span>
                          <span className="text-indigo-400 font-bold text-sm">72%</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: "72%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Posts List */}
                <div className="col-span-12 md:col-span-8 space-y-3">
                  {upcomingPosts.map((post, index) => {
                    const Icon = platformIcons[post.platform];
                    const platformInfo = PLATFORMS[post.platform];
                    const isFirst = index === 0;

                    return (
                      <motion.div
                        key={post.id}
                        className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                          isFirst ? "ring-2 ring-indigo-500/30" : ""
                        }`}
                        style={{
                          background: isFirst
                            ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)"
                            : "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        whileHover={{
                          y: -2,
                          background: "rgba(99, 102, 241, 0.1)",
                          borderColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        {/* Next Up Badge */}
                        {isFirst && (
                          <motion.div
                            className="absolute top-0 right-0 px-3 py-1 rounded-bl-lg text-[10px] font-bold"
                            style={{
                              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                              color: "white",
                            }}
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            NEXT UP
                          </motion.div>
                        )}

                        <div className="p-4 flex items-center gap-4">
                          {/* Platform Icon */}
                          <motion.div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                            style={{
                              background: `linear-gradient(135deg, ${platformInfo.color} 0%, ${platformInfo.color}cc 100%)`,
                              boxShadow: `0 4px 16px -4px ${platformInfo.color}60`,
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate group-hover:text-indigo-300 transition-colors">
                              {post.title}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <span
                                className="text-xs font-semibold px-2 py-0.5 rounded-md"
                                style={{
                                  background: `${platformInfo.color}20`,
                                  color: platformInfo.color,
                                }}
                              >
                                {platformInfo.name}
                              </span>
                              <span className="text-white/40 text-xs flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.scheduledDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                              <span className="text-white/40 text-xs flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.scheduledTime}
                              </span>
                            </div>
                          </div>

                          {/* Status & Action */}
                          <div className="flex items-center gap-3">
                            <motion.span
                              className="px-3 py-1.5 rounded-lg text-[10px] font-bold"
                              style={{
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.1) 100%)",
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                color: "#4ade80",
                              }}
                            >
                              Scheduled
                            </motion.span>
                            <motion.div
                              className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/20 transition-all"
                              whileHover={{ scale: 1.1 }}
                            >
                              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Progress Line for first item */}
                        {isFirst && (
                          <div className="px-4 pb-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                  initial={{ width: 0 }}
                                  animate={{ width: "65%" }}
                                  transition={{ duration: 1, delay: 0.8 }}
                                />
                              </div>
                              <span className="text-[10px] text-white/40">Publishing in 2h</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}

                  {upcomingPosts.length === 0 && (
                    <motion.div
                      className="text-center py-12 rounded-2xl"
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{
                          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                        }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Calendar className="w-7 h-7 text-indigo-400" />
                      </motion.div>
                      <p className="text-white/50 mb-4">No upcoming posts scheduled</p>
                      <Link href="/dashboard/create">
                        <motion.button
                          className="px-6 py-2.5 rounded-xl font-semibold text-white text-sm"
                          style={{
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Create your first post
                        </motion.button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Bottom Quick Actions */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-4">
                  {[
                    { platform: "linkedin", count: 2 },
                    { platform: "twitter", count: 1 },
                    { platform: "facebook", count: 1 },
                  ].map((item) => {
                    const Icon = platformIcons[item.platform as Platform];
                    const info = PLATFORMS[item.platform as Platform];
                    return (
                      <div key={item.platform} className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ background: `${info.color}20` }}
                        >
                          <Icon className="w-3 h-3" style={{ color: info.color }} />
                        </div>
                        <span className="text-white/60 text-xs">{item.count}</span>
                      </div>
                    );
                  })}
                </div>
                <Link href="/dashboard/create">
                  <motion.button
                    className="flex items-center gap-2 text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <Plus className="w-3 h-3" />
                    Schedule New Post
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* AI Suggestions - Premium Bento Design */}
          <motion.section
            className="col-span-12 lg:col-span-8 relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            {/* Premium Dark Gradient Background */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4c1d95 100%)",
              }}
            />

            {/* Animated Gradient Mesh */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 60%)",
                  filter: "blur(60px)",
                }}
                animate={mounted ? {
                  scale: [1, 1.3, 1],
                  x: [0, 30, 0],
                } : {}}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 60%)",
                  filter: "blur(50px)",
                }}
                animate={mounted ? {
                  scale: [1.2, 1, 1.2],
                  y: [0, -20, 0],
                } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
                  filter: "blur(40px)",
                }}
                animate={mounted ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.5, 0.3],
                } : {}}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    top: `${15 + (i % 3) * 30}%`,
                    left: `${10 + i * 15}%`,
                  }}
                  animate={mounted ? {
                    y: [-15, 15, -15],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  } : {}}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                >
                  <Sparkles className="w-3 h-3 text-pink-300/40" />
                </motion.div>
              ))}

              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #ff6b6b 100%)",
                      boxShadow: "0 8px 32px -8px rgba(236, 72, 153, 0.6)",
                    }}
                    whileHover={{ rotate: 10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Sparkles className="w-7 h-7 text-white" />
                    {/* Pulse Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ border: "2px solid rgba(236, 72, 153, 0.5)" }}
                      animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-white">AI Suggestions</h2>
                      <motion.span
                        className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={{
                          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)",
                          border: "1px solid rgba(74, 222, 128, 0.3)",
                          color: "#4ade80",
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        LIVE
                      </motion.span>
                    </div>
                    <p className="text-white/50 text-sm">Personalized recommendations powered by AI</p>
                  </div>
                </div>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4" />
                  </motion.div>
                  Refresh
                </motion.button>
              </div>

              {/* Bento Grid Layout */}
              <div className="grid grid-cols-12 gap-4">
                {/* Featured Suggestion - Large Card */}
                <motion.div
                  className="col-span-12 md:col-span-7 group relative rounded-2xl overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  {/* Card Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.15) 100%)",
                    }}
                  />

                  <div className="relative z-10 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <FileText className="w-6 h-6 text-white" />
                      </motion.div>
                      <motion.span
                        className="px-3 py-1.5 rounded-lg text-[10px] font-bold"
                        style={{
                          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(248, 113, 113, 0.15) 100%)",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          color: "#fca5a5",
                        }}
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        HIGH PRIORITY
                      </motion.span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {aiSuggestions[0]?.title || "Repurpose Your Top Post"}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 leading-relaxed">
                      {aiSuggestions[0]?.description || "Your LinkedIn post about AI in marketing performed 312% above average. Transform it into Twitter threads, Instagram carousels, and more to maximize reach."}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-emerald-400">+312%</p>
                          <p className="text-[10px] text-white/40">Performance</p>
                        </div>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                          <Heart className="w-4 h-4 text-pink-400" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-pink-400">2.4K</p>
                          <p className="text-[10px] text-white/40">Engagements</p>
                        </div>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                          <Eye className="w-4 h-4 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-violet-400">18K</p>
                          <p className="text-[10px] text-white/40">Impressions</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.6)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {aiSuggestions[0]?.actionLabel || "Create Variations"}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Side Cards Stack */}
                <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
                  {/* Timing Suggestion */}
                  <motion.div
                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />

                    <div className="relative z-10 p-5">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                            boxShadow: "0 4px 12px -4px rgba(245, 158, 11, 0.5)",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Clock className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                            {aiSuggestions[1]?.title || "Optimal Posting Window"}
                          </h3>
                          <p className="text-white/50 text-xs leading-relaxed mb-3">
                            {aiSuggestions[1]?.description || "Your LinkedIn audience is most active Tuesdays 9-11 AM. Schedule your next post."}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                              <span className="text-amber-400 text-xs font-semibold">Tue 9:00 AM</span>
                            </div>
                            <motion.span
                              className="flex items-center gap-1 text-amber-400 text-xs font-semibold"
                              whileHover={{ x: 4 }}
                            >
                              Schedule <ArrowRight className="w-3 h-3" />
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Trending Topic */}
                  <motion.div
                    className="group relative rounded-2xl overflow-hidden cursor-pointer flex-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(244, 114, 182, 0.1) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />

                    <div className="relative z-10 p-5">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                            boxShadow: "0 4px 12px -4px rgba(236, 72, 153, 0.5)",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <TrendingUp className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-white group-hover:text-pink-300 transition-colors">
                              {aiSuggestions[2]?.title || "Trending: AI Regulation"}
                            </h3>
                            <motion.span
                              className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              HOT
                            </motion.span>
                          </div>
                          <p className="text-white/50 text-xs leading-relaxed mb-3">
                            {aiSuggestions[2]?.description || "AI regulation is trending in your industry. Create content to capture this momentum."}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex -space-x-1">
                              {["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"].map((color, i) => (
                                <div
                                  key={i}
                                  className="w-5 h-5 rounded-full border-2 border-slate-900"
                                  style={{ background: color }}
                                />
                              ))}
                              <div className="w-5 h-5 rounded-full bg-white/20 border-2 border-slate-900 flex items-center justify-center text-[8px] text-white font-bold">
                                +5
                              </div>
                            </div>
                            <motion.span
                              className="flex items-center gap-1 text-pink-400 text-xs font-semibold"
                              whileHover={{ x: 4 }}
                            >
                              Create <ArrowRight className="w-3 h-3" />
                            </motion.span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Quick Stats */}
              <motion.div
                className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white/40 text-xs">AI analyzing</span>
                    <span className="text-white font-semibold text-xs">847 data points</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-white/40 text-xs">Updated</span>
                    <span className="text-white font-semibold text-xs">2 min ago</span>
                  </div>
                </div>
                <Link href="/dashboard/analytics">
                  <motion.span
                    className="flex items-center gap-1 text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    View all insights
                    <ArrowUpRight className="w-3 h-3" />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Platform Performance - Enhanced */}
          <motion.section
            className="col-span-12 lg:col-span-4 bg-white rounded-2xl border border-slate-100 overflow-hidden"
            style={{ boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)" }}
            variants={itemVariants}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 4px 16px -4px rgba(16, 185, 129, 0.4)",
                  }}
                  whileHover={{ rotate: 5 }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-slate-900 text-lg">Platforms</h2>
                  <p className="text-sm text-slate-500">Performance overview</p>
                </div>
              </div>

              {/* Platforms List */}
              <div className="space-y-5">
                {seedPlatformAnalytics.slice(0, 4).map((platform, index) => {
                  const Icon = platformIcons[platform.platform];
                  const info = PLATFORMS[platform.platform];
                  const maxReach = Math.max(...seedPlatformAnalytics.map(p => parseInt(p.reach.replace(/[^\d]/g, ""))));
                  const currentReach = parseInt(platform.reach.replace(/[^\d]/g, ""));
                  const percentage = (currentReach / maxReach) * 100;

                  return (
                    <motion.div
                      key={platform.platform}
                      className="group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <motion.div
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${info.color}15 0%, ${info.color}25 100%)`,
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="w-4 h-4" style={{ color: info.color }} />
                          </motion.div>
                          <span className="font-semibold text-slate-900">{info.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-bold text-slate-900">{platform.reach}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: info.color }}
                          initial={{ width: 0 }}
                          animate={{ width: mounted ? `${percentage}%` : 0 }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                        />
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-500">{platform.engagementRate} engagement</span>
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{platform.growthPercent}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* View All Button */}
              <Link href="/dashboard/analytics">
                <motion.button
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-all"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  View Full Analytics
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.section>
        </div>

        {/* Bottom CTA Section */}
        <motion.section
          className="relative overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.03) 100%)",
            }}
          />
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-indigo-200/50" />

          {/* Floating Icons Background */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {[Rocket, Sparkles, Target, Heart].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 25}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon className="w-8 h-8 text-indigo-600" />
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-slate-900 text-xl">
                  Ready to grow your audience?
                </h3>
                <p className="text-slate-500">
                  Create AI-optimized content for all platforms in seconds.
                </p>
              </div>
            </div>
            <Link href="/dashboard/create">
              <motion.button
                className="relative flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white text-lg overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 12px 40px -8px rgba(99, 102, 241, 0.6)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                />
                <Sparkles className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Transform Content with AI</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
