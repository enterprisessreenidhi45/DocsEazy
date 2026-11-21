import { site } from "./site";

// Privacy notice copy for /privacy/, written for India's Digital Personal Data Protection
// Act, 2023. Every statement describes how this site actually works today (checked against
// the code: no cookies, analytics or ad trackers; fonts are self-hosted; enquiries go to
// Appwrite Cloud in Singapore; the form also opens WhatsApp; Contact embeds Google Maps).
// If any of that changes, update this file in the same change.
//
// TODO(owner): have this reviewed by your legal adviser before relying on it, confirm the
// retention wording, and say whether a named person should be listed as the contact.

export const privacyUpdated = "21 November 2026";

export type PrivacySection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  points?: string[];
  after?: string[];
};

export const privacyIntro = [
  `This notice explains what personal data ${site.name} (${site.legalName}) collects through this website, why we collect it, and the rights you have over it. It is written to meet India's Digital Personal Data Protection Act, 2023.`,
];

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      `${site.legalName}, trading as ${site.name}, is a private documentation agency at ${site.addressLines.join(", ")}. We decide why and how your personal data is used, which makes us the "Data Fiduciary" under the Act.`,
    ],
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    paragraphs: ["When you send an enquiry through our form, we collect:"],
    points: [
      "Your name and mobile number (required).",
      "Your email address, the service you are interested in, and your message (optional).",
    ],
    after: [
      "We do not ask for identity documents, ID numbers or payment details on this website.",
      "When you simply browse the site, we do not use cookies, analytics or advertising trackers. The company that hosts this website processes technical data such as your IP address so that it can deliver the pages to you.",
    ],
  },
  {
    id: "why-we-use-it",
    heading: "Why we use it",
    paragraphs: [
      "We use your details only to reply to your enquiry: to call you back, explain what your document needs and quote the amount. We do not sell your data, use it for marketing, or share it with anyone for their own purposes.",
    ],
  },
  {
    id: "where-it-goes",
    heading: "Where your enquiry goes",
    points: [
      "Your enquiry is saved in our enquiry database, which runs on Appwrite, a cloud service, on servers in Singapore. Only our team can read it.",
      "After you submit the form, WhatsApp opens with your enquiry already filled in. If you choose to send it, it travels through WhatsApp (Meta) and WhatsApp's own privacy policy applies to that message.",
      "The map on our Contact page is provided by Google Maps. When it loads, Google can receive technical data such as your IP address, under Google's privacy policy.",
    ],
    after: [
      "Appwrite and our website host process data only on our behalf, to provide their service to us.",
    ],
  },
  {
    id: "consent",
    heading: "Your consent",
    paragraphs: [
      "Sending an enquiry is voluntary. When you send one, you agree to us using your details for the purpose above. You can withdraw that consent at any time by contacting us. Withdrawing does not affect anything we did with your details before you withdrew.",
    ],
  },
  {
    id: "how-long",
    heading: "How long we keep it",
    paragraphs: [
      "We keep an enquiry only for as long as we need it to respond to you and handle your request, and then delete it. You can ask us to delete it sooner.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: ["Under the Act, you can ask us to:"],
    points: [
      "Give you a summary of the personal data we hold about you and who we have shared it with.",
      "Correct, complete or update your data.",
      "Erase your data.",
      "Withdraw your consent.",
      "Address any grievance you have about how we handle your data.",
      "Let someone you nominate exercise these rights for you if you die or become unable to.",
    ],
    after: [
      `To use any of these rights, contact us using the details below. If you are not satisfied with our response, you can complain to the Data Protection Board of India.`,
    ],
  },
  {
    id: "security",
    heading: "Keeping it safe",
    paragraphs: [
      "This website is served over an encrypted (HTTPS) connection, and only our team can read enquiries, through password-protected accounts.",
    ],
  },
  {
    id: "children",
    heading: "Children",
    paragraphs: [
      "This website is not meant for anyone under 18. If you are under 18, please ask a parent or guardian to contact us for you.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this notice",
    paragraphs: [
      "If we change how we handle your data, we will update this page and the date at the top.",
    ],
  },
];
