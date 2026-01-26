"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  collapsed?: boolean;
}

export function NavGroup({
  title,
  collapsed = false,
  children,
  className,
  ...props
}: NavGroupProps) {
  return (
    <div className={cn("py-2", className)} {...props}>
      {title && !collapsed && (
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {title}
        </h3>
      )}
      {collapsed && title && (
        <div className="h-px bg-[var(--color-border-light)] mx-3 mb-2" />
      )}
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

interface NavItemProps extends React.HTMLAttributes<HTMLLIElement> {
  active?: boolean;
  collapsed?: boolean;
  icon?: React.ReactNode;
  badge?: number | string;
  href?: string;
}

export function NavItem({
  active = false,
  collapsed = false,
  icon,
  badge,
  children,
  className,
  ...props
}: NavItemProps) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-lg)] cursor-pointer transition-colors duration-150",
        active
          ? "bg-[var(--color-primary)] text-white"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] hover:text-[var(--color-text-primary)]",
        collapsed && "justify-center px-2",
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {!collapsed && <span className="flex-1 font-medium truncate">{children}</span>}
      {!collapsed && badge !== undefined && (
        <span
          className={cn(
            "flex-shrink-0 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-xs font-medium rounded-full",
            active
              ? "bg-white/20 text-white"
              : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          )}
        >
          {badge}
        </span>
      )}
    </li>
  );
}
