"use client";

import * as React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  CheckCircle,
  Loader2,
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
import { useSocial } from "@/lib/social/social-context";
import { ConnectAccountModal } from "@/components/social/connect-account-modal";
import type { Platform } from "@/lib/utils";
import type { SocialPlatform } from "@/lib/social/types";

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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 20 },
  },
};

export default function AccountsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { accounts, isLoading, processOAuthCallback, disconnectAccount, refreshAccount } = useSocial();

  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{ type: "success" | "error"; message: string } | null>(null);
  const [processingCallback, setProcessingCallback] = React.useState(false);
  const [deletingAccount, setDeletingAccount] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Process OAuth callback
  React.useEffect(() => {
    const hasCallback =
      searchParams.get("linkedin_connected") ||
      searchParams.get("twitter_connected") ||
      searchParams.get("twitter_pkce_callback") ||
      searchParams.get("facebook_connected") ||
      searchParams.get("instagram_connected") ||
      searchParams.get("pinterest_connected") ||
      searchParams.get("tiktok_connected") ||
      searchParams.get("error");

    if (hasCallback && !processingCallback) {
      setProcessingCallback(true);

      processOAuthCallback(searchParams).then((result) => {
        if (result.success) {
          setToast({ type: "success", message: "Account connected successfully!" });
        } else if (result.error) {
          setToast({ type: "error", message: result.error });
        }

        // Clean up URL
        router.replace("/dashboard/accounts", { scroll: false });
        setProcessingCallback(false);
      });
    }
  }, [searchParams, processOAuthCallback, router, processingCallback]);

  // Auto-dismiss toast
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Combine seed accounts with real connected accounts
  const allAccounts = React.useMemo(() => {
    // Start with real accounts
    const realAccounts = accounts.map((acc) => ({
      id: acc.id,
      platform: acc.platform as Platform,
      displayName: acc.displayName,
      username: acc.username,
      status: acc.status,
      followers: acc.followers || "—",
      lastSync: acc.lastSync,
      profileUrl: acc.profileUrl,
      avatarUrl: acc.avatarUrl,
      isReal: true,
    }));

    // Add seed accounts for platforms not yet connected
    const connectedPlatforms = new Set(accounts.map((a) => a.platform));
    const seedAccounts = seedSocialAccounts
      .filter((acc) => !connectedPlatforms.has(acc.platform as SocialPlatform))
      .map((acc) => ({
        id: acc.id,
        platform: acc.platform as Platform,
        displayName: acc.displayName,
        username: acc.username,
        status: acc.status,
        followers: acc.followers,
        lastSync: acc.lastSync,
        profileUrl: acc.profileUrl,
        avatarUrl: undefined,
        isReal: false,
      }));

    return [...realAccounts, ...seedAccounts];
  }, [accounts]);

  // Get connected platform IDs
  const connectedPlatformIds = allAccounts.map((acc) => acc.platform);

  // Get account limits based on plan
  const currentPlan = seedPricingPlans.find((p) => p.name.toLowerCase() === seedCurrentUser.plan);
  const accountLimit = currentPlan?.limits.socialAccounts || 5;
  const accountsUsed = allAccounts.length;

  // Health summary
  const healthyAccounts = allAccounts.filter((a) => a.status === "connected").length;
  const needsAttention = allAccounts.filter((a) => a.status === "expired").length;
  const hasErrors = allAccounts.filter((a) => a.status === "error").length;

  const handleDisconnect = async (accountId: string) => {
    setDeletingAccount(accountId);
    await disconnectAccount(accountId);
    setToast({ type: "success", message: "Account disconnected successfully" });
    setDeletingAccount(null);
  };

  const handleRefresh = async (accountId: string) => {
    await refreshAccount(accountId);
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={cn(
              "fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg",
              toast.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-red-50 border border-red-200 text-red-800"
            )}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="p-1 hover:bg-black/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Gradient */}
      <motion.div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        }}
        variants={itemVariants}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
            }}
            animate={mounted ? { y: [0, 20, 0], x: [0, -10, 0] } : {}}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1] to-[#a855f7]"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <Link2 className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-white/60 text-sm">Social Media Management</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Connected Accounts
            </h1>
            <p className="text-white/70 max-w-xl">
              Manage your social media connections. You're using {accountsUsed} of {accountLimit} available account slots.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <Plus className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Connect Account</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Health Stats */}
      <motion.div className="grid grid-cols-3 gap-4" variants={itemVariants}>
        <motion.div
          className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm"
          whileHover={{ y: -2, boxShadow: "0 8px 30px -12px rgba(0,0,0,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#10b981]/10">
              <Check className="w-5 h-5 text-[#10b981]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Healthy</span>
          </div>
          <p className="text-3xl font-bold text-[#10b981]">{healthyAccounts}</p>
        </motion.div>
        <motion.div
          className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm"
          whileHover={{ y: -2, boxShadow: "0 8px 30px -12px rgba(0,0,0,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#f59e0b]/10">
              <AlertTriangle className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Needs Attention</span>
          </div>
          <p className="text-3xl font-bold text-[#f59e0b]">{needsAttention}</p>
        </motion.div>
        <motion.div
          className="rounded-2xl bg-white p-5 border border-[#e2e8f0] shadow-sm"
          whileHover={{ y: -2, boxShadow: "0 8px 30px -12px rgba(0,0,0,0.15)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#ef4444]/10">
              <XCircle className="w-5 h-5 text-[#ef4444]" />
            </div>
            <span className="text-sm font-medium text-[#64748b]">Errors</span>
          </div>
          <p className="text-3xl font-bold text-[#ef4444]">{hasErrors}</p>
        </motion.div>
      </motion.div>

      {/* Connected Accounts */}
      <motion.div
        className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm overflow-hidden"
        variants={itemVariants}
      >
        <div className="p-6 border-b border-[#e2e8f0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10">
              <Shield className="w-5 h-5 text-[#6366f1]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#0f172a]">Your Connected Accounts</h2>
              <p className="text-sm text-[#64748b]">{allAccounts.length} accounts connected</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#e2e8f0]">
          {isLoading ? (
            <div className="p-12 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#6366f1]" />
            </div>
          ) : (
            allAccounts.map((account, index) => {
              const Icon = platformIcons[account.platform];
              const info = PLATFORMS[account.platform];
              const status = statusConfig[account.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={account.id}
                  className="p-6 hover:bg-[#f8fafc] transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-6">
                    {/* Platform Icon */}
                    <motion.div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: info.color }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>

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
                        {account.isReal && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0468D7]/10 text-[#0468D7]">
                            Live
                          </span>
                        )}
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
                        <motion.button
                          onClick={() => handleRefresh(account.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#6366f1] text-white text-sm font-medium hover:bg-[#4f46e5] transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reconnect
                        </motion.button>
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
                      {account.isReal && (
                        <motion.button
                          onClick={() => handleDisconnect(account.id)}
                          disabled={deletingAccount === account.id}
                          className="p-2 rounded-lg hover:bg-[#fef2f2] text-[#64748b] hover:text-[#ef4444] transition-colors disabled:opacity-50"
                          title="Disconnect"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {deletingAccount === account.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

      {/* Add More Accounts */}
      <motion.div
        className="rounded-2xl bg-white border border-[#e2e8f0] shadow-sm p-6"
        variants={itemVariants}
      >
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
            const isLinkedInAvailable = platform === "linkedin";

            return (
              <motion.button
                key={platform}
                onClick={() => !isConnected && setIsModalOpen(true)}
                disabled={isConnected}
                className={cn(
                  "relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-300",
                  isConnected
                    ? "bg-[#f8fafc] border-2 border-[#e2e8f0] opacity-60 cursor-not-allowed"
                    : "bg-white border-2 border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-xl group cursor-pointer"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={!isConnected ? { scale: 1.02, y: -4 } : {}}
                whileTap={!isConnected ? { scale: 0.98 } : {}}
              >
                {isConnected && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-[#10b981]" />
                  </div>
                )}
                {!isLinkedInAvailable && !isConnected && (
                  <div className="absolute top-2 right-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-100 text-amber-700">
                      Soon
                    </span>
                  </div>
                )}
                <motion.div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform"
                  )}
                  style={{ backgroundColor: `${info.color}15` }}
                  whileHover={!isConnected ? { scale: 1.1, rotate: 5 } : {}}
                >
                  <Icon className="w-7 h-7" style={{ color: info.color }} />
                </motion.div>
                <p className="font-medium text-[#0f172a]">{info.name}</p>
                {isConnected ? (
                  <p className="text-xs text-[#10b981] mt-1">Connected</p>
                ) : (
                  <p className="text-xs text-[#94a3b8] mt-1 group-hover:text-[#6366f1] transition-colors">
                    Click to connect
                  </p>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Upgrade CTA */}
      {accountsUsed >= accountLimit - 1 && seedCurrentUser.plan !== "business" && (
        <motion.div
          className="relative overflow-hidden rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.1)",
          }}
          variants={itemVariants}
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <TrendingUp className="w-7 h-7 text-white" />
              </motion.div>
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
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="relative overflow-hidden group whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ y: "100%" }}
                  whileHover={{ y: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">Upgrade Plan</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Connect Account Modal */}
      <ConnectAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        connectedPlatforms={accounts.map((a) => a.platform)}
      />
    </motion.div>
  );
}
