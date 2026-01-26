"use client";

import { useEffect, useRef } from "react";
import { PenLine, Sparkles, Calendar, BarChart3, ArrowRight, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PenLine,
    title: "Write Once",
    description:
      "Create a single piece of content—a blog post, an idea, or even just a few bullet points. Our AI understands your message.",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    preview: {
      type: "input",
      content: "Just launched our new product! It's going to revolutionize how teams collaborate...",
    },
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI Transforms",
    description:
      "BrandFlow AI instantly adapts your content for 6 different platforms, matching each platform's unique style, tone, and format.",
    gradient: "from-[#ec4899] to-[#f43f5e]",
    preview: {
      type: "transform",
      platforms: ["LinkedIn", "Twitter", "Instagram", "Facebook", "Pinterest", "TikTok"],
    },
  },
  {
    number: "03",
    icon: Calendar,
    title: "Schedule Smart",
    description:
      "AI analyzes your audience to recommend optimal posting times. Schedule everything with one click or let it auto-publish.",
    gradient: "from-[#f59e0b] to-[#f97316]",
    preview: {
      type: "calendar",
      times: ["9:00 AM", "12:30 PM", "6:00 PM"],
    },
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Track & Optimize",
    description:
      "Monitor performance across all platforms in one dashboard. AI insights help you continuously improve your strategy.",
    gradient: "from-[#10b981] to-[#059669]",
    preview: {
      type: "stats",
      metrics: [
        { label: "Reach", value: "2.4M", change: "+24%" },
        { label: "Engagement", value: "18.2%", change: "+12%" },
      ],
    },
  },
];

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-[#f8fafc] to-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#6366f1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-sm font-medium mb-6">
            <Play className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
            From Idea to Everywhere in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
          <p className="reveal text-lg text-[#64748b] leading-relaxed">
            BrandFlow AI streamlines your entire social media workflow. Write once,
            publish everywhere—perfectly optimized for each platform.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.number}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 lg:gap-16`}
              >
                {/* Content */}
                <div className={`flex-1 ${isEven ? "reveal-left" : "reveal-right"}`}>
                  <div className="max-w-lg">
                    {/* Step Number */}
                    <div
                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-bold mb-6 shadow-lg`}
                    >
                      Step {step.number}
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-[#0f172a]">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-lg text-[#64748b] leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Learn More */}
                    <button className="inline-flex items-center gap-2 text-[#6366f1] font-semibold hover:gap-3 transition-all">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Visual Preview */}
                <div className={`flex-1 w-full ${isEven ? "reveal-right" : "reveal-left"}`}>
                  <div className="relative">
                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-4 bg-gradient-to-br ${step.gradient} opacity-10 rounded-[40px] blur-2xl`}
                    />

                    {/* Card */}
                    <div className="relative bg-white rounded-3xl border border-[#e2e8f0] p-6 md:p-8 shadow-xl">
                      {step.preview.type === "input" && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899]" />
                            <div>
                              <div className="h-3 w-24 bg-[#e2e8f0] rounded" />
                              <div className="h-2 w-16 bg-[#f1f5f9] rounded mt-1" />
                            </div>
                          </div>
                          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
                            <p className="text-[#0f172a]">{step.preview.content}</p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-lg bg-[#e2e8f0]" />
                                <div className="w-8 h-8 rounded-lg bg-[#e2e8f0]" />
                              </div>
                              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white text-sm font-semibold">
                                Transform
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {step.preview.type === "transform" && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {step.preview.platforms?.map((platform, i) => (
                            <div
                              key={platform}
                              className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#6366f1]/30 hover:shadow-md transition-all cursor-pointer"
                              style={{ animationDelay: `${i * 100}ms` }}
                            >
                              <div className="text-sm font-semibold text-[#0f172a] mb-2">
                                {platform}
                              </div>
                              <div className="space-y-1">
                                <div className="h-2 w-full bg-[#e2e8f0] rounded" />
                                <div className="h-2 w-3/4 bg-[#e2e8f0] rounded" />
                              </div>
                              <div className="flex items-center gap-1 mt-3">
                                <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                                <span className="text-xs text-[#10b981]">Ready</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {step.preview.type === "calendar" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-[#0f172a]">Best Times to Post</span>
                            <span className="text-xs text-[#10b981] font-semibold bg-[#10b981]/10 px-2 py-1 rounded-full">
                              AI Optimized
                            </span>
                          </div>
                          {step.preview.times?.map((time) => (
                            <div
                              key={time}
                              className="flex items-center justify-between p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#f97316]/10 flex items-center justify-center">
                                  <Calendar className="w-5 h-5 text-[#f59e0b]" />
                                </div>
                                <div>
                                  <div className="font-semibold text-[#0f172a]">{time}</div>
                                  <div className="text-xs text-[#64748b]">High engagement predicted</div>
                                </div>
                              </div>
                              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                            </div>
                          ))}
                        </div>
                      )}

                      {step.preview.type === "stats" && (
                        <div className="space-y-4">
                          {step.preview.metrics?.map((metric) => (
                            <div
                              key={metric.label}
                              className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-[#64748b]">{metric.label}</span>
                                <span className="text-xs text-[#10b981] font-semibold bg-[#10b981]/10 px-2 py-1 rounded-full">
                                  {metric.change}
                                </span>
                              </div>
                              <div className="text-3xl font-bold text-[#0f172a]">{metric.value}</div>
                              <div className="mt-3 h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full"
                                  style={{ width: "75%" }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
