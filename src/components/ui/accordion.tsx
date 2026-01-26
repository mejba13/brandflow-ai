"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (id: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultOpen?: string[];
}

export function Accordion({
  type = "single",
  defaultOpen = [],
  children,
  className,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultOpen);

  const toggleItem = React.useCallback(
    (id: string) => {
      if (type === "single") {
        setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
      } else {
        setOpenItems((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
      }
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

export function AccordionItem({
  id,
  children,
  className,
  ...props
}: AccordionItemProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const isOpen = context.openItems.includes(id);

  return (
    <div
      className={cn(
        "border border-[var(--color-border-light)] rounded-[var(--radius-lg)] overflow-hidden transition-all duration-200",
        isOpen && "border-[var(--color-primary)]/20 shadow-[var(--shadow-sm)]",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ id: string; isOpen: boolean }>, { id, isOpen })
          : child
      )}
    </div>
  );
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id?: string;
  isOpen?: boolean;
}

export function AccordionTrigger({
  id,
  isOpen,
  children,
  className,
  ...props
}: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  return (
    <button
      type="button"
      onClick={() => id && context.toggleItem(id)}
      className={cn(
        "flex items-center justify-between w-full px-5 py-4 text-left font-medium text-[var(--color-text-primary)] bg-white hover:bg-[var(--color-background-subtle)] transition-colors",
        className
      )}
      aria-expanded={isOpen}
      {...props}
    >
      <span className="text-base">{children}</span>
      <ChevronDown
        className={cn(
          "w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

export function AccordionContent({
  isOpen,
  children,
  className,
  ...props
}: AccordionContentProps) {
  return (
    <div
      className={cn(
        "grid transition-all duration-200 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
      {...props}
    >
      <div className="overflow-hidden">
        <div className={cn("px-5 pb-4 text-[var(--color-text-secondary)]", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
