"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Shield,
  Check,
  Loader2,
  Info,
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

interface PlatformInfo {
  platform: SocialPlatform;
  name: string;
  description: string;
  permissions: string[];
  available: boolean;
  comingSoon?: boolean;
}

const platforms: PlatformInfo[] = [
  {
    platform: "linkedin",
    name: "LinkedIn",
    description: "Connect your LinkedIn profile to share professional content and grow your network.",
    permissions: ["Post content on your behalf", "Access your profile info", "View your connections count"],
    available: true,
  },
  {
    platform: "twitter",
    name: "X (Twitter)",
    description: "Connect your X account to share tweets and engage with your audience.",
    permissions: ["Post tweets on your behalf", "Access your profile info", "View your followers"],
    available: true,
  },
  {
    platform: "facebook",
    name: "Facebook",
    description: "Connect your Facebook Page to share posts and reach your community.",
    permissions: ["Post content to your Page", "Access Page insights", "View engagement metrics"],
    available: true,
  },
  {
    platform: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business account to share photos and Reels.",
    permissions: ["Post content on your behalf", "Access your profile info", "View insights"],
    available: true,
  },
  {
    platform: "pinterest",
    name: "Pinterest",
    description: "Connect your Pinterest account to share Pins and grow your audience.",
    permissions: ["Create Pins on your behalf", "Access your boards", "View analytics"],
    available: true,
  },
  {
    platform: "tiktok",
    name: "TikTok",
    description: "Connect your TikTok account to share videos and engage with viewers.",
    permissions: ["Post videos on your behalf", "Access your profile info", "View analytics"],
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="relative px-8 py-6"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
                }}
              >
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                    }}
                  >
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {step === "select" ? "Connect Account" : `Connect ${selectedInfo?.name}`}
                    </h2>
                    <p className="text-white/60 text-sm">
                      {step === "select"
                        ? "Choose a platform to connect"
                        : "Review permissions and connect"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  {step === "select" ? (
                    <motion.div
                      key="select"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-2 md:grid-cols-3 gap-4"
                    >
                      {platforms.map((platform) => {
                        const Icon = platformIcons[platform.platform];
                        const info = PLATFORMS[platform.platform];
                        const isConnected = connectedPlatforms.includes(platform.platform);
                        const isDisabled = !platform.available || isConnected;

                        return (
                          <motion.button
                            key={platform.platform}
                            onClick={() => handlePlatformSelect(platform.platform)}
                            disabled={isDisabled}
                            className={cn(
                              "relative p-5 rounded-2xl border-2 text-left transition-all duration-200",
                              isDisabled
                                ? "bg-slate-50 border-slate-100 cursor-not-allowed opacity-60"
                                : "bg-white border-slate-200 hover:border-[#0468D7]/40 hover:shadow-lg"
                            )}
                            whileHover={!isDisabled ? { scale: 1.02, y: -2 } : {}}
                            whileTap={!isDisabled ? { scale: 0.98 } : {}}
                          >
                            {isConnected && (
                              <div className="absolute top-3 right-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                </div>
                              </div>
                            )}
                            {platform.comingSoon && !isConnected && (
                              <div className="absolute top-3 right-3">
                                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold">
                                  Soon
                                </span>
                              </div>
                            )}

                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                              style={{ backgroundColor: `${info.color}15` }}
                            >
                              <Icon className="w-6 h-6" style={{ color: info.color }} />
                            </div>

                            <h3 className="font-semibold text-slate-900">{platform.name}</h3>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {isConnected ? "Already connected" : platform.description}
                            </p>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Platform Info */}
                      {selectedInfo && (
                        <>
                          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50">
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: PLATFORMS[selectedPlatform!].color }}
                            >
                              {(() => {
                                const Icon = platformIcons[selectedPlatform!];
                                return <Icon className="w-7 h-7 text-white" />;
                              })()}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {selectedInfo.name}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">
                                {selectedInfo.description}
                              </p>
                            </div>
                          </div>

                          {/* Permissions */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#0468D7]" />
                              Permissions Required
                            </h4>
                            <div className="space-y-2">
                              {selectedInfo.permissions.map((permission, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50"
                                >
                                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  </div>
                                  <span className="text-sm text-slate-700">{permission}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Security Note */}
                          <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-1">Secure Connection</p>
                              <p className="text-blue-600">
                                Your credentials are never stored. We use OAuth 2.0 for secure
                                authentication directly with {selectedInfo.name}.
                              </p>
                            </div>
                          </div>
                        </>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-4">
                        <Button
                          variant="secondary"
                          onClick={handleBack}
                          disabled={isConnecting}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleConnect}
                          disabled={isConnecting}
                          className="flex-1 relative"
                          style={{
                            background: "linear-gradient(135deg, #0468D7 0%, #1A68D3 100%)",
                          }}
                        >
                          {isConnecting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Connect {selectedInfo?.name}
                            </>
                          )}
                        </Button>
                      </div>
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
