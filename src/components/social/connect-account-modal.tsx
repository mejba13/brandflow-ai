"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Shield,
  Check,
  Loader2,
  Lock,
  Zap,
  Users,
  TrendingUp,
  ArrowLeft,
  Sparkles,
  Globe,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/icons/platform-icons";
import { cn } from "@/lib/utils";
import { useSocial } from "@/lib/social/social-context";
import type { SocialPlatform } from "@/lib/social/types";
import type { Platform } from "@/lib/utils";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
};

const platformColors: Record<Platform, { primary: string; glow: string; gradient: string }> = {
  linkedin: {
    primary: "#0A66C2",
    glow: "rgba(10, 102, 194, 0.4)",
    gradient: "linear-gradient(135deg, #0A66C2 0%, #0077B5 100%)",
  },
  facebook: {
    primary: "#1877F2",
    glow: "rgba(24, 119, 242, 0.4)",
    gradient: "linear-gradient(135deg, #1877F2 0%, #0866FF 100%)",
  },
  twitter: {
    primary: "#1DA1F2",
    glow: "rgba(29, 161, 242, 0.4)",
    gradient: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
  },
  instagram: {
    primary: "#E4405F",
    glow: "rgba(228, 64, 95, 0.4)",
    gradient: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  pinterest: {
    primary: "#E60023",
    glow: "rgba(230, 0, 35, 0.4)",
    gradient: "linear-gradient(135deg, #E60023 0%, #BD081C 100%)",
  },
  tiktok: {
    primary: "#00F2EA",
    glow: "rgba(0, 242, 234, 0.4)",
    gradient: "linear-gradient(135deg, #00F2EA 0%, #FF0050 100%)",
  },
};

const platformStats: Record<Platform, { users: string; growth: string }> = {
  linkedin: { users: "900M+", growth: "+12%" },
  facebook: { users: "3B+", growth: "+8%" },
  twitter: { users: "550M+", growth: "+15%" },
  instagram: { users: "2B+", growth: "+18%" },
  pinterest: { users: "450M+", growth: "+10%" },
  tiktok: { users: "1.5B+", growth: "+25%" },
};

interface PlatformInfo {
  platform: SocialPlatform;
  name: string;
  description: string;
  permissions: string[];
  available: boolean;
  comingSoon?: boolean;
  features: string[];
}

const platforms: PlatformInfo[] = [
  {
    platform: "linkedin",
    name: "LinkedIn",
    description: "Connect your LinkedIn profile to share professional content and grow your network.",
    permissions: ["Post content on your behalf", "Access your profile info", "View your connections count"],
    features: ["Professional networking", "B2B marketing", "Thought leadership"],
    available: true,
  },
  {
    platform: "twitter",
    name: "X (Twitter)",
    description: "Connect your X account to share tweets and engage with your audience in real-time.",
    permissions: ["Post tweets on your behalf", "Access your profile info", "View your followers"],
    features: ["Real-time engagement", "Viral potential", "Direct messaging"],
    available: true,
  },
  {
    platform: "facebook",
    name: "Facebook",
    description: "Connect your Facebook Page to share posts and reach your community at scale.",
    permissions: ["Post content to your Page", "Access Page insights", "View engagement metrics"],
    features: ["Massive reach", "Community building", "Event promotion"],
    available: true,
  },
  {
    platform: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business account to share stunning photos and Reels.",
    permissions: ["Post content on your behalf", "Access your profile info", "View insights"],
    features: ["Visual storytelling", "Reels & Stories", "Shopping integration"],
    available: true,
  },
  {
    platform: "pinterest",
    name: "Pinterest",
    description: "Connect your Pinterest account to share Pins and drive traffic to your content.",
    permissions: ["Create Pins on your behalf", "Access your boards", "View analytics"],
    features: ["Evergreen content", "High purchase intent", "Visual discovery"],
    available: true,
  },
  {
    platform: "tiktok",
    name: "TikTok",
    description: "Connect your TikTok account to share viral videos and reach Gen Z audiences.",
    permissions: ["Post videos on your behalf", "Access your profile info", "View analytics"],
    features: ["Viral algorithms", "Gen Z audience", "Creative tools"],
    available: true,
  },
];

interface ConnectAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  connectedPlatforms?: SocialPlatform[];
}

export function ConnectAccountModal({
  isOpen,
  onClose,
  connectedPlatforms = [],
}: ConnectAccountModalProps) {
  const { connectAccount } = useSocial();
  const [selectedPlatform, setSelectedPlatform] = React.useState<SocialPlatform | null>(null);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [step, setStep] = React.useState<"select" | "confirm">("select");
  const [hoveredPlatform, setHoveredPlatform] = React.useState<SocialPlatform | null>(null);

  const selectedInfo = platforms.find((p) => p.platform === selectedPlatform);

  const handlePlatformSelect = (platform: SocialPlatform) => {
    const info = platforms.find((p) => p.platform === platform);
    if (!info?.available || connectedPlatforms.includes(platform)) return;

    setSelectedPlatform(platform);
    setStep("confirm");
  };

  const handleConnect = () => {
    if (!selectedPlatform) return;

    setIsConnecting(true);
    // Initiate OAuth flow - this will redirect the user
    connectAccount(selectedPlatform);
  };

  const handleBack = () => {
    setSelectedPlatform(null);
    setStep("select");
  };

  const handleClose = () => {
    setSelectedPlatform(null);
    setStep("select");
    setIsConnecting(false);
    onClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            {/* Dark gradient backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(3, 7, 18, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
                backdropFilter: "blur(8px)",
              }}
            />
          </motion.div>

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-3xl pointer-events-auto overflow-hidden rounded-[2rem]"
              style={{
                background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 25px 100px -20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)",
              }}
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <motion.div
                  className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.15, 0.25, 0.15],
                  }}
                  transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                  style={{
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />

                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.015]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-xl transition-all"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{
                  background: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-white/70" />
              </motion.button>

              {/* Header */}
              <div className="relative px-8 pt-8 pb-6">
                <div className="flex items-center gap-5">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                        boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.5)",
                      }}
                    >
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      style={{
                        background: "linear-gradient(135deg, #6366f1, #a855f7)",
                        filter: "blur(12px)",
                      }}
                    />
                  </motion.div>

                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 mb-2"
                    >
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-300 border border-violet-500/30">
                        Secure OAuth 2.0
                      </span>
                    </motion.div>
                    <h2
                      className="text-2xl font-bold"
                      style={{
                        background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #a5b4fc 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {step === "select" ? "Connect Your Accounts" : `Connect ${selectedInfo?.name}`}
                    </h2>
                    <p className="text-white/50 text-sm mt-1">
                      {step === "select"
                        ? "Link your social platforms to start publishing content"
                        : "Review permissions before connecting"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative px-8 pb-8">
                <AnimatePresence mode="wait">
                  {step === "select" ? (
                    <motion.div
                      key="select"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -20 }}
                    >
                      {/* Platform Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {platforms.map((platform) => {
                          const Icon = platformIcons[platform.platform];
                          const colors = platformColors[platform.platform];
                          const stats = platformStats[platform.platform];
                          const isConnected = connectedPlatforms.includes(platform.platform);
                          const isDisabled = !platform.available || isConnected;
                          const isHovered = hoveredPlatform === platform.platform;

                          return (
                            <motion.button
                              key={platform.platform}
                              variants={itemVariants}
                              onClick={() => handlePlatformSelect(platform.platform)}
                              onMouseEnter={() => setHoveredPlatform(platform.platform)}
                              onMouseLeave={() => setHoveredPlatform(null)}
                              disabled={isDisabled}
                              className={cn(
                                "relative p-5 rounded-2xl text-left transition-all duration-300 group overflow-hidden",
                                isDisabled && "cursor-not-allowed"
                              )}
                              style={{
                                background: isHovered && !isDisabled
                                  ? `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.primary}08 100%)`
                                  : "rgba(255, 255, 255, 0.03)",
                                border: isHovered && !isDisabled
                                  ? `1px solid ${colors.primary}40`
                                  : "1px solid rgba(255, 255, 255, 0.06)",
                                boxShadow: isHovered && !isDisabled
                                  ? `0 10px 40px -10px ${colors.glow}`
                                  : "none",
                                opacity: isDisabled ? 0.5 : 1,
                              }}
                              whileHover={!isDisabled ? { y: -4, scale: 1.02 } : {}}
                              whileTap={!isDisabled ? { scale: 0.98 } : {}}
                            >
                              {/* Hover Glow Effect */}
                              {!isDisabled && (
                                <motion.div
                                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-40 transition-opacity"
                                  style={{
                                    background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
                                    filter: "blur(20px)",
                                  }}
                                />
                              )}

                              {/* Connected Badge */}
                              {isConnected && (
                                <motion.div
                                  className="absolute top-3 right-3"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-full flex items-center justify-center"
                                    style={{
                                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                      boxShadow: "0 4px 12px -2px rgba(16, 185, 129, 0.4)",
                                    }}
                                  >
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                </motion.div>
                              )}

                              {/* Coming Soon Badge */}
                              {platform.comingSoon && !isConnected && (
                                <div className="absolute top-3 right-3">
                                  <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    Soon
                                  </span>
                                </div>
                              )}

                              {/* Platform Icon */}
                              <motion.div
                                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                                style={{
                                  background: isHovered && !isDisabled
                                    ? colors.gradient
                                    : `${colors.primary}20`,
                                  boxShadow: isHovered && !isDisabled
                                    ? `0 8px 24px -6px ${colors.glow}`
                                    : "none",
                                }}
                                animate={{
                                  rotate: isHovered && !isDisabled ? [0, 5, -5, 0] : 0,
                                }}
                                transition={{ duration: 0.5 }}
                              >
                                <Icon
                                  className="w-7 h-7 transition-colors"
                                  style={{
                                    color: isHovered && !isDisabled ? "white" : colors.primary,
                                  }}
                                />
                              </motion.div>

                              {/* Platform Name */}
                              <h3 className="font-semibold text-white text-lg mb-1">
                                {platform.name}
                              </h3>

                              {/* Description or Connected Status */}
                              <p className="text-sm text-white/40 line-clamp-2 mb-3">
                                {isConnected ? "Already connected" : platform.description}
                              </p>

                              {/* Stats */}
                              {!isConnected && (
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1.5">
                                    <Users className="w-3.5 h-3.5 text-white/30" />
                                    <span className="text-xs text-white/50">{stats.users}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400/70" />
                                    <span className="text-xs text-emerald-400/70">{stats.growth}</span>
                                  </div>
                                </div>
                              )}

                              {/* Connect Arrow */}
                              {!isDisabled && (
                                <motion.div
                                  className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity"
                                  initial={{ x: -10 }}
                                  animate={{ x: isHovered ? 0 : -10 }}
                                >
                                  <ChevronRight className="w-5 h-5" style={{ color: colors.primary }} />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Security Note */}
                      <motion.div
                        variants={itemVariants}
                        className="mt-6 flex items-center gap-3 p-4 rounded-xl"
                        style={{
                          background: "rgba(99, 102, 241, 0.1)",
                          border: "1px solid rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "rgba(99, 102, 241, 0.2)" }}
                        >
                          <Lock className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white/80">
                            Your data is secure
                          </p>
                          <p className="text-xs text-white/40">
                            We use OAuth 2.0 authentication. Your passwords are never stored.
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      {selectedInfo && selectedPlatform && (
                        <>
                          {/* Platform Header Card */}
                          <motion.div
                            className="relative p-6 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                              background: `linear-gradient(135deg, ${platformColors[selectedPlatform].primary}20 0%, ${platformColors[selectedPlatform].primary}10 100%)`,
                              border: `1px solid ${platformColors[selectedPlatform].primary}30`,
                            }}
                          >
                            {/* Background Glow */}
                            <div
                              className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
                              style={{
                                background: `radial-gradient(circle, ${platformColors[selectedPlatform].primary} 0%, transparent 70%)`,
                                filter: "blur(40px)",
                              }}
                            />

                            <div className="relative flex items-start gap-5">
                              <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{
                                  background: platformColors[selectedPlatform].gradient,
                                  boxShadow: `0 10px 30px -8px ${platformColors[selectedPlatform].glow}`,
                                }}
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                {(() => {
                                  const Icon = platformIcons[selectedPlatform];
                                  return <Icon className="w-8 h-8 text-white" />;
                                })()}
                              </motion.div>

                              <div className="flex-1">
                                <h3 className="font-bold text-white text-xl mb-2">
                                  {selectedInfo.name}
                                </h3>
                                <p className="text-sm text-white/60 mb-4">
                                  {selectedInfo.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2">
                                  {selectedInfo.features.map((feature, i) => (
                                    <motion.span
                                      key={feature}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                      className="px-3 py-1 rounded-full text-xs font-medium"
                                      style={{
                                        background: `${platformColors[selectedPlatform].primary}20`,
                                        color: platformColors[selectedPlatform].primary,
                                        border: `1px solid ${platformColors[selectedPlatform].primary}30`,
                                      }}
                                    >
                                      {feature}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>

                              {/* Stats */}
                              <div className="flex flex-col gap-2">
                                <div
                                  className="px-3 py-2 rounded-xl text-center"
                                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                                >
                                  <p className="text-lg font-bold text-white">
                                    {platformStats[selectedPlatform].users}
                                  </p>
                                  <p className="text-[10px] text-white/40 uppercase tracking-wider">
                                    Users
                                  </p>
                                </div>
                                <div
                                  className="px-3 py-2 rounded-xl text-center"
                                  style={{ background: "rgba(16, 185, 129, 0.1)" }}
                                >
                                  <p className="text-lg font-bold text-emerald-400">
                                    {platformStats[selectedPlatform].growth}
                                  </p>
                                  <p className="text-[10px] text-emerald-400/60 uppercase tracking-wider">
                                    Growth
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Permissions */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-5 rounded-2xl"
                            style={{
                              background: "rgba(255, 255, 255, 0.03)",
                              border: "1px solid rgba(255, 255, 255, 0.06)",
                            }}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                }}
                              >
                                <Shield className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-white">Permissions Required</h4>
                                <p className="text-xs text-white/40">What we'll access</p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {selectedInfo.permissions.map((permission, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.15 + index * 0.05 }}
                                  className="flex items-center gap-3 p-3 rounded-xl"
                                  style={{
                                    background: "rgba(16, 185, 129, 0.1)",
                                    border: "1px solid rgba(16, 185, 129, 0.2)",
                                  }}
                                >
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                  <span className="text-sm text-white/70">{permission}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>

                          {/* Security Note */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-start gap-4 p-5 rounded-2xl"
                            style={{
                              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)",
                              border: "1px solid rgba(99, 102, 241, 0.2)",
                            }}
                          >
                            <motion.div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                              }}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            >
                              <Zap className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                              <p className="font-semibold text-white mb-1">
                                Secure & Encrypted Connection
                              </p>
                              <p className="text-sm text-white/50">
                                Your credentials are never stored on our servers. We use OAuth 2.0 for
                                secure, encrypted authentication directly with {selectedInfo.name}.
                                You can revoke access at any time.
                              </p>
                            </div>
                          </motion.div>

                          {/* Actions */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            className="flex items-center gap-4 pt-2"
                          >
                            <motion.button
                              onClick={handleBack}
                              disabled={isConnecting}
                              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white/70 transition-all"
                              style={{
                                background: "rgba(255, 255, 255, 0.05)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                              }}
                              whileHover={{
                                background: "rgba(255, 255, 255, 0.1)",
                                borderColor: "rgba(255, 255, 255, 0.2)",
                              }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ArrowLeft className="w-5 h-5" />
                              Back
                            </motion.button>

                            <motion.button
                              onClick={handleConnect}
                              disabled={isConnecting}
                              className="flex-[2] flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                              style={{
                                background: platformColors[selectedPlatform].gradient,
                                boxShadow: `0 10px 40px -10px ${platformColors[selectedPlatform].glow}`,
                              }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {/* Shine Effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-200%", "200%"] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              />

                              {isConnecting ? (
                                <>
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                  <span>Connecting...</span>
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-5 h-5" />
                                  <span>Connect {selectedInfo.name}</span>
                                  <ExternalLink className="w-4 h-4 opacity-70" />
                                </>
                              )}
                            </motion.button>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
