"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, interactive = false, padding = "lg", children, ...props }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-white border border-[var(--color-border-light)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)]",
          paddingClasses[padding],
          interactive &&
            "cursor-pointer transition-all duration-200 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold font-heading text-[var(--color-text-primary)] leading-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-text-secondary)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4 border-t border-[var(--color-border-light)]", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
