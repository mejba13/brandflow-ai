"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  Star,
  MessageCircle,
  Play,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Heart,
  CheckCircle2,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";

// Video testimonials data
const videoTestimonials = [
  {
    id: "video-1",
    name: "Michael Torres",
    role: "CMO",
    company: "ScaleUp Technologies",
    avatar: "MT",
    thumbnail: "gradient-1",
    duration: "2:34",
    quote: "BrandFlow AI transformed our entire content strategy. We went from struggling to post once a week to dominating all 6 platforms.",
    metrics: {
      engagement: "312%",
      timeSaved: "15hrs",
      contentOutput: "10x",
    },
    gradient: "from-[#6366f1] via-[#8b5cf6] to-[#a855f7]",
    featured: true,
  },
  {
    id: "video-2",
    name: "James Chen",
    role: "Head of Growth",
    company: "TechVenture Labs",
    avatar: "JC",
    thumbnail: "gradient-2",
    duration: "1:48",
    quote: "The AI scheduling is incredibly accurate. Our engagement went through the roof.",
    metrics: {
      engagement: "245%",
      timeSaved: "12hrs",
      reach: "5x",
    },
    gradient: "from-[#06b6d4] to-[#0ea5e9]",
  },
  {
    id: "video-3",
    name: "Robert Williams",
    role: "Founder & CEO",
    company: "GrowthStack",
    avatar: "RW",
    thumbnail: "gradient-3",
    duration: "3:12",
    quote: "Finally, a tool that actually understands LinkedIn's algorithm.",
    metrics: {
      followers: "+50K",
      leads: "3x",
      roi: "847%",
    },
    gradient: "from-[#10b981] to-[#059669]",
  },
];

// Written testimonials
const testimonials = [
  {
    id: 1,
    quote: "The AI understands our brand voice perfectly. Every piece of content feels authentically us, just created 10x faster. Game changer for our team.",
    author: "Daniel Martinez",
    role: "Marketing Director",
    company: "TechStart Inc.",
    rating: 5,
    avatar: "DM",
    gradient: "from-[#6366f1] to-[#8b5cf6]",
    metric: { value: "10x", label: "Faster Content" },
    verified: true,
    image: null,
  },
  {
    id: 2,
    quote: "40% engagement boost from AI-generated images alone. The ROI paid for itself in the first week. Absolutely incredible results.",
    author: "Marcus Johnson",
    role: "Social Media Manager",
    company: "CreativeHub",
    rating: 5,
    avatar: "MJ",
    gradient: "from-[#ec4899] to-[#f43f5e]",
    metric: { value: "40%", label: "More Engagement" },
    verified: true,
  },
  {
    id: 3,
    quote: "Like having a marketing team in my pocket. As a solopreneur, this is invaluable. I can finally compete with bigger brands.",
    author: "Kevin Park",
    role: "Founder",
    company: "Bloom Wellness",
    rating: 5,
    avatar: "KP",
    gradient: "from-[#10b981] to-[#059669]",
    metric: { value: "5hrs", label: "Saved Weekly" },
    verified: true,
  },
  {
    id: 4,
    quote: "Our reach tripled in 2 months. The scheduling AI knows exactly when our audience is active. Mind-blowing accuracy.",
    author: "David Park",
    role: "Content Lead",
    company: "GrowthLab",
    rating: 5,
    avatar: "DP",
    gradient: "from-[#f59e0b] to-[#f97316]",
    metric: { value: "3x", label: "Reach" },
    verified: true,
  },
  {
    id: 5,
    quote: "Finally, platform-native content without the hassle. LinkedIn, Instagram, TikTok—all optimized perfectly for each audience.",
    author: "Alex Thompson",
    role: "Brand Strategist",
    company: "Pulse Agency",
    rating: 5,
    avatar: "AT",
    gradient: "from-[#06b6d4] to-[#0ea5e9]",
    metric: { value: "6", label: "Platforms" },
    verified: true,
  },
  {
    id: 6,
    quote: "We've scaled from 2 posts per week to 20+ across all channels. The quality hasn't dropped at all. Actually, it's improved.",
    author: "Chris Anderson",
    role: "VP Marketing",
    company: "Nova Studios",
    rating: 5,
    avatar: "CA",
    gradient: "from-[#8b5cf6] to-[#a855f7]",
    metric: { value: "10x", label: "Output" },
    verified: true,
  },
];

// Company logos SVG components for social proof
const CompanyLogos = {
  Vercel: () => (
    <svg viewBox="0 0 76 65" fill="currentColor" className="w-5 h-5">
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  ),
  Stripe: () => (
    <svg viewBox="0 0 60 25" fill="currentColor" className="w-14 h-5">
      <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.02 1.04-.06 1.48zm-6.3-5.63c-1.03 0-1.87.73-2.1 2.36h4.2c-.11-1.59-.75-2.36-2.1-2.36zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zM40 8.95c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-5.42h4.13v3.34h-4.13V.15zM20.78 2.02l4.06-.86v3.41l2.23.01v3.36l-2.23-.01v5.61c0 1.24.66 1.63 1.44 1.63.35 0 .67-.04.79-.08V18c-.3.15-.98.3-1.86.3-2.7 0-4.5-1.75-4.5-4.63V7.93l-1.64-.01V5.57h1.71V2.02zM11.46 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.76l.08 1.02a4.7 4.7 0 0 1 3.23-1.29c2.9 0 5.62 2.6 5.62 7.4 0 5.23-2.7 7.6-5.65 7.6zm-.93-11.35c-.95 0-1.54.34-1.97.81l.02 6.12c.4.44.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84z" />
    </svg>
  ),
  Notion: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-5 h-5">
      <path d="M6.017 4.313l55.333 -4.087c6.797 -0.583 8.543 -0.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277 -1.553 6.807 -6.99 7.193L24.467 99.967c-4.08 0.193 -6.023 -0.39 -8.16 -3.113L3.3 79.94c-2.333 -3.113 -3.3 -5.443 -3.3 -8.167V11.113c0 -3.497 1.553 -6.413 6.017 -6.8z" />
      <path fill="#fff" d="M61.35 0.227l-55.333 4.087C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723 0.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257 -3.89c5.433 -0.387 6.99 -2.917 6.99 -7.193V20.64c0 -2.21 -0.873 -2.847 -3.443 -4.733L74.167 3.143c-4.273 -3.107 -6.02 -3.5 -12.817 -2.917zM25.92 19.523c-5.247 0.353 -6.437 0.433 -9.417 -1.99L8.927 11.507c-0.77 -0.78 -0.383 -1.753 1.557 -1.947l53.193 -3.887c4.467 -0.39 6.793 1.167 8.54 2.527l9.123 6.61c0.39 0.197 1.36 1.36 0.193 1.36l-54.933 3.307 -0.68 0.047zM19.803 88.3V30.367c0 -2.53 0.777 -3.697 3.103 -3.893L86 22.78c2.14 -0.193 3.107 1.167 3.107 3.693v57.547c0 2.53 -0.39 4.67 -3.883 4.863l-60.377 3.5c-3.493 0.193 -5.043 -0.97 -5.043 -4.083zm59.6 -54.827c0.387 1.75 0 3.5 -1.75 3.7l-2.91 0.577v42.773c-2.527 1.36 -4.853 2.137 -6.797 2.137 -3.107 0 -3.883 -0.973 -6.21 -3.887l-19.03 -29.94v28.967l6.02 1.363s0 3.5 -4.857 3.5l-13.39 0.777c-0.39 -0.78 0 -2.723 1.357 -3.11l3.497 -0.97v-38.3L30.48 40.667c-0.39 -1.75 0.58 -4.277 3.3 -4.473l14.367 -0.967 19.8 30.327v-26.83l-5.047 -0.58c-0.39 -2.143 1.163 -3.7 3.103 -3.89l13.4 -0.78z" />
    </svg>
  ),
  Slack: () => (
    <svg viewBox="0 0 54 54" fill="none" className="w-5 h-5">
      <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
      <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
      <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
      <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
    </svg>
  ),
  Shopify: () => (
    <svg viewBox="0 0 109 124" fill="currentColor" className="w-5 h-5">
      <path d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5-.3 2.5-9.5 73.3-9.5 73.3L71 124l38.4-8.3s-27-90.2-27.3-91.4c-.2-.8-.6-1.3-1.4-1.5zm-9.2 2.8-8.7 2.7c0-4.8-.7-11.6-3-17.3 3.5.8 5.8 4.7 7.2 8.9.8 2.1 1.2 4.3 1.5 5.7zm-13-1.5c-1-5.3-3.5-10-6-12.5.3-.1.5-.1.8-.1 2.8 0 4.9 3 6.2 6.5.5 1.3.9 2.7 1.2 4.1l-2.2.6zM48.1 9.6c.2 0 .4 0 .6.1-2.8 5.5-5.7 14.1-5.9 19.5l-10.1 3.1c2.1-9 9.3-22.6 15.4-22.7z"/>
      <path d="m74.5 14.9-.1-.1c-.1 0-.1.1-.1.1h.2zm1.3 97.2-.9-.6V49c0-4.1-.9-7-2.6-8.7-1.7-1.7-4.3-2.5-7.8-2.5-2.5 0-4.7.4-6.7 1.1-.8.3-1.3 1.2-1 2.1 1 2.5 1.8 5.2 2.5 8 .2.7.8 1.2 1.6 1.2.2 0 .4 0 .6-.1 1.4-.4 2.8-.7 4-.7 1.5 0 2.5.4 3.1 1.1.7.9 1 2.3 1 4.3v2.7c-1.3-.2-2.5-.3-3.6-.3-3.1 0-5.6.7-7.7 2-2 1.2-3.5 3-4.4 5.1-.9 2.2-1.4 4.7-1.4 7.4 0 4 .9 7.1 2.8 9.3s4.6 3.4 8.1 3.4c2.5 0 4.5-.7 6.3-2 .5-.4 1-.8 1.5-1.3v.7c0 .9.7 1.7 1.7 1.7h5.7c1 0 1.7-.9 1.7-2V65.3c0-5.7-.9-10-2.6-13.2-1.8-3.2-5-4.8-9.6-4.8-3 0-5.6.5-8 1.6-.9.4-1.4 1.4-1.1 2.4l.1.3c.5 1.5.8 3.1 1.1 4.8.2 1.1 1 1.9 2.2 1.9.2 0 .4 0 .7-.1 1.5-.4 2.8-.6 4.1-.6 2.2 0 3.5.6 4.3 1.9.7 1.2 1.1 3.3 1.1 6.3v1.7c-1.5-.2-3-.4-4.5-.4-4.7 0-8.4 1.1-11 3.4-2.7 2.3-4 5.6-4 9.9 0 3.4.9 6 2.9 8s4.6 2.9 8 2.9c2.9 0 5.5-.8 7.6-2.3.5-.4 1-.8 1.4-1.2l.4 1.1c.3.7 1 1.2 1.8 1.2h5.9c.5 0 1-.2 1.4-.6s.5-.9.5-1.4V76.8c0-.6-.3-1.1-.7-1.5l-1.1-1.3c-.3-.4-.8-.6-1.3-.6-.6 0-1.1.3-1.5.8v.1c-.2.3-.8 1-1.6 1.8-.5.5-1 1.1-1.6 1.5-1.2 1-2.8 1.5-4.6 1.5-1.7 0-2.9-.4-3.6-1.3-.8-.9-1.1-2.3-1.1-4.3 0-2.8.6-4.9 1.9-6.5 1.2-1.6 3.2-2.4 6.1-2.4 2.1 0 4.1.4 6.2 1.1.4.1.8.2 1.2.2 1.4 0 2.5-1.1 2.5-2.5 0-.1 0-.2 0-.3-.6-3.7-1.5-7.1-2.8-10.1-.2-.5-.8-.9-1.4-.9-.4 0-.8.1-1.1.3l-.3.3-.3-.4c0 .1.2.3.6.6z"/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 38 57" fill="none" className="w-4 h-5">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE"/>
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83"/>
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262"/>
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/>
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF"/>
    </svg>
  ),
  Linear: () => (
    <svg viewBox="0 0 100 100" fill="currentColor" className="w-5 h-5">
      <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857L39.3342 97.1782c.6889.6889.0915 1.8189-.857 1.5765C17.0426 92.8921 6.96061 80.985 1.22541 61.5228ZM.00189459 46.8891C-.0228664 47.3621.0386047 47.8424.167175 48.3L20.4851 79.5117c.1285.4575.6048.7095 1.0623.581l27.7073-7.4235c.4576-.1285.7095-.6048.5811-1.0624l-7.4235-27.7073c-.1285-.4576-.6049-.7095-1.0624-.5811L12.6426 51.7419c-.4576.1285-.9055-.1233-1.0624-.5809L.170823 22.4541c-.12855-.4577-.01475-.9376.31301-1.3125L26.3789.0028C26.7494-.3426 27.2303-.429 27.6878-.3005l59.3136 15.8944c.4575.1285.7094.6048.5809 1.0624L71.6878 63.3636c-.1285.4576-.6048.7095-1.0623.581l-27.7073-7.4234c-.4576-.1286-.7095-.6049-.5811-1.0625l7.4236-27.7073c.1285-.4576-.1235-.9338-.581-1.0624L21.4734 19.265c-.4576-.1285-.9339.1235-1.0624.581L.0546 74.5601c-.1285.4575.1234.9339.581 1.0623l54.7141 14.6666c.4576.1285.9339-.1235 1.0624-.581l14.6667-54.7142c.1284-.4575-.1235-.9338-.5811-1.0623L16.0136 19.265c-.4576-.1285-.9339.1235-1.0624.581L.167175 64.56c-.1285645.4576.1234605.9339.581085 1.0623l46.430841 12.4438c.4576.1285.9339-.1235 1.0623-.581l12.4439-46.4308c.1285-.4576-.1235-.9339-.581-1.0624L13.673 17.5482c-.4575-.1285-.9338.1235-1.0623.5811L.167175 64.56z"/>
    </svg>
  ),
  Discord: () => (
    <svg viewBox="0 0 71 55" fill="currentColor" className="w-6 h-5">
      <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3## 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1099 30.1693C30.1099 34.1136 27.2680 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.937 34.1136 40.937 30.1693C40.937 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.7018 30.1693C53.7018 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
    </svg>
  ),
};

// Company data for social proof
const companyLogos = [
  { name: "Vercel", Logo: CompanyLogos.Vercel },
  { name: "Stripe", Logo: CompanyLogos.Stripe },
  { name: "Notion", Logo: CompanyLogos.Notion },
  { name: "Slack", Logo: CompanyLogos.Slack },
  { name: "Shopify", Logo: CompanyLogos.Shopify },
  { name: "Figma", Logo: CompanyLogos.Figma },
  { name: "Linear", Logo: CompanyLogos.Linear },
  { name: "Discord", Logo: CompanyLogos.Discord },
];

// Stats data
const stats = [
  { value: 10000, suffix: "+", label: "Happy Users", icon: Users, color: "#6366f1" },
  { value: 2, suffix: "M+", label: "Posts Created", icon: Zap, color: "#ec4899" },
  { value: 98, suffix: "%", label: "Satisfaction", icon: Heart, color: "#10b981" },
  { value: 4.9, suffix: "/5", label: "Average Rating", icon: Star, color: "#f59e0b" },
];

// Animated counter component
function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatValue = (val: number) => {
    if (value < 10) return val.toFixed(1);
    return Math.floor(val);
  };

  return <span>{formatValue(displayValue)}{suffix}</span>;
}

// Video Player Card Component
function VideoCard({ video, onClick }: { video: typeof videoTestimonials[0]; onClick: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const gradientBgs: Record<string, string> = {
    "gradient-1": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    "gradient-2": "linear-gradient(135deg, #042f2e 0%, #0f766e 50%, #14b8a6 100%)",
    "gradient-3": "linear-gradient(135deg, #052e16 0%, #166534 50%, #22c55e 100%)",
  };

  return (
    <motion.div
      className={`relative rounded-[2rem] overflow-hidden cursor-pointer ${video.featured ? 'col-span-2 row-span-2' : ''}`}
      style={{
        background: gradientBgs[video.thumbnail],
        minHeight: video.featured ? "400px" : "200px",
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      layout
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-[60px]"
        style={{ background: `${video.gradient.includes('6366f1') ? '#6366f1' : '#06b6d4'}40` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-[80px]"
        style={{ background: `${video.gradient.includes('ec4899') ? '#ec4899' : '#10b981'}30` }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 lg:p-8">
        {/* Top: Company Badge */}
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${video.gradient} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
              {video.avatar}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{video.name}</div>
              <div className="text-white/60 text-xs">{video.role}</div>
            </div>
          </motion.div>
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-medium">
            {video.duration}
          </div>
        </div>

        {/* Center: Play Button */}
        <div className="flex-1 flex items-center justify-center">
          <motion.button
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsPlaying(!isPlaying);
            }}
          >
            <motion.div
              className={`w-20 h-20 ${video.featured ? 'lg:w-28 lg:h-28' : ''} rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center`}
              animate={{
                boxShadow: [
                  "0 0 40px rgba(255,255,255,0.2)",
                  "0 0 60px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isPlaying ? (
                <Pause className={`w-8 h-8 ${video.featured ? 'lg:w-10 lg:h-10' : ''} text-white`} />
              ) : (
                <Play className={`w-8 h-8 ${video.featured ? 'lg:w-10 lg:h-10' : ''} text-white fill-white ml-1`} />
              )}
            </motion.div>
            {/* Pulsing Rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.button>
        </div>

        {/* Bottom: Metrics & Quote */}
        <div>
          {video.featured && (
            <p className="text-white/80 text-lg mb-6 leading-relaxed line-clamp-2">
              &ldquo;{video.quote}&rdquo;
            </p>
          )}
          <div className="flex items-center gap-4 lg:gap-6">
            {Object.entries(video.metrics).slice(0, video.featured ? 3 : 2).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white">{value}</div>
                <div className="text-[10px] lg:text-xs text-white/60 uppercase tracking-wider">
                  {key === 'engagement' ? 'Engagement' : key === 'timeSaved' ? 'Time Saved' : key === 'contentOutput' ? 'Output' : key === 'reach' ? 'Reach' : key === 'followers' ? 'Followers' : key === 'leads' ? 'Leads' : 'ROI'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      {video.featured && (
        <motion.button
          className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}
    </motion.div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Premium Multi-Layer Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 30%, #fafbff 60%, #f8fafc 100%)",
          }}
        />

        {/* Mesh Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
            transform: "translate(30%, 30%)",
          }}
        />

        {/* Animated Grid Pattern */}
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

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            style={{
              background: i % 2 === 0 ? "#6366f1" : "#ec4899",
              top: `${10 + i * 15}%`,
              left: `${5 + i * 18}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              boxShadow: "0 4px 24px -4px rgba(99, 102, 241, 0.15)",
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MessageCircle className="w-4 h-4 text-[#6366f1]" />
            </motion.div>
            <span className="text-sm font-semibold bg-gradient-to-r from-[#6366f1] to-[#ec4899] bg-clip-text text-transparent">
              Customer Stories
            </span>
            <motion.span
              className="w-2 h-2 rounded-full bg-[#10b981]"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Loved by{" "}
            <span className="relative inline-block">
              <span
                className="relative z-10"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                10,000+ Marketers
              </span>
              <motion.svg
                className="absolute -bottom-3 left-0 w-full"
                height="12"
                viewBox="0 0 350 12"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.5 }}
              >
                <motion.path
                  d="M2 8C80 3 180 3 250 6C300 8 340 5 348 8"
                  stroke="url(#testimonialGradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="testimonialGradient" x1="0" y1="0" x2="350" y2="0">
                    <stop stopColor="#6366f1"/>
                    <stop offset="0.5" stopColor="#8b5cf6"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-[#64748b] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Don&apos;t just take our word for it. See how BrandFlow AI is helping
            creators and businesses transform their social media presence.
          </motion.p>

          {/* Social Proof Trust Banner */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center"
          >
            <motion.div
              className="flex items-center gap-4 px-6 py-4 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)",
                boxShadow: "0 20px 50px -12px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i + 0.5 }}
                    >
                      <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-white font-bold text-lg">4.9</span>
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/20" />

              {/* Trusted By Text */}
              <div className="text-white/80 text-sm font-medium">
                Trusted by <span className="text-white font-bold">300,000+</span> Users
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/20 hidden sm:block" />

              {/* User Avatars */}
              <div className="hidden sm:flex items-center">
                <div className="flex -space-x-2">
                  {[
                    { initials: "SC", gradient: "from-[#6366f1] to-[#8b5cf6]" },
                    { initials: "MJ", gradient: "from-[#ec4899] to-[#f43f5e]" },
                    { initials: "ER", gradient: "from-[#10b981] to-[#059669]" },
                    { initials: "DP", gradient: "from-[#f59e0b] to-[#f97316]" },
                    { initials: "AK", gradient: "from-[#06b6d4] to-[#0ea5e9]" },
                  ].map((user, i) => (
                    <motion.div
                      key={user.initials}
                      className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-white text-xs font-bold border-2 border-[#1e1b4b] shadow-lg`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                    >
                      {user.initials}
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="ml-1 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/80 text-xs font-bold border-2 border-[#1e1b4b]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  +99K
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Video Testimonials Bento Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Featured Video - Large */}
            <div className="lg:col-span-2 lg:row-span-2">
              <VideoCard
                video={videoTestimonials[0]}
                onClick={() => setActiveVideo(videoTestimonials[0].id)}
              />
            </div>

            {/* Smaller Videos */}
            {videoTestimonials.slice(1).map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setActiveVideo(video.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Written Testimonials Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.id}
                className="group relative rounded-[1.75rem] overflow-hidden bg-white cursor-pointer"
                style={{
                  border: activeTestimonial === index
                    ? "2px solid rgba(99, 102, 241, 0.3)"
                    : "1px solid rgba(226, 232, 240, 0.8)",
                  boxShadow: activeTestimonial === index
                    ? "0 20px 50px -12px rgba(99, 102, 241, 0.2)"
                    : "0 4px 20px -4px rgba(0,0,0,0.05)",
                }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 25px 60px -12px rgba(99, 102, 241, 0.25)",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveTestimonial(index)}
              >
                {/* Active Background Glow */}
                {activeTestimonial === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#ec4899]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-6 lg:p-7">
                  {/* Top: Metric & Rating */}
                  <div className="flex items-start justify-between mb-5">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${testimonial.gradient.split(' ')[0].replace('from-[', '').replace(']', '')} 0%, ${testimonial.gradient.split(' ')[1].replace('to-[', '').replace(']', '')} 100%)`,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <TrendingUp className="w-4 h-4" />
                      {testimonial.metric.value} {testimonial.metric.label}
                    </motion.div>

                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-[#0f172a] text-lg leading-relaxed mb-6 min-h-[100px]">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-[#f1f5f9]">
                    <motion.div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {testimonial.avatar}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#0f172a]">{testimonial.author}</span>
                        {testimonial.verified && (
                          <CheckCircle2 className="w-4 h-4 text-[#6366f1]" />
                        )}
                      </div>
                      <div className="text-sm text-[#64748b]">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <motion.div variants={itemVariants} className="flex justify-center gap-2 mb-16">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className="relative h-2.5 rounded-full transition-all duration-300"
              style={{
                width: activeTestimonial === index ? "2rem" : "0.625rem",
                background: activeTestimonial === index
                  ? "linear-gradient(90deg, #6366f1, #ec4899)"
                  : "#e2e8f0",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </motion.div>

        {/* Company Logos */}
        <motion.div variants={itemVariants} className="mb-16">
          <p className="text-center text-sm text-[#94a3b8] font-semibold mb-8 uppercase tracking-widest">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14">
            {companyLogos.map((company, index) => {
              const Logo = company.Logo;
              return (
                <motion.div
                  key={company.name}
                  className="group flex items-center justify-center px-4 py-3 rounded-xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  title={company.name}
                >
                  <div className="text-[#64748b] group-hover:text-[#0f172a] transition-colors duration-300 opacity-60 group-hover:opacity-100">
                    <Logo />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="group relative text-center p-6 lg:p-8 rounded-[1.75rem] bg-white overflow-hidden"
                  style={{
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(99, 102, 241, 0.15)",
                  }}
                >
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 to-[#ec4899]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-7 h-7" style={{ color: stat.color }} />
                    </motion.div>

                    <div
                      className="text-3xl lg:text-4xl font-bold mb-2"
                      style={{
                        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={isInView} />
                    </div>

                    <div className="text-sm text-[#64748b] font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-[#64748b] mb-6 text-lg">
            Join thousands of marketers who&apos;ve transformed their workflow
          </p>
          <motion.a
            href="#pricing"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-lg"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
              boxShadow: "0 12px 40px -10px rgba(99, 102, 241, 0.5)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 50px -10px rgba(99, 102, 241, 0.6)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Start Your Success Story</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.a>
          <p className="mt-4 text-sm text-[#94a3b8]">
            No credit card required • Free 14-day trial
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
