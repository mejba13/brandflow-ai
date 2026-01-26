"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart3,
  Link2,
  Palette,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { seedCurrentUser, seedDashboardStats } from "@/lib/seed-data";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number | string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Menu",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Content", href: "/dashboard/content", icon: FileText, badge: 3 },
      { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "General",
    items: [
      { label: "Accounts", href: "/dashboard/accounts", icon: Link2 },
      { label: "Brand Kit", href: "/dashboard/brand-kit", icon: Palette },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const creditsPercent = (seedDashboardStats.aiCreditsUsed / seedDashboardStats.aiCreditsTotal) * 100;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 flex flex-col overflow-hidden",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)",
      }}
    >
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
          animate={mounted ? {
            y: [0, 20, 0],
            x: [0, 10, 0],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-10 w-40 h-40 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          }}
          animate={mounted ? {
            y: [0, -15, 0],
            x: [0, -10, 0],
          } : {}}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative h-16 flex items-center px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#ec4899] opacity-40 blur-md -z-10" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="text-xl font-bold text-white"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                BrandFlow<span className="text-[#a855f7]">AI</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Create Button */}
      <div className="relative p-4">
        <Link href="/dashboard/create">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              className={cn(
                "w-full relative overflow-hidden group",
                collapsed && "px-0"
              )}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="w-5 h-5 relative z-10" />
              {!collapsed && <span className="relative z-10 ml-2">Create Post</span>}
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto relative">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-6")}>
            {/* Group Title - WHITE TEXT */}
            <AnimatePresence>
              {!collapsed && (
                <motion.h3
                  className="px-3 mb-3 text-[11px] font-bold uppercase tracking-widest text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {group.title}
                </motion.h3>
              )}
            </AnimatePresence>
            {collapsed && groupIndex > 0 && (
              <div className="h-px bg-white/30 mx-2 mb-3" />
            )}

            {/* Group Items */}
            <ul className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * 4 + itemIndex) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        active
                          ? "text-white bg-white/15"
                          : "text-white hover:bg-white/10",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          layoutId="activeNav"
                          style={{
                            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.25) 100%)",
                            boxShadow: "inset 0 0 0 1px rgba(139, 92, 246, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <Icon className={cn(
                        "w-5 h-5 flex-shrink-0 relative z-10 transition-all duration-200",
                        active ? "text-[#c084fc]" : "text-white group-hover:scale-110"
                      )} />
                      <AnimatePresence>
                        {!collapsed && (
                          <motion.div
                            className="flex items-center justify-between flex-1"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                          >
                            <span className="font-medium relative z-10">{item.label}</span>
                            {item.badge !== undefined && (
                              <motion.span
                                className={cn(
                                  "min-w-[22px] h-5 px-1.5 flex items-center justify-center text-xs font-bold rounded-full relative z-10",
                                  active
                                    ? "bg-[#a855f7] text-white"
                                    : "bg-[#6366f1]/40 text-white"
                                )}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500 }}
                              >
                                {item.badge}
                              </motion.span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* AI Credits & User Section */}
      <div className="relative border-t border-white/10 p-4 space-y-3">
        {/* AI Credits */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Link
                href="/dashboard/settings"
                className="block p-3 rounded-xl transition-all duration-200 group hover:bg-white/5"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-white">AI Credits</p>
                      <span className="text-xs font-bold text-[#c084fc]">
                        {seedDashboardStats.aiCreditsUsed.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${creditsPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="flex items-center gap-3 px-3 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-[#6366f1] to-[#ec4899]">
                {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {seedCurrentUser.firstName} {seedCurrentUser.lastName}
                </p>
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-[#fbbf24]" />
                  <p className="text-xs text-white/80 capitalize">{seedCurrentUser.plan} Plan</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <motion.button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </motion.button>
      </div>
    </aside>
  );
}
