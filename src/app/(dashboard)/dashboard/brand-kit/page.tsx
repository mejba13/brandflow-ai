"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Upload,
  Palette,
  Type,
  Image,
  Trash2,
  Edit3,
  Copy,
  Check,
  Sparkles,
  Zap,
  Download,
  Eye,
  MessageSquare,
  Users,
  Building2,
  X,
  Heart,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { seedBrandColors, seedBrandFonts, seedBrandVoice, seedCurrentUser } from "@/lib/seed-data";

interface BrandAsset {
  id: string;
  name: string;
  type: "logo" | "icon" | "image";
  url: string;
  size: string;
}

const brandAssets: BrandAsset[] = [
  { id: "asset_001", name: "Logo Primary", type: "logo", url: "/assets/logo.svg", size: "2.4 KB" },
  { id: "asset_002", name: "Logo White", type: "logo", url: "/assets/logo-white.svg", size: "2.1 KB" },
  { id: "asset_003", name: "App Icon", type: "icon", url: "/assets/icon.png", size: "12 KB" },
  { id: "asset_004", name: "Social Banner", type: "image", url: "/assets/banner.png", size: "145 KB" },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 150, damping: 20 },
  },
};

export default function BrandKitPage() {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Calculate brand kit completeness
  const completeness = Math.round(
    ((seedBrandColors.length > 0 ? 25 : 0) +
      (seedBrandFonts.length > 0 ? 25 : 0) +
      (brandAssets.length > 0 ? 25 : 0) +
      (seedBrandVoice.description ? 25 : 0))
  );

  return (
    <motion.div
      className="space-y-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Header */}
      <motion.section
        className="relative overflow-hidden rounded-2xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 50%, #252b4d 100%)",
          }}
        />

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-[350px] h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)",
              filter: "blur(50px)",
            }}
            animate={mounted ? { y: [0, 25, 0], x: [0, -15, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-[250px] h-[250px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
            animate={mounted ? { y: [0, -20, 0], x: [0, 15, 0] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                    boxShadow: "0 4px 16px -4px rgba(236, 72, 153, 0.4)",
                  }}
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Palette className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-white/50 text-sm font-medium">Brand Identity</span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Brand Kit
              </h1>

              <p className="text-white/60 max-w-md text-sm leading-relaxed">
                Manage brand assets for <span className="text-white font-medium">{seedCurrentUser.company}</span> to ensure consistent content across all platforms.
              </p>

              {/* Completeness indicator */}
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-[200px] h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: mounted ? `${completeness}%` : 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <span className="text-white/60 text-sm font-medium">{completeness}% complete</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="secondary"
                  className="bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20 font-medium h-10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Kit
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="relative overflow-hidden group font-medium h-10"
                  style={{
                    background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
                    boxShadow: "0 4px 20px -4px rgba(236, 72, 153, 0.4)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <Upload className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10">Upload Assets</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Brand Colors - Spans 8 cols */}
        <motion.section
          className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-100 overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-500"
                style={{ boxShadow: "0 4px 12px -2px rgba(236, 72, 153, 0.3)" }}
              >
                <Palette className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Brand Colors</h2>
                <p className="text-xs text-slate-500">{seedBrandColors.length} colors defined</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Color
            </motion.button>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {seedBrandColors.map((color, index) => (
                <motion.button
                  key={color.id}
                  onClick={() => copyColor(color.hex)}
                  className="group text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-full aspect-square rounded-xl border border-slate-200 mb-2 relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-slate-300"
                    style={{ backgroundColor: color.hex }}
                  >
                    <AnimatePresence>
                      {copiedColor === color.hex ? (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <Check className="w-5 h-5 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors"
                        >
                          <Copy className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <p className="text-[11px] font-medium text-slate-900 truncate">{color.name}</p>
                  <p className="text-[10px] text-slate-400 uppercase">{color.hex}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Quick Stats - Spans 4 cols */}
        <motion.section
          className="col-span-12 lg:col-span-4 space-y-4"
          variants={itemVariants}
        >
          {/* Brand Stats Mini Cards */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Colors", value: seedBrandColors.length, icon: Palette, gradient: "from-pink-500 to-rose-500" },
              { label: "Fonts", value: seedBrandFonts.length, icon: Type, gradient: "from-violet-500 to-purple-500" },
              { label: "Assets", value: brandAssets.length, icon: Image, gradient: "from-indigo-500 to-blue-500" },
              { label: "Guidelines", value: 1, icon: MessageSquare, gradient: "from-emerald-500 to-teal-500" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl border border-slate-100 p-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  whileHover={{ y: -2, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.1)" }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${stat.gradient} mb-3`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* AI Tip Card */}
          <motion.div
            className="relative overflow-hidden rounded-xl p-4"
            style={{
              background: "linear-gradient(135deg, #0c0f1a 0%, #1a1f3c 100%)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-semibold text-violet-400">AI TIP</span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Complete your brand kit to help AI generate more consistent, on-brand content.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Typography - Full width */}
        <motion.section
          className="col-span-12 bg-white rounded-xl border border-slate-100 overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-500"
                style={{ boxShadow: "0 4px 12px -2px rgba(139, 92, 246, 0.3)" }}
              >
                <Type className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Typography</h2>
                <p className="text-xs text-slate-500">{seedBrandFonts.length} font families</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Font
            </motion.button>
          </div>

          <div className="p-5 space-y-3">
            {seedBrandFonts.map((font, index) => (
              <motion.div
                key={font.id}
                className="group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 2 }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-slate-900">{font.name}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">
                      {font.usage}
                    </span>
                  </div>
                  <p
                    className="text-xl text-slate-600 mb-2"
                    style={{
                      fontFamily: font.name === "Google Sans" ? "var(--font-heading)"
                        : font.name === "Roboto Mono" ? "monospace"
                        : "var(--font-body)",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-slate-400">
                    Weights: {font.weights.join(", ")} | Fallback: {font.fallback}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.button
                    className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-indigo-600 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Brand Assets - Spans 7 cols */}
        <motion.section
          className="col-span-12 lg:col-span-7 bg-white rounded-xl border border-slate-100 overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-500"
                style={{ boxShadow: "0 4px 12px -2px rgba(99, 102, 241, 0.3)" }}
              >
                <Image className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Brand Assets</h2>
                <p className="text-xs text-slate-500">{brandAssets.length} files uploaded</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="w-4 h-4" />
              Upload
            </motion.button>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {brandAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  className="group rounded-xl border border-slate-100 overflow-hidden hover:border-indigo-100 hover:shadow-lg transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-square bg-slate-50 flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center">
                      <Image className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <motion.button
                        className="p-2 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-white/90 text-slate-700 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="p-2 rounded-lg bg-white/90 text-red-500 hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-slate-900 truncate">{asset.name}</p>
                    <p className="text-xs text-slate-400">{asset.type.toUpperCase()} • {asset.size}</p>
                  </div>
                </motion.div>
              ))}

              {/* Upload placeholder */}
              <motion.button
                className="aspect-square rounded-xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all flex flex-col items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                  <Plus className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <span className="text-sm text-slate-500 group-hover:text-indigo-600 transition-colors">Add Asset</span>
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Brand Voice - Spans 5 cols */}
        <motion.section
          className="col-span-12 lg:col-span-5 bg-white rounded-xl border border-slate-100 overflow-hidden"
          variants={itemVariants}
        >
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-500"
                style={{ boxShadow: "0 4px 12px -2px rgba(16, 185, 129, 0.3)" }}
              >
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900">Brand Voice</h2>
                <p className="text-xs text-slate-500">Tone & guidelines</p>
              </div>
            </div>
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </motion.button>
          </div>

          <div className="p-5 space-y-4">
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-medium text-slate-500 uppercase">Audience</span>
                </div>
                <p className="text-sm font-medium text-slate-900">{seedBrandVoice.targetAudience}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-50">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-[11px] font-medium text-slate-500 uppercase">Industry</span>
                </div>
                <p className="text-sm font-medium text-slate-900">{seedBrandVoice.industry}</p>
              </div>
            </div>

            {/* Tone Attributes */}
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">TONE ATTRIBUTES</p>
              <div className="flex flex-wrap gap-2">
                {seedBrandVoice.toneAttributes.map((attr) => (
                  <span
                    key={attr}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Do's and Don'ts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-emerald-700">Do&apos;s</span>
                </div>
                <ul className="space-y-1.5">
                  {seedBrandVoice.doList.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-600 line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-red-50/50 border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-semibold text-red-600">Don&apos;ts</span>
                </div>
                <ul className="space-y-1.5">
                  {seedBrandVoice.dontList.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-600 line-clamp-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Bottom CTA */}
      <motion.section
        className="relative overflow-hidden rounded-xl"
        variants={itemVariants}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(236, 72, 153, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%)",
          }}
        />
        <div className="absolute inset-0 border border-pink-100 rounded-xl" />

        <div className="relative z-10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #a855f7 100%)",
                boxShadow: "0 4px 16px -4px rgba(236, 72, 153, 0.4)",
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-slate-900">
                AI-Powered Brand Consistency
              </h3>
              <p className="text-slate-500 text-sm">
                Your brand kit helps AI generate content that matches your unique identity.
              </p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              className="relative overflow-hidden group font-medium whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
                boxShadow: "0 4px 16px -4px rgba(236, 72, 153, 0.4)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ y: "100%" }}
                whileHover={{ y: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <Zap className="w-4 h-4 mr-2 relative z-10" />
              <span className="relative z-10">Generate On-Brand Content</span>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}
