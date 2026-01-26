"use client";

import * as React from "react";
import { Plus, Search, Filter, Eye, Edit2, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedContentLibrary } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

const statusColors = {
  draft: "bg-[var(--color-background-muted)] text-[var(--color-text-secondary)]",
  scheduled: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  published: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
};

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Get all unique tags from content
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    seedContentLibrary.forEach((item) => item.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredContent = seedContentLibrary.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    const matchesTag = !selectedTag || item.tags.includes(selectedTag);
    return matchesSearch && matchesStatus && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
            Content Library
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage all your content in one place
          </p>
        </div>
        <a href="/dashboard/create">
          <Button leftIcon={<Plus className="w-4 h-4" />}>Create Content</Button>
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <Input
            placeholder="Search content, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {["all", "draft", "scheduled", "published"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status === "all" ? null : status)}
              className={cn(
                "px-3 py-1.5 rounded-[var(--radius-lg)] text-sm font-medium transition-colors",
                (status === "all" && !selectedStatus) || selectedStatus === status
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-background-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-subtle)]"
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <Button variant="secondary" leftIcon={<Filter className="w-4 h-4" />}>
          More Filters
        </Button>
      </div>

      {/* Tags filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-[var(--color-text-muted)]">Tags:</span>
        <button
          onClick={() => setSelectedTag(null)}
          className={cn(
            "px-2 py-1 rounded-[var(--radius-md)] text-xs font-medium transition-colors",
            !selectedTag
              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
              : "bg-[var(--color-background-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-subtle)]"
          )}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              "px-2 py-1 rounded-[var(--radius-md)] text-xs font-medium transition-colors",
              selectedTag === tag
                ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                : "bg-[var(--color-background-muted)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background-subtle)]"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {filteredContent.map((item) => {
          const excerpt = item.sourceContent.slice(0, 200) + (item.sourceContent.length > 200 ? "..." : "");

          return (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[var(--color-text-primary)] truncate">
                        {item.title}
                      </h3>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                          statusColors[item.status]
                        )}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-3">
                      {excerpt}
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        {item.platforms.map((platform) => {
                          const Icon = platformIcons[platform];
                          const info = PLATFORMS[platform];
                          return (
                            <div
                              key={platform}
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${info.color}15` }}
                              title={info.name}
                            >
                              <Icon className="w-3 h-3" style={{ color: info.color }} />
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        By {item.author}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        Created {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {item.scheduledFor && (
                        <span className="text-xs text-[var(--color-warning)]">
                          Scheduled for {item.scheduledFor}
                        </span>
                      )}
                      {item.publishedAt && (
                        <span className="text-xs text-[var(--color-success)]">
                          Published {new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-background-muted)] text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] text-[var(--color-text-muted)] transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] text-[var(--color-text-muted)] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] text-[var(--color-text-muted)] transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-error)]/10 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-[var(--color-text-muted)]">No content found matching your criteria</p>
            <a href="/dashboard/create">
              <Button variant="secondary" size="sm" className="mt-4">
                Create your first content
              </Button>
            </a>
          </CardContent>
        </Card>
      )}

      {/* Content count */}
      <div className="text-sm text-[var(--color-text-muted)]">
        Showing {filteredContent.length} of {seedContentLibrary.length} items
      </div>
    </div>
  );
}
