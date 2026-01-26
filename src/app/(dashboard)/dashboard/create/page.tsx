"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, Zap } from "lucide-react";
import { ContentCreator } from "@/components/content/content-creator";

export default function CreateContentPage() {
  return (
    <div className="min-h-screen">
      {/* Premium Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 30%, #fafbff 60%, #f8fafc 100%)",
          }}
        />
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)",
            transform: "translate(-20%, 20%)",
          }}
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Back Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-[#64748b] hover:text-[#6366f1] transition-colors mb-6 group"
          >
            <motion.div whileHover={{ x: -4 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span>Back to Dashboard</span>
          </Link>

          {/* Title Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Wand2 className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight">
                  Create Content
                </h1>
                <p className="text-[#64748b] mt-1">
                  Transform your content into platform-optimized posts with AI
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="hidden md:flex items-center gap-4 px-5 py-3 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
                border: "1px solid rgba(99, 102, 241, 0.1)",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 pr-4 border-r border-[#e2e8f0]">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#6366f1]" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#94a3b8]">AI Credits</p>
                  <p className="text-sm font-semibold text-[#0f172a]">847</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981]/10 to-[#059669]/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#10b981]" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#94a3b8]">Posts Today</p>
                  <p className="text-sm font-semibold text-[#0f172a]">12</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Creator Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ContentCreator />
        </motion.div>
      </div>
    </div>
  );
}
