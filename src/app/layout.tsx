import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/components/providers/auth-provider";
import { TRPCProvider } from "@/components/providers/trpc-provider";

import "./globals.css";

// Force dynamic rendering for all pages
export const dynamic = "force-dynamic";

// Using Inter as the primary font for modern, clean aesthetics
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BrandFlow AI - AI-Powered Social Media Automation",
    template: "%s | BrandFlow AI",
  },
  description:
    "Transform a single piece of content into platform-perfect posts with AI-generated images, optimal scheduling, and lead tracking. Your Brand. Every Platform. Zero Effort.",
  keywords: [
    "social media automation",
    "AI content generation",
    "multi-platform publishing",
    "content scheduling",
    "lead generation",
    "personal branding",
    "social media management",
    "AI marketing",
  ],
  authors: [{ name: "BrandFlow AI" }],
  creator: "BrandFlow AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BrandFlow AI",
    title: "BrandFlow AI - AI-Powered Social Media Automation",
    description:
      "Write once, publish everywhere—optimized. Transform content into 6 platform-perfect posts with AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BrandFlow AI",
    description: "AI-Powered Social Media Automation Platform",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background font-body antialiased">
        <AuthProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
