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

// Company logos for social proof
const companyLogos = [
  { name: "TechStart", abbr: "TS", color: "#6366f1" },
  { name: "CreativeHub", abbr: "CH", color: "#ec4899" },
  { name: "GrowthLab", abbr: "GL", color: "#10b981" },
  { name: "Pulse Agency", abbr: "PA", color: "#f59e0b" },
  { name: "Nova Studios", abbr: "NS", color: "#06b6d4" },
  { name: "Bloom", abbr: "BW", color: "#8b5cf6" },
  { name: "ScaleUp", abbr: "SU", color: "#f43f5e" },
  { name: "Venture Co", abbr: "VC", color: "#0ea5e9" },
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
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 lg:gap-8">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${company.color}15 0%, ${company.color}25 100%)`,
                    color: company.color,
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {company.abbr}
                </motion.div>
                <span className="text-[#64748b] font-medium group-hover:text-[#0f172a] transition-colors">
                  {company.name}
                </span>
              </motion.div>
            ))}
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
