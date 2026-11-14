import type { Metadata } from "next";
import { AdminLogin } from "@/components/AdminLogin";

export const metadata: Metadata = {
  title: "Admin sign in",
  // Internal page: keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminLogin />;
}
