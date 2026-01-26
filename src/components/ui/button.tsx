"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
        secondary:
          "border border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
        ghost:
          "bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-background-muted)]",
        destructive:
          "bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90",
        link: "text-[var(--color-accent)] underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-[var(--radius-lg)]",
        md: "h-11 px-6 text-base rounded-[var(--radius-xl)]",
        lg: "h-12 px-8 text-lg rounded-[var(--radius-xl)]",
        icon: "h-10 w-10 rounded-[var(--radius-lg)]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
