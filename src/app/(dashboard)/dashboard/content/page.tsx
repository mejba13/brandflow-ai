"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Eye,
  Edit3,
  Trash2,
  Copy,
  FileText,
  MoreHorizontal,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Zap,
  Star,
  ArrowRight,
  Grid3X3,
  List,
  ChevronDown,
  PenTool,
  Send,
  CheckCircle2,
  Layers,
  X,
  TrendingUp,
  Target,
  BarChart3,
  Bookmark,
  Filter,
  ArrowUpRight,
  Wand2,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedContentLibrary } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

const statusConfig = {
  draft: {
    label: "Draft",
    icon: PenTool,
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    dot: "bg-slate-400",
    gradient: "from-slate-400 to-slate-600",
    glow: "rgba(100, 116, 139, 0.3)",
  },
  scheduled: {
    label: "Scheduled",
    icon: Clock,
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
    gradient: "from-amber-400 to-orange-500",
    glow: "rgba(245, 158, 11, 0.3)",
  },
  published: {
    label: "Published",
    icon: CheckCircle2,
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    gradient: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.3)",
  },
};

// Premium animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};


export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [mounted, setMounted] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Get all unique tags
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    seedContentLibrary.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredContent = seedContentLibrary.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);
    return matchesSearch && matchesStatus && matchesTag;
  });

  const statusCounts = {
    all: seedContentLibrary.length,
    draft: seedContentLibrary.filter((c) => c.status === "draft").length,
    scheduled: seedContentLibrary.filter((c) => c.status === "scheduled").length,
    published: seedContentLibrary.filter((c) => c.status === "published").length,
  };

  // Get featured content (first published item or first item)
  const featuredContent = seedContentLibrary.find((c) => c.status === "published") || seedContentLibrary[0];

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Premium Hero Header */}
      <motion.section
        className="relative overflow-hidden rounded-3xl"
        variants={itemVariants}
      >
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #030712 0%, #0f172a 40%, #1e1b4b 70%, #0f172a 100%)",
            }}
          />
          {/* Mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 20% 40%, rgba(4, 104, 215, 0.25) 0%, transparent 50%),
                radial-gradient(ellipse 60% 40% at 80% 60%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse 50% 30% at 50% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(4, 104, 215, 0.3) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={mounted ? {
              y: [0, 30, 0],
              x: [0, -20, 0],
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.8, 0.6]
            } : {}}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={mounted ? { y: [0, -25, 0], x: [0, 20, 0] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={mounted ? { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Floating particles */}
          {mounted && [...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-5">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0468D7 0%, #6366f1 100%)",
                  }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Layers className="w-3.5 h-3.5 text-white" />
                </motion.div>
                <span className="text-white/70 text-sm font-medium tracking-wide">Content Hub</span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </motion.div>

              {/* Title */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight">
                  Content Library
                </h1>
                <p className="text-white/50 max-w-lg text-base leading-relaxed">
                  Your creative command center. Manage{" "}
                  <span className="text-white/80 font-semibold">{seedContentLibrary.length} pieces</span>{" "}
                  of content across all platforms with AI-powered insights.
                </p>
              </div>

              {/* Quick Stats Pills */}
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { icon: TrendingUp, label: "12% more engagement", color: "#10b981" },
                  { icon: Target, label: "6 platforms", color: "#0468D7" },
                  { icon: Flame, label: "3 trending", color: "#f59e0b" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                    <span className="text-white/60 text-xs font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-white/70 hover:text-white transition-colors"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Wand2 className="w-4 h-4" />
                <span className="text-sm font-medium">AI Assist</span>
              </motion.button>

              <Link href="/dashboard/create">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    className="relative overflow-hidden group font-semibold h-12 px-6"
                    style={{
                      background: "linear-gradient(135deg, #0468D7 0%, #1A68D3 50%, #6366f1 100%)",
                      boxShadow: "0 8px 32px -8px rgba(4, 104, 215, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                      }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <Plus className="w-5 h-5 mr-2 relative z-10" strokeWidth={2.5} />
                    <span className="relative z-10">Create Content</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Stats Grid - Premium Design */}
      <motion.section
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
      >
        {[
          {
            label: "All Content",
            value: statusCounts.all,
            status: null,
            icon: Layers,
            gradient: "from-[#0468D7] via-[#1A68D3] to-[#6366f1]",
            shadowColor: "rgba(4, 104, 215, 0.4)",
            bgGlow: "rgba(4, 104, 215, 0.1)",
            description: "Total library",
            trend: "+8%",
          },
          {
            label: "Drafts",
            value: statusCounts.draft,
            status: "draft",
            icon: PenTool,
            gradient: "from-slate-500 to-slate-600",
            shadowColor: "rgba(100, 116, 139, 0.3)",
            bgGlow: "rgba(100, 116, 139, 0.08)",
            description: "In progress",
            trend: null,
          },
          {
            label: "Scheduled",
            value: statusCounts.scheduled,
            status: "scheduled",
            icon: Clock,
            gradient: "from-amber-400 to-orange-500",
            shadowColor: "rgba(245, 158, 11, 0.35)",
            bgGlow: "rgba(245, 158, 11, 0.1)",
            description: "Ready to post",
            trend: "+2",
          },
          {
            label: "Published",
            value: statusCounts.published,
            status: "published",
            icon: Send,
            gradient: "from-emerald-400 to-teal-500",
            shadowColor: "rgba(16, 185, 129, 0.35)",
            bgGlow: "rgba(16, 185, 129, 0.1)",
            description: "Live content",
            trend: "+15%",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isActive = selectedStatus === stat.status || (stat.status === null && !selectedStatus);

          return (
            <motion.button
              key={stat.label}
              onClick={() => setSelectedStatus(stat.status)}
              className={cn(
                "relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 group",
                isActive
                  ? "ring-2 ring-[#0468D7]/40 shadow-xl"
                  : "hover:shadow-lg"
              )}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${stat.bgGlow} 0%, rgba(255,255,255,0.98) 100%)`
                  : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 100%)",
                border: "1px solid rgba(0,0,0,0.05)",
              }}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${stat.bgGlow} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient}`}
                    style={{ boxShadow: `0 6px 20px -4px ${stat.shadowColor}` }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  {stat.trend && (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-700">{stat.label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stat.description}</p>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0468D7] to-[#6366f1]"
                  layoutId="activeIndicator"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.section>

      {/* Premium Search & Filters Bar */}
      <motion.section
        className="relative overflow-hidden rounded-2xl p-1"
        style={{
          background: "linear-gradient(135deg, rgba(4, 104, 215, 0.08) 0%, rgba(99, 102, 241, 0.05) 100%)",
        }}
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row gap-3 p-4 bg-white/80 backdrop-blur-xl rounded-xl">
          {/* Search Input */}
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#0468D7] transition-colors" />
            <input
              type="text"
              placeholder="Search content, tags, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50/50 focus:border-[#0468D7] focus:bg-white focus:ring-4 focus:ring-[#0468D7]/10 outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 font-medium"
            />
            {searchQuery && (
              <motion.button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          {/* Filters Row */}
          <div className="flex items-center gap-3">
            {/* Tags Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all",
                  selectedTag
                    ? "bg-[#0468D7]/10 text-[#0468D7] border-2 border-[#0468D7]/20"
                    : "bg-slate-50 text-slate-600 border-2 border-transparent hover:bg-slate-100"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Tag className="w-4 h-4" />
                {selectedTag || "All Tags"}
                <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
              </motion.button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl border border-slate-100 shadow-2xl z-30 py-2 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => { setSelectedTag(null); setShowFilters(false); }}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-3",
                        !selectedTag ? "text-[#0468D7] font-semibold bg-[#0468D7]/5" : "text-slate-600"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        !selectedTag ? "bg-[#0468D7]" : "bg-slate-300"
                      )} />
                      All Tags
                    </button>
                    {allTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => { setSelectedTag(tag); setShowFilters(false); }}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-3",
                          selectedTag === tag ? "text-[#0468D7] font-semibold bg-[#0468D7]/5" : "text-slate-600"
                        )}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          selectedTag === tag ? "bg-[#0468D7]" : "bg-slate-300"
                        )} />
                        {tag}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle - Premium */}
            <div className="flex items-center gap-1 p-1.5 bg-slate-100 rounded-xl">
              {[
                { mode: "grid" as const, icon: Grid3X3 },
                { mode: "list" as const, icon: List },
              ].map(({ mode, icon: Icon }) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    "p-2.5 rounded-lg transition-all",
                    viewMode === mode
                      ? "bg-white shadow-md text-[#0468D7]"
                      : "text-slate-400 hover:text-slate-600"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Content Banner - Premium Glassmorphism */}
      {featuredContent && !searchQuery && !selectedStatus && !selectedTag && (
        <motion.section
          className="relative overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(4, 104, 215, 0.08) 0%, rgba(99, 102, 241, 0.05) 50%, rgba(139, 92, 246, 0.03) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: "radial-gradient(ellipse at 0% 50%, rgba(4, 104, 215, 0.15) 0%, transparent 50%)",
            }}
          />
          <div className="absolute inset-0 border border-[#0468D7]/10 rounded-2xl" />

          <div className="relative z-10 p-6 flex items-center gap-5">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #0468D7 0%, #6366f1 100%)",
                boxShadow: "0 8px 24px -4px rgba(4, 104, 215, 0.4)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Star className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-[#0468D7] uppercase tracking-wider">Featured Content</span>
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-[11px] font-semibold",
                  statusConfig[featuredContent.status].bg,
                  statusConfig[featuredContent.status].text
                )}>
                  {statusConfig[featuredContent.status].label}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-1 truncate">{featuredContent.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{featuredContent.sourceContent.slice(0, 120)}...</p>
            </div>
            <Link href={`/dashboard/content/${featuredContent.id}`}>
              <motion.button
                className="px-5 py-3 rounded-xl text-sm font-semibold text-white flex items-center gap-2 whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #0468D7 0%, #1A68D3 100%)",
                  boxShadow: "0 4px 16px -4px rgba(4, 104, 215, 0.4)",
                }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 24px -4px rgba(4, 104, 215, 0.5)" }}
                whileTap={{ scale: 0.97 }}
              >
                View Content
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Content Grid - Premium Cards */}
      <motion.section
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            : "space-y-4"
        )}
        variants={containerVariants}
      >
        {filteredContent.map((item) => {
          const status = statusConfig[item.status];
          const StatusIcon = status.icon;
          const excerpt = item.sourceContent.slice(0, 120) + (item.sourceContent.length > 120 ? "..." : "");
          const isHovered = hoveredCard === item.id;

          if (viewMode === "list") {
            return (
              <motion.div
                key={item.id}
                className="group relative flex items-center gap-5 p-5 bg-white rounded-2xl border border-slate-100 hover:border-[#0468D7]/20 transition-all duration-300"
                variants={itemVariants}
                onHoverStart={() => setHoveredCard(item.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ x: 4, boxShadow: "0 8px 30px -10px rgba(4, 104, 215, 0.15)" }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br",
                  status.gradient
                )}
                  style={{ boxShadow: `0 4px 16px -4px ${status.glow}` }}
                >
                  <StatusIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-slate-900 truncate group-hover:text-[#0468D7] transition-colors">
                      {item.title}
                    </h3>
                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-semibold flex-shrink-0", status.bg, status.text)}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {item.platforms.slice(0, 4).map((platform) => {
                        const Icon = platformIcons[platform];
                        return <Icon key={platform} className="w-4 h-4" style={{ color: PLATFORMS[platform].color }} />;
                      })}
                    </span>
                  </div>
                </div>
                <motion.div
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: 10 }}
                  animate={{ x: isHovered ? 0 : 10 }}
                >
                  <button className="p-2.5 rounded-lg hover:bg-[#0468D7]/10 text-slate-400 hover:text-[#0468D7] transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-lg hover:bg-[#0468D7]/10 text-slate-400 hover:text-[#0468D7] transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={item.id}
              className="group relative bg-white rounded-2xl border border-slate-100 hover:border-[#0468D7]/20 transition-all duration-500 overflow-hidden"
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, rgba(4, 104, 215, 0.1) 0%, transparent 50%, rgba(99, 102, 241, 0.05) 100%)`,
                }}
              />

              {/* Status gradient bar */}
              <div className={cn("h-1.5 bg-gradient-to-r", status.gradient)} />

              {/* Card content */}
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <motion.span
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold",
                      status.bg, status.text
                    )}
                    whileHover={{ scale: 1.05 }}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status.label}
                  </motion.span>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2 group-hover:text-[#0468D7] transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 line-clamp-2 mb-5 leading-relaxed">
                  {excerpt}
                </p>

                {/* Platforms */}
                <div className="flex items-center gap-2 mb-5">
                  {item.platforms.map((platform) => {
                    const Icon = platformIcons[platform];
                    const info = PLATFORMS[platform];
                    return (
                      <motion.div
                        key={platform}
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${info.color}10`,
                          border: `1px solid ${info.color}20`,
                        }}
                        title={info.name}
                        whileHover={{ scale: 1.15, y: -2 }}
                      >
                        <Icon className="w-4 h-4" style={{ color: info.color }} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 text-slate-600 font-medium hover:bg-[#0468D7]/10 hover:text-[#0468D7] transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-gradient-to-r from-slate-50/80 to-white flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {item.scheduledFor && (
                    <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
                      <Clock className="w-4 h-4" />
                      {item.scheduledFor}
                    </span>
                  )}
                </div>

                <motion.div
                  className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all"
                  initial={{ x: 10 }}
                  animate={{ x: isHovered ? 0 : 10 }}
                >
                  <motion.button
                    className="p-2 rounded-lg hover:bg-[#0468D7]/10 text-slate-400 hover:text-[#0468D7] transition-all"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-[#0468D7]/10 text-slate-400 hover:text-[#0468D7] transition-all"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-[#0468D7]/10 text-slate-400 hover:text-[#0468D7] transition-all"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Empty State - Premium */}
      <AnimatePresence>
        {filteredContent.length === 0 && (
          <motion.div
            className="relative overflow-hidden text-center py-20 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(4, 104, 215, 0.1) 0%, transparent 50%)",
              }}
            />
            <motion.div
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(4, 104, 215, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)",
                border: "1px solid rgba(4, 104, 215, 0.1)",
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FileText className="w-8 h-8 text-[#0468D7]" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">No content found</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Try adjusting your search or filters, or create new content to get started.
            </p>
            <Link href="/dashboard/create">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="relative overflow-hidden group h-12 px-6 font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #0468D7 0%, #1A68D3 50%, #6366f1 100%)",
                    boxShadow: "0 8px 32px -8px rgba(4, 104, 215, 0.4)",
                  }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create your first content
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stats */}
      {filteredContent.length > 0 && (
        <motion.section
          className="flex items-center justify-between py-2"
          variants={itemVariants}
        >
          <p className="text-sm text-slate-500">
            Showing <span className="font-bold text-slate-900">{filteredContent.length}</span> of{" "}
            <span className="font-bold text-slate-900">{seedContentLibrary.length}</span> items
          </p>
          <button className="flex items-center gap-2 text-[#0468D7] font-semibold text-sm hover:text-[#1A68D3] transition-colors group">
            <Filter className="w-4 h-4" />
            Advanced Filters
            <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.section>
      )}

      {/* Bottom CTA - Premium Glassmorphism */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #030712 0%, #0f172a 40%, #1e1b4b 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 20% 50%, rgba(4, 104, 215, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 80% 60%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated particles */}
        {mounted && [...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="relative z-10 px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <motion.div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #0468D7 0%, #6366f1 100%)",
                boxShadow: "0 8px 32px -8px rgba(4, 104, 215, 0.6)",
              }}
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-bold text-white text-lg">
                Need fresh content ideas?
              </h3>
              <p className="text-white/50 text-sm">
                Let AI generate engaging content optimized for every platform.
              </p>
            </div>
          </div>
          <Link href="/dashboard/create">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="relative overflow-hidden group font-semibold whitespace-nowrap h-12 px-6"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0468D7] to-[#6366f1]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <Zap className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Generate with AI</span>
                <ArrowRight className="w-4 h-4 ml-2 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
