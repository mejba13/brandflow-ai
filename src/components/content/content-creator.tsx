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
  Zap,
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

// Quick tips for AI content
const contentTips = [
  { icon: Lightbulb, text: "Start with a hook or question" },
  { icon: Target, text: "Be specific about your message" },
  { icon: TrendingUp, text: "Include a call-to-action" },
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
        "🚀 Excited to share some insights today!\n\n" +
        sourceContent.slice(0, 500) +
        "\n\n💡 Key takeaways:\n• Point 1\n• Point 2\n• Point 3\n\nWhat are your thoughts? Let me know in the comments!\n\n#leadership #growth #innovation",
      facebook:
        "Hey everyone! 👋\n\n" +
        sourceContent.slice(0, 400) +
        "\n\nWould love to hear your experiences with this. Drop a comment below! 💬",
      twitter:
        "🧵 Thread time!\n\n" + sourceContent.slice(0, 250) + "\n\n(1/3)",
      instagram:
        "✨ " +
        sourceContent.slice(0, 300) +
        "\n\n.\n.\n.\n#contentcreator #socialmedia #digitalmarketing #growth #motivation #success",
      pinterest:
        sourceContent.slice(0, 450) + "\n\n📌 Save this for later!",
      tiktok:
        "POV: " + sourceContent.slice(0, 200) + " 🎬\n\n#fyp #viral #trending",
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
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

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
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <motion.div
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
                whileHover={{ scale: 1.05 }}
              >
                1
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ border: "2px solid rgba(99, 102, 241, 0.5)" }}
                />
              </motion.div>
              <div>
                <p className="font-semibold text-[#0f172a]">Enter Your Content</p>
                <p className="text-sm text-[#64748b]">Write or paste your content</p>
              </div>
            </div>

            {/* Progress Line */}
            <div className="flex-1 mx-6 h-1 rounded-full bg-[#e2e8f0] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                initial={{ width: "0%" }}
                animate={{ width: sourceContent.length > 0 ? "50%" : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-12 h-12 rounded-2xl bg-[#f1f5f9] flex items-center justify-center text-[#94a3b8] font-bold text-lg border border-[#e2e8f0]">
                2
              </div>
              <div>
                <p className="font-semibold text-[#64748b]">Review Variations</p>
                <p className="text-sm text-[#94a3b8]">Edit & customize</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Input - Large Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 group"
          >
            <div
              className="relative h-full rounded-[1.5rem] overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                boxShadow: "0 4px 40px -12px rgba(99, 102, 241, 0.1)",
              }}
            >
              {/* Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <FileText className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-[#0f172a]">Your Content</h3>
                      <p className="text-xs text-[#64748b]">Blog post, idea, or any text</p>
                    </div>
                  </div>
                  <div className="text-sm text-[#94a3b8]">
                    <span className={sourceContent.length > 0 ? "text-[#6366f1] font-semibold" : ""}>
                      {sourceContent.length.toLocaleString()}
                    </span>
                    /50,000
                  </div>
                </div>
              </div>

              {/* Textarea */}
              <div className="px-6 pb-4">
                <textarea
                  ref={textareaRef}
                  value={sourceContent}
                  onChange={(e) => setSourceContent(e.target.value)}
                  placeholder="Enter your content, blog post, thoughts, or ideas here. The AI will transform it into platform-optimized posts that resonate with each audience..."
                  className="w-full min-h-[280px] p-4 text-[#0f172a] text-lg leading-relaxed bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 focus:outline-none resize-none transition-all placeholder:text-[#94a3b8]"
                />
              </div>

              {/* Import Options */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
                  <span className="text-sm text-[#64748b] font-medium">Or import from:</span>
                  <div className="flex gap-2 ml-2">
                    {[
                      { icon: Link2, label: "URL" },
                      { icon: Upload, label: "Document" },
                      { icon: Mic, label: "Voice" },
                    ].map((option) => (
                      <motion.button
                        key={option.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[#64748b] bg-white border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] transition-all"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
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

          {/* Tips Panel */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* AI Tips Card */}
            <div
              className="rounded-[1.5rem] p-6 overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
              }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: "24px 24px",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-white">AI Writing Tips</h4>
                    <p className="text-xs text-white/60">Better input = Better output</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {contentTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <tip.icon className="w-4 h-4 text-[#a5b4fc]" />
                      <span className="text-sm text-white/80">{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6366f1]/30 rounded-full blur-[60px]" />
            </div>

            {/* Stats Card */}
            <div
              className="rounded-[1.5rem] p-6"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#10b981]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a]">Quick Stats</h4>
                  <p className="text-xs text-[#64748b]">Content metrics</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Words", value: sourceContent.split(/\s+/).filter(Boolean).length },
                  { label: "Characters", value: sourceContent.length },
                  { label: "Sentences", value: sourceContent.split(/[.!?]+/).filter(Boolean).length },
                  { label: "Platforms", value: selectedPlatforms.length },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl bg-[#f8fafc] text-center">
                    <div className="text-xl font-bold text-[#6366f1]">{stat.value}</div>
                    <div className="text-xs text-[#64748b]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Platform Selection */}
        <motion.div
          variants={itemVariants}
          className="rounded-[1.5rem] p-6"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.1)",
            boxShadow: "0 4px 40px -12px rgba(99, 102, 241, 0.1)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)" }}
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Target className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-[#0f172a]">Select Platforms</h3>
                <p className="text-sm text-[#64748b]">Choose where to publish your content</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#f8fafc]">
              <span className="text-sm font-semibold text-[#6366f1]">{selectedPlatforms.length}</span>
              <span className="text-sm text-[#64748b]">selected</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {(Object.keys(PLATFORMS) as Platform[]).map((platform, index) => {
              const Icon = platformIcons[platform];
              const isSelected = selectedPlatforms.includes(platform);
              const info = PLATFORMS[platform];

              return (
                <motion.button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={cn(
                    "group relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all",
                    isSelected
                      ? "border-transparent"
                      : "border-[#e2e8f0] hover:border-[#6366f1]/30 bg-white"
                  )}
                  style={{
                    background: isSelected
                      ? `linear-gradient(135deg, ${info.color}15 0%, ${info.color}25 100%)`
                      : undefined,
                    boxShadow: isSelected
                      ? `0 8px 32px -8px ${info.color}40`
                      : undefined,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Selection Check */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: info.color }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-3.5 h-3.5 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                      isSelected ? "bg-white shadow-lg" : "bg-[#f8fafc]"
                    )}
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: isSelected ? info.color : "#64748b" }}
                    />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors",
                      isSelected ? "text-[#0f172a]" : "text-[#64748b]"
                    )}
                  >
                    {info.name}
                  </span>

                  {/* Character Limit */}
                  <span className="text-xs text-[#94a3b8]">
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
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-lg disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 12px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 50px -10px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />

            {isGenerating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Transform with AI</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
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
      <motion.div variants={itemVariants} className="relative">
        <div className="flex items-center justify-between">
          {/* Step 1 - Completed */}
          <button onClick={() => setStep(1)} className="flex items-center gap-3 group">
            <motion.div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
              style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
              whileHover={{ scale: 1.05 }}
            >
              <Check className="w-6 h-6" />
            </motion.div>
            <div className="text-left">
              <p className="font-semibold text-[#10b981] group-hover:text-[#059669] transition-colors">Enter Content</p>
              <p className="text-xs text-[#64748b]">Click to edit</p>
            </div>
          </button>

          {/* Progress Line */}
          <div className="flex-1 mx-6 h-1 rounded-full bg-gradient-to-r from-[#10b981] to-[#6366f1]" />

          {/* Step 2 - Active */}
          <div className="flex items-center gap-3">
            <motion.div
              className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
              }}
            >
              2
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ border: "2px solid rgba(99, 102, 241, 0.5)" }}
              />
            </motion.div>
            <div>
              <p className="font-semibold text-[#0f172a]">Review Variations</p>
              <p className="text-sm text-[#64748b]">Edit & customize</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Success Banner */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 p-4 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
        }}
      >
        <div className="w-10 h-10 rounded-xl bg-[#10b981] flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-[#059669]">AI transformation complete!</p>
          <p className="text-sm text-[#64748b]">
            {selectedPlatforms.length} platform-optimized variations ready for review
          </p>
        </div>
        <motion.button
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981] text-white text-sm font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RefreshCw className="w-4 h-4" />
          Regenerate All
        </motion.button>
      </motion.div>

      {/* Variations Grid */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {selectedPlatforms.map((platform, index) => {
            const Icon = platformIcons[platform];
            const info = PLATFORMS[platform];
            const content = variations?.[platform] || "";
            const charLimit = CHARACTER_LIMITS[platform];
            const isOverLimit = content.length > charLimit;
            const percentage = Math.min((content.length / charLimit) * 100, 100);

            return (
              <motion.div
                key={platform}
                className="group relative rounded-[1.5rem] overflow-hidden bg-white"
                style={{
                  border: "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: "0 20px 40px -12px rgba(99, 102, 241, 0.15)" }}
              >
                {/* Platform Header */}
                <div
                  className="relative px-5 py-4 flex items-center justify-between overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${info.color}15 0%, ${info.color}25 100%)` }}
                >
                  {/* Background Decoration */}
                  <div
                    className="absolute right-0 top-0 w-24 h-24 rounded-full blur-[40px] opacity-30"
                    style={{ background: info.color }}
                  />

                  <div className="flex items-center gap-3 relative z-10">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <Icon className="w-5 h-5" style={{ color: info.color }} />
                    </motion.div>
                    <div>
                      <span className="font-semibold text-[#0f172a]">{info.name}</span>
                      <p className="text-xs text-[#64748b]">{charLimit.toLocaleString()} char limit</p>
                    </div>
                  </div>

                  {/* Character Count Badge */}
                  <div
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-bold",
                      isOverLimit
                        ? "bg-red-100 text-red-600"
                        : "bg-white/80 text-[#64748b]"
                    )}
                  >
                    {content.length.toLocaleString()} / {charLimit.toLocaleString()}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 bg-[#f1f5f9]">
                  <motion.div
                    className="h-full"
                    style={{
                      background: isOverLimit
                        ? "#ef4444"
                        : `linear-gradient(90deg, ${info.color}, ${info.color}cc)`,
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
                    className="w-full min-h-[180px] p-4 text-sm text-[#0f172a] bg-[#f8fafc] rounded-xl border border-transparent focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 focus:outline-none resize-y transition-all"
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleCopy(platform, content)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#64748b] hover:text-[#6366f1] hover:bg-[#6366f1]/5 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {copiedPlatform === platform ? (
                          <>
                            <Check className="w-4 h-4 text-[#10b981]" />
                            <span className="text-[#10b981]">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    <motion.button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
                      style={{ color: info.color }}
                      whileHover={{ scale: 1.02, backgroundColor: `${info.color}10` }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </motion.button>
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
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl",
              postResult.success
                ? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200"
                : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200"
            )}
          >
            {postResult.success ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 text-sm">!</span>
              </div>
            )}
            <div className="flex-1">
              <p className={cn("font-semibold", postResult.success ? "text-emerald-900" : "text-red-900")}>
                {postResult.message}
              </p>
            </div>
            {postResult.url && (
              <a
                href={postResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1DA1F2] font-semibold hover:bg-[#1DA1F2] hover:text-white transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Tweet
              </a>
            )}
            <button
              onClick={() => setPostResult(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Bar */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between p-4 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
        }}
      >
        <motion.button
          onClick={() => setStep(1)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc] transition-all"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Edit
        </motion.button>

        <div className="flex items-center gap-3">
          <motion.button
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#6366f1] hover:text-[#6366f1] transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Save className="w-4 h-4" />
            Save as Draft
          </motion.button>

          {/* Post to Twitter Button */}
          {selectedPlatforms.includes("twitter") && variations?.twitter && (
            <motion.button
              onClick={handlePostToTwitter}
              disabled={isPosting || !twitterAccount}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white transition-all",
                !twitterAccount && "opacity-50 cursor-not-allowed"
              )}
              style={{
                background: "#1DA1F2",
                boxShadow: "0 8px 24px -6px rgba(29, 161, 242, 0.5)",
              }}
              whileHover={twitterAccount ? { scale: 1.02 } : {}}
              whileTap={twitterAccount ? { scale: 0.98 } : {}}
              title={!twitterAccount ? "Connect Twitter account first" : "Post to Twitter"}
            >
              {isPosting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post to Twitter
                </>
              )}
            </motion.button>
          )}

          <motion.button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              boxShadow: "0 8px 24px -6px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 32px -6px rgba(99, 102, 241, 0.6)" }}
            whileTap={{ scale: 0.98 }}
          >
            <ImageIcon className="w-4 h-4" />
            Continue to Images
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
