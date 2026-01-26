"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, Settings, Sparkles, Search, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { seedNotifications, seedCurrentUser, seedDashboardStats } from "@/lib/seed-data";

interface HeaderProps {
  title?: string;
  sidebarCollapsed?: boolean;
  onMenuClick?: () => void;
}

export function Header({ title, sidebarCollapsed = false, onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [searchFocused, setSearchFocused] = React.useState(false);
  const notificationsRef = React.useRef<HTMLDivElement>(null);

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
        setSearchFocused(true);
      }
      if (e.key === "Escape") {
        setSearchFocused(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 flex items-center justify-between px-4 md:px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[260px]",
        "max-lg:left-0"
      )}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.8)",
      }}
    >
      {/* Left side - Menu button (mobile) */}
      <div className="flex items-center gap-4 lg:w-1/4">
        <motion.button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all duration-200"
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5" />
        </motion.button>
        {title && (
          <motion.h1
            className="hidden md:block text-lg font-bold text-[#0f172a]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {title}
          </motion.h1>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-lg mx-4">
        <motion.div
          className={cn(
            "relative flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300",
            searchFocused
              ? "border-[#6366f1] ring-4 ring-[#6366f1]/10 bg-white shadow-lg"
              : "border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:border-[#cbd5e1]"
          )}
          initial={{ scale: 0.98 }}
          animate={{ scale: searchFocused ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Search className={cn(
            "w-4 h-4 transition-colors",
            searchFocused ? "text-[#6366f1]" : "text-[#94a3b8]"
          )} />
          <input
            type="text"
            placeholder="Search content, posts, analytics..."
            className="flex-1 bg-transparent text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#f1f5f9] border border-[#e2e8f0]">
            <Command className="w-3 h-3 text-[#64748b]" />
            <span className="text-xs font-medium text-[#64748b]">K</span>
          </div>
        </motion.div>
      </div>

      {/* Right side - Actions and User */}
      <div className="flex items-center gap-2 md:gap-3 lg:w-1/4 justify-end">
        {/* AI Credits Indicator */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 group"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
              whileHover={{ rotate: 15 }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </motion.div>
            <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
              {seedDashboardStats.aiCreditsUsed.toLocaleString()}
            </span>
          </motion.div>
        </Link>

        {/* Settings */}
        <Link href="/dashboard/settings">
          <motion.div
            className="hidden sm:flex p-2.5 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all duration-200"
            aria-label="Settings"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Settings className="w-5 h-5" />
          </motion.div>
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <motion.button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className={cn(
              "relative p-2.5 rounded-xl transition-all duration-200",
              notificationsOpen
                ? "text-[#6366f1] bg-[#6366f1]/10"
                : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
            )}
            aria-label="Notifications"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell className="w-5 h-5" />
            <AnimatePresence>
              {unreadCount > 0 && (
                <motion.span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full text-[10px] text-white font-bold flex items-center justify-center bg-gradient-to-r from-[#ef4444] to-[#f97316] shadow-lg shadow-[#ef4444]/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
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
                className="absolute right-0 top-full mt-2 w-96 rounded-2xl shadow-2xl py-2 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)",
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                }}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="px-4 py-3 border-b border-[#e2e8f0] flex items-center justify-between">
                  <h3 className="font-bold text-[#0f172a]">Notifications</h3>
                  <button className="text-xs font-semibold text-[#6366f1] hover:text-[#4f46e5] transition-colors">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {seedNotifications.slice(0, 5).map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 hover:bg-[#f8fafc] cursor-pointer transition-colors relative",
                        !notification.read && "bg-gradient-to-r from-[#6366f1]/5 to-transparent"
                      )}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {!notification.read && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6366f1] to-[#a855f7]" />
                      )}
                      <div className="flex items-start gap-3">
                        <motion.div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            notification.type === "success" && "bg-[#10b981]/10",
                            notification.type === "warning" && "bg-[#f59e0b]/10",
                            notification.type === "info" && "bg-[#6366f1]/10",
                            notification.type === "error" && "bg-[#ef4444]/10"
                          )}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Sparkles className={cn(
                            "w-4 h-4",
                            notification.type === "success" && "text-[#10b981]",
                            notification.type === "warning" && "text-[#f59e0b]",
                            notification.type === "info" && "text-[#6366f1]",
                            notification.type === "error" && "text-[#ef4444]"
                          )} />
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#0f172a]">
                            {notification.title}
                          </p>
                          <p className="text-xs text-[#64748b] mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[#94a3b8] mt-1 font-medium">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-[#e2e8f0] bg-[#f8fafc]">
                  <Link
                    href="/dashboard/notifications"
                    className="block text-sm font-semibold text-center text-[#6366f1] hover:text-[#4f46e5] transition-colors"
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
        <Link href="/dashboard/settings">
          <motion.div
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#6366f1] to-[#ec4899] ring-2 ring-white group-hover:ring-[#6366f1]/30 transition-all shadow-lg shadow-[#6366f1]/20">
                {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
              </div>
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10b981] border-2 border-white"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}
