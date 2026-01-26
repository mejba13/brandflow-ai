import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for conditional class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with K/M/B suffixes
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...options,
  });
}

/**
 * Format a date with time
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  return formatDate(d);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Generate initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

/**
 * Platform display names and colors
 */
export const PLATFORMS = {
  linkedin: {
    name: "LinkedIn",
    color: "#0A66C2",
    icon: "linkedin",
  },
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    icon: "facebook",
  },
  twitter: {
    name: "Twitter/X",
    color: "#1DA1F2",
    icon: "twitter",
  },
  instagram: {
    name: "Instagram",
    color: "#E4405F",
    icon: "instagram",
  },
  pinterest: {
    name: "Pinterest",
    color: "#E60023",
    icon: "pin",
  },
  tiktok: {
    name: "TikTok",
    color: "#000000",
    icon: "video",
  },
} as const;

export type Platform = keyof typeof PLATFORMS;

/**
 * Character limits per platform
 */
export const CHARACTER_LIMITS: Record<Platform, number> = {
  linkedin: 3000,
  facebook: 63206,
  twitter: 280,
  instagram: 2200,
  pinterest: 500,
  tiktok: 2200,
};

/**
 * Image dimensions per platform
 */
export const IMAGE_DIMENSIONS: Record<Platform, { feed: [number, number]; story: [number, number] }> = {
  linkedin: { feed: [1200, 627], story: [1080, 1920] },
  facebook: { feed: [1200, 630], story: [1080, 1920] },
  twitter: { feed: [1600, 900], story: [1080, 1920] },
  instagram: { feed: [1080, 1080], story: [1080, 1920] },
  pinterest: { feed: [1000, 1500], story: [1080, 1920] },
  tiktok: { feed: [1080, 1080], story: [1080, 1920] },
};
