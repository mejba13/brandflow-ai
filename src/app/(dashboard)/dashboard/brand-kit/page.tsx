"use client";

import * as React from "react";
import { Plus, Upload, Palette, Type, Image, Trash2, Edit2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function BrandKitPage() {
  const [copiedColor, setCopiedColor] = React.useState<string | null>(null);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
            Brand Kit
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1">
            Manage brand assets for {seedCurrentUser.company} to ensure consistent content
          </p>
        </div>
        <Button leftIcon={<Upload className="w-4 h-4" />}>Upload Assets</Button>
      </div>

      {/* Brand Colors */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--color-primary)]" />
            <CardTitle>Brand Colors</CardTitle>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Color
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {seedBrandColors.map((color) => (
              <div key={color.id} className="group">
                <button
                  onClick={() => copyColor(color.hex)}
                  className="w-full aspect-square rounded-[var(--radius-xl)] border border-[var(--color-border-light)] mb-2 relative overflow-hidden transition-transform hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    {copiedColor === color.hex ? (
                      <Check className="w-6 h-6 text-white" />
                    ) : (
                      <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
                <p className="text-xs font-medium text-[var(--color-text-primary)] text-center truncate">
                  {color.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] text-center uppercase">
                  {color.hex}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Fonts */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-[var(--color-primary)]" />
            <CardTitle>Typography</CardTitle>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            Add Font
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {seedBrandFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)]"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      {font.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-background-muted)] text-[var(--color-text-muted)]">
                      {font.usage}
                    </span>
                  </div>
                  <p
                    className="text-2xl text-[var(--color-text-secondary)]"
                    style={{
                      fontFamily:
                        font.name === "Google Sans"
                          ? "var(--font-heading)"
                          : font.name === "Roboto Mono"
                            ? "monospace"
                            : "var(--font-body)",
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">
                    Weights: {font.weights.join(", ")} | Fallback: {font.fallback}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-background-muted)] text-[var(--color-text-muted)] transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-error)]/10 text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Assets */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-[var(--color-primary)]" />
            <CardTitle>Brand Assets</CardTitle>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
            Upload
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {brandAssets.map((asset) => (
              <div
                key={asset.id}
                className="group rounded-[var(--radius-xl)] border border-[var(--color-border-light)] overflow-hidden"
              >
                <div className="aspect-square bg-[var(--color-background-muted)] flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Image className="w-8 h-8 text-[var(--color-primary)]" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="p-2 rounded-[var(--radius-lg)] bg-white/90 text-[var(--color-text-primary)] hover:bg-white transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-[var(--radius-lg)] bg-white/90 text-[var(--color-error)] hover:bg-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    {asset.name}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {asset.type.toUpperCase()} • {asset.size}
                  </p>
                </div>
              </div>
            ))}

            {/* Upload placeholder */}
            <button className="aspect-square rounded-[var(--radius-xl)] border-2 border-dashed border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-colors flex flex-col items-center justify-center gap-2">
              <Plus className="w-8 h-8 text-[var(--color-text-muted)]" />
              <span className="text-sm text-[var(--color-text-muted)]">Add Asset</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Brand Voice */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Voice & Tone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                Brand Voice Description
              </label>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] focus:border-[var(--color-primary)] focus:outline-none resize-y text-sm"
                placeholder="Describe your brand's voice and tone. This helps AI generate content that matches your brand personality..."
                defaultValue={seedBrandVoice.description}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                  Target Audience
                </label>
                <Input placeholder="e.g., Marketing professionals" defaultValue={seedBrandVoice.targetAudience} />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                  Industry
                </label>
                <Input placeholder="e.g., Technology" defaultValue={seedBrandVoice.industry} />
              </div>
              <div>
                <label className="text-sm font-medium text-[var(--color-text-primary)] mb-2 block">
                  Tone Attributes
                </label>
                <Input placeholder="e.g., Innovative, trustworthy" defaultValue={seedBrandVoice.toneAttributes.join(", ")} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                  Do&apos;s
                </h4>
                <ul className="space-y-2">
                  {seedBrandVoice.doList.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[var(--color-success)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-3">
                  Don&apos;ts
                </h4>
                <ul className="space-y-2">
                  {seedBrandVoice.dontList.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-4 h-4 text-[var(--color-error)] mt-0.5 flex-shrink-0 text-center">×</span>
                      <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Brand Voice</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Integration Note */}
      <Card className="bg-gradient-to-r from-[var(--color-primary)]/5 to-[var(--color-accent)]/5 border-[var(--color-primary)]/20">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/10">
              <Palette className="w-6 h-6 text-[var(--color-primary)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">
                AI-Powered Brand Consistency
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                BrandFlow AI uses your brand kit to ensure all generated content matches your brand&apos;s visual identity
                and voice. Your colors, fonts, and tone guidelines are automatically applied to every piece of content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
