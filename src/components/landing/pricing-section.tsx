"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals getting started",
    price: 0,
    interval: "month",
    icon: Sparkles,
    gradient: "from-[#64748b] to-[#475569]",
    features: [
      "3 social accounts",
      "30 AI-generated posts/month",
      "Basic analytics",
      "Email support",
      "1 team member",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing creators and businesses",
    price: 29,
    interval: "month",
    icon: Zap,
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    features: [
      "10 social accounts",
      "Unlimited AI posts",
      "AI image generation",
      "Advanced analytics",
      "Priority support",
      "5 team members",
      "Custom brand kit",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams and agencies at scale",
    price: 99,
    interval: "month",
    icon: Crown,
    gradient: "from-[#f59e0b] to-[#f97316]",
    features: [
      "Unlimited accounts",
      "Unlimited AI posts",
      "White-label options",
      "API access",
      "Dedicated support",
      "Unlimited team members",
      "Custom integrations",
      "SSO & security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white to-[#f8fafc] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
            Choose Your <span className="gradient-text">Growth Plan</span>
          </h2>
          <p className="reveal text-lg text-[#64748b] leading-relaxed mb-8">
            Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="reveal flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isYearly ? "bg-[#6366f1]" : "bg-[#e2e8f0]"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                  isYearly ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
              Yearly
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-semibold">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? Math.floor(plan.price * 0.8) : plan.price;

            return (
              <div
                key={plan.id}
                className={`reveal relative group rounded-3xl transition-all duration-500 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#0f172a] to-[#1e293b] scale-105 z-10 shadow-2xl shadow-[#6366f1]/20"
                    : "bg-white border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-xl"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6366f1] to-[#ec4899] text-white text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 md:p-8">
                  {/* Plan Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3
                        className={`text-xl font-bold ${
                          plan.popular ? "text-white" : "text-[#0f172a]"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          plan.popular ? "text-white/60" : "text-[#64748b]"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-5xl font-bold ${
                          plan.popular ? "text-white" : "text-[#0f172a]"
                        }`}
                      >
                        ${price}
                      </span>
                      <span
                        className={`text-lg ${plan.popular ? "text-white/50" : "text-[#94a3b8]"}`}
                      >
                        /{plan.interval}
                      </span>
                    </div>
                    {isYearly && plan.price > 0 && (
                      <p className={`text-sm mt-1 ${plan.popular ? "text-[#10b981]" : "text-[#10b981]"}`}>
                        Save ${plan.price * 12 - price * 12}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            plan.popular
                              ? "bg-[#10b981]/20"
                              : "bg-[#10b981]/10"
                          }`}
                        >
                          <Check
                            className={`w-3 h-3 ${
                              plan.popular ? "text-[#10b981]" : "text-[#10b981]"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${
                            plan.popular ? "text-white/80" : "text-[#64748b]"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={plan.id === "enterprise" ? "/contact" : "/signup"} className="block">
                    <Button
                      className={`w-full rounded-xl font-semibold py-3 transition-all group/btn ${
                        plan.popular
                          ? "bg-white text-[#0f172a] hover:bg-white/90"
                          : "bg-gradient-to-r from-[#0468D7] to-[#6366f1] text-white hover:from-[#0356b3] hover:to-[#4f46e5] shadow-lg shadow-[#6366f1]/25"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Hover Glow for Non-Popular */}
                {!plan.popular && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#6366f1]/5 to-[#ec4899]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Enterprise CTA */}
        <div className="reveal mt-16 text-center">
          <p className="text-[#64748b]">
            Need a custom plan for your enterprise?{" "}
            <Link
              href="/contact"
              className="text-[#6366f1] font-semibold hover:text-[#4f46e5] transition-colors inline-flex items-center gap-1"
            >
              Contact our sales team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-[#94a3b8]">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#10b981]" />
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#10b981]" />
            14-day free trial
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#10b981]" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}
