import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { CallButton, WhatsAppButton } from "@/components/ContactButtons";
import { FinalCta } from "@/components/FinalCta";
import { SectionDivider } from "@/components/SectionDivider";
import { TrustStatsRow } from "@/components/TrustStatsRow";
import {
  aboutIntro,
  commitment,
  credentials,
  founder,
  missionVision,
  values,
} from "@/data/about";
import { serviceHref, services } from "@/data/services";
import { buildYear, site, stats, whatsappHref } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is the online face of ${site.legalName}, a documentation agency in Koramangala, Bengaluru helping people with certificates, registration, notary and more since ${site.foundedYear}.`,
};

// The round "since 1997" seal, echoing the one in the home hero but with its own gradient id.
function Stamp() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute right-3 bottom-3 hidden size-24 -rotate-12 text-amber-deep sm:block"
    >
      <defs>
        <path id="about-stamp-ring" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="56" strokeWidth="3" />
        <circle cx="60" cy="60" r="33" strokeWidth="1.5" />
      </g>
      <text fill="currentColor" fontSize="14" fontWeight="700" letterSpacing="3.9">
        <textPath href="#about-stamp-ring">DOCSEAZY • BENGALURU •</textPath>
      </text>
      <text x="60" y="56" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="600">
        SINCE
      </text>
      <text x="60" y="74" textAnchor="middle" fill="currentColor" fontSize="18" fontWeight="800">
        {site.foundedYear}
      </text>
    </svg>
  );
}

// The identity card in the hero — the brand's own visual in place of a stock photo.
function AboutCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mr-0">
      <div className="absolute inset-0 rotate-3 rounded-xl bg-amber" aria-hidden="true" />
      <div className="absolute inset-0 -rotate-2 rounded-xl bg-paper-dim" aria-hidden="true" />
      <div className="relative rounded-xl bg-white p-7 text-ink shadow-sheet sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">
          Established {site.foundedYear}
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-navy">{site.legalName}</p>
        <ul className="mt-6 space-y-4">
          {credentials.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-amber">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="font-medium">{text}</span>
            </li>
          ))}
        </ul>
        <Stamp />
      </div>
    </div>
  );
}

// A navy seal with initials — an honest stand-in when no founder photo has been supplied.
function Medallion({
  initials,
  title,
  subtitle,
}: {
  initials: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="on-navy ledger relative mx-auto grid w-full max-w-sm place-items-center overflow-hidden rounded-2xl bg-navy p-10 text-center text-paper shadow-sheet">
      <div className="grid size-24 place-items-center rounded-full border-2 border-amber font-display text-3xl font-semibold text-amber">
        {initials}
      </div>
      <p className="mt-5 font-display text-xl font-semibold">{title}</p>
      <p className="mt-1 text-sm text-paper/70">{subtitle}</p>
    </div>
  );
}

// A small scattered dot pattern, purely decorative, echoing the stamp/ledger motif used
// elsewhere on the site rather than a generic SaaS grid.
function DotGrid() {
  const dots = Array.from({ length: 5 }, (_, row) => row).flatMap((row) =>
    Array.from({ length: 6 }, (_, col) => ({ row, col })),
  );
  return (
    <svg
      viewBox="0 0 92 72"
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 -right-6 hidden size-24 text-amber-deep/40 sm:block"
    >
      {dots.map(({ row, col }) => (
        <circle key={`${row}-${col}`} cx={col * 17 + 6} cy={row * 16 + 6} r="2.3" fill="currentColor" />
      ))}
    </svg>
  );
}

// The hero's right-hand visual when a real founder photo has been supplied: the portrait
// floats in front of soft offset colour panels (rather than being boxed into a full white
// card), with a floating nameplate overlapping its lower edge — closer to a true cutout
// than the previous framed-ID-card treatment, without needing background removal.
function FounderPortrait({ name, role, photo }: { name: string; role: string; photo: string }) {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:mr-0">
      <DotGrid />
      <div
        className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-amber-light to-amber"
        aria-hidden="true"
      />
      <div
        className="absolute -inset-3 -rotate-2 rounded-[2.5rem] bg-paper-dim"
        aria-hidden="true"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo}
        alt={name}
        className="relative aspect-[4/5] w-full rounded-[2rem] object-cover object-top shadow-sheet"
      />
      <div className="relative z-10 mx-auto -mt-7 w-[88%] rounded-2xl bg-white px-5 py-3 text-center shadow-sheet">
        <p className="font-display text-lg font-semibold text-navy">{name}</p>
        <p className="text-sm font-semibold text-amber-deep">
          {role}, {site.legalName}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const storyLines = founder ? founder.bio : commitment;
  const storyHeading = founder ? `Meet ${founder.name}` : "The people behind the desk";

  return (
    <>
      {/* Hero */}
      <section className="overflow-x-clip bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-24 lg:grid-cols-[1fr_28rem] lg:gap-16 lg:pt-20 lg:pb-32">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-semibold text-navy shadow-sm">
              <MapPin className="size-4 text-amber-deep" aria-hidden="true" />
              About {site.name}
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-navy sm:text-5xl lg:text-6xl">
              One desk for all your paperwork
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted">
              {aboutIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton />
              <WhatsAppButton />
            </div>
            <p className="mt-5 text-sm text-muted">{site.hours}</p>
          </div>
          {founder?.photo ? (
            <FounderPortrait name={founder.name} role={founder.role} photo={founder.photo} />
          ) : (
            <AboutCard />
          )}
        </div>
      </section>

      {/* Company highlights: a floating card bridging the hero and the next section */}
      <div className="relative z-10 mx-auto -mt-16 max-w-6xl px-5 sm:-mt-20">
        <div className="rounded-2xl bg-white shadow-sheet ring-1 ring-line">
          <TrustStatsRow builtInYear={buildYear} foundedYear={site.foundedYear} stats={stats} />
        </div>
      </div>

      {/* Mission & vision */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-20 sm:pt-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">
            What drives us
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Mission &amp; vision
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
          {missionVision.map(({ icon: Icon, label, text }, index) => (
            <Fragment key={label}>
              {index === 1 && (
                <div
                  aria-hidden="true"
                  className="hidden h-44 w-px self-center bg-gradient-to-b from-transparent via-line to-transparent md:block"
                />
              )}
              <div className="rounded-2xl border border-line bg-white p-8 shadow-sheet">
                <span className="grid size-11 place-items-center rounded-full bg-navy text-amber">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span
                  aria-hidden="true"
                  className="mt-5 block h-0.5 w-10 rounded-full bg-gradient-to-r from-amber to-transparent"
                />
                <p className="mt-3 text-sm font-semibold tracking-wide text-amber-deep uppercase">
                  {label}
                </p>
                <p className="mt-2 font-display text-2xl leading-snug font-semibold text-navy text-balance">
                  {text}
                </p>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      <SectionDivider from="bg-paper" to="fill-navy" rotate />

      {/* Why people choose us */}
      <section className="on-navy ledger bg-navy text-paper">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why people choose us
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t-2 border-amber pt-5">
                <Icon className="size-8 text-amber" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-paper/80">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider from="bg-navy" to="fill-paper" rotate />

      {/* Our story / meet the founder */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        {founder ? (
          // The portrait already appears in the hero, so this stays text-only and centred
          // rather than repeating the photo.
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">
              Our story
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              {storyHeading}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              {storyLines.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href={whatsappHref("Hello DocsEazy, I would like to know more about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center justify-center gap-1.5 font-semibold text-amber-deep hover:text-navy"
            >
              Talk to our team
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">
                Our story
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                {storyHeading}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                {storyLines.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a
                href={whatsappHref("Hello DocsEazy, I would like to know more about your services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-1.5 font-semibold text-amber-deep hover:text-navy"
              >
                Talk to our team
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
            <Medallion
              initials="SE"
              title={site.legalName}
              subtitle={`Koramangala, Bengaluru · since ${site.foundedYear}`}
            />
          </div>
        )}
      </section>

      <SectionDivider from="bg-paper" to="fill-paper-dim" rotate />

      {/* What we help with */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
                What we help with
              </h2>
              <p className="mt-3 max-w-xl text-lg text-muted">
                From certificates to registration and notary work — all from one service provider.
              </p>
            </div>
            <Link
              href="/services/"
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-amber-deep hover:text-navy"
            >
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={serviceHref(service)}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-navy transition-colors hover:border-amber"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider from="bg-paper-dim" to="fill-amber" rotate />

      <FinalCta />

      <SectionDivider from="bg-amber" to="fill-navy-deep" rotate />
    </>
  );
}
