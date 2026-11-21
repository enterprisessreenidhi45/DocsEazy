import {
  Baby,
  BadgeCheck,
  BookUser,
  CreditCard,
  Flower2,
  Gem,
  Handshake,
  KeyRound,
  Landmark,
  Newspaper,
  Plane,
  Receipt,
  ScrollText,
  Stamp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  /**
   * The card's anchor on /services/. The first six were the old site's page URLs;
   * public/_redirects sends those to their anchors so existing links keep working.
   */
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
    name: "Gazette Notification",
    summary: "Official Gazette notification for your name change.",
    icon: Newspaper,
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
    slug: "e-stamp-paper",
    name: "E-Stamp Paper",
    summary: "E-stamp paper for agreements and legal documents.",
    icon: Receipt,
    startingPrice: null,
  },
  { slug: "attestation", name: "Attestation", summary: "Document attestation.", icon: BadgeCheck, startingPrice: null },
  { slug: "sale-deed", name: "Sale Deeds", summary: "Sale deed paperwork.", icon: ScrollText, startingPrice: null },
];

export const serviceHref = (service: Service) => `/services/#${service.slug}`;
export const featuredServices = services.filter((service) => service.featured);
export const otherServices = services.filter((service) => !service.featured);
