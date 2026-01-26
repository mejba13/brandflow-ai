"use client";

import * as React from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Copy,
  FileText,
  MoreHorizontal,
  Calendar,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const statusConfig = {
  draft: {
    label: "Draft",
    bg: "bg-[#64748b]/10",
    text: "text-[#64748b]",
    dot: "bg-[#64748b]",
  },
  scheduled: {
    label: "Scheduled",
    bg: "bg-[#f59e0b]/10",
    text: "text-[#f59e0b]",
    dot: "bg-[#f59e0b]",
  },
  published: {
    label: "Published",
    bg: "bg-[#10b981]/10",
    text: "text-[#10b981]",
    dot: "bg-[#10b981]",
  },
};

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const statusCounts = {
    all: seedContentLibrary.length,
    draft: seedContentLibrary.filter((c) => c.status === "draft").length,
    scheduled: seedContentLibrary.filter((c) => c.status === "scheduled").length,
    published: seedContentLibrary.filter((c) => c.status === "published").length,
  };

  return (
    <div className="space-y-6">
      {/* Header with Gradient */}
      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        }}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
              animation: mounted ? "float 15s ease-in-out infinite" : "none",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-sm">Your Creative Hub</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Content Library
            </h1>
            <p className="text-white/70 max-w-xl">
              Manage, organize, and repurpose all your content in one place. You have {seedContentLibrary.length} pieces of content.
            </p>
          </div>

          <Link href="/dashboard/create">
            <Button
              className="relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Plus className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Create Content</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "All Content", value: statusCounts.all, status: null, gradient: "from-[#6366f1] to-[#8b5cf6]" },
          { label: "Drafts", value: statusCounts.draft, status: "draft", gradient: "from-[#64748b] to-[#94a3b8]" },
          { label: "Scheduled", value: statusCounts.scheduled, status: "scheduled", gradient: "from-[#f59e0b] to-[#fbbf24]" },
          { label: "Published", value: statusCounts.published, status: "published", gradient: "from-[#10b981] to-[#34d399]" },
        ].map((stat) => (
          <button
            key={stat.label}
            onClick={() => setSelectedStatus(stat.status)}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 text-left transition-all duration-300",
              selectedStatus === stat.status || (stat.status === null && !selectedStatus)
                ? "bg-white shadow-xl border-2 border-[#6366f1]/30"
                : "bg-white shadow-sm border border-[#e2e8f0] hover:shadow-lg hover:border-[#6366f1]/20"
            )}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${stat.gradient}`}
            >
              <FileText className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-[#0f172a]">{stat.value}</p>
            <p className="text-sm text-[#64748b]">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search content, tags, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#e2e8f0] bg-white focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 outline-none transition-all text-[#0f172a] placeholder-[#94a3b8]"
          />
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-[#94a3b8]" />
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              !selectedTag
                ? "bg-[#6366f1] text-white"
                : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
            )}
          >
            All
          </button>
          {allTags.slice(0, 4).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                selectedTag === tag
                  ? "bg-[#6366f1] text-white"
                  : "bg-[#f1f5f9] text-[#64748b] hover:bg-[#e2e8f0]"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map((item, index) => {
          const status = statusConfig[item.status];
          const excerpt = item.sourceContent.slice(0, 120) + (item.sourceContent.length > 120 ? "..." : "");

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-white border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-xl transition-all duration-300"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Header */}
              <div className="p-5 pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", status.bg, status.text)}>
                    <div className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                    {status.label}
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] opacity-0 group-hover:opacity-100 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-semibold text-[#0f172a] mb-2 group-hover:text-[#6366f1] transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#64748b] line-clamp-2 mb-4">
                  {excerpt}
                </p>
              </div>

              {/* Platforms */}
              <div className="px-5 mb-4">
                <div className="flex items-center gap-1.5">
                  {item.platforms.map((platform) => {
                    const Icon = platformIcons[platform];
                    const info = PLATFORMS[platform];
                    return (
                      <div
                        key={platform}
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}15` }}
                        title={info.name}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: info.color }} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tags */}
              <div className="px-5 mb-4">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs bg-[#f1f5f9] text-[#64748b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-[#e2e8f0] bg-[#f8fafc]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#94a3b8]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    {item.scheduledFor && (
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        <Clock className="w-3.5 h-3.5" />
                        {item.scheduledFor}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-lg hover:bg-white text-[#64748b] hover:text-[#6366f1] transition-all" title="Preview">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white text-[#64748b] hover:text-[#6366f1] transition-all" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-white text-[#64748b] hover:text-[#6366f1] transition-all" title="Duplicate">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-[#fef2f2] text-[#64748b] hover:text-[#ef4444] transition-all" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#e2e8f0]">
          <div className="w-16 h-16 rounded-full bg-[#f1f5f9] flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-[#94a3b8]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0f172a] mb-2">No content found</h3>
          <p className="text-[#64748b] mb-6 max-w-md mx-auto">
            Try adjusting your search or filters, or create new content to get started.
          </p>
          <Link href="/dashboard/create">
            <Button
              className="relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create your first content
            </Button>
          </Link>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-[#64748b]">
        <p>
          Showing <span className="font-semibold text-[#0f172a]">{filteredContent.length}</span> of{" "}
          <span className="font-semibold text-[#0f172a]">{seedContentLibrary.length}</span> items
        </p>
        <button className="flex items-center gap-1 text-[#6366f1] font-medium hover:text-[#4f46e5] transition-colors">
          <Filter className="w-4 h-4" />
          Advanced Filters
        </button>
      </div>
    </div>
  );
}
