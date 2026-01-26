"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4 border-2",
      md: "w-6 h-6 border-2",
      lg: "w-8 h-8 border-3",
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "animate-spin rounded-full border-[var(--color-primary)] border-t-transparent",
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Spinner.displayName = "Spinner";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "rectangular", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "animate-pulse bg-[var(--color-background-muted)]",
          variant === "text" && "h-4 rounded",
          variant === "circular" && "rounded-full",
          variant === "rectangular" && "rounded-[var(--radius-md)]",
          className
        )}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

export { Spinner, Skeleton };
