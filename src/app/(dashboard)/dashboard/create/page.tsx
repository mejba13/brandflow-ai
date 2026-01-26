import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentCreator } from "@/components/content/content-creator";

export const metadata: Metadata = {
  title: "Create Content",
};

export default function CreateContentPage() {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-semibold font-heading text-[var(--color-text-primary)]">
          Create Content
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Transform your content into platform-optimized posts with AI
        </p>
      </div>

      {/* Content Creator Component */}
      <ContentCreator />
    </div>
  );
}
