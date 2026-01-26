"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Sparkles as SparklesIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo, LogoIcon } from "@/components/ui/logo";

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

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-[var(--color-border-light)] transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-[var(--color-border-light)]">
        {collapsed ? (
          <Link href="/dashboard">
            <LogoIcon size="md" />
          </Link>
        ) : (
          <Logo href="/dashboard" size="md" />
        )}
      </div>

      {/* Create Button */}
      <div className="p-4">
        <Link href="/dashboard/create">
          <Button
            variant="primary"
            size={collapsed ? "icon" : "md"}
            className={cn("w-full shadow-md", collapsed && "px-0")}
          >
            <Plus className="w-5 h-5" />
            {!collapsed && <span>Create Post</span>}
          </Button>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-6")}>
            {/* Group Title */}
            {!collapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                {group.title}
              </h3>
            )}
            {collapsed && groupIndex > 0 && (
              <div className="h-px bg-[var(--color-border-light)] mx-2 mb-2" />
            )}

            {/* Group Items */}
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] transition-all duration-150",
                        active
                          ? "bg-[var(--color-primary)] text-white shadow-md"
                          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] hover:text-[var(--color-text-primary)]",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="flex-1 font-medium">{item.label}</span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium rounded-full",
                                active
                                  ? "bg-white/20 text-white"
                                  : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* AI Credits & User Section */}
      <div className="border-t border-[var(--color-border-light)] p-4 space-y-3">
        {/* AI Credits */}
        {!collapsed && (
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 hover:from-[var(--color-primary)]/10 hover:to-[var(--color-accent)]/10 transition-colors"
          >
            <SparklesIcon className="w-5 h-5 text-[var(--color-primary)]" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">AI Credits</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-[var(--color-background-muted)]">
                  <div className="h-full w-[42%] rounded-full bg-[var(--color-primary)]" />
                </div>
                <span className="text-xs font-medium text-[var(--color-primary)]">847</span>
              </div>
            </div>
          </Link>
        )}

        {/* User */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-full bg-[var(--color-background-muted)] flex items-center justify-center">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">SM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                Sarah Mitchell
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">Pro Plan</p>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            "flex items-center gap-2 w-full px-3 py-2 rounded-[var(--radius-lg)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
