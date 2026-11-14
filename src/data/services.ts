import {
  Baby,
  BadgeCheck,
  BookUser,
  Car,
  CreditCard,
  Flower2,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  PenLine,
  Plane,
  ScrollText,
  Stamp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  /** Also the URL. The first six match the old site's URLs, so existing links keep working. */
  slug: string;
  name: string;
  summary: string;
  icon: LucideIcon;
  /** Shown as a main card on the home page. */
  featured?: boolean;
  /** Rupees. null shows "Get a quote". TODO(owner): supply real prices; never guess these. */
  startingPrice: number | null;
};

// Service pages (documents required, process, timeline, FAQ) will be generated from this file.
export const services: Service[] = [
  {
    slug: "marriage-certificate",
    name: "Marriage Certificate",
    summary: "For visa, passport and other official use.",
    icon: Gem,
    featured: true,
    startingPrice: null,
  },
  {
    slug: "property-registration",
    name: "Property Registration",
    summary: "Help with registering your property.",
    icon: Landmark,
    featured: true,
    startingPrice: null,
  },
  {
    slug: "notary-affidavit",
    name: "Notary & Affidavit",
    summary: "Notarised documents and affidavits.",
    icon: Stamp,
    featured: true,
    startingPrice: null,
  },
  {
    slug: "birth-certificate",
    name: "Birth Certificate",
    summary: "Help getting a birth certificate.",
    icon: Baby,
    featured: true,
    startingPrice: null,
  },
  {
    slug: "change-of-name",
    name: "Change of Name",
    summary: "Paperwork for changing your name.",
    icon: PenLine,
    featured: true,
    startingPrice: null,
  },
  {
    slug: "death-certificate",
    name: "Death Certificate",
    summary: "Help getting a death certificate.",
    icon: Flower2,
    featured: true,
    startingPrice: null,
  },
  { slug: "passport", name: "Passport", summary: "Passport paperwork.", icon: BookUser, startingPrice: null },
  { slug: "pan-card", name: "PAN Card", summary: "PAN card paperwork.", icon: CreditCard, startingPrice: null },
  { slug: "visa", name: "Visa", summary: "Visa paperwork.", icon: Plane, startingPrice: null },
  {
    slug: "general-power-of-attorney",
    name: "GPA",
    summary: "General power of attorney.",
    icon: Handshake,
    startingPrice: null,
  },
  {
    slug: "rental-agreement",
    name: "Rental Agreements",
    summary: "Rental agreement paperwork.",
    icon: KeyRound,
    startingPrice: null,
  },
  {
    slug: "driving-licence",
    name: "Driving Licence",
    summary: "Driving licence paperwork.",
    icon: Car,
    startingPrice: null,
  },
  { slug: "attestation", name: "Attestation", summary: "Document attestation.", icon: BadgeCheck, startingPrice: null },
  { slug: "sale-deed", name: "Sale Deeds", summary: "Sale deed paperwork.", icon: ScrollText, startingPrice: null },
];

export const serviceHref = (service: Service) => `/${service.slug}/`;
export const featuredServices = services.filter((service) => service.featured);
export const otherServices = services.filter((service) => !service.featured);
