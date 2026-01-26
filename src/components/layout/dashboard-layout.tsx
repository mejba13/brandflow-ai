"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background-subtle)]">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile, shown on desktop */}
      <div
        className={cn(
          "hidden lg:block",
          mobileMenuOpen && "block"
        )}
      >
        <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 lg:hidden transform transition-transform duration-300",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar collapsed={false} onToggle={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main content area */}
      <div
        className={cn(
          "transition-all duration-300 lg:ml-[280px]",
          sidebarCollapsed && "lg:ml-[72px]"
        )}
      >
        <Header
          title={title}
          sidebarCollapsed={sidebarCollapsed}
          onMenuClick={toggleMobileMenu}
        />

        {/* Page content */}
        <main className="pt-16 min-h-screen">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
