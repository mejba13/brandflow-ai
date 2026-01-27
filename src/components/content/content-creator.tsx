"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Link2,
  Mic,
  ArrowRight,
  ArrowLeft,
  Check,
  Wand2,
  FileText,
  Brain,
  RefreshCw,
  Copy,
  Save,
  Image as ImageIcon,
  Target,
  TrendingUp,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  Send,
  Loader2,
  ExternalLink,
  Sparkles,
  Globe,
  PenTool,
  Hash,
  Type,
  AlignLeft,
  BarChart3,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PLATFORMS, CHARACTER_LIMITS, type Platform } from "@/lib/utils";
import {
  LinkedInIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  PinterestIcon,
  TikTokIcon,
} from "@/components/icons/platform-icons";
import { useSocial } from "@/lib/social/social-context";
import { useSocialPost } from "@/lib/social/use-social-post";

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
};

const platformColors: Record<Platform, { primary: string; glow: string }> = {
  linkedin: { primary: "#0A66C2", glow: "rgba(10, 102, 194, 0.4)" },
  facebook: { primary: "#1877F2", glow: "rgba(24, 119, 242, 0.4)" },
  twitter: { primary: "#1DA1F2", glow: "rgba(29, 161, 242, 0.4)" },
  instagram: { primary: "#E4405F", glow: "rgba(228, 64, 95, 0.4)" },
  pinterest: { primary: "#E60023", glow: "rgba(230, 0, 35, 0.4)" },
  tiktok: { primary: "#00F2EA", glow: "rgba(0, 242, 234, 0.4)" },
};

// Quick tips for AI content
const contentTips = [
  { icon: Lightbulb, text: "Start with a compelling hook", color: "#f59e0b" },
  { icon: Target, text: "Be specific about your message", color: "#8b5cf6" },
  { icon: TrendingUp, text: "Include a clear call-to-action", color: "#10b981" },
  { icon: Hash, text: "Use relevant hashtags strategically", color: "#06b6d4" },
];

interface ContentCreatorProps {
  initialContent?: string;
}

export function ContentCreator({ initialContent = "" }: ContentCreatorProps) {
  const [step, setStep] = React.useState(1);
  const [sourceContent, setSourceContent] = React.useState(initialContent);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<Platform[]>([
    "linkedin",
    "facebook",
    "twitter",
  ]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [variations, setVariations] = React.useState<Record<Platform, string> | null>(null);
  const [copiedPlatform, setCopiedPlatform] = React.useState<Platform | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Social posting state
  const { accounts } = useSocial();
  const { postToTwitter, isPosting } = useSocialPost();
  const [postResult, setPostResult] = React.useState<{
    success: boolean;
    message: string;
    url?: string;
  } | null>(null);

  const twitterAccount = accounts.find(
    (a) => a.platform === "twitter" && a.status === "connected"
  );

  const handlePostToTwitter = async () => {
    if (!variations?.twitter) return;

    setPostResult(null);
    const result = await postToTwitter(variations.twitter);

    if (result.success) {
      setPostResult({
        success: true,
        message: "Tweet posted successfully!",
        url: result.postUrl,
      });
    } else {
      setPostResult({
        success: false,
        message: result.error || "Failed to post tweet",
      });
    }
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleGenerate = async () => {
    if (!sourceContent.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Mock generated content
    const mockVariations: Record<Platform, string> = {
      linkedin:
        "Excited to share some insights today!\n\n" +
        sourceContent.slice(0, 500) +
        "\n\nKey takeaways:\n\n• Point 1\n• Point 2\n• Point 3\n\nWhat are your thoughts? Let me know in the comments!\n\n#leadership #growth #innovation",
      facebook:
        "Hey everyone!\n\n" +
        sourceContent.slice(0, 400) +
        "\n\nWould love to hear your experiences with this. Drop a comment below!",
      twitter:
        "Thread time!\n\n" + sourceContent.slice(0, 250) + "\n\n(1/3)",
      instagram:
        sourceContent.slice(0, 300) +
        "\n\n.\n.\n.\n#contentcreator #socialmedia #digitalmarketing #growth #motivation #success",
      pinterest:
        sourceContent.slice(0, 450) + "\n\nSave this for later!",
      tiktok:
        "POV: " + sourceContent.slice(0, 200) + "\n\n#fyp #viral #trending",
    };

    setVariations(mockVariations);
    setIsGenerating(false);
    setStep(2);
  };

  const handleEditVariation = (platform: Platform, newContent: string) => {
    if (!variations) return;
    setVariations({ ...variations, [platform]: newContent });
  };

  const handleCopy = async (platform: Platform, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  };

  const wordCount = sourceContent.split(/\s+/).filter(Boolean).length;
  const charCount = sourceContent.length;
  const sentenceCount = sourceContent.split(/[.!?]+/).filter(Boolean).length;

  // Step 1: Enter Content
  if (step === 1) {
    return (
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Premium Step Indicator */}
        <motion.div variants={itemVariants} className="relative">
          <div
            className="relative rounded-3xl p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Background Glow */}
            <div
              className="absolute top-0 left-1/4 w-96 h-32 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative flex items-center justify-between">
              {/* Step 1 - Active */}
              <div className="flex items-center gap-4">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                      boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.6)",
                    }}
                  >
                    1
                  </motion.div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", filter: "blur(12px)" }}
                  />
                </motion.div>
                <div>
                  <p className="font-semibold text-white text-lg">Enter Your Content</p>
                  <p className="text-sm text-slate-400">Write or paste your original content</p>
                </div>
              </div>

              {/* Progress Line */}
              <div className="flex-1 mx-8 h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #ec4899)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: sourceContent.length > 0 ? "50%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>

              {/* Step 2 - Inactive */}
              <div className="flex items-center gap-4 opacity-40">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 font-bold text-xl">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-300">Review Variations</p>
                  <p className="text-sm text-slate-400">Edit & customize output</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Content Input - Large Card (8 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-8">
            <div
              className="relative h-full rounded-3xl overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Gradient Border Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)",
                }}
              />

              {/* Header */}
              <div className="relative p-6 pb-0">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                        boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <PenTool className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Your Content</h3>
                      <p className="text-sm text-slate-400">Blog post, idea, or any text to transform</p>
                    </div>
                  </div>

                  {/* Character Counter */}
                  <div
                    className="px-4 py-2 rounded-xl"
                    style={{
                      background: "rgba(99, 102, 241, 0.1)",
                      border: "1px solid rgba(99, 102, 241, 0.2)",
                    }}
                  >
                    <span className={cn(
                      "font-mono text-sm font-semibold",
                      charCount > 0 ? "text-violet-400" : "text-slate-400"
                    )}>
                      {charCount.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-sm"> / 50,000</span>
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="relative px-6 pb-5">
                <textarea
                  ref={textareaRef}
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  placeholder="Start writing or paste your content here. Our AI will analyze it and create perfectly optimized versions for each social platform..."
                  className="w-full min-h-[320px] p-5 text-white text-base leading-relaxed rounded-2xl border transition-all resize-none placeholder:text-slate-500"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(99, 102, 241, 0.4)";
                    e.target.style.boxShadow = "0 0 0 4px rgba(99, 102, 241, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Import Options */}
              <div className="relative px-6 pb-6">
                <div
                  className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-sm text-slate-400 font-medium">Import from:</span>
                  <div className="flex gap-2">
                    {[
                      { icon: Link2, label: "URL", color: "#06b6d4" },
                      { icon: Upload, label: "File", color: "#8b5cf6" },
                      { icon: Mic, label: "Voice", color: "#ec4899" },
                    ].map((option) => (
                      <motion.button
                        key={option.label}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          background: `${option.color}10`,
                          border: `1px solid ${option.color}25`,
                          color: option.color,
                        }}
                        whileHover={{
                          scale: 1.05,
                          background: `${option.color}20`,
                          borderColor: `${option.color}40`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <option.icon className="w-4 h-4" />
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* AI Tips Card */}
            <motion.div
              variants={itemVariants}
              className="relative rounded-3xl p-5 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
              }}
            >
              {/* Background Pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Glow */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-40"
                style={{
                  background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
                      boxShadow: "0 8px 24px -6px rgba(139, 92, 246, 0.5)",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">AI Writing Tips</h4>
                    <p className="text-xs text-slate-400">Better input = Better output</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {contentTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      whileHover={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${tip.color}20` }}
                      >
                        <tip.icon className="w-4 h-4" style={{ color: tip.color }} />
                      </div>
                      <span className="text-sm text-slate-200">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Stats Card */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl p-5"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 8px 24px -6px rgba(16, 185, 129, 0.5)",
                  }}
                >
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Live Analytics</h4>
                  <p className="text-xs text-slate-400">Real-time content metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Words", value: wordCount, icon: Type, color: "#8b5cf6" },
                  { label: "Characters", value: charCount, icon: AlignLeft, color: "#06b6d4" },
                  { label: "Sentences", value: sentenceCount, icon: FileText, color: "#10b981" },
                  { label: "Platforms", value: selectedPlatforms.length, icon: Globe, color: "#f59e0b" },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="p-3.5 rounded-xl text-center"
                    style={{
                      background: `${stat.color}10`,
                      border: `1px solid ${stat.color}20`,
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <stat.icon className="w-4 h-4 mx-auto mb-1.5" style={{ color: stat.color }} />
                    <div className="text-xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Platform Selection */}
        <motion.div
          variants={itemVariants}
          className="rounded-3xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)",
                  boxShadow: "0 8px 32px -8px rgba(236, 72, 153, 0.5)",
                }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Globe className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-white text-lg">Select Platforms</h3>
                <p className="text-sm text-slate-400">Choose where to publish your content</p>
              </div>
            </div>

            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
              }}
            >
              <Flame className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-semibold text-violet-400">{selectedPlatforms.length}</span>
              <span className="text-sm text-slate-400">selected</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(Object.keys(PLATFORMS) as Platform[]).map((platform, index) => {
              const Icon = platformIcons[platform];
              const isSelected = selectedPlatforms.includes(platform);
              const info = PLATFORMS[platform];
              const colors = platformColors[platform];

              return (
                <motion.button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl transition-all"
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`
                      : "rgba(255,255,255,0.03)",
                    border: isSelected
                      ? `2px solid ${colors.primary}50`
                      : "2px solid rgba(255,255,255,0.06)",
                    boxShadow: isSelected
                      ? `0 10px 40px -10px ${colors.glow}`
                      : "none",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    borderColor: isSelected ? `${colors.primary}70` : "rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Selection Check */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
                          boxShadow: `0 4px 12px -2px ${colors.glow}`,
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all"
                    style={{
                      background: isSelected
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.05)",
                      boxShadow: isSelected
                        ? `0 8px 24px -6px ${colors.glow}`
                        : "none",
                    }}
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon
                      className="w-7 h-7 transition-colors"
                      style={{ color: isSelected ? colors.primary : "rgba(255,255,255,0.5)" }}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className="text-sm font-semibold transition-colors"
                    style={{ color: isSelected ? "white" : "rgba(255,255,255,0.5)" }}
                  >
                    {info.name}
                  </span>

                  {/* Character Limit */}
                  <span className="text-xs text-slate-400">
                    {CHARACTER_LIMITS[platform].toLocaleString()} chars
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <motion.button
            onClick={handleGenerate}
            disabled={!sourceContent.trim() || selectedPlatforms.length === 0 || isGenerating}
            className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-white text-lg disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 20px 60px -15px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 30px 80px -15px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated Background Shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            />

            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
              }}
            />

            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-6 h-6" />
                </motion.div>
                <span>Generating Magic...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                <span>Transform with AI</span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Step 2: Review Variations
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Step Indicator - Step 2 */}
      <motion.div variants={itemVariants}>
        <div
          className="relative rounded-3xl p-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="relative flex items-center justify-between">
            {/* Step 1 - Completed */}
            <button onClick={() => setStep(1)} className="flex items-center gap-4 group">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  boxShadow: "0 10px 40px -10px rgba(16, 185, 129, 0.5)",
                }}
                whileHover={{ scale: 1.1 }}
              >
                <Check className="w-7 h-7 text-white" />
              </motion.div>
              <div className="text-left">
                <p className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">Enter Content</p>
                <p className="text-xs text-slate-400">Click to edit</p>
              </div>
            </button>

            {/* Progress Line - Complete */}
            <div className="flex-1 mx-8 h-1 rounded-full overflow-hidden"
              style={{ background: "linear-gradient(90deg, #10b981, #6366f1, #8b5cf6)" }}
            />

            {/* Step 2 - Active */}
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
              >
                <motion.div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.6)",
                  }}
                >
                  2
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)", filter: "blur(12px)" }}
                />
              </motion.div>
              <div>
                <p className="font-semibold text-white text-lg">Review Variations</p>
                <p className="text-sm text-slate-400">Edit & customize output</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Banner */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 p-5 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.25)",
        }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            boxShadow: "0 8px 24px -6px rgba(16, 185, 129, 0.5)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        <div className="flex-1">
          <p className="font-semibold text-emerald-400">AI transformation complete!</p>
          <p className="text-sm text-slate-300">
            {selectedPlatforms.length} platform-optimized variations ready for review
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            boxShadow: "0 8px 24px -6px rgba(16, 185, 129, 0.4)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate All
        </motion.button>
      </motion.div>

      {/* Variations Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {selectedPlatforms.map((platform, index) => {
            const Icon = platformIcons[platform];
            const info = PLATFORMS[platform];
            const colors = platformColors[platform];
            const content = variations?.[platform] || "";
            const charLimit = CHARACTER_LIMITS[platform];
            const isOverLimit = content.length > charLimit;
            const percentage = Math.min((content.length / charLimit) * 100, 100);

            return (
              <motion.div
                key={platform}
                className="group relative rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -6,
                  borderColor: `${colors.primary}40`,
                  boxShadow: `0 20px 60px -15px ${colors.glow}`,
                }}
              >
                {/* Platform Header */}
                <div
                  className="relative px-5 py-4 flex items-center justify-between overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
                  }}
                >
                  {/* Background Glow */}
                  <div
                    className="absolute right-0 top-0 w-32 h-32 rounded-full opacity-30"
                    style={{
                      background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
                      filter: "blur(40px)",
                    }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                    </motion.div>
                    <div>
                      <span className="font-semibold text-white">{info.name}</span>
                      <p className="text-xs text-slate-400">{charLimit.toLocaleString()} char limit</p>
                    </div>
                  </div>

                  {/* Character Count Badge */}
                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{
                      background: isOverLimit ? "rgba(239, 68, 68, 0.2)" : "rgba(255,255,255,0.1)",
                      border: isOverLimit ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,255,255,0.1)",
                      color: isOverLimit ? "#f87171" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {content.length.toLocaleString()} / {charLimit.toLocaleString()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="h-full"
                    style={{
                      background: isOverLimit
                        ? "#ef4444"
                        : `linear-gradient(90deg, ${colors.primary}, ${colors.primary}cc)`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <textarea
                    value={content}
                    onChange={(e) => handleEditVariation(platform, e.target.value)}
                    className="w-full min-h-[200px] p-4 text-sm text-white leading-relaxed rounded-xl border transition-all resize-y"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = `${colors.primary}50`;
                      e.target.style.boxShadow = `0 0 0 4px ${colors.primary}15`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleCopy(platform, content)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                          color: copiedPlatform === platform ? "#10b981" : "rgba(255,255,255,0.5)",
                          background: "rgba(255,255,255,0.05)",
                        }}
                        whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {copiedPlatform === platform ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                        style={{
                          color: colors.primary,
                          background: `${colors.primary}15`,
                        }}
                        whileHover={{ scale: 1.02, background: `${colors.primary}25` }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate
                      </motion.button>
                    </div>

                    {/* Post Button - Only for Twitter */}
                    {platform === "twitter" && twitterAccount && (
                      <motion.button
                        onClick={handlePostToTwitter}
                        disabled={isPosting}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
                          boxShadow: "0 6px 20px -4px rgba(29, 161, 242, 0.5)",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isPosting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Post
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Post Result Banner */}
      <AnimatePresence>
        {postResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-4 p-5 rounded-2xl"
            style={{
              background: postResult.success
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%)",
              border: postResult.success
                ? "1px solid rgba(16, 185, 129, 0.25)"
                : "1px solid rgba(239, 68, 68, 0.25)",
            }}
          >
            {postResult.success ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-sm font-bold">!</span>
              </div>
            )}
            <div className="flex-1">
              <p className={cn("font-semibold", postResult.success ? "text-emerald-400" : "text-red-400")}>
                {postResult.message}
              </p>
            </div>
            {postResult.url && (
              <a
                href={postResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
                }}
              >
                <ExternalLink className="w-4 h-4" />
                View Tweet
              </a>
            )}
            <button
              onClick={() => setPostResult(null)}
              className="text-slate-400 hover:text-slate-200 text-xl"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Bar */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between p-5 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <motion.button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-300 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)" }}
          whileHover={{ x: -4, background: "rgba(255,255,255,0.1)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Edit
        </motion.button>

        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-slate-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-5 h-5" />
            Save as Draft
          </motion.button>

          {/* Post to Twitter Button */}
          {selectedPlatforms.includes("twitter") && variations?.twitter && (
            <motion.button
              onClick={handlePostToTwitter}
              disabled={isPosting || !twitterAccount}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all",
                !twitterAccount && "opacity-40 cursor-not-allowed"
              )}
              style={{
                background: "linear-gradient(135deg, #1DA1F2 0%, #0d8bd9 100%)",
                boxShadow: "0 10px 30px -8px rgba(29, 161, 242, 0.5)",
              }}
              whileHover={twitterAccount ? { scale: 1.02 } : {}}
              whileTap={twitterAccount ? { scale: 0.98 } : {}}
              title={!twitterAccount ? "Connect Twitter account first" : "Post to Twitter"}
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Post to Twitter
                </>
              )}
            </motion.button>
          )}

          <motion.button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 10px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 15px 50px -10px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ImageIcon className="w-5 h-5" />
            Continue to Images
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
