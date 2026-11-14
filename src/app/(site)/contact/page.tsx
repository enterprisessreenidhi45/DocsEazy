import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactButtons";
import { EnquiryForm } from "@/components/EnquiryForm";
import { SectionDivider } from "@/components/SectionDivider";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Call, WhatsApp or visit ${site.name} (${site.legalName}) at ${site.addressLines.join(", ")}. ${site.hours}.`,
};

const address = site.addressLines.join(", ");
const mapQuery = `${site.legalName}, ${address}`;
// Plain Google Maps embed, no API key needed. Opens the full map in a new tab from "Get directions".
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

// Only facts already in site.ts, so this page never disagrees with the footer.
const details = [
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: MapPin, label: "Visit", value: address },
  { icon: Clock, label: "Hours", value: site.hours },
];

// Hero visual: the same layered-sheet treatment as the Home and About heroes.
function ContactCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mr-0">
      <div className="absolute inset-0 rotate-3 rounded-xl bg-amber" aria-hidden="true" />
      <div className="absolute inset-0 -rotate-2 rounded-xl bg-paper-dim" aria-hidden="true" />
      <div className="relative rounded-xl bg-white p-7 text-ink shadow-sheet sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">Reach us</p>
        <p className="mt-1 font-display text-2xl font-semibold text-navy">{site.legalName}</p>
        <ul className="mt-6 space-y-4">
          {details.map(({ icon: Icon, label, value, href }) => (
            <li
              key={label}
              className="flex items-start gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-amber">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-wide text-muted uppercase">
                  {label}
                </span>
                {href ? (
                  <a href={href} className="font-medium break-words text-navy hover:text-amber-deep">
                    {value}
                  </a>
                ) : (
                  <span className="font-medium">{value}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-x-clip bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-20 lg:grid-cols-[1fr_28rem] lg:gap-16 lg:pt-20 lg:pb-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
              <Phone className="size-4 text-amber-deep" aria-hidden="true" />
              Contact {site.name}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-navy sm:text-5xl lg:text-6xl">
              Get in touch with us
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Call, WhatsApp or walk in to our desk in Koramangala. Tell us which document you need
              and we will explain what is required and quote the amount before any work begins.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton />
              <WhatsAppButton />
            </div>
            <p className="mt-5 text-sm text-muted">{site.hours}</p>
          </div>
          <ContactCard />
        </div>
      </section>

      <SectionDivider from="bg-paper" to="fill-paper-dim" rotate />

      {/* Enquiry form */}
      <section id="enquiry" className="bg-paper-dim">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">
              Send an enquiry
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Request a call back
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Fill in your details and we will call you back with what is required for your
              document and the amount, before any work begins.
            </p>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <SectionDivider from="bg-paper-dim" to="fill-paper" rotate />

      {/* Visit us */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">Visit us</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Our desk in Koramangala
            </h2>
            <address className="mt-6 space-y-4 text-lg not-italic text-muted">
              <p className="flex gap-3">
                <MapPin className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden="true" />
                <span>
                  {site.legalName}
                  {site.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>
              <p className="flex gap-3">
                <Clock className="mt-1 size-5 shrink-0 text-amber-deep" aria-hidden="true" />
                <span>{site.hours}</span>
              </p>
            </address>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-3 font-semibold text-paper transition-colors hover:bg-navy-soft"
            >
              <MapPin className="size-5" aria-hidden="true" />
              Get directions
            </a>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sheet">
            <iframe
              title={`Map showing ${site.legalName}, ${address}`}
              src={mapEmbedSrc}
              className="block aspect-[4/3] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <SectionDivider from="bg-paper" to="fill-navy-deep" rotate />
    </>
  );
}
