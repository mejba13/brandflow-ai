"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "h1" | "h2" | "h3" | "p";
  animate?: boolean;
  gradient?: "primary" | "secondary" | "rainbow";
}

export function GradientText({
  as: Component = "span",
  animate = false,
  gradient = "primary",
  children,
  className,
  ...props
}: GradientTextProps) {
  const gradientClass = {
    primary: "bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[#3B82F6]",
    secondary: "bg-gradient-to-r from-[#10B981] via-[#3B82F6] to-[var(--color-primary)]",
    rainbow: "bg-gradient-to-r from-[#EF4444] via-[#F59E0B] via-[#10B981] via-[#3B82F6] to-[#8B5CF6]",
  };

  return (
    <Component
      className={cn(
        "inline-block bg-clip-text text-transparent",
        gradientClass[gradient],
        animate && "animate-gradient bg-[length:200%_200%]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
