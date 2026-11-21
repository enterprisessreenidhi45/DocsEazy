import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactButtons";
import { FinalCta } from "@/components/FinalCta";
import { SectionDivider } from "@/components/SectionDivider";
import { services } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Every document ${site.name} (${site.legalName}) helps with — certificates, registration, notary, attestation and more — each with its own enquiry.`,
};

// Every service gets the same folder-tab card as the home page's featured ones, with its
// own "Contact us" link at the bottom rather than one shared form for all of them.
export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-x-clip bg-paper">
        <div className="mx-auto max-w-3xl px-5 pt-14 pb-16 text-center lg:pt-20 lg:pb-20">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
            <FileText className="size-4 text-amber-deep" aria-hidden="true" />
            {site.name} services
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-navy sm:text-5xl lg:text-6xl">
            Every document, one desk
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Tell us which document you need and we will explain what is required and quote the
            amount before any work begins.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:flex-wrap">
            <CallButton />
            <WhatsAppButton />
          </div>
        </div>
      </section>

      <SectionDivider from="bg-paper" to="fill-paper-dim" rotate />

      {/* All services */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <li
                  key={service.slug}
                  id={service.slug}
                  className="file-card relative flex h-full flex-col rounded-lg rounded-tl-none border border-line bg-white p-6"
                >
                  <Icon className="size-8 text-navy" strokeWidth={1.6} aria-hidden="true" />
                  <h2 className="mt-4 font-display text-xl font-semibold text-navy">{service.name}</h2>
                  <p className="mt-1.5 flex-1 text-muted">{service.summary}</p>
                  <Link
                    href="/contact/#enquiry"
                    className="group mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-amber-deep hover:text-navy"
                  >
                    Contact us for this document
                    <ArrowRight
                      className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <SectionDivider from="bg-paper-dim" to="fill-amber" rotate />

      <FinalCta />

      <SectionDivider from="bg-amber" to="fill-navy-deep" rotate />
    </>
  );
}
