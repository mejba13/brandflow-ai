"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "light";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizes = {
  sm: {
    container: "w-8 h-8",
    icon: "w-4 h-4",
    text: "text-lg",
  },
  md: {
    container: "w-10 h-10",
    icon: "w-5 h-5",
    text: "text-xl",
  },
  lg: {
    container: "w-12 h-12",
    icon: "w-6 h-6",
    text: "text-2xl",
  },
};

export function Logo({ size = "md", variant = "default", showText = true, href, className }: LogoProps) {
  const sizeConfig = sizes[size];
  const isLight = variant === "light";

  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "rounded-[var(--radius-lg)] flex items-center justify-center",
          isLight ? "bg-white/20" : "bg-[var(--color-primary)] shadow-md",
          sizeConfig.container
        )}
      >
        <Sparkles className={cn("text-white", sizeConfig.icon)} />
      </div>
      {showText && (
        <span
          className={cn(
            "font-heading font-semibold",
            isLight ? "text-white" : "text-[var(--color-text-primary)]",
            sizeConfig.text
          )}
        >
          BrandFlow AI
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// Logo icon only (for favicon-like usage)
export function LogoIcon({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeConfig = sizes[size];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center",
        sizeConfig.container,
        className
      )}
    >
      <Sparkles className={cn("text-white", sizeConfig.icon)} />
    </div>
  );
}
