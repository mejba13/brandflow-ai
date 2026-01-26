"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [currentDate, setCurrentDate] = React.useState(new Date(2024, 0, 1)); // January 2024
  const [selectedDate, setSelectedDate] = React.useState<string | null>("2024-01-28");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
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

  const formatDateStr = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedPosts = selectedDate
    ? seedScheduledPosts.filter((post) => post.scheduledDate === selectedDate)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
            Content Calendar
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Plan and schedule your content across platforms
          </p>
        </div>
        <a href="/dashboard/create">
          <Button leftIcon={<Plus className="w-4 h-4" />}>Schedule Post</Button>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">
              {months[month]} {year}
            </CardTitle>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-[var(--color-text-muted)] py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }
                const dateStr = formatDateStr(day);
                const posts = getPostsForDate(day);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === "2024-01-25"; // Mock today

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      "aspect-square p-1 rounded-[var(--radius-lg)] border transition-all flex flex-col items-center",
                      isSelected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-transparent hover:bg-[var(--color-background-muted)]",
                      isToday && !isSelected && "border-[var(--color-primary)]/30"
                    )}
                  >
                    <span
                      className={cn(
                        "text-sm",
                        isSelected
                          ? "text-[var(--color-primary)] font-medium"
                          : "text-[var(--color-text-primary)]"
                      )}
                    >
                      {day}
                    </span>
                    {posts.length > 0 && (
                      <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                        {posts.slice(0, 3).map((post) => {
                          const color = PLATFORMS[post.platform].color;
                          return (
                            <div
                              key={post.id}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Selected Date Posts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDate
                ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPosts.length > 0 ? (
              <div className="space-y-3">
                {selectedPosts.map((post) => {
                  const Icon = platformIcons[post.platform];
                  const info = PLATFORMS[post.platform];
                  return (
                    <div
                      key={post.id}
                      className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-background-subtle)] border border-[var(--color-border-light)]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center"
                            style={{ backgroundColor: `${info.color}20` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: info.color }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text-primary)]">
                              {post.title}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">{info.name}</p>
                          </div>
                        </div>
                        <button className="p-1 rounded hover:bg-[var(--color-background-muted)]">
                          <MoreHorizontal className="w-4 h-4 text-[var(--color-text-muted)]" />
                        </button>
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2 line-clamp-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-[var(--color-text-secondary)]">
                        <Clock className="w-3 h-3" />
                        {post.scheduledTime}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  No posts scheduled for this date
                </p>
                <a href="/dashboard/create">
                  <Button variant="secondary" size="sm">Schedule a post</Button>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Posts List */}
      <Card>
        <CardHeader>
          <CardTitle>All Scheduled Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {seedScheduledPosts.map((post) => {
              const Icon = platformIcons[post.platform];
              const info = PLATFORMS[post.platform];
              return (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-subtle)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{post.title}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">
                        {new Date(post.scheduledDate + "T00:00:00").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {post.scheduledTime} • {info.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        post.status === "scheduled"
                          ? "bg-[var(--color-warning)]/10 text-[var(--color-warning)]"
                          : post.status === "published"
                            ? "bg-[var(--color-success)]/10 text-[var(--color-success)]"
                            : "bg-[var(--color-error)]/10 text-[var(--color-error)]"
                      )}
                    >
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
