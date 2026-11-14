import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DocsEazy | Certificates, Notary & Property Registration in Bengaluru",
    template: "%s | DocsEazy, Bengaluru",
  },
  description:
    "Marriage, birth and death certificates, notary, property registration and more, handled through one desk in Koramangala, Bengaluru since 1997. Call or WhatsApp us.",
};

// Root layout only sets up the document. Site chrome (header/footer) lives in the (site)
// group layout so the admin area can opt out of it entirely.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
