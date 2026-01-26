"use client";

import * as React from "react";
import {
  Plus,
  Link2,
  Check,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Trash2,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/icons/platform-icons";
import { cn, PLATFORMS } from "@/lib/utils";
import { seedSocialAccounts, seedCurrentUser, seedPricingPlans } from "@/lib/seed-data";
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
    icon: Check,
    bg: "bg-[#10b981]/10",
    text: "text-[#10b981]",
  },
  expired: {
    label: "Token Expired",
    icon: AlertTriangle,
    bg: "bg-[#f59e0b]/10",
    text: "text-[#f59e0b]",
  },
  error: {
    label: "Connection Error",
    icon: XCircle,
    bg: "bg-[#ef4444]/10",
    text: "text-[#ef4444]",
  },
};

// All available platforms for connecting
const availablePlatforms: Platform[] = ["linkedin", "twitter", "facebook", "instagram", "pinterest", "tiktok"];

export default function AccountsPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Get connected platform IDs
  const connectedPlatformIds = seedSocialAccounts.map((acc) => acc.platform);

  // Get account limits based on plan
  const currentPlan = seedPricingPlans.find((p) => p.name.toLowerCase() === seedCurrentUser.plan);
  const accountLimit = currentPlan?.limits.socialAccounts || 5;
  const accountsUsed = seedSocialAccounts.length;

  // Health summary
  const healthyAccounts = seedSocialAccounts.filter((a) => a.status === "connected").length;
  const needsAttention = seedSocialAccounts.filter((a) => a.status === "expired").length;
  const hasErrors = seedSocialAccounts.filter((a) => a.status === "error").length;

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
                <Link2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/60 text-sm">Social Media Management</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Connected Accounts
            </h1>
            <p className="text-white/70 max-w-xl">
              Manage your social media connections. You're using {accountsUsed} of {accountLimit} available account slots.
            </p>
          </div>

          <Button
            className="relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
              boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Plus className="w-4 h-4 mr-2 relative z-10" />
            <span className="relative z-10">Connect Account</span>
          </Button>
        </div>
      </div>

      {/* Health Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#10b981]/10">
              <Check className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Healthy</span>
          </div>
          <p className="text-3xl font-bold text-[#10b981]">{healthyAccounts}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f59e0b]/10">
              <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Needs Attention</span>
          </div>
          <p className="text-3xl font-bold text-[#f59e0b]">{needsAttention}</p>
        </div>
        <div className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ef4444]/10">
              <XCircle className="w-5 h-5 text-[#ef4444]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Errors</span>
          </div>
          <p className="text-3xl font-bold text-[#ef4444]">{hasErrors}</p>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10">
              <Shield className="w-5 h-5 text-[#6366f1]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">Your Connected Accounts</h2>
              <p className="text-sm text-[#64748b]">{seedSocialAccounts.length} accounts connected</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {seedSocialAccounts.map((account, index) => {
            const Icon = platformIcons[account.platform];
            const info = PLATFORMS[account.platform];
            const status = statusConfig[account.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={account.id}
                className="p-6 hover:bg-[#f8fafc] transition-colors group"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="flex items-center gap-6">
                  {/* Platform Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: info.color }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Account Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#0f172a]">{account.displayName}</h3>
                      <span className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                        status.bg, status.text
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748b]">{account.username}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-lg font-bold text-[#0f172a]">{account.followers}</p>
                      <p className="text-xs text-[#94a3b8]">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-[#64748b]">{account.lastSync}</p>
                      <p className="text-xs text-[#94a3b8]">Last Synced</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {account.status !== "connected" && (
                      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-medium hover:bg-[#4f46e5] transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        Reconnect
                      </button>
                    )}
                    <a
                      href={account.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-[#f1f5f9] text-[#64748b] hover:text-[#6366f1] transition-colors"
                      title="View Profile"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      className="p-2 rounded-lg hover:bg-[#fef2f2] text-[#64748b] hover:text-[#ef4444] transition-colors"
                      title="Disconnect"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add More Accounts */}
      <div className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#10b981]/10 to-[#34d399]/10">
            <Plus className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#0f172a]">Connect More Accounts</h2>
            <p className="text-sm text-[#64748b]">
              {accountLimit - accountsUsed} slots remaining on your {seedCurrentUser.plan} plan
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {availablePlatforms.map((platform, index) => {
            const Icon = platformIcons[platform];
            const info = PLATFORMS[platform];
            const isConnected = connectedPlatformIds.includes(platform);

            return (
              <button
                key={platform}
                disabled={isConnected}
                className={cn(
                  "relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300",
                  isConnected
                    ? "bg-[#f8fafc] border-2 border-[#e2e8f0] opacity-60 cursor-not-allowed"
                    : "bg-white border-2 border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-xl group"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {isConnected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-[#10b981]" />
                  </div>
                )}
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform",
                    !isConnected && "group-hover:scale-110"
                  )}
                  style={{ backgroundColor: `${info.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: info.color }} />
                </div>
                <p className="font-medium text-[#0f172a]">{info.name}</p>
                {isConnected ? (
                  <p className="text-xs text-[#10b981] mt-1">Connected</p>
                ) : (
                  <p className="text-xs text-[#94a3b8] mt-1 group-hover:text-[#6366f1] transition-colors">
                    Click to connect
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upgrade CTA */}
      {accountsUsed >= accountLimit - 1 && seedCurrentUser.plan !== "business" && (
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
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0f172a]">
                  Need more accounts?
                </h3>
                <p className="text-[#64748b] mt-1">
                  Upgrade to {seedCurrentUser.plan === "starter" ? "Pro" : "Business"} for{" "}
                  {seedCurrentUser.plan === "starter" ? "15" : "unlimited"} account connections.
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
              <Sparkles className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Upgrade Plan</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
