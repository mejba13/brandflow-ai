import OpenAI from "openai";

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn("Missing OPENAI_API_KEY environment variable");
  }

  return new OpenAI({
    apiKey: apiKey ?? "sk-placeholder",
  });
}

// Lazy initialization to avoid build-time errors
let _openai: OpenAI | null = null;

export const openai = new Proxy({} as OpenAI, {
  get(_, prop) {
    if (!_openai) {
      _openai = getOpenAIClient();
    }
    return (_openai as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const AI_MODELS = {
  // GPT-4 for high-quality content generation
  gpt4: "gpt-4-turbo-preview",
  // GPT-3.5 for faster, cost-effective operations
  gpt35: "gpt-3.5-turbo",
  // DALL-E 3 for image generation
  dalle3: "dall-e-3",
  // DALL-E 2 for faster, cheaper images
  dalle2: "dall-e-2",
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];
