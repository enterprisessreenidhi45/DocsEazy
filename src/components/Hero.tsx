import { Check, MapPin } from "lucide-react";
import { reasons, site } from "@/data/site";
import { CallButton, WhatsAppButton } from "./ContactButtons";

function Stamp() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute right-3 bottom-3 hidden size-28 -rotate-12 text-amber-deep sm:block"
    >
      <defs>
        <path id="stamp-ring" d="M60 60m-43 0a43 43 0 1 1 86 0a43 43 0 1 1-86 0" />
      </defs>
      <g fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="56" strokeWidth="3" />
        <circle cx="60" cy="60" r="33" strokeWidth="1.5" />
      </g>
      <text fill="currentColor" fontSize="14" fontWeight="700" letterSpacing="3.9">
        <textPath href="#stamp-ring">DOCSEAZY • BENGALURU •</textPath>
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

function ReasonsSheet() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mr-0">
      <div className="absolute inset-0 rotate-3 rounded-xl bg-amber" aria-hidden="true" />
      <div className="absolute inset-0 -rotate-2 rounded-xl bg-paper-dim" aria-hidden="true" />
      <div className="relative rounded-xl bg-white p-7 text-ink shadow-sheet sm:p-8">
        <p className="text-sm font-semibold tracking-wide text-amber-deep uppercase">Why {site.name}</p>
        <p className="mt-1 font-display text-2xl font-semibold text-navy">One desk, start to finish</p>
        <ul className="mt-6 space-y-4">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-center gap-3 border-b border-line pb-4 last:border-b-0 last:pb-0">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-amber">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="font-medium">{reason}</span>
            </li>
          ))}
        </ul>
        <Stamp />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="on-navy ledger overflow-x-clip bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-14 pb-20 lg:grid-cols-[1fr_28rem] lg:gap-16 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-amber-light">
            <MapPin className="size-4" aria-hidden="true" />
            Koramangala, Bengaluru, since {site.foundedYear}
          </p>
          <h1 className="mt-5 font-display text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Government paperwork, handled for you
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
            Certificates, notary, property registration and more, all through a single window. Tell us what you
            need and we will call you back with the details.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallButton />
            <WhatsAppButton />
          </div>
          <p className="mt-5 text-sm text-paper/70">{site.hours}</p>
        </div>
        <ReasonsSheet />
      </div>
    </section>
  );
}
