import type { Metadata } from "next";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { SectionDivider } from "@/components/SectionDivider";
import { privacyIntro, privacySections, privacyUpdated } from "@/data/privacy";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `How ${site.name} (${site.legalName}) collects, uses and protects the details you share through this website, and your rights under India's DPDP Act, 2023.`,
};

const contact = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref },
  { icon: MapPin, label: "Write or visit", value: `${site.legalName}, ${site.addressLines.join(", ")}` },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 pt-14 pb-16 lg:pt-20 lg:pb-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
            <ShieldCheck className="size-4 text-amber-deep" aria-hidden="true" />
            Your privacy
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-navy sm:text-5xl">
            Privacy notice
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            {privacyIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-amber-deep">Last updated {privacyUpdated}</p>
        </div>
      </section>

      <SectionDivider from="bg-paper" to="fill-paper-dim" rotate />

      {/* Notice */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="space-y-12">
            {privacySections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
                <h2
                  id={`${section.id}-heading`}
                  className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-muted">
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.points && (
                    <ul className="space-y-3">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span
                            className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-amber-deep"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.after?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section
              id="contact-us"
              aria-labelledby="contact-us-heading"
              className="rounded-2xl border border-line bg-white p-7 shadow-sheet sm:p-8"
            >
              <h2
                id="contact-us-heading"
                className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-3xl"
              >
                Contact us about your data
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                For questions, requests or complaints about your personal data, reach us here.
              </p>
              <ul className="mt-6 space-y-4">
                {contact.map(({ icon: Icon, label, value, href }) => (
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
                        <a
                          href={href}
                          className="-my-1 inline-block py-1 font-medium break-words text-navy hover:text-amber-deep"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="font-medium text-ink">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <SectionDivider from="bg-paper-dim" to="fill-navy-deep" rotate />
    </>
  );
}
