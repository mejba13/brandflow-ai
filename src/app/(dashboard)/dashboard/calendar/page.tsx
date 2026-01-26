"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
  MoreHorizontal,
  Zap,
  Target,
  Eye,
  ArrowRight,
  Grid3X3,
  List,
  Filter,
  Sun,
  Moon,
  Sunrise,
  BarChart3,
  Flame,
} from "lucide-react";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedScheduledPosts, seedDashboardStats, seedPlatformAnalytics } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 20 },
  },
};

// Time slot helpers
const getTimeSlot = (time: string): "morning" | "afternoon" | "evening" => {
  const hour = parseInt(time.split(":")[0]);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
};

const timeSlotConfig = {
  morning: { icon: Sunrise, label: "Morning", color: "#f59e0b", range: "6AM - 12PM" },
  afternoon: { icon: Sun, label: "Afternoon", color: "#6366f1", range: "12PM - 5PM" },
  evening: { icon: Moon, label: "Evening", color: "#8b5cf6", range: "5PM - 11PM" },
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 0, 1));
  const [selectedDate, setSelectedDate] = React.useState<string | null>("2024-01-28");
  const [mounted, setMounted] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"calendar" | "timeline">("calendar");
  const [hoveredDay, setHoveredDay] = React.useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getPostsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return seedScheduledPosts.filter((post) => post.scheduledDate === dateStr);
  };

  const getSelectedPosts = () => {
    if (!selectedDate) return [];
    return seedScheduledPosts.filter((post) => post.scheduledDate === selectedDate);
  };

  const selectedPosts = getSelectedPosts();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };

  // Calculate stats
  const totalScheduled = seedScheduledPosts.length;
  const platformCounts = seedScheduledPosts.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get posts by time slot
  const getPostsByTimeSlot = () => {
    const slots = { morning: 0, afternoon: 0, evening: 0 };
    seedScheduledPosts.forEach((post) => {
      const slot = getTimeSlot(post.scheduledTime);
      slots[slot]++;
    });
    return slots;
  };

  const timeSlotStats = getPostsByTimeSlot();

  return (
    <motion.div
      className="space-y-5 pb-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Header with Animated Background */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 40%, #252b4d 70%, #312e81 100%)",
          }}
        />

        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={mounted ? { y: [0, 30, 0], x: [0, -20, 0], scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={mounted ? { y: [0, -25, 0], x: [0, 20, 0] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
            animate={mounted ? { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Floating Calendar Icons */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${15 + i * 20}%`,
                left: `${5 + i * 25}%`,
              }}
              animate={mounted ? {
                y: [-15, 15, -15],
                opacity: [0.1, 0.25, 0.1],
                rotate: [-5, 5, -5],
              } : {}}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <CalendarIcon className="w-6 h-6 text-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    boxShadow: "0 4px 20px -4px rgba(99, 102, 241, 0.5)",
                  }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <CalendarIcon className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-white/50 text-sm font-medium">Strategic Planning</span>
              </div>

              <motion.h1
                className="text-3xl lg:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Content Calendar
              </motion.h1>

              <motion.p
                className="text-white/60 max-w-lg text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Plan, schedule, and visualize your content strategy across all platforms.
                You have <span className="text-white font-semibold">{totalScheduled} posts</span> scheduled
                across <span className="text-emerald-400 font-semibold">{Object.keys(platformCounts).length} platforms</span>.
              </motion.p>

              {/* Quick Stats Pills */}
              <motion.div
                className="flex flex-wrap gap-2 pt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {Object.entries(platformCounts).slice(0, 4).map(([platform, count]) => {
                  const Icon = platformIcons[platform as Platform];
                  const info = PLATFORMS[platform as Platform];
                  return (
                    <motion.div
                      key={platform}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10"
                      whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                      <span className="text-white/70 text-xs font-medium">{count} posts</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex flex-col items-start lg:items-end gap-4">
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10">
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={cn(
                      "p-2.5 rounded-lg transition-all",
                      viewMode === "calendar"
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-white/50 hover:text-white/70"
                    )}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("timeline")}
                    className={cn(
                      "p-2.5 rounded-lg transition-all",
                      viewMode === "timeline"
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-white/50 hover:text-white/70"
                    )}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <Link href="/dashboard/create">
                  <motion.button
                    className="relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white overflow-hidden"
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
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    <Plus className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Schedule Post</span>
                  </motion.button>
                </Link>
              </div>

              {/* Mini Stats Card */}
              <motion.div
                className="flex items-center gap-5 px-5 py-3 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-center">
                  <p className="text-xl font-bold text-white">{seedDashboardStats.postsThisWeek}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">This Week</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-xl font-bold text-emerald-400">{totalScheduled}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Scheduled</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-xl font-bold text-amber-400">9:00 AM</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Best Time</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Stats Grid */}
      <motion.section
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        variants={containerVariants}
      >
        {Object.entries(timeSlotConfig).map(([slot, config], index) => {
          const Icon = config.icon;
          const count = timeSlotStats[slot as keyof typeof timeSlotStats];
          const percentage = totalScheduled > 0 ? Math.round((count / totalScheduled) * 100) : 0;

          return (
            <motion.div
              key={slot}
              className="group relative overflow-hidden rounded-xl bg-white border border-slate-100 hover:border-indigo-100 p-4 cursor-pointer transition-all"
              variants={itemVariants}
              whileHover={{ y: -2, boxShadow: "0 8px 30px -10px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}20 0%, ${config.color}10 100%)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: config.color }} />
                </div>
                <span className="text-xs font-medium text-slate-400">{config.range}</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-0.5">{count}</p>
              <p className="text-xs text-slate-500 font-medium">{config.label} Posts</p>
              <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: config.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* AI Optimization Card */}
        <motion.div
          className="group relative overflow-hidden rounded-xl cursor-pointer"
          variants={itemVariants}
          whileHover={{ y: -2 }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div className="relative z-10 p-4">
            <div className="flex items-start justify-between mb-3">
              <motion.div
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                AI
              </span>
            </div>
            <p className="text-xl font-bold text-white mb-0.5">Optimize</p>
            <p className="text-xs text-white/70 font-medium">Auto-schedule posts</p>
          </div>
        </motion.div>
      </motion.section>

      {/* Main Calendar Section */}
      <div className="grid grid-cols-12 gap-4">
        {/* Calendar Grid - 8 cols */}
        <motion.section
          className="col-span-12 lg:col-span-8"
          variants={itemVariants}
        >
          <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
            {/* Calendar Header */}
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-slate-900">
                    {months[month]} {year}
                  </h2>
                  <motion.span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {totalScheduled} POSTS
                  </motion.span>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={previousMonth}
                    className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Today
                  </motion.button>
                  <motion.button
                    onClick={nextMonth}
                    className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
              {daysOfWeek.map((day, i) => (
                <div
                  key={day}
                  className={cn(
                    "py-3 text-center text-xs font-semibold uppercase tracking-wider",
                    i === 0 || i === 6 ? "text-slate-400" : "text-slate-500"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
                const posts = day ? getPostsForDate(day) : [];
                const isSelected = dateStr === selectedDate;
                const isHovered = hoveredDay === day;
                const hasMultiplePlatforms = new Set(posts.map(p => p.platform)).size > 1;

                return (
                  <motion.button
                    key={index}
                    disabled={!day}
                    onClick={() => day && setSelectedDate(dateStr)}
                    onMouseEnter={() => day && setHoveredDay(day)}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={cn(
                      "relative min-h-[110px] p-2 border-b border-r border-slate-100 text-left transition-all duration-200",
                      day && "hover:bg-gradient-to-br hover:from-indigo-50/50 hover:to-purple-50/30",
                      isSelected && "bg-gradient-to-br from-indigo-50 to-purple-50/50 ring-2 ring-inset ring-indigo-500/20",
                      !day && "bg-slate-50/50"
                    )}
                    whileHover={day ? { scale: 1.01 } : {}}
                  >
                    {day && (
                      <>
                        <div className="flex items-center justify-between mb-1">
                          <motion.span
                            className={cn(
                              "inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-semibold transition-all",
                              isToday(day) && "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/25",
                              !isToday(day) && isSelected && "bg-indigo-100 text-indigo-700",
                              !isToday(day) && !isSelected && "text-slate-700 hover:bg-slate-100"
                            )}
                            whileHover={{ scale: 1.1 }}
                          >
                            {day}
                          </motion.span>
                          {posts.length > 0 && (
                            <motion.div
                              className="flex items-center gap-0.5"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              {hasMultiplePlatforms && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500 text-white">
                                  {posts.length}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>

                        {/* Posts indicators */}
                        <div className="space-y-1">
                          {posts.slice(0, 3).map((post, i) => {
                            const info = PLATFORMS[post.platform];
                            const Icon = platformIcons[post.platform];
                            return (
                              <motion.div
                                key={post.id}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs truncate cursor-pointer group/post"
                                style={{
                                  backgroundColor: `${info.color}10`,
                                  borderLeft: `2px solid ${info.color}`,
                                }}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{
                                  x: 2,
                                  backgroundColor: `${info.color}20`,
                                }}
                              >
                                <Icon className="w-3 h-3 flex-shrink-0" style={{ color: info.color }} />
                                <span className="truncate font-medium" style={{ color: info.color }}>
                                  {post.scheduledTime}
                                </span>
                              </motion.div>
                            );
                          })}
                          {posts.length > 3 && (
                            <motion.div
                              className="text-[10px] text-indigo-600 font-semibold pl-2 flex items-center gap-1"
                              whileHover={{ x: 2 }}
                            >
                              <Plus className="w-3 h-3" />
                              {posts.length - 3} more
                            </motion.div>
                          )}
                        </div>

                        {/* Hover Glow Effect */}
                        <AnimatePresence>
                          {isHovered && posts.length > 0 && (
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              style={{
                                background: "radial-gradient(circle at center, rgba(99,102,241,0.05) 0%, transparent 70%)",
                              }}
                            />
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Sidebar - 4 cols */}
        <motion.section
          className="col-span-12 lg:col-span-4 space-y-4"
          variants={containerVariants}
        >
          {/* Selected Date Posts */}
          <motion.div
            className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm"
            variants={itemVariants}
          >
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
                  }}
                  whileHover={{ rotate: 5 }}
                >
                  <CalendarIcon className="w-5 h-5 text-indigo-600" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    {selectedDate
                      ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {selectedPosts.length} post{selectedPosts.length !== 1 ? "s" : ""} scheduled
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
              {selectedPosts.length === 0 ? (
                <div className="p-8 text-center">
                  <motion.div
                    className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CalendarIcon className="w-6 h-6 text-slate-400" />
                  </motion.div>
                  <p className="text-sm text-slate-500 mb-4">No posts scheduled</p>
                  <Link href="/dashboard/create">
                    <motion.button
                      className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus className="w-4 h-4 inline mr-1" />
                      Add Post
                    </motion.button>
                  </Link>
                </div>
              ) : (
                selectedPosts.map((post, index) => {
                  const Icon = platformIcons[post.platform];
                  const info = PLATFORMS[post.platform];
                  return (
                    <motion.div
                      key={post.id}
                      className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 2 }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}cc 100%)`,
                            boxShadow: `0 4px 12px -4px ${info.color}50`,
                          }}
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {post.content.slice(0, 60)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
                              <Clock className="w-3 h-3" />
                              {post.scheduledTime}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <motion.button
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
                          whileHover={{ scale: 1.1 }}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </motion.div>

          {/* AI Smart Scheduling Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl"
            variants={itemVariants}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
              }}
            />

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
                animate={mounted ? { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                  filter: "blur(25px)",
                }}
                animate={mounted ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] } : {}}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10 p-5">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                  }}
                  whileHover={{ rotate: 10 }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-white">AI Scheduling</h3>
                  <p className="text-xs text-white/50">Optimize your reach</p>
                </div>
              </div>

              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                Let AI analyze your audience's activity and find the best times to post for maximum engagement.
              </p>

              {/* Best Times Preview */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { day: "Tue", time: "9 AM", score: 95 },
                  { day: "Thu", time: "2 PM", score: 88 },
                  { day: "Sat", time: "11 AM", score: 82 },
                ].map((slot, i) => (
                  <motion.div
                    key={i}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <p className="text-[10px] text-white/40 uppercase tracking-wide">{slot.day}</p>
                    <p className="text-sm font-bold text-white">{slot.time}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">{slot.score}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors border border-white/10 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Zap className="w-4 h-4" />
                Optimize Schedule
              </motion.button>
            </div>
          </motion.div>

          {/* Platform Distribution */}
          <motion.div
            className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm p-5"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Platform Mix</h3>
                <p className="text-xs text-slate-500">Distribution of posts</p>
              </div>
            </div>

            <div className="space-y-3">
              {seedPlatformAnalytics.slice(0, 4).map((platform, i) => {
                const Icon = platformIcons[platform.platform];
                const info = PLATFORMS[platform.platform];
                const count = platformCounts[platform.platform] || 0;
                const percentage = totalScheduled > 0 ? Math.round((count / totalScheduled) * 100) : 0;

                return (
                  <motion.div
                    key={platform.platform}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center"
                          style={{ background: `${info.color}15` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{info.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: info.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* All Scheduled Posts - Timeline View */}
      <motion.section
        className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm"
        variants={itemVariants}
      >
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
                }}
              >
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Upcoming Schedule</h2>
                <p className="text-sm text-slate-500">All scheduled posts for this month</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-4 h-4" />
              Filter
            </motion.button>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {seedScheduledPosts.map((post, index) => {
            const Icon = platformIcons[post.platform];
            const info = PLATFORMS[post.platform];
            const date = new Date(post.scheduledDate + "T00:00:00");
            const isFirst = index === 0;

            return (
              <motion.div
                key={post.id}
                className={cn(
                  "p-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group cursor-pointer",
                  isFirst && "bg-gradient-to-r from-indigo-50/50 to-transparent"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                {/* Date Column */}
                <div className="text-center w-16 flex-shrink-0">
                  <p className="text-xs text-slate-400 uppercase tracking-wide">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </p>
                  <p className="text-2xl font-bold text-slate-900">{date.getDate()}</p>
                  <p className="text-xs text-slate-500">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </p>
                </div>

                {/* Timeline Line */}
                <div className="flex flex-col items-center self-stretch">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full flex-shrink-0",
                      isFirst ? "bg-indigo-500" : "bg-slate-300"
                    )}
                  />
                  <div className="w-0.5 flex-1 bg-slate-200" />
                </div>

                {/* Content */}
                <div className="flex-1 flex items-center gap-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${info.color} 0%, ${info.color}cc 100%)`,
                      boxShadow: `0 4px 16px -4px ${info.color}50`,
                    }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                        {post.title}
                      </h3>
                      {isFirst && (
                        <motion.span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500 text-white"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          NEXT UP
                        </motion.span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="font-medium" style={{ color: info.color }}>{info.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.scheduledTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-3">
                  <motion.span
                    className="px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%)",
                      border: "1px solid rgba(245, 158, 11, 0.2)",
                      color: "#d97706",
                    }}
                  >
                    Scheduled
                  </motion.span>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <div className="p-4 border-t border-slate-100">
          <motion.button
            className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-500 hover:text-indigo-600 font-semibold text-sm transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.995 }}
          >
            <Eye className="w-4 h-4" />
            View All Scheduled Posts
          </motion.button>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(168, 85, 247, 0.04) 50%, rgba(236, 72, 153, 0.03) 100%)",
          }}
        />
        <div className="absolute inset-0 rounded-2xl border border-indigo-100" />

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {[CalendarIcon, Clock, Sparkles, Target].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
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

        <div className="relative z-10 px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-7 h-7 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Ready to supercharge your content strategy?
              </h3>
              <p className="text-slate-500 text-sm">
                Create and schedule AI-optimized posts across all platforms in minutes.
              </p>
            </div>
          </div>
          <Link href="/dashboard/create">
            <motion.button
              className="relative flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white overflow-hidden whitespace-nowrap"
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
              <Plus className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Create New Post</span>
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
