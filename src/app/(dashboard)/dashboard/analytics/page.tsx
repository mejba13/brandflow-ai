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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  },
  {
    label: "Engagements",
    value: seedAnalyticsSummary.totalEngagements,
    change: seedAnalyticsSummary.engagementChange,
    icon: Heart,
  },
  {
    label: "Followers Gained",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    icon: Users,
  },
  {
    label: "Shares",
    value: seedAnalyticsSummary.totalShares,
    change: seedAnalyticsSummary.sharesChange,
    icon: Share2,
  },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = React.useState("30d");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
            Analytics
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Track your content performance across platforms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[var(--color-background-muted)] rounded-[var(--radius-lg)] p-1">
            {["7d", "30d", "90d"].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  dateRange === range
                    ? "bg-white text-[var(--color-text-primary)] shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>
          <Button variant="secondary" leftIcon={<Calendar className="w-4 h-4" />}>
            Custom Range
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      isPositive ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border-light)]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Platform
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Followers
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Engagement Rate
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Posts
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Reach
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Impressions
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[var(--color-text-muted)]">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody>
                {seedPlatformAnalytics.map((stat) => {
                  const Icon = platformIcons[stat.platform];
                  const info = PLATFORMS[stat.platform];
                  const isPositive = stat.growthPercent > 0;
                  return (
                    <tr
                      key={stat.platform}
                      className="border-b border-[var(--color-border-light)] last:border-0"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center"
                            style={{ backgroundColor: `${info.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: info.color }} />
                          </div>
                          <span className="font-medium text-[var(--color-text-primary)]">
                            {info.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                        {stat.followers}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-[var(--color-primary)]">
                          {stat.engagementRate}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                        {stat.postsPublished}
                      </td>
                      <td className="py-4 px-4 text-[var(--color-text-secondary)]">{stat.reach}</td>
                      <td className="py-4 px-4 text-[var(--color-text-secondary)]">
                        {stat.impressions}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-sm font-medium",
                            isPositive ? "text-[var(--color-success)]" : "text-[var(--color-error)]"
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
        </CardContent>
      </Card>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Top Performing Posts</CardTitle>
          <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seedTopPosts.map((post, index) => {
              const Icon = platformIcons[post.platform];
              const info = PLATFORMS[post.platform];
              return (
                <div
                  key={post.id}
                  className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-subtle)]"
                >
                  <span className="text-lg font-bold text-[var(--color-text-muted)] w-6">
                    #{index + 1}
                  </span>
                  <div
                    className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${info.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: info.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[var(--color-text-primary)] truncate">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                      <span>{info.name}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="capitalize">{post.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-[var(--color-text-primary)]">
                        {post.engagement.toLocaleString()}
                      </p>
                      <p className="text-[var(--color-text-muted)]">Engagements</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-[var(--color-text-primary)]">{post.reach}</p>
                      <p className="text-[var(--color-text-muted)]">Reach</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border-[var(--color-primary)]/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10">
              <TrendingUp className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Performance Insight
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Your LinkedIn content is performing {seedPlatformAnalytics[0].growthPercent}% better than last month.
                The post &quot;The Future of AI in Content Marketing&quot; drove the most engagement.
                Consider creating more AI and marketing technology content to maintain this momentum.
              </p>
              <Button variant="link" size="sm" className="mt-2 px-0">
                View detailed insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
