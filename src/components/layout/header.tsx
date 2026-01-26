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
  success: { bg: "bg-emerald-500/10", text: "text-emerald-500" },
  warning: { bg: "bg-amber-500/10", text: "text-amber-500" },
  info: { bg: "bg-indigo-500/10", text: "text-indigo-500" },
  error: { bg: "bg-red-500/10", text: "text-red-500" },
};

export function Header({ sidebarCollapsed = false, onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const notificationsRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const unreadCount = seedNotifications.filter((n) => !n.read).length;

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
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
        "fixed top-0 right-0 z-30 h-16 flex items-center gap-4 px-4 lg:px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[260px]",
        "max-lg:left-0"
      )}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
      }}
    >
      {/* Left section - Menu button (mobile) */}
      <div className="flex items-center gap-3 min-w-0">
        <motion.button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center max-w-xl mx-auto">
        <motion.div
          className={cn(
            "relative flex items-center w-full rounded-xl transition-all duration-200",
            searchFocused
              ? "bg-white shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20"
              : "bg-slate-50/80 hover:bg-slate-100/80"
          )}
          layout
        >
          <div className="flex items-center pl-3.5">
            <Search className={cn(
              "w-4 h-4 transition-colors duration-200",
              searchFocused ? "text-indigo-500" : "text-slate-400"
            )} />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search content, posts, analytics..."
            className="flex-1 px-3 py-2.5 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => !searchValue && setSearchFocused(false)}
          />
          <AnimatePresence mode="wait">
            {searchValue ? (
              <motion.button
                key="clear"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setSearchValue("");
                  searchInputRef.current?.focus();
                }}
                className="p-1.5 mr-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            ) : (
              <motion.div
                key="shortcut"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:flex items-center gap-0.5 mr-3 px-1.5 py-1 rounded-md bg-slate-100/80 border border-slate-200/60"
              >
                <Command className="w-3 h-3 text-slate-400" />
                <span className="text-[11px] font-medium text-slate-400">K</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-1.5">
        {/* AI Credits Pill */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 group cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.06) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.12)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 4px 12px -2px rgba(99, 102, 241, 0.15)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              }}
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {seedDashboardStats.aiCreditsUsed.toLocaleString()}
            </span>
          </motion.div>
        </Link>

        {/* Settings */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden sm:flex p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            whileHover={{ scale: 1.05, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-[18px] h-[18px]" />
          </motion.div>
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <motion.button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={cn(
              "relative p-2 rounded-lg transition-all duration-200",
              notificationsOpen
                ? "text-indigo-600 bg-indigo-50"
                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-[18px] h-[18px]" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold text-white flex items-center justify-center px-1"
                  style={{
                    background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                    boxShadow: "0 2px 8px -2px rgba(239, 68, 68, 0.5)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-[380px] rounded-2xl shadow-xl overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
                }}
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold text-indigo-600 bg-indigo-50">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    Mark all read
                  </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-[360px] overflow-y-auto">
                  {seedNotifications.slice(0, 5).map((notification, index) => {
                    const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons] || Info;
                    const colors = notificationColors[notification.type as keyof typeof notificationColors] || notificationColors.info;

                    return (
                      <motion.div
                        key={notification.id}
                        className={cn(
                          "px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors relative group",
                          !notification.read && "bg-indigo-50/30"
                        )}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        {!notification.read && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500" />
                        )}
                        <div className="flex gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            colors.bg
                          )}>
                            <IconComponent className={cn("w-4 h-4", colors.text)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 line-clamp-1">
                              {notification.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-1.5 font-medium">
                              {notification.timestamp}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                  <Link
                    href="/dashboard/notifications"
                    className="block text-sm font-medium text-center text-indigo-600 hover:text-indigo-700 transition-colors"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    View all notifications
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar */}
        <Link href="/dashboard/settings" className="ml-1">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white transition-all"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                boxShadow: "0 2px 8px -2px rgba(99, 102, 241, 0.4)",
              }}
            >
              {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
            </div>
            {/* Online indicator */}
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"
              animate={{
                scale: [1, 1.15, 1],
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
