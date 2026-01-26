"use client";

import { User, Users, Building2, Rocket, Check } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { seedUseCases } from "@/lib/seed-data";

const iconMap = {
  User,
  Users,
  Building2,
  Rocket,
};

export function UseCasesSection() {
  return (
    <Section id="use-cases" background="white">
      <SectionHeader
        badge="Use Cases"
        title="Built for Creators, Teams, and Businesses"
        subtitle="Whether you're a solo creator or a growing agency, BrandFlow AI scales with your needs."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seedUseCases.map((useCase) => {
          const Icon = iconMap[useCase.icon as keyof typeof iconMap] || User;
          return (
            <div
              key={useCase.title}
              className="group relative p-6 bg-white rounded-[var(--radius-xl)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card-hover)] transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                <Icon className="w-7 h-7 text-[var(--color-primary)] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold font-heading text-[var(--color-text-primary)] mb-4">
                {useCase.title}
              </h3>

              {/* Benefits */}
              <ul className="space-y-2">
                {useCase.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                    <Check className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
