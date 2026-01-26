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

// Transform seed data into dashboard stats
const stats = [
  {
    label: "Scheduled Posts",
    value: seedDashboardStats.postsScheduled,
    change: 18,
    icon: Calendar,
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    shadow: "rgba(99, 102, 241, 0.4)",
  },
  {
    label: "Published This Month",
    value: seedDashboardStats.postsThisWeek * 4,
    change: 12,
    icon: FileText,
    gradient: "from-[#10b981] to-[#34d399]",
    shadow: "rgba(16, 185, 129, 0.4)",
  },
  {
    label: "Engagement Rate",
    value: seedDashboardStats.engagementRate,
    change: seedAnalyticsSummary.engagementChange,
    icon: TrendingUp,
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    shadow: "rgba(245, 158, 11, 0.4)",
  },
  {
    label: "Followers Gained",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    icon: Users,
    gradient: "from-[#ec4899] to-[#f472b6]",
    shadow: "rgba(236, 72, 153, 0.4)",
  },
];

// Get upcoming scheduled posts
const upcomingPosts = seedScheduledPosts.slice(0, 4);

// AI Suggestions from seed data
const aiSuggestions = seedAISuggestions.slice(0, 3);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false);
  const creditsPercent = (seedDashboardStats.aiCreditsUsed / seedDashboardStats.aiCreditsTotal) * 100;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header with Gradient */}
      <motion.div
        className="relative overflow-hidden rounded-3xl p-8"
        variants={itemVariants}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
            animate={mounted ? {
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            }}
            animate={mounted ? {
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.15, 1],
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[#e2e8f0] text-sm font-medium">Good morning,</span>
              <motion.div
                className="px-3 py-1 rounded-full bg-[#10b981]/30 text-[#4ade80] text-xs font-bold flex items-center gap-1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>7 day streak</span>
              </motion.div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3 drop-shadow-lg">
              Welcome back, {seedCurrentUser.firstName}!
            </h1>
            <p className="text-[#e2e8f0] max-w-xl text-base leading-relaxed">
              Your content is performing great. You have{" "}
              <span className="text-white font-bold">{seedDashboardStats.postsScheduled} posts</span> scheduled
              and your engagement is up{" "}
              <span className="text-[#4ade80] font-bold">{seedAnalyticsSummary.engagementChange}%</span> this month.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/dashboard/analytics">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-medium"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </motion.div>
            </Link>
            <Link href="/dashboard/create">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="relative overflow-hidden group font-medium"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                    boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <Plus className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Create Post</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Bento Stats Grid */}
      <motion.div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm border border-[#e2e8f0] hover:shadow-xl hover:border-[#6366f1]/20 transition-all duration-300"
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
            >
              <motion.div variants={cardHoverVariants}>
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg`}
                    style={{
                      boxShadow: `0 8px 24px -8px ${stat.shadow}`,
                    }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-semibold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 500 }}
                  >
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}%
                  </motion.div>
                </div>
                <motion.p
                  className="text-3xl font-bold text-[#0f172a] mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
                </motion.p>
                <p className="text-sm text-[#64748b] font-medium">{stat.label}</p>
              </motion.div>

              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${stat.gradient.split(" ")[0].replace("from-[", "").replace("]", "")} 0%, ${stat.gradient.split(" ")[1].replace("to-[", "").replace("]", "")} 100%)`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* AI Credits Card - Spans 4 cols */}
        <motion.div
          className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-2xl p-6"
          variants={itemVariants}
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
              }}
              animate={mounted ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <p className="text-white font-semibold text-lg">AI Credits</p>
                <p className="text-white/60 text-sm">Monthly allocation</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-end justify-between mb-3">
                <motion.span
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {seedDashboardStats.aiCreditsUsed.toLocaleString()}
                </motion.span>
                <span className="text-white/60 text-sm font-medium">
                  / {seedDashboardStats.aiCreditsTotal.toLocaleString()}
                </span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: mounted ? `${creditsPercent}%` : 0 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-white/70 text-sm font-medium">
                {Math.round(100 - creditsPercent)}% remaining
              </span>
              <Link
                href="/dashboard/settings"
                className="text-[#a855f7] text-sm font-semibold hover:text-[#c084fc] transition-colors flex items-center gap-1"
              >
                Upgrade
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Posts - Spans 8 cols */}
        <motion.div
          className="col-span-12 lg:col-span-8 rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0]"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10">
                <Clock className="w-5 h-5 text-[#6366f1]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0f172a]">Upcoming Posts</h2>
                <p className="text-sm text-[#64748b]">Next 7 days schedule</p>
              </div>
            </div>
            <Link
              href="/dashboard/calendar"
              className="text-[#6366f1] text-sm font-semibold hover:text-[#4f46e5] transition-colors flex items-center gap-1"
            >
              View Calendar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingPosts.map((post, index) => {
              const Icon = platformIcons[post.platform];
              const platformInfo = PLATFORMS[post.platform];
              return (
                <motion.div
                  key={post.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 4 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${platformInfo.color}15` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-5 h-5" style={{ color: platformInfo.color }} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#0f172a] truncate group-hover:text-[#6366f1] transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <span className="font-medium">{platformInfo.name}</span>
                      <span>•</span>
                      <span>{new Date(post.scheduledDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span>•</span>
                      <span>{post.scheduledTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f59e0b]/10 text-[#f59e0b]">
                      Scheduled
                    </span>
                    <motion.button
                      className="p-2 rounded-lg hover:bg-white text-[#64748b] hover:text-[#0f172a] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {upcomingPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#94a3b8]" />
              </div>
              <p className="text-[#64748b] mb-4">No upcoming posts scheduled</p>
              <Link href="/dashboard/create">
                <Button variant="secondary" size="sm">
                  Create your first post
                </Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* AI Suggestions - Spans 8 cols */}
        <motion.div
          className="col-span-12 lg:col-span-8 rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0]"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(99, 102, 241, 0)",
                    "0 0 0 8px rgba(99, 102, 241, 0.1)",
                    "0 0 0 0 rgba(99, 102, 241, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="text-lg font-bold text-[#0f172a]">AI Suggestions</h2>
                <p className="text-sm text-[#64748b]">Personalized recommendations</p>
              </div>
            </div>
            <motion.button
              className="text-[#6366f1] text-sm font-semibold hover:text-[#4f46e5] transition-colors flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Refresh
              <Sparkles className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                className="group p-4 rounded-xl border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <motion.div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      suggestion.type === "content" ? "bg-[#6366f1]/10" :
                      suggestion.type === "timing" ? "bg-[#f59e0b]/10" :
                      suggestion.type === "trending" ? "bg-[#ec4899]/10" :
                      "bg-[#10b981]/10"
                    }`}
                    whileHover={{ rotate: 10 }}
                  >
                    {suggestion.type === "content" && <FileText className="w-4 h-4 text-[#6366f1]" />}
                    {suggestion.type === "timing" && <Clock className="w-4 h-4 text-[#f59e0b]" />}
                    {suggestion.type === "trending" && <TrendingUp className="w-4 h-4 text-[#ec4899]" />}
                    {suggestion.type === "engagement" && <Target className="w-4 h-4 text-[#10b981]" />}
                  </motion.div>
                  {suggestion.priority === "high" && (
                    <motion.span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#ef4444]/10 text-[#ef4444]"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      High Priority
                    </motion.span>
                  )}
                </div>
                <h3 className="font-semibold text-[#0f172a] mb-2 group-hover:text-[#6366f1] transition-colors">
                  {suggestion.title}
                </h3>
                <p className="text-sm text-[#64748b] line-clamp-2 mb-3">
                  {suggestion.description}
                </p>
                <motion.button
                  className="text-[#6366f1] text-sm font-semibold hover:text-[#4f46e5] transition-colors flex items-center gap-1"
                  whileHover={{ x: 4 }}
                >
                  {suggestion.actionLabel}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Performance - Spans 4 cols */}
        <motion.div
          className="col-span-12 lg:col-span-4 rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0]"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#10b981]/10 to-[#34d399]/10">
              <BarChart3 className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">Platforms</h2>
              <p className="text-sm text-[#64748b]">Performance overview</p>
            </div>
          </div>

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
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon className="w-4 h-4" style={{ color: info.color }} />
                      </motion.div>
                      <span className="font-semibold text-[#0f172a]">{info.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-[#94a3b8]" />
                      <span className="text-sm font-bold text-[#0f172a]">{platform.reach}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-[#f1f5f9] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: info.color,
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: mounted ? `${percentage}%` : 0 }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-[#64748b] font-medium">{platform.engagementRate} engagement</span>
                    <span className="text-xs text-[#10b981] font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      {platform.growthPercent}%
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Link
            href="/dashboard/analytics"
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:bg-[#f8fafc] text-[#64748b] hover:text-[#6366f1] font-semibold text-sm transition-all"
          >
            View Full Analytics
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions CTA */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-8"
        variants={itemVariants}
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.1)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
            animate={mounted ? {
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              }}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-[#0f172a]">
                Ready to grow your audience?
              </h3>
              <p className="text-[#64748b] mt-1">
                Create AI-optimized content for all your social platforms in seconds.
              </p>
            </div>
          </div>
          <Link href="/dashboard/create">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="relative overflow-hidden group whitespace-nowrap font-semibold"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Transform Content with AI</span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
