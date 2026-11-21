import type { Metadata } from "next";
import Link from "next/link";
import { CallButton, WhatsAppButton } from "@/components/ContactButtons";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";

export const metadata: Metadata = { title: "Page not found" };

// The global 404 renders under the bare root layout (the site chrome lives in the (site)
// group, which an unmatched route is not part of), so it brings its own header and footer.
export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-2xl px-5 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold text-navy">
            We could not find that page
          </h1>
          <p className="mt-4 text-lg text-muted">
            Go back to the{" "}
            <Link href="/" className="font-semibold text-amber-deep underline">
              home page
            </Link>
            , or get in touch and we will help you directly.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <CallButton />
            <WhatsAppButton />
          </div>
        </section>
      </main>
      <Footer />
      <MobileActionBar />
    </>
  );
}
