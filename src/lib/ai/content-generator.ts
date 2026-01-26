import { openai, AI_MODELS } from "./openai";

export interface PlatformConfig {
  name: string;
  maxLength: number;
  hashtagLimit: number;
  tone: string;
  features: string[];
}

export const PLATFORM_CONFIGS: Record<string, PlatformConfig> = {
  linkedin: {
    name: "LinkedIn",
    maxLength: 3000,
    hashtagLimit: 5,
    tone: "professional, thought-leadership focused",
    features: ["longer form content", "industry insights", "professional networking"],
  },
  twitter: {
    name: "Twitter/X",
    maxLength: 280,
    hashtagLimit: 2,
    tone: "concise, engaging, conversational",
    features: ["brevity", "trending topics", "quick engagement"],
  },
  facebook: {
    name: "Facebook",
    maxLength: 2000,
    hashtagLimit: 3,
    tone: "friendly, community-focused",
    features: ["storytelling", "community engagement", "personal connection"],
  },
  instagram: {
    name: "Instagram",
    maxLength: 2200,
    hashtagLimit: 30,
    tone: "visual-first, lifestyle-oriented, inspiring",
    features: ["visual storytelling", "hashtag discovery", "lifestyle content"],
  },
  pinterest: {
    name: "Pinterest",
    maxLength: 500,
    hashtagLimit: 20,
    tone: "inspirational, discovery-focused",
    features: ["visual discovery", "how-to content", "inspiration"],
  },
  tiktok: {
    name: "TikTok",
    maxLength: 2200,
    hashtagLimit: 5,
    tone: "casual, trendy, authentic, Gen-Z friendly",
    features: ["trends", "entertainment", "authenticity"],
  },
};

export interface BrandVoice {
  description?: string;
  toneAttributes?: string[];
  targetAudience?: string;
  industry?: string;
  doList?: string[];
  dontList?: string[];
}

export interface ContentGenerationOptions {
  sourceContent: string;
  platform: keyof typeof PLATFORM_CONFIGS;
  brandVoice?: BrandVoice;
  includeHashtags?: boolean;
  includeEmojis?: boolean;
  contentType?: "thought-leadership" | "promotional" | "educational" | "engagement" | "announcement";
}

export interface GeneratedContent {
  content: string;
  hashtags: string[];
  characterCount: number;
  platform: string;
}

export async function generatePlatformContent(
  options: ContentGenerationOptions
): Promise<GeneratedContent> {
  const config = PLATFORM_CONFIGS[options.platform];

  const systemPrompt = buildSystemPrompt(config, options.brandVoice);
  const userPrompt = buildUserPrompt(options, config);

  const response = await openai.chat.completions.create({
    model: AI_MODELS.gpt4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 1000,
  });

  const generatedText = response.choices[0]?.message?.content ?? "";

  // Parse hashtags from the content
  const hashtagRegex = /#[\w]+/g;
  const hashtags = generatedText.match(hashtagRegex) ?? [];

  // Remove hashtags from main content if they're at the end
  let cleanContent = generatedText;
  if (hashtags.length > 0) {
    // Check if hashtags are at the end and separate them
    const lastHashtagIndex = generatedText.lastIndexOf("#");
    if (lastHashtagIndex > generatedText.length * 0.7) {
      cleanContent = generatedText.substring(0, lastHashtagIndex).trim();
    }
  }

  return {
    content: cleanContent,
    hashtags: hashtags.slice(0, config.hashtagLimit),
    characterCount: cleanContent.length,
    platform: options.platform,
  };
}

function buildSystemPrompt(config: PlatformConfig, brandVoice?: BrandVoice): string {
  let prompt = `You are an expert social media content creator specializing in ${config.name}.
Your role is to transform content into engaging ${config.name} posts that resonate with the platform's audience.

Platform Guidelines:
- Maximum length: ${config.maxLength} characters
- Recommended hashtags: ${config.hashtagLimit}
- Tone: ${config.tone}
- Key features: ${config.features.join(", ")}`;

  if (brandVoice) {
    prompt += `\n\nBrand Voice Guidelines:`;
    if (brandVoice.description) {
      prompt += `\n- Voice: ${brandVoice.description}`;
    }
    if (brandVoice.toneAttributes?.length) {
      prompt += `\n- Tone attributes: ${brandVoice.toneAttributes.join(", ")}`;
    }
    if (brandVoice.targetAudience) {
      prompt += `\n- Target audience: ${brandVoice.targetAudience}`;
    }
    if (brandVoice.industry) {
      prompt += `\n- Industry: ${brandVoice.industry}`;
    }
    if (brandVoice.doList?.length) {
      prompt += `\n- DO: ${brandVoice.doList.join("; ")}`;
    }
    if (brandVoice.dontList?.length) {
      prompt += `\n- DON'T: ${brandVoice.dontList.join("; ")}`;
    }
  }

  return prompt;
}

function buildUserPrompt(options: ContentGenerationOptions, config: PlatformConfig): string {
  let prompt = `Transform the following content into an engaging ${config.name} post:

---
${options.sourceContent}
---

Requirements:
- Stay within ${config.maxLength} characters
- Match the platform's tone and style`;

  if (options.includeHashtags !== false) {
    prompt += `\n- Include ${config.hashtagLimit} relevant hashtags at the end`;
  }

  if (options.includeEmojis !== false && ["instagram", "tiktok", "facebook"].includes(options.platform)) {
    prompt += `\n- Include relevant emojis to increase engagement`;
  }

  if (options.contentType) {
    const typeGuidelines: Record<string, string> = {
      "thought-leadership": "Position as expert insight, share unique perspective",
      promotional: "Highlight value proposition, include call-to-action",
      educational: "Focus on teaching, use clear structure",
      engagement: "Ask questions, encourage discussion",
      announcement: "Build excitement, be clear and direct",
    };
    prompt += `\n- Content type: ${options.contentType} - ${typeGuidelines[options.contentType]}`;
  }

  prompt += "\n\nProvide only the final post content, ready to publish.";

  return prompt;
}

export async function generateAllPlatformVariations(
  sourceContent: string,
  platforms: (keyof typeof PLATFORM_CONFIGS)[],
  brandVoice?: BrandVoice
): Promise<GeneratedContent[]> {
  const results = await Promise.all(
    platforms.map((platform) =>
      generatePlatformContent({
        sourceContent,
        platform,
        brandVoice,
      })
    )
  );

  return results;
}
