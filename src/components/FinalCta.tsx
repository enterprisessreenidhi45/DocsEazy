import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/data/site";
import { WhatsAppButton } from "./ContactButtons";

/** `showEnquiryLink={false}` on the Contact page itself, where that link would point back to the same page. */
export function FinalCta({ showEnquiryLink = true }: { showEnquiryLink?: boolean }) {
  return (
    <section className="bg-amber text-navy">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tell us what you need
          </h2>
          <p className="mt-3 text-lg">We will call you back with the details.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3 font-semibold text-paper transition-colors hover:bg-navy-soft"
          >
            <Phone className="size-5" aria-hidden="true" />
            Call {site.phoneDisplay}
          </a>
          <WhatsAppButton />
          {showEnquiryLink && (
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-lg border-2 border-navy px-5 py-3 font-semibold transition-colors hover:bg-navy hover:text-paper"
            >
              Send an enquiry
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
