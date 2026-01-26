"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

// KPI Stats configuration
const stats = [
  {
    label: "Scheduled Posts",
    value: seedDashboardStats.postsScheduled,
    change: 18,
    icon: Calendar,
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-500/10 to-violet-500/10",
    iconBg: "bg-indigo-500",
    shadowColor: "rgba(99, 102, 241, 0.25)",
  },
  {
    label: "Published This Month",
    value: seedDashboardStats.postsThisWeek * 4,
    change: 12,
    icon: FileText,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 to-teal-500/10",
    iconBg: "bg-emerald-500",
    shadowColor: "rgba(16, 185, 129, 0.25)",
  },
  {
    label: "Engagement Rate",
    value: seedDashboardStats.engagementRate,
    change: seedAnalyticsSummary.engagementChange,
    icon: TrendingUp,
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    iconBg: "bg-amber-500",
    shadowColor: "rgba(245, 158, 11, 0.25)",
  },
  {
    label: "Followers Gained",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    icon: Users,
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-500/10 to-rose-500/10",
    iconBg: "bg-pink-500",
    shadowColor: "rgba(236, 72, 153, 0.25)",
  },
];

const upcomingPosts = seedScheduledPosts.slice(0, 4);
const aiSuggestions = seedAISuggestions.slice(0, 3);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
    },
  },
};

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false);
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

  return (
    <motion.div
      className="space-y-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Welcome Section */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 50%, #252b4d 100%)",
          }}
        />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={mounted ? {
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={mounted ? {
              y: [0, -25, 0],
              x: [0, 20, 0],
              scale: [1, 1.15, 1],
            } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-sm font-medium">{getTimeOfDay()},</span>
                <motion.div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)",
                    color: "#4ade80",
                    border: "1px solid rgba(74, 222, 128, 0.2)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Flame className="w-3.5 h-3.5" />
                  7 day streak
                </motion.div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Welcome back, {seedCurrentUser.firstName}!
              </h1>

              <p className="text-white/60 max-w-lg text-sm leading-relaxed">
                Your content is performing well. You have{" "}
                <span className="text-white font-medium">{seedDashboardStats.postsScheduled} posts</span> scheduled
                and engagement is up{" "}
                <span className="text-emerald-400 font-medium">+{seedAnalyticsSummary.engagementChange}%</span> this month.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/analytics">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    variant="secondary"
                    className="bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 font-medium h-10"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard/create">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="relative overflow-hidden group font-medium h-10"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                      boxShadow: "0 4px 20px -4px rgba(99, 102, 241, 0.4)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    <Plus className="w-4 h-4 mr-2 relative z-10" />
                    <span className="relative z-10">Create Post</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="group relative bg-white rounded-xl p-5 border border-slate-100 hover:border-slate-200 transition-all duration-300"
              variants={itemVariants}
              whileHover={{
                y: -2,
                boxShadow: `0 12px 24px -8px ${stat.shadowColor}`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.gradient}`}
                  style={{ boxShadow: `0 4px 12px -2px ${stat.shadowColor}` }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 400 }}
                >
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}%
                </motion.div>
              </div>
              <motion.p
                className="text-2xl font-bold text-slate-900 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </motion.p>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* AI Credits Card */}
        <motion.section
          className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-xl"
          variants={itemVariants}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 100%)",
            }}
          />

          {/* Animated Glow */}
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
            animate={mounted ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 p-5">
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                  boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.4)",
                }}
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Zap className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className="text-white font-semibold">AI Credits</p>
                <p className="text-white/50 text-xs">Monthly allocation</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <motion.span
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {seedDashboardStats.aiCreditsUsed.toLocaleString()}
                </motion.span>
                <span className="text-white/40 text-sm">
                  / {seedDashboardStats.aiCreditsTotal.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${creditsPercent}%` : 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <span className="text-white/50 text-sm">
                {creditsRemaining.toLocaleString()} remaining
              </span>
              <Link
                href="/dashboard/settings"
                className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                Upgrade
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Upcoming Posts */}
        <motion.section
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-100 p-5"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-50">
                <Clock className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Upcoming Posts</h2>
                <p className="text-xs text-slate-500">Next 7 days</p>
              </div>
            </div>
            <Link
              href="/dashboard/calendar"
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors flex items-center gap-1"
            >
              View Calendar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-2">
            {upcomingPosts.map((post, index) => {
              const Icon = platformIcons[post.platform];
              const platformInfo = PLATFORMS[post.platform];
              return (
                <motion.div
                  key={post.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 2 }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${platformInfo.color}12` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: platformInfo.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span>{platformInfo.name}</span>
                      <span className="text-slate-300">•</span>
                      <span>{new Date(post.scheduledDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span className="text-slate-300">•</span>
                      <span>{post.scheduledTime}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-600">
                    Scheduled
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </motion.div>
              );
            })}
          </div>

          {upcomingPosts.length === 0 && (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm mb-3">No upcoming posts</p>
              <Link href="/dashboard/create">
                <Button variant="secondary" size="sm">
                  Create your first post
                </Button>
              </Link>
            </div>
          )}
        </motion.section>

        {/* AI Suggestions */}
        <motion.section
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-100 p-5"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(99, 102, 241, 0)",
                    "0 0 0 6px rgba(99, 102, 241, 0.1)",
                    "0 0 0 0 rgba(99, 102, 241, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <h2 className="font-semibold text-slate-900">AI Suggestions</h2>
                <p className="text-xs text-slate-500">Personalized recommendations</p>
              </div>
            </div>
            <motion.button
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Refresh
              <Sparkles className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                className="group p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      suggestion.type === "content" ? "bg-indigo-100" :
                      suggestion.type === "timing" ? "bg-amber-100" :
                      suggestion.type === "trending" ? "bg-pink-100" :
                      "bg-emerald-100"
                    }`}
                  >
                    {suggestion.type === "content" && <FileText className="w-4 h-4 text-indigo-600" />}
                    {suggestion.type === "timing" && <Clock className="w-4 h-4 text-amber-600" />}
                    {suggestion.type === "trending" && <TrendingUp className="w-4 h-4 text-pink-600" />}
                    {suggestion.type === "engagement" && <Target className="w-4 h-4 text-emerald-600" />}
                  </div>
                  {suggestion.priority === "high" && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-600">
                      Priority
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                  {suggestion.description}
                </p>
                <span className="text-indigo-600 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  {suggestion.actionLabel}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Platform Performance */}
        <motion.section
          className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-100 p-5"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-emerald-50">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Platforms</h2>
              <p className="text-xs text-slate-500">Performance overview</p>
            </div>
          </div>

          <div className="space-y-4">
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
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}12` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                      </div>
                      <span className="font-medium text-slate-900 text-sm">{info.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3 h-3 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-900">{platform.reach}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: info.color }}
                      initial={{ width: 0 }}
                      animate={{ width: mounted ? `${percentage}%` : 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[11px] text-slate-500">{platform.engagementRate} engagement</span>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {platform.growthPercent}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Link
            href="/dashboard/analytics"
            className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-600 hover:text-indigo-600 font-medium text-sm transition-all"
          >
            View Full Analytics
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.section>
      </div>

      {/* CTA Section */}
      <motion.section
        className="relative overflow-hidden rounded-xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%)",
          }}
        />
        <div className="absolute inset-0 border border-indigo-100 rounded-xl" />

        <div className="relative z-10 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.4)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lightbulb className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Ready to grow your audience?
              </h3>
              <p className="text-slate-500 text-sm">
                Create AI-optimized content for all platforms in seconds.
              </p>
            </div>
          </div>
          <Link href="/dashboard/create">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="relative overflow-hidden group font-medium whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                  boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.4)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Transform Content with AI</span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
