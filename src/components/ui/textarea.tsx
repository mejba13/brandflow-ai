"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, showCount, maxLength, id, value, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;
    const [charCount, setCharCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );

    React.useEffect(() => {
      if (typeof value === "string") {
        setCharCount(value.length);
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            id={textareaId}
            className={cn(
              "w-full min-h-[120px] bg-[var(--color-background-subtle)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-4 text-base text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] transition-colors duration-150 resize-y",
              "focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]",
              className
            )}
            ref={ref}
            value={value}
            maxLength={maxLength}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined
            }
            onChange={handleChange}
            {...props}
          />
          {showCount && maxLength && (
            <div className="absolute bottom-3 right-3 text-sm text-[var(--color-text-muted)]">
              <span className={charCount > maxLength * 0.9 ? "text-[var(--color-warning)]" : ""}>
                {charCount}
              </span>
              /{maxLength}
            </div>
          )}
        </div>
        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm text-[var(--color-error)]">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="mt-2 text-sm text-[var(--color-text-muted)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
