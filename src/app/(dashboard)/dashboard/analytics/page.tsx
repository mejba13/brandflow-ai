"use client";

import * as React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  Share2,
  ArrowUpRight,
  Calendar,
  Sparkles,
  BarChart3,
  Target,
  Zap,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedAnalyticsSummary, seedPlatformAnalytics, seedTopPosts } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

// Transform seed data into overview stats
const overviewStats = [
  {
    label: "Total Reach",
    value: seedAnalyticsSummary.totalReach,
    change: seedAnalyticsSummary.reachChange,
    icon: Eye,
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    description: "People who saw your content",
  },
  {
    label: "Engagements",
    value: seedAnalyticsSummary.totalEngagements,
    change: seedAnalyticsSummary.engagementChange,
    icon: Heart,
    gradient: "from-[#ec4899] to-[#f472b6]",
    description: "Likes, comments & saves",
  },
  {
    label: "Followers Gained",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    icon: Users,
    gradient: "from-[#10b981] to-[#34d399]",
    description: "New followers this period",
  },
  {
    label: "Shares",
    value: seedAnalyticsSummary.totalShares,
    change: seedAnalyticsSummary.sharesChange,
    icon: Share2,
    gradient: "from-[#f59e0b] to-[#fbbf24]",
    description: "Content shared by others",
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState("30d");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
            className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
              animation: mounted ? "float 12s ease-in-out infinite reverse" : "none",
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
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-sm">Performance Overview</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-white/70 max-w-xl">
              Track your content performance across all platforms. Your reach is up {seedAnalyticsSummary.reachChange}% this month!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Range Selector */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-sm">
              {["7d", "30d", "90d"].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    dateRange === range
                      ? "bg-white text-[#0f172a] shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Custom Range
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          return (
            <div
              key={stat.label}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0] hover:shadow-xl hover:border-[#6366f1]/20 transition-all duration-300"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-lg`}
                  style={{
                    boxShadow: `0 8px 24px -8px ${stat.gradient.includes("6366f1") ? "rgba(99, 102, 241, 0.4)" : stat.gradient.includes("ec4899") ? "rgba(236, 72, 153, 0.4)" : stat.gradient.includes("10b981") ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)"}`,
                  }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    isPositive ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#ef4444]/10 text-[#ef4444]"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-3xl font-bold text-[#0f172a] mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-[#64748b]">{stat.label}</p>
              <p className="text-xs text-[#94a3b8] mt-1">{stat.description}</p>

              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${stat.gradient.split(" ")[0].replace("from-[", "").replace("]", "")} 0%, ${stat.gradient.split(" ")[1].replace("to-[", "").replace("]", "")} 100%)`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Platform Performance - Spans 8 cols */}
        <div className="col-span-12 lg:col-span-8 rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10">
                <Target className="w-5 h-5 text-[#6366f1]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0f172a]">Platform Performance</h2>
                <p className="text-sm text-[#64748b]">Compare metrics across platforms</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e2e8f0]">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Platform
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Followers
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Engagement
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Posts
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Reach
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {seedPlatformAnalytics.map((stat, index) => {
                  const Icon = platformIcons[stat.platform];
                  const info = PLATFORMS[stat.platform];
                  const isPositive = stat.growthPercent > 0;
                  return (
                    <tr
                      key={stat.platform}
                      className="border-b border-[#e2e8f0] last:border-0 hover:bg-[#f8fafc] transition-colors"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${info.color}15` }}
                          >
                            <Icon className="w-5 h-5" style={{ color: info.color }} />
                          </div>
                          <span className="font-semibold text-[#0f172a]">
                            {info.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-[#0f172a]">{stat.followers}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#6366f1]">{stat.engagementRate}</span>
                          <div className="w-16 h-1.5 rounded-full bg-[#e2e8f0] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#6366f1]"
                              style={{ width: `${parseFloat(stat.engagementRate) * 20}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[#64748b]">{stat.postsPublished}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[#64748b]">{stat.reach}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold",
                            isPositive ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#ef4444]/10 text-[#ef4444]"
                          )}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(stat.growthPercent)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights - Spans 4 cols */}
        <div
          className="col-span-12 lg:col-span-4 relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">AI Insights</h2>
                <p className="text-sm text-white/60">Personalized recommendations</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[#fbbf24]" />
                  <span className="text-sm font-semibold text-white">Top Performer</span>
                </div>
                <p className="text-sm text-white/70">
                  Your LinkedIn content is driving {seedPlatformAnalytics[0].growthPercent}% more engagement than last month.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-[#10b981]" />
                  <span className="text-sm font-semibold text-white">Opportunity</span>
                </div>
                <p className="text-sm text-white/70">
                  Consider posting more carousel content on Instagram - they get 3x more saves.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-[#ec4899]" />
                  <span className="text-sm font-semibold text-white">Best Time</span>
                </div>
                <p className="text-sm text-white/70">
                  Your audience is most active on Tuesdays between 9-11 AM.
                </p>
              </div>
            </div>

            <button className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/10">
              Get More Insights
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top Performing Posts - Spans 12 cols */}
        <div className="col-span-12 rounded-2xl bg-white p-6 shadow-sm border border-[#e2e8f0]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#ec4899]/10 to-[#f472b6]/10">
                <TrendingUp className="w-5 h-5 text-[#ec4899]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0f172a]">Top Performing Posts</h2>
                <p className="text-sm text-[#64748b]">Your best content this period</p>
              </div>
            </div>
            <button className="text-[#6366f1] text-sm font-medium hover:text-[#4f46e5] transition-colors flex items-center gap-1">
              View All
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seedTopPosts.slice(0, 3).map((post, index) => {
              const Icon = platformIcons[post.platform];
              const info = PLATFORMS[post.platform];
              return (
                <div
                  key={post.id}
                  className="group p-5 rounded-xl border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-lg transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-[#6366f1]">#{index + 1}</span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}15` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: info.color }} />
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#f1f5f9] text-[#64748b] capitalize">
                      {post.type}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[#0f172a] mb-2 group-hover:text-[#6366f1] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                    <span>{info.name}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#e2e8f0]">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#0f172a]">{post.engagement.toLocaleString()}</p>
                      <p className="text-xs text-[#94a3b8]">Engagements</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#0f172a]">{post.reach}</p>
                      <p className="text-xs text-[#94a3b8]">Reach</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-[#f8fafc] text-[#64748b] hover:text-[#6366f1] transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="relative overflow-hidden rounded-2xl p-8"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.1)",
        }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
              }}
            >
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0f172a]">
                Want deeper insights?
              </h3>
              <p className="text-[#64748b] mt-1">
                Upgrade to Business for AI-powered analytics and custom reports.
              </p>
            </div>
          </div>
          <Button
            className="relative overflow-hidden group whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">Explore Business Plan</span>
            <ArrowUpRight className="w-4 h-4 ml-2 relative z-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
