// Single source of truth for business facts. Change a detail here and it updates everywhere.
export const site = {
  name: "DocsEazy",
  legalName: "Sreenidhi Enterprises",
  url: "https://docseazy.in",
  foundedYear: 1997,
  phoneDisplay: "+91 93437 94351",
  phoneHref: "tel:+919343794351",
  // TODO(owner): confirm WhatsApp uses the same number as the phone line.
  whatsappNumber: "919343794351",
  email: "info@docseazy.in",
  addressLines: ["Shop Number 58, Mahakavi Vemana Rd, Koramangala 3 Block", "BDA Complex, Bengaluru 560034"],
  hours: "Open 7 days, 9:00 AM to 8:00 PM",
};

// Passed to <LiveYear> as its pre-hydration value. Never read this directly for display:
// a static site is only built once, so a build-time year would go stale.
export const buildYear = new Date().getFullYear();

export function whatsappHref(
  message = "Hello DocsEazy, I would like to enquire about your services.",
) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Contact", href: "/contact/" },
];

// Claims carried over from the current site. TODO(owner): confirm these are still accurate.
export const stats = [
  { value: 20000, suffix: "+", label: "Clients served" },
  { value: 25, suffix: "+", label: "Team members" },
  { value: 20, suffix: "+", label: "Services" },
];

// From the current site's "Why choose us", leaving out its unsupported claims ("lowest price
// in the market", "fastest delivery"). TODO(owner): confirm these still hold.
export const reasons = [
  "A single window for all your documents",
  "Support all along the process",
  "Your document safety comes first",
  "Updates by email or WhatsApp",
];

export const processSteps = [
  { title: "Send your request", text: "Call, WhatsApp or send an enquiry telling us what you need." },
  { title: "We call you back", text: "We call you with the details for your document." },
  { title: "Pay the quoted amount", text: "You pay the amount we quoted to you." },
  { title: "Receive your documents", text: "Your completed documents are handed over to you." },
];

// Word for word from the current site, with only punctuation spacing tidied. Chandrashekar's
// quote is trimmed where marked so that a years-old Rs. 2,500 price is not shown as current.
// TODO(owner): confirm the customers are happy to be quoted on the new site.
export const testimonials: { name: string; context?: string; quote: string }[] = [
  {
    name: "Chandrashekar",
    context: "Marriage certificate",
    quote:
      "Amazing response and service from DocsEazy (Sreenidhi Enterprises), Koramangala (Krishna), I was looking marriage certificate for visa and passport purpose, I got prompt service from this agent … it is a very good service provider for my work.",
  },
  {
    name: "Venkat",
    context: "Notary",
    quote:
      "Need of notaries, so I approached this person. The charge are modest rate and they responded well. They took good care of the consignment. Contented with their service.",
  },
  {
    name: "Bhushan Balasubramaniyam Mohan",
    quote: "Most helpful person having several lawyer connect. Helped to the core.",
  },
];

// Written from verified facts only. The old /faq/ page was template Lorem ipsum.
export const faqs = [
  {
    q: "Is DocsEazy a government office?",
    a: "No. DocsEazy (Sreenidhi Enterprises) is a private agency that helps you with government and legal paperwork.",
  },
  {
    q: "How much will my document cost?",
    a: "It depends on the document. Tell us what you need and we will call you with the details. You pay the amount quoted.",
  },
  {
    q: "How long does it take?",
    a: "It varies by document. Ask us when we call you back and we will tell you what to expect for your case.",
  },
  {
    q: "How do I get updates on my document?",
    a: "We send status updates for your documentation by email or WhatsApp.",
  },
  {
    q: "Where are you and when are you open?",
    a: `We are at ${site.addressLines.join(", ")}. ${site.hours}.`,
  },
  {
    q: "Which services do you handle?",
    a: "Birth, marriage and death certificates, gazette notification for name change, notary and affidavits, property registration, PAN, passport, visa, GPA, rental agreements, e-stamp paper, attestation and sale deeds.",
  },
];
