import { Metadata } from "next";
import {
  LandingNav,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  CTASection,
  LandingFooter,
} from "@/components/landing";

export const metadata: Metadata = {
  title: "BrandFlow AI - Transform Content into Platform-Perfect Posts",
  description:
    "AI-powered social media automation. Transform a single piece of content into 6 platform-perfect posts with AI-generated images, optimal scheduling, and lead tracking. Your Brand. Every Platform. Zero Effort.",
  keywords: [
    "social media automation",
    "AI content generation",
    "multi-platform publishing",
    "content scheduling",
    "social media management",
    "AI marketing tools",
    "content transformation",
    "brand management",
  ],
  openGraph: {
    title: "BrandFlow AI - Transform Content into Platform-Perfect Posts",
    description:
      "AI-powered social media automation. Transform a single piece of content into 6 platform-perfect posts with AI-generated images, optimal scheduling, and lead tracking.",
    type: "website",
    siteName: "BrandFlow AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandFlow AI - Your Brand. Every Platform. Zero Effort.",
    description:
      "Transform a single piece of content into 6 platform-perfect posts with AI-generated images, optimal scheduling, and lead tracking.",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <LandingFooter />
    </main>
  );
}
