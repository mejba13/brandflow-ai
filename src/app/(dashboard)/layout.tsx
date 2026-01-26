import { DashboardLayout } from "@/components/layout";

// Force dynamic rendering for all dashboard pages (requires auth)
export const dynamic = "force-dynamic";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
