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
  LogOut,
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
    title: "Main",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Content", href: "/dashboard/content", icon: FileText, badge: 3 },
      { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "Settings",
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
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

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
  const creditsRemaining = seedDashboardStats.aiCreditsTotal - seedDashboardStats.aiCreditsUsed;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col overflow-hidden",
        "transition-all duration-300 ease-out",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Main Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #0c0f1a 0%, #151933 50%, #1a1f3c 100%)",
        }}
      />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={mounted ? {
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
          animate={mounted ? {
            y: [0, -25, 0],
            x: [0, -15, 0],
            scale: [1, 1.15, 1],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Logo Section */}
      <div className="relative h-[72px] flex items-center px-4 border-b border-white/[0.06]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <motion.div
            className="relative flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                boxShadow: "0 4px 20px -4px rgba(99, 102, 241, 0.5)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <motion.div
              className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.4) 100%)",
                filter: "blur(12px)",
                zIndex: -1,
              }}
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                className="flex items-baseline gap-0.5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[19px] font-bold text-white tracking-tight">
                  BrandFlow
                </span>
                <span className="text-[19px] font-bold bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                  AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Create Button */}
      <div className="relative px-3 pt-4 pb-2">
        <Link href="/dashboard/create">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              className={cn(
                "w-full h-11 relative overflow-hidden group font-semibold text-[14px]",
                collapsed && "px-0"
              )}
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                boxShadow: "0 4px 24px -4px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              <Plus className="w-5 h-5 relative z-10" strokeWidth={2.5} />
              {!collapsed && <span className="relative z-10 ml-2">Create Post</span>}
            </Button>
          </motion.div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto relative scrollbar-hide">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-6")}>
            {/* Group Title */}
            <AnimatePresence mode="wait">
              {!collapsed ? (
                <motion.div
                  className="px-3 mb-2 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40">
                    {group.title}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
                </motion.div>
              ) : (
                groupIndex > 0 && (
                  <div className="h-px bg-white/[0.08] mx-2 mb-3" />
                )
              )}
            </AnimatePresence>

            {/* Group Items */}
            <ul className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const isHovered = hoveredItem === item.href;

                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * 4 + itemIndex) * 0.04 }}
                    onHoverStart={() => setHoveredItem(item.href)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {/* Background for active/hover states */}
                      {active && (
                        <motion.div
                          className="absolute inset-0 rounded-xl"
                          layoutId="activeNavBg"
                          style={{
                            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)",
                            boxShadow: "inset 0 0 0 1px rgba(139, 92, 246, 0.25), 0 2px 8px -2px rgba(99, 102, 241, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Hover background */}
                      {!active && isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/[0.05]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                        />
                      )}

                      {/* Active indicator bar */}
                      {active && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                          layoutId="activeNavIndicator"
                          style={{
                            background: "linear-gradient(180deg, #a855f7 0%, #6366f1 100%)",
                            boxShadow: "0 0 12px 2px rgba(168, 85, 247, 0.5)",
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        className={cn(
                          "relative z-10 flex items-center justify-center",
                          collapsed && "w-6 h-6"
                        )}
                        animate={active ? { scale: 1 } : isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Icon className={cn(
                          "w-[18px] h-[18px] transition-colors duration-200",
                          active
                            ? "text-[#c084fc]"
                            : "text-white/60 group-hover:text-white/90"
                        )} />
                      </motion.div>

                      {/* Label and Badge */}
                      <AnimatePresence mode="wait">
                        {!collapsed && (
                          <motion.div
                            className="flex items-center justify-between flex-1 min-w-0"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.15 }}
                          >
                            <span className={cn(
                              "text-[14px] font-medium relative z-10 transition-colors duration-200",
                              active
                                ? "text-white"
                                : "text-white/70 group-hover:text-white"
                            )}>
                              {item.label}
                            </span>
                            {item.badge !== undefined && (
                              <motion.span
                                className={cn(
                                  "min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[11px] font-bold rounded-md relative z-10",
                                  active
                                    ? "bg-[#a855f7] text-white"
                                    : "bg-white/10 text-white/80"
                                )}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
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

      {/* Bottom Section */}
      <div className="relative border-t border-white/[0.06] p-3 space-y-3">
        {/* AI Credits Card */}
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="/dashboard/settings"
                className="block p-3 rounded-xl transition-all duration-200 group"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.08) 100%)",
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                      boxShadow: "0 2px 12px -2px rgba(99, 102, 241, 0.4)",
                    }}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white">AI Credits</p>
                    <p className="text-[11px] text-white/50">{creditsRemaining.toLocaleString()} remaining</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${creditsPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-white/40">
                    {seedDashboardStats.aiCreditsUsed.toLocaleString()} / {seedDashboardStats.aiCreditsTotal.toLocaleString()}
                  </span>
                  <span className="text-[11px] font-medium text-[#a855f7] group-hover:text-[#c084fc] transition-colors flex items-center gap-0.5">
                    Upgrade
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <Link
                href="/dashboard/settings"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)",
                }}
                title="AI Credits"
              >
                <Zap className="w-4 h-4 text-[#a855f7]" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Section */}
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div
              className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05, duration: 0.2 }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                  boxShadow: "0 2px 10px -2px rgba(99, 102, 241, 0.4)",
                }}
              >
                {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-white truncate">
                  {seedCurrentUser.firstName} {seedCurrentUser.lastName}
                </p>
                <div className="flex items-center gap-1">
                  <Crown className="w-3 h-3 text-[#fbbf24]" />
                  <p className="text-[11px] text-white/50 capitalize">{seedCurrentUser.plan}</p>
                </div>
              </div>
              <motion.button
                className="p-1.5 rounded-md text-white/40 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)",
                }}
                title={`${seedCurrentUser.firstName} ${seedCurrentUser.lastName}`}
              >
                {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse Toggle */}
        <motion.button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-xl text-[13px] text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition-all duration-200",
            collapsed && "justify-center px-2"
          )}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.div>
          {!collapsed && <span className="font-medium">Collapse</span>}
        </motion.button>
      </div>
    </aside>
  );
}
