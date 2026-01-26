"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-[var(--radius-sm)] text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-background-muted)] text-[var(--color-text-primary)]",
        primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
        success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
        warning: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
        error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
        info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
        linkedin: "bg-[var(--color-linkedin)]/10 text-[var(--color-linkedin)]",
        facebook: "bg-[var(--color-facebook)]/10 text-[var(--color-facebook)]",
        twitter: "bg-[var(--color-twitter)]/10 text-[var(--color-twitter)]",
        instagram: "bg-[var(--color-instagram)]/10 text-[var(--color-instagram)]",
        pinterest: "bg-[var(--color-pinterest)]/10 text-[var(--color-pinterest)]",
        tiktok: "bg-[var(--color-tiktok)]/10 text-[var(--color-tiktok)]",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              variant === "success" && "bg-[var(--color-success)]",
              variant === "warning" && "bg-[var(--color-warning)]",
              variant === "error" && "bg-[var(--color-error)]",
              variant === "info" && "bg-[var(--color-info)]",
              variant === "primary" && "bg-[var(--color-primary)]",
              (!variant || variant === "default") && "bg-[var(--color-text-muted)]"
            )}
          />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
