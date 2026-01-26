"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrendDirection = "up" | "down" | "neutral";

interface TrendProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  direction: TrendDirection;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export function Trend({
  value,
  direction,
  showIcon = true,
  size = "sm",
  className,
  ...props
}: TrendProps) {
  const Icon =
    direction === "up" ? TrendingUp : direction === "down" ? TrendingDown : Minus;

  const colorClass =
    direction === "up"
      ? "text-[var(--color-success)]"
      : direction === "down"
        ? "text-[var(--color-error)]"
        : "text-[var(--color-text-muted)]";

  const bgClass =
    direction === "up"
      ? "bg-[var(--color-success)]/10"
      : direction === "down"
        ? "bg-[var(--color-error)]/10"
        : "bg-[var(--color-background-muted)]";

  const sizeClass = size === "sm" ? "text-xs px-1.5 py-0.5" : "text-sm px-2 py-1";
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  // Format value to always show sign
  const displayValue =
    typeof value === "number"
      ? `${value >= 0 ? "+" : ""}${value}%`
      : value.toString().startsWith("+") || value.toString().startsWith("-")
        ? value
        : `+${value}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-[var(--radius-sm)]",
        colorClass,
        bgClass,
        sizeClass,
        className
      )}
      {...props}
    >
      {showIcon && <Icon className={iconSize} />}
      {displayValue}
    </span>
  );
}
