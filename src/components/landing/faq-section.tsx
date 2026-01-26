"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How does BrandFlow AI transform my content?",
    answer:
      "BrandFlow AI uses advanced language models to understand your content's core message, tone, and intent. It then adapts this content for each platform's unique requirements—character limits, hashtag conventions, visual formats, and audience expectations. The result is 6 platform-optimized posts from a single piece of content.",
  },
  {
    question: "What platforms does BrandFlow AI support?",
    answer:
      "We currently support LinkedIn, Twitter/X, Facebook, Instagram, Pinterest, and TikTok. Each platform has its own optimization rules and best practices built into our AI. We're constantly adding new platforms based on user demand.",
  },
  {
    question: "Can I customize the AI-generated content?",
    answer:
      "Absolutely! All AI-generated content is fully editable. You can tweak the tone, adjust the messaging, add your personal touch, or completely rewrite sections. Think of the AI as your creative assistant that gives you a strong starting point.",
  },
  {
    question: "How does the AI image generation work?",
    answer:
      "Our AI analyzes your content and generates visually relevant images that match your brand style. You can specify colors, themes, and styles in your brand kit. Each image is automatically sized for optimal display on each platform.",
  },
  {
    question: "Is my content secure?",
    answer:
      "Yes, we take security seriously. All content is encrypted in transit and at rest. We never share your content with third parties, and we don't use your content to train our AI models. You retain full ownership of everything you create.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "We'll notify you when you're approaching your limits. You can upgrade at any time, and the new limits take effect immediately. We never delete your content or cut off access abruptly—we believe in treating our customers fairly.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time with no questions asked. Your access continues until the end of your billing period, and you can export all your content before leaving.",
  },
  {
    question: "Do you offer team or enterprise plans?",
    answer:
      "Yes! Our Pro plan supports up to 5 team members, and our Enterprise plan offers unlimited team members with advanced collaboration features, SSO, and dedicated support. Contact our sales team for custom enterprise solutions.",
  },
];

export function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
      id="faq"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f8fafc] overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6366f1]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ec4899]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="reveal inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="reveal text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-6 leading-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="reveal text-lg text-[#64748b] leading-relaxed">
            Got questions? We&apos;ve got answers. If you can&apos;t find what
            you&apos;re looking for, reach out to our support team.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="reveal bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden transition-all duration-300 hover:border-[#6366f1]/30 hover:shadow-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors"
              >
                <span className="font-semibold text-[#0f172a] pr-4">{faq.question}</span>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    openIndex === index
                      ? "bg-[#6366f1] rotate-180"
                      : "bg-[#f1f5f9]"
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-colors ${
                      openIndex === index ? "text-white" : "text-[#64748b]"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-[#64748b] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="reveal mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-white border border-[#e2e8f0]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6366f1] to-[#ec4899] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <p className="font-semibold text-[#0f172a]">Still have questions?</p>
              <p className="text-sm text-[#64748b]">
                Our team is here to help you get started.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0468D7] to-[#6366f1] text-white font-semibold hover:from-[#0356b3] hover:to-[#4f46e5] transition-all shadow-lg shadow-[#6366f1]/25"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
