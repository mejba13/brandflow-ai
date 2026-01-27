"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  Zap,
  Cpu,
  Layers,
  Clock,
  Crown,
  Stars,
  Rocket,
} from "lucide-react";
import { ContentCreator } from "@/components/content/content-creator";

export default function CreateContentPage() {
  return (
    <div className="min-h-screen relative overflow-hidden -m-6 lg:-m-8">
      {/* Solid Dark Background - Overrides parent layout */}
      <div className="absolute inset-0 z-0 bg-[#030712]">
        {/* Mesh Gradient Effects */}
        <motion.div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(99, 102, 241, 0.15) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <motion.div
          className="absolute bottom-[-30%] left-[-20%] w-[900px] h-[900px] rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        <motion.div
          className="absolute top-[40%] left-[30%] w-[500px] h-[500px] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Back Link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors mb-8 group"
          >
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/15 group-hover:border-white/30 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-medium">Back to Dashboard</span>
          </Link>

          {/* Main Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            {/* Title Section */}
            <div className="flex items-start gap-5">
              {/* Animated Icon Container */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center relative z-10"
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    boxShadow:
                      "0 20px 60px -15px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <Wand2 className="w-10 h-10 text-white" />
                </motion.div>
                {/* Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{
                    background:
                      "linear-gradient(135deg, #6366f1, #a855f7)",
                    filter: "blur(15px)",
                  }}
                />
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-3"
                >
                  <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-violet-500/20 text-violet-300 border border-violet-500/40">
                    AI-Powered
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Pro Feature
                  </span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-3 text-white">
                  Create Content
                </h1>

                <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
                  Transform your ideas into platform-optimized posts with our
                  advanced AI engine. One input, six stunning outputs.
                </p>
              </div>
            </div>

            {/* Stats Bento Grid */}
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* AI Credits Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl p-4 bg-violet-500/10 border border-violet-500/30"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                    }}
                  >
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      AI Credits
                    </p>
                    <p className="text-2xl font-bold text-white">847</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </div>
              </motion.div>

              {/* Posts Today Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl p-4 bg-emerald-500/10 border border-emerald-500/30"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Posts Today
                    </p>
                    <p className="text-2xl font-bold text-white">12</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Rocket className="w-3 h-3 text-emerald-400" />
                  </motion.div>
                  <span className="text-xs text-emerald-400 font-medium">
                    +40% vs yesterday
                  </span>
                </div>
              </motion.div>

              {/* Queue Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl p-4 bg-orange-500/10 border border-orange-500/30"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                    }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      In Queue
                    </p>
                    <p className="text-2xl font-bold text-white">8</p>
                  </div>
                </div>
              </motion.div>

              {/* Plan Card */}
              <motion.div
                className="relative overflow-hidden rounded-2xl p-4 bg-pink-500/10 border border-pink-500/30"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                    }}
                  >
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Current Plan
                    </p>
                    <p className="text-lg font-bold text-white">Pro</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: Cpu, text: "GPT-4 Turbo", color: "#8b5cf6" },
            { icon: Layers, text: "6 Platforms", color: "#06b6d4" },
            { icon: Stars, text: "Smart Optimization", color: "#f59e0b" },
            { icon: Sparkles, text: "Instant Generation", color: "#10b981" },
          ].map((feature, i) => (
            <motion.div
              key={feature.text}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{
                background: `${feature.color}20`,
                border: `1px solid ${feature.color}50`,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon
                className="w-4 h-4"
                style={{ color: feature.color }}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: feature.color }}
              >
                {feature.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Content Creator Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContentCreator />
        </motion.div>
      </div>
    </div>
  );
}
