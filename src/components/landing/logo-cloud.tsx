"use client";

import { Section } from "@/components/ui/section";

const stats = [
  { value: "10,000+", label: "Marketers" },
  { value: "2M+", label: "Posts Created" },
  { value: "150K+", label: "Hours Saved" },
  { value: "4.9/5", label: "Rating" },
];

export function LogoCloud() {
  return (
    <Section background="subtle" padding="md">
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-8">
          Trusted by 10,000+ marketers worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-text-primary)]">
                {stat.value}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
