import {
  Award,
  Building2,
  FileText,
  Handshake,
  History,
  MapPin,
  ShieldCheck,
  Target,
  Telescope,
  type LucideIcon,
} from "lucide-react";
import { site } from "./site";

// About page copy. Single source of truth, same as site.ts. Edit the words here and they
// update on the page. Everything below is written from facts already on the site (founded
// 1997, Koramangala, a single-window agency, the services list and the "why choose us"
// reasons). No new numbers, prices or promises are introduced here.

export const aboutIntro = [
  `${site.name} is the online face of ${site.legalName}, a documentation agency that has worked out of Koramangala, Bengaluru since ${site.foundedYear}.`,
  "We help people with the government and legal paperwork that everyday life asks for — certificates, registrations, notary work, attestation and more — all through a single desk, so you deal with one team from the first call to the finished document.",
];

// TODO(owner): confirm the mission and vision read the way you want them to before launch.
// These are a starting draft; change any word here.
export const mission =
  "To make documentation simpler, faster and more approachable for everyone who walks through our door or messages us online.";

export const vision =
  "To be Bengaluru's most trusted single window for documentation — the first name people reach for when they need paperwork done right.";

export const missionVision: { icon: LucideIcon; label: string; text: string }[] = [
  { icon: Target, label: "Our mission", text: mission },
  { icon: Telescope, label: "Our vision", text: vision },
];

// A fuller take on the home page's "why choose us" reasons, written for the About page.
// Each one restates a promise the site already makes; none adds a new claim about speed
// or price, which only the owner can stand behind.
export const values: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: FileText,
    title: "One single window",
    text: "Every document you need, handled by one team — no running between offices and agents.",
  },
  {
    icon: Handshake,
    title: "Support all the way",
    text: "We stay with you through each step and answer your questions along the process.",
  },
  {
    icon: ShieldCheck,
    title: "Your documents, kept safe",
    text: "Your papers and your details are handled with care and treated as your own.",
  },
  {
    icon: Award,
    title: "No surprise on cost",
    text: "We tell you what is needed and quote the amount before any work begins.",
  },
];

// The identity rows shown on the card in the hero. All strictly verifiable.
export const credentials: { icon: LucideIcon; text: string }[] = [
  { icon: Building2, text: site.legalName },
  { icon: MapPin, text: "Koramangala, Bengaluru" },
  { icon: History, text: `Working since ${site.foundedYear}` },
  { icon: FileText, text: "Government & legal documents" },
];

export const commitment = [
  "Government paperwork can be confusing, and a small slip can cost weeks. Our job is to take that weight off you.",
  `We keep you updated by WhatsApp or email, explain the cost up front, and see each request through until your documents are in your hands. That is how ${site.legalName} has worked since ${site.foundedYear}, and it is how we work online as ${site.name} today.`,
];

/**
 * The person behind the business, shown in the hero and in "Our story".
 *
 * To remove the founder section entirely instead, set `founder` back to `null`; the page
 * falls back to an honest, nameless "Sreenidhi Enterprises" treatment.
 */
export type Founder = {
  name: string;
  role: string;
  initials: string;
  photo: string | null;
  bio: string[];
};

export const founder: Founder | null = {
  name: "B D Krishna",
  role: "Founder",
  initials: "BK",
  photo: "/founder.jpg",
  bio: [
    `B D Krishna has led ${site.legalName} from the same desk in Koramangala since ${site.foundedYear}, helping customers get government and legal paperwork done without the runaround.`,
    "Every request is still looked at personally: the cost is explained up front, and you are kept updated by WhatsApp or email until your documents are in your hands.",
  ],
};
