"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  shortcut?: string;
  onSearch?: (value: string) => void;
}

export function SearchInput({
  shortcut,
  onSearch,
  className,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!shortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to blur
      if (e.key === "Escape") {
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcut]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
    onSearch?.(e.target.value);
  };

  // Detect OS for shortcut display
  const [isMac, setIsMac] = React.useState(false);

  React.useEffect(() => {
    setIsMac(navigator.userAgent.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  const shortcutLabel = shortcut || "K";
  const modifierLabel = isMac ? "" : "Ctrl+";

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 px-4 py-2.5 bg-[var(--color-background-muted)] rounded-[var(--radius-xl)] text-[var(--color-text-muted)] transition-all duration-200",
        "focus-within:bg-white focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:shadow-lg",
        className
      )}
    >
      <Search className="w-4 h-4 flex-shrink-0 text-[var(--color-text-muted)]" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
        onChange={handleChange}
        {...props}
      />
      {shortcut && (
        <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium text-[var(--color-text-muted)] bg-white rounded border border-[var(--color-border-light)]">
          {modifierLabel}{shortcutLabel}
        </kbd>
      )}
    </div>
  );
}
