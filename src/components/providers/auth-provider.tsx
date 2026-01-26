"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

// Check if Clerk is configured
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey.startsWith("pk_");

export function AuthProvider({ children }: AuthProviderProps) {
  // If Clerk is not configured, render children without auth
  if (!isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#0468D7",
          colorTextOnPrimaryBackground: "#FFFFFF",
          colorBackground: "#FFFFFF",
          colorInputBackground: "#F8F9FA",
          colorInputText: "#4A4A4A",
          borderRadius: "16px",
          fontFamily: "var(--font-body)",
        },
        elements: {
          formButtonPrimary:
            "bg-[#0468D7] hover:bg-[#0356B3] text-white font-medium py-3 px-6 rounded-[16px]",
          card: "shadow-lg rounded-[24px]",
          headerTitle: "font-heading font-semibold",
          headerSubtitle: "text-[#6B7280]",
          socialButtonsBlockButton:
            "border border-[#E5E7EB] hover:bg-[#F8F9FA] rounded-[16px]",
          formFieldInput:
            "border border-[#E5E7EB] rounded-[16px] focus:border-[#0468D7] focus:ring-[#0468D7]",
          footerActionLink: "text-[#0468D7] hover:text-[#0356B3]",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
