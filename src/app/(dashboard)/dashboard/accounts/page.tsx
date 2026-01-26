"use client";

import * as React from "react";
import { ExternalLink, RefreshCw, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedSocialAccounts, seedCurrentUser } from "@/lib/seed-data";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
};

const statusConfig = {
  connected: {
    label: "Connected",
    color: "text-[var(--color-success)]",
    bgColor: "bg-[var(--color-success)]/10",
    icon: CheckCircle,
  },
  expired: {
    label: "Token Expired",
    color: "text-[var(--color-warning)]",
    bgColor: "bg-[var(--color-warning)]/10",
    icon: AlertCircle,
  },
  error: {
    label: "Connection Error",
    color: "text-[var(--color-error)]",
    bgColor: "bg-[var(--color-error)]/10",
    icon: AlertCircle,
  },
};

// Get account limits based on plan
const accountLimits = {
  starter: 5,
  pro: 15,
  business: 999,
};

export default function AccountsPage() {
  const currentLimit = accountLimits[seedCurrentUser.plan];
  const connectedCount = seedSocialAccounts.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
            Connected Accounts
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage your social media connections for {seedCurrentUser.company}
          </p>
        </div>
      </div>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seedSocialAccounts.map((account) => {
              const Icon = platformIcons[account.platform];
              const info = PLATFORMS[account.platform];
              const status = statusConfig[account.status];
              const StatusIcon = status.icon;

              return (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)] hover:border-[var(--color-border)] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-[var(--radius-lg)] flex items-center justify-center"
                      style={{ backgroundColor: `${info.color}15` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--color-text-primary)]">
                          {account.displayName}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                            status.bgColor,
                            status.color
                          )}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-[var(--color-text-muted)]">
                        <span>{info.name}</span>
                        <span>•</span>
                        <span>{account.username}</span>
                        <span>•</span>
                        <span>{account.followers} followers</span>
                        <span>•</span>
                        <span>Synced {account.lastSync}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {account.status === "expired" && (
                      <Button variant="secondary" size="sm" leftIcon={<RefreshCw className="w-4 h-4" />}>
                        Reconnect
                      </Button>
                    )}
                    <a
                      href={account.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] text-[var(--color-text-muted)] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-error)]/10 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add More Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Add More Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            Connect additional social media platforms to expand your reach with BrandFlow AI
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {(Object.keys(PLATFORMS) as Platform[]).map((platform) => {
              const Icon = platformIcons[platform];
              const info = PLATFORMS[platform];
              const isConnected = seedSocialAccounts.some((a) => a.platform === platform);

              return (
                <button
                  key={platform}
                  disabled={isConnected}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-[var(--radius-xl)] border transition-all",
                    isConnected
                      ? "border-[var(--color-border-light)] bg-[var(--color-background-muted)] opacity-50 cursor-not-allowed"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                  )}
                >
                  <div
                    className="w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center"
                    style={{ backgroundColor: `${info.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: info.color }} />
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {info.name}
                  </span>
                  {isConnected ? (
                    <span className="text-xs text-[var(--color-success)]">Connected</span>
                  ) : (
                    <span className="text-xs text-[var(--color-primary)]">+ Connect</span>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Account Limits */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">Account Limits</h3>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                You have connected {connectedCount} of {currentLimit === 999 ? "unlimited" : currentLimit} social accounts on your{" "}
                <span className="font-medium text-[var(--color-primary)] capitalize">{seedCurrentUser.plan}</span> plan
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 rounded-full bg-[var(--color-background-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-primary)]"
                    style={{ width: `${Math.min((connectedCount / currentLimit) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {connectedCount}/{currentLimit === 999 ? "∞" : currentLimit}
                </span>
              </div>
              {seedCurrentUser.plan !== "business" && (
                <Button variant="link" size="sm" className="mt-1">
                  Upgrade for more
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Platform Status Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Connection Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-success)]/10 text-center">
              <p className="text-2xl font-bold text-[var(--color-success)]">
                {seedSocialAccounts.filter((a) => a.status === "connected").length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Healthy</p>
            </div>
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)]/10 text-center">
              <p className="text-2xl font-bold text-[var(--color-warning)]">
                {seedSocialAccounts.filter((a) => a.status === "expired").length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Needs Attention</p>
            </div>
            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-error)]/10 text-center">
              <p className="text-2xl font-bold text-[var(--color-error)]">
                {seedSocialAccounts.filter((a) => a.status === "error").length}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Errors</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
