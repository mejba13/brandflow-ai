"use client";

import * as React from "react";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { seedCurrentUser, seedTeamMembers, seedPricingPlans } from "@/lib/seed-data";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ElementType;
}

const settingsSections: SettingsSection[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing & Plans", icon: CreditCard },
  { id: "team", label: "Team", icon: Users },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Zap },
];

const roleColors = {
  owner: "bg-[var(--color-primary)]/10 text-[var(--color-primary)]",
  admin: "bg-[var(--color-warning)]/10 text-[var(--color-warning)]",
  editor: "bg-[var(--color-success)]/10 text-[var(--color-success)]",
  viewer: "bg-[var(--color-background-muted)] text-[var(--color-text-secondary)]",
};

// Get current plan from seed data
const currentPlan = seedPricingPlans.find((p) => p.id === `plan_${seedCurrentUser.plan}`) || seedPricingPlans[1];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = React.useState("profile");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
          Settings
        </h1>
        <p className="text-[var(--color-text-muted)] mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <Card className="lg:col-span-1 h-fit">
          <CardContent className="p-2">
            <nav className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-lg)] text-left transition-colors",
                      isActive
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-muted)]"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeSection === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-2xl font-bold text-[var(--color-primary)]">
                    {seedCurrentUser.firstName[0]}{seedCurrentUser.lastName[0]}
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue={seedCurrentUser.firstName} />
                  <Input label="Last Name" defaultValue={seedCurrentUser.lastName} />
                  <Input label="Email" type="email" defaultValue={seedCurrentUser.email} />
                  <Input label="Company" defaultValue={seedCurrentUser.company} />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Post published", description: "When your scheduled posts go live", default: true },
                    { label: "Post failed", description: "When a post fails to publish", default: true },
                    { label: "New comments", description: "When someone comments on your posts", default: true },
                    { label: "Weekly reports", description: "Weekly analytics summary from BrandFlow AI", default: false },
                    { label: "Product updates", description: "New BrandFlow AI features and improvements", default: false },
                  ].map((notification, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)] last:border-0"
                    >
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {notification.label}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {notification.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={notification.default}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[var(--color-background-muted)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "billing" && (
            <>
              <Card>
                <CardHeader className="flex-row items-center justify-between">
                  <CardTitle>Current Plan</CardTitle>
                  <Badge variant="default" className="capitalize">{currentPlan.name}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                      ${currentPlan.price}
                    </span>
                    <span className="text-[var(--color-text-muted)]">/{currentPlan.interval}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    {currentPlan.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[var(--color-success)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {seedCurrentUser.plan !== "business" && (
                      <Button>Upgrade to {seedCurrentUser.plan === "starter" ? "Pro" : "Business"}</Button>
                    )}
                    <Button variant="ghost">Manage Subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-background-muted)] flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[var(--color-text-secondary)]" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)]">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Update
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeSection === "team" && (
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Team Members</CardTitle>
                <Button size="sm">Invite Member</Button>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Manage team access for {seedCurrentUser.company}
                </p>
                <div className="space-y-4">
                  {seedTeamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-sm font-medium text-[var(--color-primary)]">
                          {member.firstName[0]}{member.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-sm text-[var(--color-text-muted)]">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium capitalize",
                            roleColors[member.role]
                          )}
                        >
                          {member.role}
                        </span>
                        {member.role !== "owner" && (
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-[var(--radius-lg)] bg-[var(--color-background-subtle)]">
                  <p className="text-sm text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text-primary)]">{seedTeamMembers.length}</span> of{" "}
                    <span className="font-medium text-[var(--color-text-primary)]">{currentPlan.limits.teamMembers}</span> team seats used
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)]">
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">Password</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Last changed 30 days ago
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Change Password
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[var(--color-border-light)]">
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Add an extra layer of security to your BrandFlow AI account
                    </p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Enable 2FA
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">Active Sessions</p>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      Manage devices logged into your account
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "integrations" && (
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">
                  Connect BrandFlow AI with your favorite tools
                </p>
                <div className="space-y-4">
                  {[
                    {
                      name: "Zapier",
                      description: "Automate workflows with 5,000+ apps",
                      connected: true,
                    },
                    {
                      name: "Slack",
                      description: "Get BrandFlow AI notifications in Slack",
                      connected: true,
                    },
                    {
                      name: "Google Analytics",
                      description: "Track content performance with GA4",
                      connected: false,
                    },
                    {
                      name: "Notion",
                      description: "Sync content ideas from Notion",
                      connected: false,
                    },
                    {
                      name: "Canva",
                      description: "Import designs directly from Canva",
                      connected: false,
                    },
                  ].map((integration, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-[var(--radius-xl)] border border-[var(--color-border-light)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-background-muted)] flex items-center justify-center">
                          <Zap className="w-5 h-5 text-[var(--color-text-secondary)]" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">
                            {integration.name}
                          </p>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <Button variant="ghost" size="sm">
                          Disconnect
                        </Button>
                      ) : (
                        <Button variant="secondary" size="sm">
                          Connect
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
