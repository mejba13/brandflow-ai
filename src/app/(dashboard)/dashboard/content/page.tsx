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
  SlidersHorizontal,
  ChevronDown,
  PenTool,
  Send,
  CheckCircle2,
  LayoutGrid,
  Layers,
  X,
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
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-500",
    gradient: "from-slate-400 to-slate-500",
  },
  scheduled: {
    label: "Scheduled",
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    gradient: "from-amber-400 to-orange-500",
  },
  published: {
    label: "Published",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
    gradient: "from-emerald-400 to-teal-500",
  },
};

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

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [mounted, setMounted] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

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
      className="space-y-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Header */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 50%, #252b4d 100%)",
          }}
        />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={mounted ? { y: [0, 25, 0], x: [0, -15, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-[250px] h-[250px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
            animate={mounted ? { y: [0, -20, 0], x: [0, 15, 0] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.4)",
                  }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Layers className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-white/50 text-sm font-medium">Your Creative Hub</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Content Library
              </h1>

              <p className="text-white/60 max-w-md text-sm leading-relaxed">
                Manage, organize, and repurpose all your content in one place.
                You have <span className="text-white font-medium">{seedContentLibrary.length} pieces</span> of content ready.
              </p>
            </div>

            <div className="flex items-center gap-3">
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
                    <Plus className="w-4 h-4 mr-2 relative z-10" strokeWidth={2.5} />
                    <span className="relative z-10">Create Content</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Stats Grid */}
      <motion.section
        className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        variants={containerVariants}
      >
        {[
          {
            label: "All Content",
            value: statusCounts.all,
            status: null,
            icon: LayoutGrid,
            gradient: "from-indigo-500 to-violet-500",
            shadowColor: "rgba(99, 102, 241, 0.25)",
            description: "Total pieces",
          },
          {
            label: "Drafts",
            value: statusCounts.draft,
            status: "draft",
            icon: PenTool,
            gradient: "from-slate-400 to-slate-500",
            shadowColor: "rgba(100, 116, 139, 0.25)",
            description: "In progress",
          },
          {
            label: "Scheduled",
            value: statusCounts.scheduled,
            status: "scheduled",
            icon: Clock,
            gradient: "from-amber-400 to-orange-500",
            shadowColor: "rgba(245, 158, 11, 0.25)",
            description: "Ready to post",
          },
          {
            label: "Published",
            value: statusCounts.published,
            status: "published",
            icon: Send,
            gradient: "from-emerald-400 to-teal-500",
            shadowColor: "rgba(16, 185, 129, 0.25)",
            description: "Live content",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          const isActive = selectedStatus === stat.status || (stat.status === null && !selectedStatus);

          return (
            <motion.button
              key={stat.label}
              onClick={() => setSelectedStatus(stat.status)}
              className={cn(
                "relative overflow-hidden rounded-xl p-4 text-left transition-all duration-200",
                isActive
                  ? "bg-white ring-2 ring-indigo-500/30 shadow-lg"
                  : "bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md"
              )}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.gradient}`}
                  style={{ boxShadow: `0 4px 12px -2px ${stat.shadowColor}` }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                {isActive && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-indigo-500"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                )}
              </div>
              <p className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</p>
              <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
            </motion.button>
          );
        })}
      </motion.section>

      {/* Search & Filters Bar */}
      <motion.section
        className="flex flex-col lg:flex-row gap-3"
        variants={itemVariants}
      >
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search content, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2">
          {/* Tags Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                selectedTag
                  ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              <Tag className="w-4 h-4" />
              {selectedTag || "All Tags"}
              <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-20 py-2"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                >
                  <button
                    onClick={() => { setSelectedTag(null); setShowFilters(false); }}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm hover:bg-slate-50 transition-colors",
                      !selectedTag ? "text-indigo-600 font-medium bg-indigo-50" : "text-slate-600"
                    )}
                  >
                    All Tags
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setSelectedTag(tag); setShowFilters(false); }}
                      className={cn(
                        "w-full px-3 py-2 text-left text-sm hover:bg-slate-50 transition-colors",
                        selectedTag === tag ? "text-indigo-600 font-medium bg-indigo-50" : "text-slate-600"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-md transition-all",
                viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Featured Content Banner */}
      {featuredContent && !searchQuery && !selectedStatus && !selectedTag && (
        <motion.section
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-100 p-5"
          variants={itemVariants}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">Featured Content</span>
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-medium",
                  statusConfig[featuredContent.status].bg,
                  statusConfig[featuredContent.status].text
                )}>
                  {statusConfig[featuredContent.status].label}
                </span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 truncate">{featuredContent.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-1">{featuredContent.sourceContent.slice(0, 100)}...</p>
            </div>
            <Link href={`/dashboard/content/${featuredContent.id}`}>
              <motion.button
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-indigo-200 hover:text-indigo-600 transition-all flex items-center gap-2 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      )}

      {/* Content Grid */}
      <motion.section
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-3"
        )}
        variants={containerVariants}
      >
        {filteredContent.map((item) => {
          const status = statusConfig[item.status];
          const StatusIcon = status.icon;
          const excerpt = item.sourceContent.slice(0, 100) + (item.sourceContent.length > 100 ? "..." : "");

          if (viewMode === "list") {
            return (
              <motion.div
                key={item.id}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-md transition-all"
                variants={itemVariants}
                whileHover={{ x: 2 }}
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br",
                  status.gradient
                )}>
                  <StatusIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </h3>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0", status.bg, status.text)}>
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span className="flex items-center gap-1">
                      {item.platforms.slice(0, 3).map((platform) => {
                        const Icon = platformIcons[platform];
                        return <Icon key={platform} className="w-3 h-3" style={{ color: PLATFORMS[platform].color }} />;
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-all">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={item.id}
              className="group relative bg-white rounded-xl border border-slate-100 hover:border-indigo-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Status Bar */}
              <div className={cn("h-1 bg-gradient-to-r", status.gradient)} />

              {/* Content */}
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
                    status.bg, status.text
                  )}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                  <motion.button
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                  {excerpt}
                </p>

                {/* Platforms */}
                <div className="flex items-center gap-1.5 mb-4">
                  {item.platforms.map((platform) => {
                    const Icon = platformIcons[platform];
                    const info = PLATFORMS[platform];
                    return (
                      <motion.div
                        key={platform}
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}12` }}
                        title={info.name}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] bg-slate-100 text-slate-600 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  {item.scheduledFor && (
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {item.scheduledFor}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    className="p-1.5 rounded-md hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-1.5 rounded-md hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-1.5 rounded-md hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-1.5 rounded-md hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Empty State */}
      <AnimatePresence>
        {filteredContent.length === 0 && (
          <motion.div
            className="text-center py-16 bg-white rounded-xl border border-slate-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No content found</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto text-sm">
              Try adjusting your search or filters, or create new content to get started.
            </p>
            <Link href="/dashboard/create">
              <Button
                className="relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create your first content
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Stats */}
      {filteredContent.length > 0 && (
        <motion.section
          className="flex items-center justify-between text-sm"
          variants={itemVariants}
        >
          <p className="text-slate-500">
            Showing <span className="font-semibold text-slate-900">{filteredContent.length}</span> of{" "}
            <span className="font-semibold text-slate-900">{seedContentLibrary.length}</span> items
          </p>
          <button className="flex items-center gap-1.5 text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </button>
        </motion.section>
      )}

      {/* Bottom CTA */}
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

        <div className="relative z-10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.4)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Need fresh content ideas?
              </h3>
              <p className="text-slate-500 text-sm">
                Let AI generate engaging content optimized for each platform.
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
                <Zap className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Generate with AI</span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
