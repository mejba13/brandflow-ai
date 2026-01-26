import { openai, AI_MODELS } from "./openai";

export interface ImageGenerationOptions {
  prompt: string;
  style?: "vivid" | "natural";
  size?: "1024x1024" | "1024x1792" | "1792x1024";
  quality?: "standard" | "hd";
  model?: "dall-e-3" | "dall-e-2";
}

export interface GeneratedImage {
  url: string;
  revisedPrompt?: string;
}

export async function generateImage(options: ImageGenerationOptions): Promise<GeneratedImage> {
  const response = await openai.images.generate({
    model: options.model ?? AI_MODELS.dalle3,
    prompt: options.prompt,
    n: 1,
    size: options.size ?? "1024x1024",
    quality: options.quality ?? "standard",
    style: options.style ?? "vivid",
  });

  const image = response.data?.[0];

  if (!image?.url) {
    throw new Error("Failed to generate image");
  }

  return {
    url: image.url,
    revisedPrompt: image.revised_prompt,
  };
}

export interface ImagePromptOptions {
  content: string;
  platform: string;
  brandColors?: string[];
  style?: string;
  mood?: string;
}

export async function generateImagePrompt(options: ImagePromptOptions): Promise<string> {
  const response = await openai.chat.completions.create({
    model: AI_MODELS.gpt35,
    messages: [
      {
        role: "system",
        content: `You are an expert at creating DALL-E prompts for social media images.
Create prompts that result in professional, eye-catching images suitable for ${options.platform}.
The images should complement social media content without containing text.`,
      },
      {
        role: "user",
        content: `Create a DALL-E image prompt for this social media content:

"${options.content}"

Requirements:
- Platform: ${options.platform}
- Style: ${options.style ?? "modern, professional"}
- Mood: ${options.mood ?? "positive, engaging"}
${options.brandColors?.length ? `- Include these brand colors: ${options.brandColors.join(", ")}` : ""}
- NO text in the image
- Suitable for professional use

Provide only the DALL-E prompt, nothing else.`,
      },
    ],
    temperature: 0.8,
    max_tokens: 300,
  });

  return response.choices[0]?.message?.content ?? options.content;
}

export async function generateContentImage(
  content: string,
  platform: string,
  brandColors?: string[]
): Promise<GeneratedImage> {
  // First generate an optimized prompt
  const prompt = await generateImagePrompt({
    content,
    platform,
    brandColors,
  });

  // Then generate the image
  return generateImage({
    prompt,
    style: "vivid",
    quality: "standard",
  });
}

// Platform-specific image size recommendations
export const PLATFORM_IMAGE_SIZES: Record<string, { width: number; height: number; ratio: string }[]> = {
  linkedin: [
    { width: 1200, height: 627, ratio: "1.91:1" }, // Link preview
    { width: 1080, height: 1080, ratio: "1:1" }, // Square post
  ],
  twitter: [
    { width: 1200, height: 675, ratio: "16:9" }, // Tweet image
    { width: 1500, height: 500, ratio: "3:1" }, // Header
  ],
  facebook: [
    { width: 1200, height: 630, ratio: "1.91:1" }, // Shared link
    { width: 1080, height: 1080, ratio: "1:1" }, // Square post
  ],
  instagram: [
    { width: 1080, height: 1080, ratio: "1:1" }, // Square
    { width: 1080, height: 1350, ratio: "4:5" }, // Portrait
    { width: 1080, height: 566, ratio: "1.91:1" }, // Landscape
  ],
  pinterest: [
    { width: 1000, height: 1500, ratio: "2:3" }, // Standard pin
  ],
  tiktok: [
    { width: 1080, height: 1920, ratio: "9:16" }, // Full screen
  ],
};
