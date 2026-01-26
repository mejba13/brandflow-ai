import { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  TrendingUp,
  Users,
  FileText,
  ArrowUpRight,
  Plus,
  Sparkles,
  Zap,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  seedCurrentUser,
  seedDashboardStats,
  seedScheduledPosts,
  seedAISuggestions,
  seedAnalyticsSummary,
} from "@/lib/seed-data";
import { PLATFORMS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard | BrandFlow AI",
};

// Transform seed data into dashboard stats
const stats = [
  {
    label: "Scheduled Posts",
    value: String(seedDashboardStats.postsScheduled),
    change: 18,
    trend: "up" as const,
    icon: <Calendar className="w-5 h-5 text-[var(--color-primary)]" />,
    iconBg: "bg-[var(--color-primary)]/10",
  },
  {
    label: "Published This Month",
    value: String(seedDashboardStats.postsThisWeek * 4),
    change: 12,
    trend: "up" as const,
    icon: <FileText className="w-5 h-5 text-[var(--color-success)]" />,
    iconBg: "bg-[var(--color-success)]/10",
  },
  {
    label: "Engagement Rate",
    value: seedDashboardStats.engagementRate,
    change: seedAnalyticsSummary.engagementChange,
    trend: "up" as const,
    icon: <TrendingUp className="w-5 h-5 text-[var(--color-warning)]" />,
    iconBg: "bg-[var(--color-warning)]/10",
  },
  {
    label: "Followers Gained",
    value: seedAnalyticsSummary.followersGained,
    change: seedAnalyticsSummary.followersChange,
    trend: "up" as const,
    icon: <Users className="w-5 h-5 text-[var(--color-info)]" />,
    iconBg: "bg-[var(--color-info)]/10",
  },
];

// Get upcoming scheduled posts
const upcomingPosts = seedScheduledPosts.slice(0, 4).map((post) => ({
  id: post.id,
  title: post.title,
  platform: post.platform,
  scheduledFor: `${new Date(post.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${post.scheduledTime}`,
}));

// AI Suggestions from seed data
const aiSuggestions = seedAISuggestions.slice(0, 4);

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold font-heading text-[var(--color-text-primary)]">
            Welcome back, {seedCurrentUser.firstName}!
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Here&apos;s what&apos;s happening with your content at {seedCurrentUser.company}.
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button leftIcon={<Plus className="w-4 h-4" />}>Create Post</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            icon={stat.icon}
            iconBg={stat.iconBg}
          />
        ))}
      </div>

      {/* AI Credits Banner */}
      <Card className="bg-gradient-to-r from-[var(--color-primary)]/5 via-[var(--color-accent)]/5 to-[var(--color-primary)]/5 border-[var(--color-primary)]/20 overflow-hidden">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10">
                <Zap className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="font-medium text-[var(--color-text-primary)]">AI Credits</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {seedDashboardStats.aiCreditsUsed.toLocaleString()} / {seedDashboardStats.aiCreditsTotal.toLocaleString()} credits used this month
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:w-40">
                <div className="h-2.5 rounded-full bg-white overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-500"
                    style={{
                      width: `${(seedDashboardStats.aiCreditsUsed / seedDashboardStats.aiCreditsTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {Math.round((seedDashboardStats.aiCreditsUsed / seedDashboardStats.aiCreditsTotal) * 100)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Posts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">Upcoming Posts</CardTitle>
            <Link
              href="/dashboard/calendar"
              className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1"
            >
              View Calendar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingPosts.length > 0 ? (
              <div className="space-y-3">
                {upcomingPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-subtle)] hover:bg-[var(--color-background-muted)] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <Badge variant={post.platform as "linkedin" | "facebook" | "instagram" | "twitter"}>
                        {PLATFORMS[post.platform].name}
                      </Badge>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                          {post.title}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {post.scheduledFor}
                        </p>
                      </div>
                    </div>
                    <Link href={`/dashboard/content/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[var(--color-text-muted)]">No upcoming posts scheduled</p>
                <Link href="/dashboard/create">
                  <Button variant="secondary" size="sm" className="mt-4">
                    Create your first post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--color-primary)]" />
              AI Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-background-subtle)] hover:bg-[var(--color-background-muted)] transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                        {suggestion.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                        {suggestion.description}
                      </p>
                    </div>
                    {suggestion.priority === "high" && (
                      <span className="flex-shrink-0 px-1.5 py-0.5 text-xs rounded bg-[var(--color-error)]/10 text-[var(--color-error)] font-medium">
                        High
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Get More Ideas
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
              Content Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[var(--color-background-subtle)] rounded-[var(--radius-lg)]">
              <p className="text-[var(--color-text-muted)]">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
              Platform Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-[var(--color-background-subtle)] rounded-[var(--radius-lg)]">
              <p className="text-[var(--color-text-muted)]">Chart visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-[var(--color-background-subtle)] to-white">
        <CardContent className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                Ready to grow your audience?
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                Create AI-optimized content for all your social platforms in seconds with BrandFlow AI.
              </p>
            </div>
            <Link href="/dashboard/create">
              <Button leftIcon={<Sparkles className="w-4 h-4" />}>Transform Content with AI</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
