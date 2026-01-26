"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-background-muted)] text-[var(--color-text-secondary)] font-medium select-none",
  {
    variants: {
      size: {
        xs: "w-6 h-6 text-xs",
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-12 h-12 text-base",
        xl: "w-16 h-16 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  fallback?: string;
}

export function Avatar({
  src,
  alt,
  name,
  fallback,
  size,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const displayFallback = fallback || (name ? getInitials(name) : "?");

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || "Avatar"}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{displayFallback}</span>
      )}
    </div>
  );
}

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  children: React.ReactNode;
}

export function AvatarGroup({
  max = 4,
  size = "md",
  children,
  className,
  ...props
}: AvatarGroupProps) {
  const childArray = React.Children.toArray(children);
  const displayChildren = max ? childArray.slice(0, max) : childArray;
  const remainingCount = childArray.length - displayChildren.length;

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {displayChildren.map((child, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: displayChildren.length - index }}
        >
          {React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
            : child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            "ring-2 ring-white bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
