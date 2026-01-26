"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Check,
  Settings,
  Camera,
  Mail,
  Building2,
  Crown,
  Sparkles,
  Key,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Edit3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { seedCurrentUser, seedTeamMembers, seedPricingPlans, seedDashboardStats } from "@/lib/seed-data";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

const settingsSections: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: User, description: "Personal info", color: "#6366f1" },
  { id: "notifications", label: "Notifications", icon: Bell, description: "Alert settings", color: "#f59e0b" },
  { id: "billing", label: "Billing & Plans", icon: CreditCard, description: "Subscription", color: "#10b981" },
  { id: "team", label: "Team", icon: Users, description: "Manage members", color: "#ec4899" },
  { id: "security", label: "Security", icon: Shield, description: "Account safety", color: "#8b5cf6" },
  { id: "integrations", label: "Integrations", icon: Zap, description: "Connect apps", color: "#06b6d4" },
];

const roleColors: Record<string, { bg: string; text: string; border: string }> = {
  owner: { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8", border: "rgba(99, 102, 241, 0.3)" },
  admin: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24", border: "rgba(245, 158, 11, 0.3)" },
  editor: { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399", border: "rgba(16, 185, 129, 0.3)" },
  viewer: { bg: "rgba(148, 163, 184, 0.15)", text: "#94a3b8", border: "rgba(148, 163, 184, 0.3)" },
};

const integrations = [
  { name: "Zapier", description: "Automate workflows with 5,000+ apps", connected: true, icon: "⚡", color: "#ff4a00" },
  { name: "Slack", description: "Get BrandFlow AI notifications in Slack", connected: true, icon: "💬", color: "#4a154b" },
  { name: "Google Analytics", description: "Track content performance with GA4", connected: false, icon: "📊", color: "#e37400" },
  { name: "Notion", description: "Sync content ideas from Notion", connected: false, icon: "📝", color: "#000000" },
  { name: "Canva", description: "Import designs directly from Canva", connected: false, icon: "🎨", color: "#00c4cc" },
];

const notifications = [
  { label: "Post published", description: "When your scheduled posts go live", default: true, type: "success" },
  { label: "Post failed", description: "When a post fails to publish", default: true, type: "error" },
  { label: "New comments", description: "When someone comments on your posts", default: true, type: "info" },
  { label: "Weekly reports", description: "Weekly analytics summary from BrandFlow AI", default: false, type: "info" },
  { label: "Product updates", description: "New BrandFlow AI features and improvements", default: false, type: "info" },
];

// Get current plan from seed data
const currentPlan = seedPricingPlans.find((p) => p.id === `plan_${seedCurrentUser.plan}`) || seedPricingPlans[1];
const creditsRemaining = seedDashboardStats.aiCreditsTotal - seedDashboardStats.aiCreditsUsed;
const creditsPercent = (creditsRemaining / seedDashboardStats.aiCreditsTotal) * 100;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState("profile");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          animate={mounted ? { scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, transparent 70%)",
            transform: "translate(20%, -30%)",
          }}
        />
      </div>

      <motion.div
        className="space-y-6 pb-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Premium Header Section */}
        <motion.section
          className="relative overflow-hidden rounded-2xl"
          variants={itemVariants}
        >
          {/* Dark Gradient Background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
            }}
          />

          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
              animate={mounted ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 60%)",
                filter: "blur(30px)",
              }}
              animate={mounted ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
                    boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                  }}
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Settings className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                  <p className="text-white/50 mt-1">Manage your account and preferences</p>
                </div>
              </div>

              {/* Quick Stats */}
              <motion.div
                className="hidden md:flex items-center gap-6 px-6 py-4 rounded-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{seedTeamMembers.length}</p>
                  <p className="text-xs text-white/40">Team Members</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-400">{creditsRemaining.toLocaleString()}</p>
                  <p className="text-xs text-white/40">AI Credits</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-400 capitalize">{currentPlan.name}</p>
                  <p className="text-xs text-white/40">Current Plan</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Navigation Sidebar */}
          <motion.aside
            className="col-span-12 lg:col-span-3"
            variants={itemVariants}
          >
            <div
              className="sticky top-24 rounded-2xl overflow-hidden"
              style={{
                background: "white",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
              }}
            >
              <div className="p-4">
                <nav className="space-y-1">
                  {settingsSections.map((section, index) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;

                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all relative overflow-hidden",
                          isActive
                            ? "text-white"
                            : "text-slate-600 hover:bg-slate-50"
                        )}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={!isActive ? { x: 4 } : {}}
                      >
                        {/* Active Background */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-xl"
                            style={{
                              background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}cc 100%)`,
                            }}
                            layoutId="activeSection"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}

                        <motion.div
                          className={cn(
                            "relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                            isActive ? "bg-white/20" : ""
                          )}
                          style={!isActive ? {
                            background: `linear-gradient(135deg, ${section.color}15 0%, ${section.color}25 100%)`,
                          } : {}}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: isActive ? "white" : section.color }}
                          />
                        </motion.div>
                        <div className="relative z-10 flex-1">
                          <span className="font-semibold text-sm">{section.label}</span>
                          <p className={cn(
                            "text-[10px]",
                            isActive ? "text-white/70" : "text-slate-400"
                          )}>
                            {section.description}
                          </p>
                        </div>
                        {isActive && (
                          <ChevronRight className="relative z-10 w-4 h-4 text-white/70" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Pro Badge */}
              <div
                className="mx-4 mb-4 p-4 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%)",
                  border: "1px solid rgba(99, 102, 241, 0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-slate-700 uppercase">Pro Plan</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  Unlock unlimited AI credits and premium features.
                </p>
                <motion.button
                  className="w-full py-2 rounded-lg text-xs font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Upgrade Now
                </motion.button>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <motion.main
            className="col-span-12 lg:col-span-9 space-y-6"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              {/* Profile Section */}
              {activeSection === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Profile Card */}
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
                    }}
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        className="absolute top-0 right-0 w-80 h-80 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 60%)",
                          filter: "blur(60px)",
                        }}
                        animate={mounted ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 6, repeat: Infinity }}
                      />
                    </div>

                    <div className="relative z-10 p-8">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Avatar */}
                        <motion.div
                          className="relative group"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div
                            className="w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-bold text-white"
                            style={{
                              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                              boxShadow: "0 8px 32px -8px rgba(99, 102, 241, 0.5)",
                            }}
                          >
                            {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
                          </div>
                          <motion.button
                            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Camera className="w-5 h-5 text-slate-700" />
                          </motion.button>
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-white">
                              {seedCurrentUser.firstName} {seedCurrentUser.lastName}
                            </h2>
                            <span
                              className="px-2.5 py-1 rounded-lg text-[10px] font-bold"
                              style={{
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                                color: "#4ade80",
                              }}
                            >
                              VERIFIED
                            </span>
                          </div>
                          <p className="text-white/50 mb-4">{seedCurrentUser.email}</p>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
                              <Building2 className="w-4 h-4 text-white/50" />
                              <span className="text-sm text-white/80">{seedCurrentUser.company}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10">
                              <Crown className="w-4 h-4 text-amber-400" />
                              <span className="text-sm text-white/80 capitalize">{currentPlan.name} Plan</span>
                            </div>
                          </div>
                        </div>

                        {/* Edit Button */}
                        <motion.button
                          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Edit3 className="w-4 h-4 inline mr-2" />
                          Edit Profile
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: "First Name", value: seedCurrentUser.firstName, icon: User },
                        { label: "Last Name", value: seedCurrentUser.lastName, icon: User },
                        { label: "Email Address", value: seedCurrentUser.email, icon: Mail },
                        { label: "Company", value: seedCurrentUser.company, icon: Building2 },
                      ].map((field, index) => (
                        <motion.div
                          key={field.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {field.label}
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                              <field.icon className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                              type="text"
                              defaultValue={field.value}
                              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex justify-end mt-6 pt-6 border-t border-slate-100">
                      <motion.button
                        className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                          boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                        }}
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 24px -4px rgba(99, 102, 241, 0.6)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="px-6 py-5"
                      style={{
                        background: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.02) 100%)",
                        borderBottom: "1px solid rgba(245, 158, 11, 0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                          }}
                        >
                          <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Notification Preferences</h3>
                          <p className="text-sm text-slate-500">Choose how you want to be notified</p>
                        </div>
                      </div>
                    </div>

                    {/* Notifications List */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center",
                                  notification.type === "success" && "bg-emerald-100",
                                  notification.type === "error" && "bg-red-100",
                                  notification.type === "info" && "bg-indigo-100"
                                )}
                              >
                                {notification.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                                {notification.type === "error" && <AlertTriangle className="w-5 h-5 text-red-600" />}
                                {notification.type === "info" && <Bell className="w-5 h-5 text-indigo-600" />}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{notification.label}</p>
                                <p className="text-sm text-slate-500">{notification.description}</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                defaultChecked={notification.default}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all after:shadow-sm peer-checked:bg-indigo-500"></div>
                            </label>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Billing Section */}
              {activeSection === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Current Plan Card */}
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{
                      background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
                    }}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <motion.div
                        className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
                        style={{
                          background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 60%)",
                          filter: "blur(60px)",
                        }}
                        animate={mounted ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 6, repeat: Infinity }}
                      />
                    </div>

                    <div className="relative z-10 p-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <span
                              className="px-3 py-1.5 rounded-lg text-xs font-bold"
                              style={{
                                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.15) 100%)",
                                border: "1px solid rgba(16, 185, 129, 0.3)",
                                color: "#4ade80",
                              }}
                            >
                              CURRENT PLAN
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold text-white mb-2 capitalize">{currentPlan.name}</h2>
                          <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-4xl font-bold text-white">${currentPlan.price}</span>
                            <span className="text-white/50">/{currentPlan.interval}</span>
                          </div>
                          <p className="text-white/60 max-w-md">{currentPlan.description}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-white/40 text-sm mb-2">AI Credits Remaining</p>
                          <p className="text-4xl font-bold text-emerald-400">{creditsRemaining.toLocaleString()}</p>
                          <div className="mt-3 w-40 h-2 rounded-full bg-white/10 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${creditsPercent}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-8 pt-8 border-t border-white/10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {currentPlan.features.slice(0, 4).map((feature, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Check className="w-3 h-3 text-emerald-400" />
                              </div>
                              <span className="text-sm text-white/80">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-8 flex gap-3">
                        <motion.button
                          className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                          style={{
                            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                            boxShadow: "0 4px 16px -4px rgba(99, 102, 241, 0.5)",
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          Upgrade Plan
                        </motion.button>
                        <motion.button
                          className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Manage Subscription
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-slate-500">Expires 12/2025</p>
                        </div>
                      </div>
                      <motion.button
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Update
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Team Section */}
              {activeSection === "team" && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="px-6 py-5 flex items-center justify-between"
                      style={{
                        background: "linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(244, 114, 182, 0.02) 100%)",
                        borderBottom: "1px solid rgba(236, 72, 153, 0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                          }}
                        >
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Team Members</h3>
                          <p className="text-sm text-slate-500">{seedTeamMembers.length} of {currentPlan.limits.teamMembers} seats used</p>
                        </div>
                      </div>
                      <motion.button
                        className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Invite Member
                      </motion.button>
                    </div>

                    {/* Team List */}
                    <div className="p-6 space-y-4">
                      {seedTeamMembers.map((member, index) => {
                        const roleStyle = roleColors[member.role];
                        return (
                          <motion.div
                            key={member.id}
                            className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
                                style={{
                                  background: `linear-gradient(135deg, ${
                                    member.role === "owner" ? "#6366f1" :
                                    member.role === "admin" ? "#f59e0b" :
                                    member.role === "editor" ? "#10b981" : "#64748b"
                                  } 0%, ${
                                    member.role === "owner" ? "#8b5cf6" :
                                    member.role === "admin" ? "#fbbf24" :
                                    member.role === "editor" ? "#34d399" : "#94a3b8"
                                  } 100%)`,
                                }}
                              >
                                {member.firstName[0]}{member.lastName[0]}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900">{member.firstName} {member.lastName}</p>
                                <p className="text-sm text-slate-500">{member.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className="px-3 py-1.5 rounded-lg text-xs font-bold capitalize"
                                style={{
                                  background: roleStyle.bg,
                                  border: `1px solid ${roleStyle.border}`,
                                  color: roleStyle.text,
                                }}
                              >
                                {member.role}
                              </span>
                              {member.role !== "owner" && (
                                <motion.button
                                  className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-slate-100 transition-all"
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <Edit3 className="w-4 h-4 text-slate-400" />
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="px-6 py-5"
                      style={{
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(167, 139, 250, 0.02) 100%)",
                        borderBottom: "1px solid rgba(139, 92, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                          }}
                        >
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Security Settings</h3>
                          <p className="text-sm text-slate-500">Protect your BrandFlow AI account</p>
                        </div>
                      </div>
                    </div>

                    {/* Security Options */}
                    <div className="p-6 space-y-4">
                      {[
                        { icon: Key, label: "Password", description: "Last changed 30 days ago", action: "Change Password", status: "secure" },
                        { icon: Smartphone, label: "Two-Factor Authentication", description: "Add an extra layer of security", action: "Enable 2FA", status: "warning" },
                        { icon: Monitor, label: "Active Sessions", description: "2 devices currently logged in", action: "View All", status: "info" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          className="flex items-center justify-between p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                item.status === "secure" && "bg-emerald-100",
                                item.status === "warning" && "bg-amber-100",
                                item.status === "info" && "bg-indigo-100"
                              )}
                            >
                              <item.icon
                                className={cn(
                                  "w-6 h-6",
                                  item.status === "secure" && "text-emerald-600",
                                  item.status === "warning" && "text-amber-600",
                                  item.status === "info" && "text-indigo-600"
                                )}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{item.label}</p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                          </div>
                          <motion.button
                            className={cn(
                              "px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                              item.status === "warning"
                                ? "bg-amber-500 text-white hover:bg-amber-600"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            )}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {item.action}
                            <ChevronRight className="w-4 h-4 inline ml-1" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Integrations Section */}
              {activeSection === "integrations" && (
                <motion.div
                  key="integrations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      background: "white",
                      border: "1px solid rgba(226, 232, 240, 0.8)",
                      boxShadow: "0 4px 20px -4px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Header */}
                    <div
                      className="px-6 py-5"
                      style={{
                        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(34, 211, 238, 0.02) 100%)",
                        borderBottom: "1px solid rgba(6, 182, 212, 0.1)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
                          }}
                        >
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">Integrations</h3>
                          <p className="text-sm text-slate-500">Connect BrandFlow AI with your favorite tools</p>
                        </div>
                      </div>
                    </div>

                    {/* Integrations Grid */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {integrations.map((integration, index) => (
                          <motion.div
                            key={integration.name}
                            className="relative p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                  style={{
                                    background: `${integration.color}15`,
                                  }}
                                >
                                  {integration.icon}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900">{integration.name}</p>
                                  <p className="text-xs text-slate-500">{integration.description}</p>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              {integration.connected ? (
                                <>
                                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Connected
                                  </span>
                                  <motion.button
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-all"
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    Disconnect
                                  </motion.button>
                                </>
                              ) : (
                                <>
                                  <span className="text-xs text-slate-400">Not connected</span>
                                  <motion.button
                                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                                    style={{
                                      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                                    }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    Connect
                                  </motion.button>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
}
