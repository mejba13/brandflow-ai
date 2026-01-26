"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  container?: boolean;
  background?: "white" | "subtle" | "muted" | "primary" | "dark" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Section({
  as: Component = "section",
  container = true,
  background = "white",
  padding = "lg",
  children,
  className,
  ...props
}: SectionProps) {
  const bgClass = {
    white: "bg-white",
    subtle: "bg-[var(--color-background-subtle)]",
    muted: "bg-[var(--color-background-muted)]",
    primary: "bg-[var(--color-primary)]",
    dark: "bg-gradient-to-br from-[#1E293B] to-[#0F172A]",
    gradient: "bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-accent)] to-[#3B82F6]",
  };

  const paddingClass = {
    none: "",
    sm: "py-12 md:py-16",
    md: "py-16 md:py-20",
    lg: "py-20 md:py-24 lg:py-[var(--spacing-section)]",
  };

  return (
    <Component
      className={cn(bgClass[background], paddingClass[padding], className)}
      {...props}
    >
      {container ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  light = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        align === "center" && "mx-auto text-center",
        className
      )}
      {...props}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4",
            light
              ? "bg-white/10 text-white"
              : "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          )}
        >
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight",
          light ? "text-white" : "text-[var(--color-text-primary)]"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl mt-4",
            light ? "text-white/80" : "text-[var(--color-text-secondary)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
