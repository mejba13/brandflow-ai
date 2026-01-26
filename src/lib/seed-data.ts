/**
 * BrandFlow AI - Seed Data
 *
 * This file contains realistic, brand-relevant seed data for development
 * and demonstration purposes. All content reflects BrandFlow AI's mission
 * of transforming content marketing with AI-powered tools.
 */

import type { Platform } from "./utils";

// ============================================
// User & Account Data
// ============================================

export interface SeedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: "owner" | "admin" | "editor" | "viewer";
  avatar?: string;
  plan: "starter" | "pro" | "business";
  createdAt: string;
}

export const seedCurrentUser: SeedUser = {
  id: "user_001",
  firstName: "Sarah",
  lastName: "Mitchell",
  email: "sarah@innovatemarketing.co",
  company: "Innovate Marketing Co",
  role: "owner",
  plan: "pro",
  createdAt: "2024-01-01",
};

export const seedTeamMembers: SeedUser[] = [
  seedCurrentUser,
  {
    id: "user_002",
    firstName: "Marcus",
    lastName: "Chen",
    email: "marcus@innovatemarketing.co",
    company: "Innovate Marketing Co",
    role: "admin",
    plan: "pro",
    createdAt: "2024-01-05",
  },
  {
    id: "user_003",
    firstName: "Jennifer",
    lastName: "Williams",
    email: "jennifer@innovatemarketing.co",
    company: "Innovate Marketing Co",
    role: "editor",
    plan: "pro",
    createdAt: "2024-01-10",
  },
];

// ============================================
// Connected Social Accounts
// ============================================

export interface SeedSocialAccount {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  profileUrl: string;
  status: "connected" | "expired" | "error";
  lastSync: string;
  followers: string;
  avatarUrl?: string;
}

export const seedSocialAccounts: SeedSocialAccount[] = [
  {
    id: "social_001",
    platform: "linkedin",
    username: "innovate-marketing-co",
    displayName: "Innovate Marketing Co",
    profileUrl: "https://linkedin.com/company/innovate-marketing-co",
    status: "connected",
    lastSync: "2 hours ago",
    followers: "24.8K",
  },
  {
    id: "social_002",
    platform: "twitter",
    username: "@InnovateMktg",
    displayName: "Innovate Marketing",
    profileUrl: "https://x.com/InnovateMktg",
    status: "connected",
    lastSync: "45 minutes ago",
    followers: "18.2K",
  },
  {
    id: "social_003",
    platform: "facebook",
    username: "InnovateMarketingCo",
    displayName: "Innovate Marketing Co",
    profileUrl: "https://facebook.com/InnovateMarketingCo",
    status: "connected",
    lastSync: "1 hour ago",
    followers: "31.5K",
  },
  {
    id: "social_004",
    platform: "instagram",
    username: "@innovate.mktg",
    displayName: "Innovate Marketing",
    profileUrl: "https://instagram.com/innovate.mktg",
    status: "connected",
    lastSync: "30 minutes ago",
    followers: "42.3K",
  },
];

// ============================================
// Content Library
// ============================================

export interface SeedContent {
  id: string;
  title: string;
  sourceContent: string;
  status: "draft" | "scheduled" | "published";
  platforms: Platform[];
  createdAt: string;
  scheduledFor?: string;
  publishedAt?: string;
  author: string;
  tags: string[];
}

export const seedContentLibrary: SeedContent[] = [
  {
    id: "content_001",
    title: "The Future of AI in Content Marketing",
    sourceContent: `Artificial Intelligence is revolutionizing how businesses approach content marketing. Here's what every marketer needs to know about the AI transformation:

1. Personalization at Scale
AI enables hyper-personalized content delivery that was previously impossible. By analyzing user behavior and preferences, AI can tailor messages to individual audience segments automatically.

2. Content Creation Efficiency
From blog posts to social media updates, AI tools can now generate first drafts, suggest improvements, and optimize content for different platforms—all in seconds.

3. Predictive Analytics
AI doesn't just analyze past performance; it predicts future trends. This means marketers can stay ahead of the curve and create content that resonates before trends peak.

4. Automated Optimization
Real-time A/B testing, automatic headline optimization, and smart scheduling are just the beginning. AI continuously learns and improves your content strategy.

The bottom line: AI isn't replacing marketers—it's empowering them to do more, reach further, and connect deeper with their audiences.`,
    status: "published",
    platforms: ["linkedin", "twitter", "facebook"],
    createdAt: "2024-01-15",
    publishedAt: "2024-01-16",
    author: "Sarah Mitchell",
    tags: ["AI", "content marketing", "digital transformation"],
  },
  {
    id: "content_002",
    title: "5 Ways to Maximize Your Social Media ROI in 2024",
    sourceContent: `Social media ROI doesn't have to be a mystery. Here are 5 proven strategies to maximize your returns:

1. Focus on Platform-Native Content
Stop cross-posting the same content everywhere. Each platform has its own culture and format. A LinkedIn article shouldn't look like a TikTok video.

2. Leverage User-Generated Content
Your customers are your best marketers. Feature their stories, reviews, and experiences. It's authentic, engaging, and cost-effective.

3. Invest in Video (But Be Smart About It)
Video dominates, but you don't need Hollywood production. Authentic, helpful content outperforms polished ads every time.

4. Build Community, Not Just Followers
Engagement rate matters more than follower count. A small, engaged community drives more business than a million passive followers.

5. Track the Right Metrics
Vanity metrics are tempting, but focus on metrics that tie to business outcomes: leads generated, conversion rates, and customer acquisition cost.

Remember: Social media is a long game. Consistency and authenticity win over viral moments.`,
    status: "scheduled",
    platforms: ["linkedin", "instagram", "facebook"],
    createdAt: "2024-01-20",
    scheduledFor: "2024-01-28 09:00",
    author: "Marcus Chen",
    tags: ["social media", "ROI", "strategy"],
  },
  {
    id: "content_003",
    title: "BrandFlow AI Product Update: New Smart Scheduling Feature",
    sourceContent: `Exciting news! We're thrilled to announce Smart Scheduling, our newest feature that uses AI to determine the optimal posting times for your content.

What's New:
- AI-Powered Timing: Our algorithm analyzes your audience's engagement patterns to find the perfect posting windows
- Cross-Platform Optimization: Each platform gets its own optimal schedule based on where your audience is most active
- Timezone Intelligence: Automatically adjusts for your global audience's local times
- Performance Learning: The system continuously improves as it learns from your posting history

How It Works:
Simply create your content, select your platforms, and let BrandFlow AI handle the scheduling. You can still manually adjust times if needed, but our data shows AI-optimized posts see 40% higher engagement on average.

Available Now:
Smart Scheduling is rolling out to all Pro and Business plan users starting today. Starter plan users will have access to basic scheduling features.

We're committed to helping you work smarter, not harder. Let AI handle the when, so you can focus on the what.`,
    status: "published",
    platforms: ["linkedin", "twitter", "facebook", "instagram"],
    createdAt: "2024-01-22",
    publishedAt: "2024-01-22",
    author: "Sarah Mitchell",
    tags: ["product update", "announcement", "BrandFlow AI"],
  },
  {
    id: "content_004",
    title: "Building Your Personal Brand on LinkedIn: A Complete Guide",
    sourceContent: `LinkedIn isn't just for job seekers anymore. It's the premier platform for professional thought leadership. Here's how to build a personal brand that opens doors:

Your Profile is Your Homepage
Think of your LinkedIn profile as your professional website. Your headline should state your value proposition, not just your job title. "Helping B2B Companies 3x Their Content Reach" beats "Marketing Manager."

Content Strategy That Works
- Share insights from your daily work
- Comment thoughtfully on industry news
- Celebrate your team's wins
- Admit failures and share lessons learned
- Post consistently (3-5x per week minimum)

The 80/20 Rule
80% of your content should provide value. 20% can promote your services. Flip this ratio and watch your engagement tank.

Engagement is Everything
The algorithm rewards meaningful interactions. Don't just post—engage with others. Leave thoughtful comments. Share posts with your perspective added.

Measure What Matters
Track profile views, post impressions, and most importantly, inbound opportunities. Your LinkedIn presence should drive real business results.

Remember: Building a personal brand takes time. Stay patient, stay consistent, and stay authentic.`,
    status: "draft",
    platforms: ["linkedin"],
    createdAt: "2024-01-24",
    author: "Jennifer Williams",
    tags: ["personal branding", "LinkedIn", "thought leadership"],
  },
  {
    id: "content_005",
    title: "Case Study: How Acme Corp Increased Engagement 312% with BrandFlow AI",
    sourceContent: `When Acme Corp came to us, they were struggling with a common problem: great content, poor reach. Their marketing team was spending 20+ hours per week on social media management, yet engagement remained flat.

The Challenge:
- 4 social platforms to manage
- Limited team of 2 marketers
- Inconsistent posting schedule
- Generic content across all platforms

The BrandFlow AI Solution:
We implemented BrandFlow AI to transform their content workflow:

1. Content Transformation
One blog post now automatically generates platform-specific variations. LinkedIn gets the professional angle, Twitter gets the thread format, Instagram gets the visual story.

2. AI Image Generation
Custom visuals for each post, generated in seconds instead of hours in design tools.

3. Smart Scheduling
AI-optimized posting times based on their audience's activity patterns.

The Results (90 Days):
- 312% increase in overall engagement
- 156% increase in website traffic from social
- 40% reduction in time spent on social media management
- 28 qualified leads generated directly from social content

"BrandFlow AI didn't just save us time—it transformed how we think about content. We're doing more with less and seeing better results than ever." - Marketing Director, Acme Corp

Ready to transform your content strategy? Start your free trial today.`,
    status: "scheduled",
    platforms: ["linkedin", "facebook"],
    createdAt: "2024-01-25",
    scheduledFor: "2024-02-01 10:00",
    author: "Sarah Mitchell",
    tags: ["case study", "customer success", "BrandFlow AI"],
  },
];

// ============================================
// Scheduled Posts
// ============================================

export interface SeedScheduledPost {
  id: string;
  contentId: string;
  title: string;
  platform: Platform;
  scheduledTime: string;
  scheduledDate: string;
  content: string;
  status: "scheduled" | "published" | "failed";
}

export const seedScheduledPosts: SeedScheduledPost[] = [
  {
    id: "post_001",
    contentId: "content_002",
    title: "5 Ways to Maximize Social ROI",
    platform: "linkedin",
    scheduledTime: "09:00 AM",
    scheduledDate: "2024-01-28",
    content:
      "Social media ROI doesn't have to be a mystery. Here are 5 proven strategies I've seen work across dozens of brands...",
    status: "scheduled",
  },
  {
    id: "post_002",
    contentId: "content_002",
    title: "ROI Thread",
    platform: "twitter",
    scheduledTime: "12:30 PM",
    scheduledDate: "2024-01-28",
    content:
      "Most brands get social media ROI wrong. Here's what actually works: (thread)",
    status: "scheduled",
  },
  {
    id: "post_003",
    contentId: "content_005",
    title: "Acme Corp Case Study",
    platform: "linkedin",
    scheduledTime: "10:00 AM",
    scheduledDate: "2024-02-01",
    content:
      "312% engagement increase. 40% time saved. Here's how Acme Corp transformed their content strategy with AI...",
    status: "scheduled",
  },
  {
    id: "post_004",
    contentId: "content_005",
    title: "Case Study Post",
    platform: "facebook",
    scheduledTime: "02:00 PM",
    scheduledDate: "2024-02-01",
    content:
      "Real results from real customers. See how Acme Corp achieved a 312% increase in engagement...",
    status: "scheduled",
  },
  {
    id: "post_005",
    contentId: "content_002",
    title: "Social ROI Carousel",
    platform: "instagram",
    scheduledTime: "06:00 PM",
    scheduledDate: "2024-01-28",
    content:
      "Swipe to discover 5 proven strategies to maximize your social media ROI in 2024...",
    status: "scheduled",
  },
  {
    id: "post_006",
    contentId: "content_003",
    title: "Product Update",
    platform: "twitter",
    scheduledTime: "11:00 AM",
    scheduledDate: "2024-01-30",
    content:
      "Introducing Smart Scheduling: Let AI find the perfect time to post your content. Now available for Pro users.",
    status: "scheduled",
  },
];

// ============================================
// Analytics Data
// ============================================

export interface SeedAnalyticsSummary {
  totalReach: string;
  totalEngagements: string;
  followersGained: string;
  totalShares: string;
  reachChange: number;
  engagementChange: number;
  followersChange: number;
  sharesChange: number;
}

export const seedAnalyticsSummary: SeedAnalyticsSummary = {
  totalReach: "248.7K",
  totalEngagements: "18,432",
  followersGained: "2,847",
  totalShares: "1,892",
  reachChange: 23.5,
  engagementChange: 18.2,
  followersChange: 31.4,
  sharesChange: 12.8,
};

export interface SeedPlatformAnalytics {
  platform: Platform;
  followers: string;
  engagementRate: string;
  postsPublished: number;
  reach: string;
  growthPercent: number;
  impressions: string;
  clicks: string;
}

export const seedPlatformAnalytics: SeedPlatformAnalytics[] = [
  {
    platform: "linkedin",
    followers: "24.8K",
    engagementRate: "4.8%",
    postsPublished: 32,
    reach: "89.2K",
    growthPercent: 24.5,
    impressions: "156K",
    clicks: "4,230",
  },
  {
    platform: "twitter",
    followers: "18.2K",
    engagementRate: "3.2%",
    postsPublished: 64,
    reach: "67.4K",
    growthPercent: 18.3,
    impressions: "245K",
    clicks: "2,890",
  },
  {
    platform: "facebook",
    followers: "31.5K",
    engagementRate: "2.9%",
    postsPublished: 28,
    reach: "52.8K",
    growthPercent: 8.7,
    impressions: "198K",
    clicks: "3,120",
  },
  {
    platform: "instagram",
    followers: "42.3K",
    engagementRate: "5.4%",
    postsPublished: 45,
    reach: "39.3K",
    growthPercent: 35.2,
    impressions: "312K",
    clicks: "5,670",
  },
];

export interface SeedTopPost {
  id: string;
  title: string;
  platform: Platform;
  engagement: number;
  reach: string;
  date: string;
  type: "text" | "image" | "video" | "carousel";
}

export const seedTopPosts: SeedTopPost[] = [
  {
    id: "top_001",
    title: "The Future of AI in Content Marketing",
    platform: "linkedin",
    engagement: 2847,
    reach: "28.4K",
    date: "Jan 16",
    type: "text",
  },
  {
    id: "top_002",
    title: "BrandFlow AI Product Update: Smart Scheduling",
    platform: "twitter",
    engagement: 1892,
    reach: "24.2K",
    date: "Jan 22",
    type: "image",
  },
  {
    id: "top_003",
    title: "Behind the Scenes: How We Build AI Features",
    platform: "instagram",
    engagement: 1654,
    reach: "18.9K",
    date: "Jan 18",
    type: "carousel",
  },
  {
    id: "top_004",
    title: "Customer Success Story: Acme Corp",
    platform: "facebook",
    engagement: 1243,
    reach: "15.6K",
    date: "Jan 20",
    type: "video",
  },
  {
    id: "top_005",
    title: "5 LinkedIn Tips That Actually Work",
    platform: "linkedin",
    engagement: 1098,
    reach: "12.8K",
    date: "Jan 12",
    type: "carousel",
  },
];

// ============================================
// Brand Kit
// ============================================

export interface SeedBrandColor {
  id: string;
  name: string;
  hex: string;
  usage: string;
}

export const seedBrandColors: SeedBrandColor[] = [
  { id: "color_001", name: "Primary Blue", hex: "#0468D7", usage: "Primary actions, links" },
  { id: "color_002", name: "Accent Blue", hex: "#1A68D3", usage: "Hover states, secondary elements" },
  { id: "color_003", name: "Deep Navy", hex: "#1E3A5F", usage: "Headers, important text" },
  { id: "color_004", name: "Soft Gray", hex: "#4A4A4A", usage: "Body text" },
  { id: "color_005", name: "Light Background", hex: "#F8F9FA", usage: "Page backgrounds" },
  { id: "color_006", name: "Success Green", hex: "#10B981", usage: "Success states, positive metrics" },
  { id: "color_007", name: "Warning Amber", hex: "#F59E0B", usage: "Warnings, pending states" },
  { id: "color_008", name: "Error Red", hex: "#EF4444", usage: "Errors, destructive actions" },
];

export interface SeedBrandFont {
  id: string;
  name: string;
  usage: string;
  weights: string[];
  fallback: string;
}

export const seedBrandFonts: SeedBrandFont[] = [
  {
    id: "font_001",
    name: "Google Sans",
    usage: "Headings & Display",
    weights: ["500", "600", "700"],
    fallback: "system-ui, sans-serif",
  },
  {
    id: "font_002",
    name: "Roboto",
    usage: "Body Text",
    weights: ["400", "500", "600"],
    fallback: "system-ui, sans-serif",
  },
  {
    id: "font_003",
    name: "Roboto Mono",
    usage: "Code & Technical",
    weights: ["400", "500"],
    fallback: "monospace",
  },
];

export interface SeedBrandVoice {
  description: string;
  toneAttributes: string[];
  targetAudience: string;
  industry: string;
  doList: string[];
  dontList: string[];
}

export const seedBrandVoice: SeedBrandVoice = {
  description:
    "Innovate Marketing Co speaks with confidence and expertise while remaining approachable and helpful. We simplify complex marketing concepts without being condescending. Our voice inspires action and builds trust through transparency and real results.",
  toneAttributes: ["Professional", "Approachable", "Innovative", "Results-Driven", "Authentic"],
  targetAudience: "Marketing professionals, small business owners, and entrepreneurs looking to scale their content strategy",
  industry: "Marketing Technology / SaaS",
  doList: [
    "Use clear, jargon-free language",
    "Back claims with data and examples",
    "Celebrate customer successes",
    "Admit when we don't know something",
    "Provide actionable takeaways",
  ],
  dontList: [
    "Use buzzwords without substance",
    "Make promises we can't keep",
    "Ignore customer feedback",
    "Be condescending or preachy",
    "Prioritize sales over value",
  ],
};

// ============================================
// AI Generation Templates
// ============================================

export interface SeedAIPromptTemplate {
  id: string;
  name: string;
  description: string;
  platform: Platform | "all";
  template: string;
  variables: string[];
}

export const seedAIPromptTemplates: SeedAIPromptTemplate[] = [
  {
    id: "template_001",
    name: "LinkedIn Thought Leadership",
    description: "Transform content into LinkedIn-style thought leadership posts",
    platform: "linkedin",
    template: `Transform the following content into a compelling LinkedIn post that:
- Opens with a hook that stops the scroll
- Uses short paragraphs (1-2 sentences max)
- Includes relevant emojis sparingly
- Ends with a clear call-to-action or question
- Stays under 3,000 characters
- Adds 3-5 relevant hashtags

Content: {{content}}
Industry: {{industry}}
Target audience: {{audience}}`,
    variables: ["content", "industry", "audience"],
  },
  {
    id: "template_002",
    name: "Twitter Thread",
    description: "Convert long-form content into engaging Twitter threads",
    platform: "twitter",
    template: `Convert this content into a Twitter thread that:
- Has a compelling hook tweet (under 280 chars)
- Breaks down key points into individual tweets
- Uses numbered format (1/X)
- Includes relevant emojis
- Ends with a summary + CTA tweet
- Maximum 10 tweets

Content: {{content}}
Key message: {{keyMessage}}`,
    variables: ["content", "keyMessage"],
  },
  {
    id: "template_003",
    name: "Instagram Caption",
    description: "Create engaging Instagram captions with hashtags",
    platform: "instagram",
    template: `Create an Instagram caption that:
- Opens with an attention-grabbing first line
- Tells a story or provides value
- Uses line breaks for readability
- Includes a clear CTA
- Adds 20-30 relevant hashtags in a separate block
- Stays under 2,200 characters

Content: {{content}}
Brand voice: {{brandVoice}}
Content type: {{contentType}}`,
    variables: ["content", "brandVoice", "contentType"],
  },
];

// ============================================
// Dashboard Quick Stats
// ============================================

export interface SeedDashboardStats {
  postsThisWeek: number;
  postsScheduled: number;
  aiCreditsUsed: number;
  aiCreditsTotal: number;
  engagementRate: string;
  bestPerformingPlatform: Platform;
}

export const seedDashboardStats: SeedDashboardStats = {
  postsThisWeek: 12,
  postsScheduled: 8,
  aiCreditsUsed: 847,
  aiCreditsTotal: 2000,
  engagementRate: "4.2%",
  bestPerformingPlatform: "linkedin",
};

// ============================================
// Notifications
// ============================================

export interface SeedNotification {
  id: string;
  type: "success" | "warning" | "info" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export const seedNotifications: SeedNotification[] = [
  {
    id: "notif_001",
    type: "success",
    title: "Post Published Successfully",
    message: "Your LinkedIn post 'The Future of AI in Content Marketing' is now live.",
    timestamp: "2 hours ago",
    read: false,
    actionUrl: "/dashboard/content/content_001",
  },
  {
    id: "notif_002",
    type: "info",
    title: "Smart Scheduling Enabled",
    message: "AI has optimized posting times for your upcoming content based on audience activity.",
    timestamp: "5 hours ago",
    read: false,
  },
  {
    id: "notif_003",
    type: "warning",
    title: "Facebook Token Expiring",
    message: "Your Facebook connection will expire in 3 days. Please reconnect to avoid interruption.",
    timestamp: "1 day ago",
    read: true,
    actionUrl: "/dashboard/accounts",
  },
  {
    id: "notif_004",
    type: "success",
    title: "Weekly Report Ready",
    message: "Your weekly analytics report for Jan 15-21 is ready to view.",
    timestamp: "2 days ago",
    read: true,
    actionUrl: "/dashboard/analytics",
  },
];

// ============================================
// AI Suggestions
// ============================================

export interface SeedAISuggestion {
  id: string;
  type: "content" | "timing" | "engagement" | "trending";
  title: string;
  description: string;
  actionLabel: string;
  priority: "high" | "medium" | "low";
}

export const seedAISuggestions: SeedAISuggestion[] = [
  {
    id: "suggestion_001",
    type: "content",
    title: "Repurpose Your Top Post",
    description:
      "Your LinkedIn post about AI in marketing performed 312% above average. Consider transforming it into a Twitter thread and Instagram carousel.",
    actionLabel: "Create Variations",
    priority: "high",
  },
  {
    id: "suggestion_002",
    type: "timing",
    title: "Optimal Posting Window",
    description:
      "Your LinkedIn audience is most active Tuesdays 9-11 AM. You have no posts scheduled for this window next week.",
    actionLabel: "Schedule Post",
    priority: "medium",
  },
  {
    id: "suggestion_003",
    type: "trending",
    title: "Trending Topic: AI Regulation",
    description:
      "AI regulation is trending in your industry. This could be a great opportunity for thought leadership content.",
    actionLabel: "Create Content",
    priority: "medium",
  },
  {
    id: "suggestion_004",
    type: "engagement",
    title: "Respond to Comments",
    description:
      "You have 12 unanswered comments on recent posts. Responding within 24 hours increases engagement by 40%.",
    actionLabel: "View Comments",
    priority: "high",
  },
];

// ============================================
// Pricing Plans
// ============================================

export interface SeedPricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  description: string;
  features: string[];
  limits: {
    socialAccounts: number;
    postsPerMonth: number | "unlimited";
    aiCredits: number;
    teamMembers: number;
  };
  popular: boolean;
}

// ============================================
// FAQs
// ============================================

export interface SeedFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const seedFAQs: SeedFAQ[] = [
  {
    id: "faq_001",
    question: "How does BrandFlow AI transform my content?",
    answer:
      "BrandFlow AI uses advanced language models to analyze your original content and generate platform-specific variations. It considers each platform's character limits, tone, formatting, and best practices to create optimized versions that resonate with each audience.",
    category: "product",
  },
  {
    id: "faq_002",
    question: "Which social media platforms are supported?",
    answer:
      "BrandFlow AI currently supports LinkedIn, Twitter/X, Facebook, Instagram, Pinterest, and TikTok. We're constantly adding new platforms based on user feedback.",
    category: "product",
  },
  {
    id: "faq_003",
    question: "How do AI credits work?",
    answer:
      "AI credits are used for content generation and image creation. Each content transformation uses 1 credit, while AI image generation uses 5 credits. Your plan includes a monthly credit allocation, and unused credits roll over for 30 days.",
    category: "billing",
  },
  {
    id: "faq_004",
    question: "Can I maintain my brand voice across platforms?",
    answer:
      "Absolutely! Our Brand Kit feature lets you define your brand voice, tone, and guidelines. The AI uses this information to ensure all generated content stays true to your brand identity while adapting to each platform's style.",
    category: "product",
  },
  {
    id: "faq_005",
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial on all plans with no credit card required. You'll have full access to all features during the trial period to see how BrandFlow AI can transform your content workflow.",
    category: "billing",
  },
  {
    id: "faq_006",
    question: "How does smart scheduling work?",
    answer:
      "Smart Scheduling analyzes your audience's engagement patterns across each platform to determine the optimal times to post. The AI continuously learns from your posting history to improve recommendations over time.",
    category: "product",
  },
  {
    id: "faq_007",
    question: "Can I edit the AI-generated content?",
    answer:
      "Yes, you have full control! All AI-generated content can be edited, refined, or completely rewritten before publishing. The AI provides a starting point, but you always have the final say.",
    category: "product",
  },
  {
    id: "faq_008",
    question: "What happens if I exceed my plan limits?",
    answer:
      "If you approach your limits, we'll notify you so you can upgrade or purchase additional credits. You can also set up automatic top-ups to ensure uninterrupted service.",
    category: "billing",
  },
];

// ============================================
// Testimonials
// ============================================

export interface SeedTestimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  quote: string;
  rating: number;
}

export const seedTestimonials: SeedTestimonial[] = [
  {
    id: "testimonial_001",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechVenture Inc",
    quote:
      "BrandFlow AI has completely transformed our content workflow. What used to take our team 8 hours now takes 30 minutes. The AI-generated variations are spot-on for each platform.",
    rating: 5,
  },
  {
    id: "testimonial_002",
    author: "Marcus Johnson",
    role: "Founder & CEO",
    company: "GrowthLabs",
    quote:
      "I was skeptical about AI-generated content, but BrandFlow AI impressed me. It captures our brand voice perfectly and the engagement on our posts has increased by 156%.",
    rating: 5,
  },
  {
    id: "testimonial_003",
    author: "Emily Rodriguez",
    role: "Social Media Manager",
    company: "Acme Corp",
    quote:
      "The smart scheduling feature alone is worth the subscription. Our posts now go out at optimal times and we've seen a 40% increase in reach across all platforms.",
    rating: 5,
  },
  {
    id: "testimonial_004",
    author: "David Park",
    role: "Content Strategist",
    company: "Digital First Agency",
    quote:
      "As an agency managing multiple clients, BrandFlow AI is a game-changer. We can maintain consistent brand voices while publishing 10x more content.",
    rating: 5,
  },
  {
    id: "testimonial_005",
    author: "Lisa Thompson",
    role: "Head of Marketing",
    company: "SaaS Startup",
    quote:
      "The ROI on BrandFlow AI is incredible. We've reduced our content creation costs by 60% while actually improving quality and engagement metrics.",
    rating: 5,
  },
  {
    id: "testimonial_006",
    author: "James Wilson",
    role: "Personal Brand Coach",
    company: "Wilson Consulting",
    quote:
      "I recommend BrandFlow AI to all my clients building their personal brands. It makes consistent, quality content creation accessible to everyone.",
    rating: 5,
  },
];

// ============================================
// Use Cases
// ============================================

export interface SeedUseCase {
  title: string;
  icon: string;
  benefits: string[];
}

export const seedUseCases: SeedUseCase[] = [
  {
    title: "Solo Creators",
    icon: "User",
    benefits: [
      "Save 10+ hours per week",
      "Consistent posting schedule",
      "Professional-quality images",
      "Grow across all platforms",
    ],
  },
  {
    title: "Marketing Agencies",
    icon: "Users",
    benefits: [
      "Manage multiple clients easily",
      "White-label reporting",
      "Team collaboration tools",
      "Scale your services",
    ],
  },
  {
    title: "Small Businesses",
    icon: "Building2",
    benefits: [
      "No marketing team needed",
      "Brand-consistent content",
      "Lead generation tracking",
      "Affordable pricing",
    ],
  },
  {
    title: "Startup Founders",
    icon: "Rocket",
    benefits: [
      "Build brand awareness fast",
      "Focus on product, not posts",
      "Data-driven insights",
      "Compete with bigger brands",
    ],
  },
];

export const seedPricingPlans: SeedPricingPlan[] = [
  {
    id: "plan_starter",
    name: "Starter",
    price: 19,
    interval: "month",
    description: "Perfect for solo creators and small businesses",
    features: [
      "5 social accounts",
      "100 posts per month",
      "500 AI credits",
      "Basic analytics",
      "Email support",
    ],
    limits: {
      socialAccounts: 5,
      postsPerMonth: 100,
      aiCredits: 500,
      teamMembers: 1,
    },
    popular: false,
  },
  {
    id: "plan_pro",
    name: "Pro",
    price: 49,
    interval: "month",
    description: "For growing businesses and marketing teams",
    features: [
      "15 social accounts",
      "Unlimited posts",
      "2,000 AI credits",
      "Advanced analytics",
      "Smart scheduling",
      "Priority support",
      "3 team members",
    ],
    limits: {
      socialAccounts: 15,
      postsPerMonth: "unlimited",
      aiCredits: 2000,
      teamMembers: 3,
    },
    popular: true,
  },
  {
    id: "plan_business",
    name: "Business",
    price: 149,
    interval: "month",
    description: "For agencies and enterprise teams",
    features: [
      "Unlimited social accounts",
      "Unlimited posts",
      "10,000 AI credits",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "Unlimited team members",
      "Custom integrations",
    ],
    limits: {
      socialAccounts: 999,
      postsPerMonth: "unlimited",
      aiCredits: 10000,
      teamMembers: 999,
    },
    popular: false,
  },
];
