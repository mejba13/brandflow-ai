"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
  Edit2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedScheduledPosts } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: LinkedInIcon,
  tiktok: TwitterIcon,
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 0, 1));
  const [selectedDate, setSelectedDate] = React.useState<string | null>("2024-01-28");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getPostsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return seedScheduledPosts.filter((post) => post.scheduledDate === dateStr);
  };

  const getSelectedPosts = () => {
    if (!selectedDate) return [];
    return seedScheduledPosts.filter((post) => post.scheduledDate === selectedDate);
  };

  const selectedPosts = getSelectedPosts();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
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
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-sm">Plan Your Content</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Content Calendar
            </h1>
            <p className="text-white/70 max-w-xl">
              Schedule and manage your content across all platforms. You have {seedScheduledPosts.length} posts scheduled.
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
              <span className="relative z-10">Schedule Post</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Calendar - 8 cols */}
        <div className="col-span-12 lg:col-span-8 rounded-2xl bg-white shadow-sm border border-[#e2e8f0] overflow-hidden">
          {/* Calendar Header */}
          <div className="p-6 border-b border-[#e2e8f0]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0f172a]">
                {months[month]} {year}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 rounded-xl hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 rounded-xl bg-[#f1f5f9] text-sm font-medium text-[#64748b] hover:bg-[#e2e8f0] transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#0f172a] transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 border-b border-[#e2e8f0]">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#94a3b8]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
              const posts = day ? getPostsForDate(day) : [];
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={index}
                  disabled={!day}
                  onClick={() => day && setSelectedDate(dateStr)}
                  className={cn(
                    "relative min-h-[100px] p-2 border-b border-r border-[#e2e8f0] text-left transition-colors",
                    day && "hover:bg-[#f8fafc]",
                    isSelected && "bg-[#6366f1]/5 ring-2 ring-inset ring-[#6366f1]/30",
                    !day && "bg-[#f8fafc]"
                  )}
                >
                  {day && (
                    <>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-medium",
                          isToday(day) && "bg-[#6366f1] text-white",
                          !isToday(day) && isSelected && "bg-[#6366f1]/10 text-[#6366f1]",
                          !isToday(day) && !isSelected && "text-[#0f172a]"
                        )}
                      >
                        {day}
                      </span>

                      {/* Posts indicators */}
                      <div className="mt-1 space-y-1">
                        {posts.slice(0, 2).map((post) => {
                          const info = PLATFORMS[post.platform];
                          return (
                            <div
                              key={post.id}
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs truncate"
                              style={{
                                backgroundColor: `${info.color}15`,
                                color: info.color,
                              }}
                            >
                              <Clock className="w-2.5 h-2.5" />
                              <span className="truncate">{post.scheduledTime}</span>
                            </div>
                          );
                        })}
                        {posts.length > 2 && (
                          <div className="text-xs text-[#6366f1] font-medium pl-1">
                            +{posts.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sidebar - 4 cols */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {/* Selected Date Posts */}
          <div className="rounded-2xl bg-white shadow-sm border border-[#e2e8f0] overflow-hidden">
            <div className="p-5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10">
                  <CalendarIcon className="w-5 h-5 text-[#6366f1]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0f172a]">
                    {selectedDate
                      ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </h3>
                  <p className="text-sm text-[#64748b]">
                    {selectedPosts.length} post{selectedPosts.length !== 1 ? "s" : ""} scheduled
                  </p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-[#e2e8f0]">
              {selectedPosts.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#f1f5f9] flex items-center justify-center mx-auto mb-3">
                    <CalendarIcon className="w-6 h-6 text-[#94a3b8]" />
                  </div>
                  <p className="text-sm text-[#64748b] mb-4">No posts scheduled</p>
                  <Link href="/dashboard/create">
                    <Button size="sm" variant="secondary">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Post
                    </Button>
                  </Link>
                </div>
              ) : (
                selectedPosts.map((post) => {
                  const Icon = platformIcons[post.platform];
                  const info = PLATFORMS[post.platform];
                  return (
                    <div
                      key={post.id}
                      className="p-4 hover:bg-[#f8fafc] transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${info.color}15` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: info.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-[#0f172a] text-sm truncate group-hover:text-[#6366f1] transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-xs text-[#64748b] truncate mt-0.5">
                            {post.content.slice(0, 50)}...
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="flex items-center gap-1 text-xs text-[#6366f1]">
                              <Clock className="w-3 h-3" />
                              {post.scheduledTime}
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-xs bg-[#f59e0b]/10 text-[#f59e0b] font-medium">
                              Scheduled
                            </span>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-[#f1f5f9] text-[#94a3b8] opacity-0 group-hover:opacity-100 transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Scheduling</h3>
                <p className="text-xs text-white/60">Optimize your posting times</p>
              </div>
            </div>
            <p className="text-sm text-white/70 mb-4">
              Let AI find the best times to post based on your audience activity.
            </p>
            <button className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors border border-white/10">
              Optimize Schedule
            </button>
          </div>
        </div>
      </div>

      {/* All Scheduled Posts */}
      <div className="rounded-2xl bg-white shadow-sm border border-[#e2e8f0] overflow-hidden">
        <div className="p-6 border-b border-[#e2e8f0]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#f59e0b]/10 to-[#fbbf24]/10">
                <Clock className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0f172a]">Upcoming Schedule</h2>
                <p className="text-sm text-[#64748b]">All scheduled posts for this month</p>
              </div>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {seedScheduledPosts.map((post, index) => {
            const Icon = platformIcons[post.platform];
            const info = PLATFORMS[post.platform];
            return (
              <div
                key={post.id}
                className="p-5 flex items-center gap-4 hover:bg-[#f8fafc] transition-colors group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${info.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: info.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#0f172a] group-hover:text-[#6366f1] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-[#64748b] mt-1">
                    <span>{info.name}</span>
                    <span>•</span>
                    <span>
                      {new Date(post.scheduledDate + "T00:00:00").toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.scheduledTime}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b]">
                  Scheduled
                </span>
                <button className="p-2 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#6366f1] transition-colors opacity-0 group-hover:opacity-100">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
