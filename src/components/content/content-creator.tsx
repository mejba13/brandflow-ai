"use client";

import * as React from "react";
import { Sparkles, Upload, Link2, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const platformIcons: Record<Platform, React.ElementType> = {
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
  pinterest: PinterestIcon,
  tiktok: TikTokIcon,
};

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

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleGenerate = async () => {
    if (!sourceContent.trim() || selectedPlatforms.length === 0) return;

    setIsGenerating(true);

    // Simulate AI generation (will be replaced with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 2000));

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

  if (step === 1) {
    return (
      <div className="space-y-8">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium">
            1
          </div>
          <span className="text-sm font-medium text-[var(--color-text-primary)]">
            Enter Your Content
          </span>
          <div className="flex-1 h-px bg-[var(--color-border)]" />
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-background-muted)] text-[var(--color-text-muted)] text-sm font-medium">
            2
          </div>
          <span className="text-sm text-[var(--color-text-muted)]">Review Variations</span>
        </div>

        {/* Content Input */}
        <Card>
          <CardContent className="p-6">
            <Textarea
              value={sourceContent}
              onChange={(e) => setSourceContent(e.target.value)}
              placeholder="Enter your content, blog post, thoughts, or ideas here. The AI will transform it into platform-optimized posts..."
              className="min-h-[200px] text-lg"
              showCount
              maxLength={50000}
            />

            {/* Import options */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--color-border-light)]">
              <span className="text-sm text-[var(--color-text-muted)]">Or import from:</span>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-lg)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors">
                <Link2 className="w-4 h-4" />
                URL
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-lg)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors">
                <Upload className="w-4 h-4" />
                Document
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-lg)] text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)] transition-colors">
                <Mic className="w-4 h-4" />
                Voice
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Platform Selection */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold font-heading text-[var(--color-text-primary)] mb-4">
              Select Platforms
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {(Object.keys(PLATFORMS) as Platform[]).map((platform) => {
                const Icon = platformIcons[platform];
                const isSelected = selectedPlatforms.includes(platform);
                const info = PLATFORMS[platform];

                return (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-[var(--radius-xl)] border transition-all",
                      isSelected
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                        : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center",
                        isSelected ? "bg-[var(--color-primary)]/10" : "bg-[var(--color-background-muted)]"
                      )}
                      style={{ color: isSelected ? info.color : undefined }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isSelected ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
                      )}
                    >
                      {info.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-4">
              {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? "s" : ""} selected
            </p>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={!sourceContent.trim() || selectedPlatforms.length === 0}
            isLoading={isGenerating}
            leftIcon={<Sparkles className="w-5 h-5" />}
          >
            Transform with AI
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Review Variations
  return (
    <div className="space-y-8">
      {/* Step indicator */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStep(1)}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-success)] text-white text-sm font-medium"
        >
          ✓
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">Enter Content</span>
        <div className="flex-1 h-px bg-[var(--color-border)]" />
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)] text-white text-sm font-medium">
          2
        </div>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          Review Variations
        </span>
      </div>

      {/* Variations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedPlatforms.map((platform) => {
          const Icon = platformIcons[platform];
          const info = PLATFORMS[platform];
          const content = variations?.[platform] || "";
          const charLimit = CHARACTER_LIMITS[platform];
          const isOverLimit = content.length > charLimit;

          return (
            <Card key={platform} className="overflow-hidden">
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ backgroundColor: `${info.color}10` }}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" style={{ color: info.color }} />
                  <span className="font-medium text-[var(--color-text-primary)]">{info.name}</span>
                </div>
                <Badge variant={platform}>{content.length} chars</Badge>
              </div>
              <CardContent className="p-4">
                <textarea
                  value={content}
                  onChange={(e) => handleEditVariation(platform, e.target.value)}
                  className="w-full min-h-[200px] p-3 text-sm bg-[var(--color-background-subtle)] rounded-[var(--radius-lg)] border border-transparent focus:border-[var(--color-primary)] focus:outline-none resize-y"
                />
                <div className="flex items-center justify-between mt-3">
                  <span
                    className={cn(
                      "text-xs",
                      isOverLimit ? "text-[var(--color-error)]" : "text-[var(--color-text-muted)]"
                    )}
                  >
                    {content.length}/{charLimit}
                  </span>
                  <Button variant="ghost" size="sm">
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-light)]">
        <Button variant="ghost" onClick={() => setStep(1)}>
          Back to Edit
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Save as Draft</Button>
          <Button>Continue to Images</Button>
        </div>
      </div>
    </div>
  );
}
