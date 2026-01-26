"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Trend, type TrendDirection } from "./trend";

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string | number;
  changeLabel?: string;
  trend?: TrendDirection;
  icon?: React.ReactNode;
  iconBg?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeLabel = "vs last month",
  trend,
  icon,
  iconBg = "bg-[var(--color-primary)]/10",
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white border border-[var(--color-border-light)] rounded-[var(--radius-xl)] p-5 transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] truncate">
            {label}
          </p>
          <p className="text-3xl font-semibold font-heading text-[var(--color-text-primary)] mt-1 tracking-tight">
            {value}
          </p>
          {change !== undefined && trend && (
            <div className="flex items-center gap-1.5 mt-2">
              <Trend value={change} direction={trend} />
              <span className="text-xs text-[var(--color-text-muted)]">{changeLabel}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className={cn("flex-shrink-0 p-2.5 rounded-[var(--radius-lg)]", iconBg)}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
