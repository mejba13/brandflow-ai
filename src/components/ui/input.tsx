"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "w-full bg-transparent border-b border-[var(--color-border)] py-3 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors duration-150",
            "focus:border-[var(--color-primary)] focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--color-error)] focus:border-[var(--color-error)]",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-[var(--color-error)]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="mt-2 text-sm text-[var(--color-text-muted)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
