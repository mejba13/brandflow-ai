"use client";

import { Section, SectionHeader } from "@/components/ui/section";
import { PlatformIcons } from "@/components/icons/platform-icons";

const platforms = [
  {
    name: "LinkedIn",
    icon: PlatformIcons.LinkedIn,
    color: "var(--color-linkedin)",
    description: "Professional networking & B2B content"
  },
  {
    name: "Twitter/X",
    icon: PlatformIcons.Twitter,
    color: "var(--color-twitter)",
    description: "Real-time updates & thought leadership"
  },
  {
    name: "Facebook",
    icon: PlatformIcons.Facebook,
    color: "var(--color-facebook)",
    description: "Community building & engagement"
  },
  {
    name: "Instagram",
    icon: PlatformIcons.Instagram,
    color: "var(--color-instagram)",
    description: "Visual storytelling & brand aesthetics"
  },
  {
    name: "Pinterest",
    icon: PlatformIcons.Pinterest,
    color: "var(--color-pinterest)",
    description: "Visual discovery & traffic driving"
  },
  {
    name: "TikTok",
    icon: PlatformIcons.TikTok,
    color: "var(--color-tiktok)",
    description: "Short-form video & viral content"
  },
];

export function IntegrationsSection() {
  return (
    <Section id="integrations" background="subtle">
      <SectionHeader
        badge="Integrations"
        title="All Your Platforms, One Dashboard"
        subtitle="Connect once, publish everywhere. Manage all your social accounts from a single, unified interface."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <div
              key={platform.name}
              className="group relative p-6 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 text-center"
            >
              <div
                className="w-16 h-16 mx-auto rounded-[var(--radius-lg)] flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${platform.color}10` }}
              >
                <Icon className="w-8 h-8" style={{ color: platform.color }} />
              </div>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                {platform.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2">
                {platform.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
