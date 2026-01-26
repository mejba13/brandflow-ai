"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, Menu, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";
import { Avatar } from "@/components/ui/avatar";
import { seedNotifications, seedCurrentUser } from "@/lib/seed-data";

interface HeaderProps {
  title?: string;
  sidebarCollapsed?: boolean;
  onMenuClick?: () => void;
}

export function Header({ title, sidebarCollapsed = false, onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
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

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border-light)] flex items-center justify-between px-4 md:px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[280px]",
        "max-lg:left-0"
      )}
    >
      {/* Left side - Menu button (mobile) */}
      <div className="flex items-center gap-4 lg:w-1/4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && (
          <h1 className="hidden md:block text-lg font-semibold font-heading text-[var(--color-text-primary)]">
            {title}
          </h1>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4">
        <SearchInput
          placeholder="Search content, posts..."
          shortcut="K"
          className="w-full"
        />
      </div>

      {/* Right side - Actions and User */}
      <div className="flex items-center gap-2 md:gap-3 lg:w-1/4 justify-end">
        {/* AI Credits Indicator */}
        <Link
          href="/dashboard/settings"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">847</span>
        </Link>

        {/* Settings */}
        <Link
          href="/dashboard/settings"
          className="hidden sm:flex p-2 rounded-[var(--radius-lg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </Link>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-[var(--radius-lg)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-error)] rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] shadow-[var(--shadow-dropdown)] py-2 animate-scale-in">
              <div className="px-4 py-2 border-b border-[var(--color-border-light)] flex items-center justify-between">
                <h3 className="font-semibold text-[var(--color-text-primary)]">Notifications</h3>
                <button className="text-xs text-[var(--color-primary)] hover:underline">
                  Mark all read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {seedNotifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-4 py-3 hover:bg-[var(--color-background-muted)] cursor-pointer border-l-2 transition-colors",
                      notification.read
                        ? "border-transparent"
                        : "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                    )}
                  >
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {notification.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-[var(--color-border-light)]">
                <Link
                  href="/dashboard/notifications"
                  className="text-sm text-[var(--color-primary)] hover:underline block text-center"
                  onClick={() => setNotificationsOpen(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Link href="/dashboard/settings" className="flex items-center gap-2">
          <Avatar
            name={`${seedCurrentUser.firstName} ${seedCurrentUser.lastName}`}
            size="md"
            className="ring-2 ring-white hover:ring-[var(--color-primary)]/20 transition-all"
          />
        </Link>
      </div>
    </header>
  );
}
