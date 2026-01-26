"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Menu,
  Settings,
  Sparkles,
  Search,
  Command,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  TrendingUp,
  FileText,
  Calendar,
  BarChart3,
  Zap,
  ArrowRight,
  Clock,
  Hash,
  Image,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { seedNotifications, seedCurrentUser, seedDashboardStats } from "@/lib/seed-data";

interface HeaderProps {
  sidebarCollapsed?: boolean;
  onMenuClick?: () => void;
}

const notificationIcons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
  error: AlertCircle,
};

const notificationColors = {
  success: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20" },
  warning: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20" },
  info: { bg: "bg-indigo-500/10", text: "text-indigo-500", border: "border-indigo-500/20" },
  error: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/20" },
};

// Quick search suggestions for the enhanced search
const searchSuggestions = [
  { icon: FileText, label: "Recent Posts", shortcut: "P", color: "#6366f1" },
  { icon: Calendar, label: "Scheduled", shortcut: "S", color: "#f59e0b" },
  { icon: BarChart3, label: "Analytics", shortcut: "A", color: "#10b981" },
  { icon: Users, label: "Audience", shortcut: "U", color: "#ec4899" },
];

const trendingSearches = [
  { icon: Hash, text: "content strategy", count: "2.4K" },
  { icon: TrendingUp, text: "engagement tips", count: "1.8K" },
  { icon: Image, text: "visual content", count: "956" },
];

export function Header({ sidebarCollapsed = false, onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const unreadCount = seedNotifications.filter((n) => !n.read).length;
  const creditsRemaining = seedDashboardStats.aiCreditsTotal - seedDashboardStats.aiCreditsUsed;
  const creditsPercent = (creditsRemaining / seedDashboardStats.aiCreditsTotal) * 100;

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === "Escape") {
        searchInputRef.current?.blur();
        setSearchFocused(false);
        setSearchValue("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-[76px] flex items-center gap-4 px-4 lg:px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[260px]",
        "max-lg:left-0"
      )}
    >
      {/* Premium Background with Gradient */}
      <div className="absolute inset-0 -z-10">
        {/* Main Background */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
          }}
        />

        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={mounted ? {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 left-1/4 w-40 h-40 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={mounted ? {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-1/2 w-32 h-32 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 70%)",
            filter: "blur(25px)",
          }}
          animate={mounted ? {
            x: [-20, 20, -20],
            opacity: [0.2, 0.35, 0.2],
          } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Bottom Gradient Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #6366f1 20%, #a855f7 40%, #ec4899 60%, #f59e0b 80%, transparent 100%)",
          }}
        />
      </div>

      {/* Left section - Menu button (mobile) */}
      <div className="flex items-center gap-3 min-w-0">
        <motion.button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 rounded-xl text-white/70 hover:text-white transition-colors"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05, background: "rgba(255, 255, 255, 0.15)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Center - Premium Search Command Palette */}
      <div className="flex-1 flex justify-center max-w-2xl mx-auto" ref={searchRef}>
        <div className="relative w-full">
          <motion.div
            className={cn(
              "relative flex items-center w-full rounded-2xl transition-all duration-300 overflow-hidden"
            )}
            style={{
              background: searchFocused
                ? "rgba(255, 255, 255, 0.15)"
                : "rgba(255, 255, 255, 0.08)",
              border: searchFocused
                ? "1px solid rgba(255, 255, 255, 0.25)"
                : "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: searchFocused
                ? "0 8px 32px -8px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 4px 16px -4px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
            layout
          >
            {/* Inner Glow Effect */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 50%, rgba(168, 85, 247, 0.1) 100%)",
              }}
            />

            {/* Search Icon with Animation */}
            <div className="relative flex items-center pl-4">
              <motion.div
                animate={searchFocused ? { rotate: [0, -10, 0], scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Search className={cn(
                  "w-[18px] h-[18px] transition-colors duration-200",
                  searchFocused ? "text-indigo-300" : "text-white/50"
                )} />
              </motion.div>
            </div>

            {/* Input */}
            <input
              ref={searchInputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search content, posts, analytics..."
              className="relative flex-1 px-3 py-3.5 bg-transparent text-sm text-white placeholder:text-white/40 outline-none font-medium"
              onFocus={() => setSearchFocused(true)}
            />

            {/* Right Side Actions */}
            <div className="relative flex items-center gap-2 pr-3">
              <AnimatePresence mode="wait">
                {searchValue ? (
                  <motion.button
                    key="clear"
                    initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                    onClick={() => {
                      setSearchValue("");
                      searchInputRef.current?.focus();
                    }}
                    className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.div
                    key="shortcut"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
                    style={{
                      background: "linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <Command className="w-3 h-3 text-white/70" />
                    <span className="text-[11px] font-bold text-white/90">K</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Premium Search Dropdown */}
          <AnimatePresence>
            {searchFocused && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-3 rounded-2xl overflow-hidden z-50"
                style={{
                  background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  boxShadow: "0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 0 60px -10px rgba(99, 102, 241, 0.3)",
                }}
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Quick Actions Grid */}
                <div className="p-4">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3 px-1">Quick Actions</p>
                  <div className="grid grid-cols-4 gap-2">
                    {searchSuggestions.map((item, index) => (
                      <motion.button
                        key={item.label}
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                        style={{
                          background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}08 100%)`,
                          border: `1px solid ${item.color}25`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{
                          scale: 1.05,
                          background: `linear-gradient(135deg, ${item.color}25 0%, ${item.color}15 100%)`,
                          boxShadow: `0 8px 24px -8px ${item.color}40`,
                        }}
                      >
                        <motion.div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                            boxShadow: `0 4px 12px -4px ${item.color}60`,
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <item.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <span className="text-xs font-semibold text-white/70 group-hover:text-white">{item.label}</span>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded-md"
                          style={{ background: `${item.color}30`, color: "white" }}
                        >
                          ⌘{item.shortcut}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-4" />

                {/* Trending Searches */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Trending</p>
                    <motion.div
                      className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-3 h-3" />
                      Live
                    </motion.div>
                  </div>
                  <div className="space-y-1">
                    {trendingSearches.map((item, index) => (
                      <motion.button
                        key={item.text}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
                          <item.icon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <span className="flex-1 text-sm font-medium text-white/70 text-left group-hover:text-white transition-colors">{item.text}</span>
                        <span className="text-[10px] font-bold text-white/40 bg-white/10 px-2 py-1 rounded-md">{item.count}</span>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="px-4 py-3 flex items-center justify-between"
                  style={{
                    background: "rgba(99, 102, 241, 0.05)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] text-white/40">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white/60">↵</span> Select
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-white/40">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white/60">↑↓</span> Navigate
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-white/40">
                      <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold text-white/60">Esc</span> Close
                    </span>
                  </div>
                  <motion.div
                    className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-semibold"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Sparkles className="w-3 h-3" />
                    AI-Powered Search
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right section - Premium Actions */}
      <div className="flex items-center gap-3">
        {/* AI Credits - Premium Glass Card */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.15) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 4px 24px -8px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Icon */}
            <motion.div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.6)",
              }}
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Zap className="w-4 h-4 text-white" />
              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{ border: "2px solid rgba(255, 255, 255, 0.4)" }}
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Credits Info */}
            <div className="relative flex flex-col">
              <span className="text-[10px] font-medium text-white/50">AI Credits</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white">
                  {creditsRemaining.toLocaleString()}
                </span>
                <span className="text-[10px] text-white/40">left</span>
              </div>
            </div>

            {/* Mini Progress */}
            <div className="relative w-14 h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${creditsPercent}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>
        </Link>

        {/* Settings - Enhanced */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden sm:flex p-2.5 rounded-xl text-white/50 hover:text-white transition-all relative"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
            whileHover={{
              scale: 1.05,
              rotate: 45,
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.3)",
            }}
            whileTap={{ scale: 0.95, rotate: 90 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Settings className="w-[18px] h-[18px]" />
          </motion.div>
        </Link>

        {/* Notifications - Premium Design */}
        <div className="relative" ref={notificationsRef}>
          <motion.button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-200"
            )}
            style={{
              background: notificationsOpen
                ? "rgba(99, 102, 241, 0.2)"
                : "rgba(255, 255, 255, 0.05)",
              border: notificationsOpen
                ? "1px solid rgba(99, 102, 241, 0.3)"
                : "1px solid rgba(255, 255, 255, 0.08)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className={cn(
              "w-[18px] h-[18px] transition-colors",
              notificationsOpen ? "text-indigo-300" : "text-white/50 hover:text-white"
            )} />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 min-w-[20px] h-[20px] rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1"
                  style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                    boxShadow: "0 4px 12px -2px rgba(239, 68, 68, 0.6)",
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Ping Animation */}
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full"
                style={{ background: "rgba(239, 68, 68, 0.4)" }}
                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </motion.button>

          {/* Premium Notifications Dropdown */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                className="absolute right-0 top-full mt-3 w-[400px] rounded-2xl overflow-hidden z-50"
                style={{
                  background: "linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                  boxShadow: "0 25px 80px -20px rgba(0, 0, 0, 0.5), 0 0 60px -10px rgba(99, 102, 241, 0.3)",
                }}
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 flex items-center justify-between"
                  style={{
                    background: "rgba(99, 102, 241, 0.1)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                        boxShadow: "0 4px 12px -4px rgba(99, 102, 241, 0.5)",
                      }}
                      whileHover={{ rotate: 10 }}
                    >
                      <Bell className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white">Notifications</h3>
                      {unreadCount > 0 && (
                        <p className="text-xs text-indigo-400 font-medium">{unreadCount} unread messages</p>
                      )}
                    </div>
                  </div>
                  <motion.button
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-400 hover:bg-indigo-500/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Mark all read
                  </motion.button>
                </div>

                {/* Notifications List */}
                <div className="max-h-[380px] overflow-y-auto">
                  {seedNotifications.slice(0, 5).map((notification, index) => {
                    const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons] || Info;
                    const colors = notificationColors[notification.type as keyof typeof notificationColors] || notificationColors.info;

                    return (
                      <motion.div
                        key={notification.id}
                        className={cn(
                          "px-5 py-4 hover:bg-white/5 cursor-pointer transition-all relative group",
                          !notification.read && "bg-indigo-500/5"
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                            style={{
                              background: "linear-gradient(180deg, #6366f1 0%, #a855f7 100%)",
                            }}
                            layoutId={`indicator-${notification.id}`}
                          />
                        )}

                        <div className="flex gap-4">
                          <motion.div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                              colors.bg,
                              colors.border
                            )}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <IconComponent className={cn("w-5 h-5", colors.text)} />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold text-white/90 line-clamp-1 group-hover:text-white transition-colors">
                                {notification.title}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] text-white/40 flex-shrink-0">
                                <Clock className="w-3 h-3" />
                                {notification.timestamp}
                              </div>
                            </div>
                            <p className="text-xs text-white/50 mt-1 line-clamp-2 leading-relaxed">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div
                  className="px-5 py-3"
                  style={{
                    background: "rgba(99, 102, 241, 0.05)",
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-indigo-400 hover:bg-indigo-500/20 transition-all"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      View all notifications
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar - Premium Design */}
        <Link href="/dashboard/settings" className="ml-1">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.5) 0%, rgba(168, 85, 247, 0.5) 50%, rgba(236, 72, 153, 0.5) 100%)",
                filter: "blur(10px)",
              }}
            />

            {/* Avatar */}
            <div
              className="relative w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
            </div>

            {/* Online Indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900"
              style={{
                boxShadow: "0 2px 8px -2px rgba(16, 185, 129, 0.8)",
              }}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
