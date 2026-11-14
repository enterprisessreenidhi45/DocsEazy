"use client";

import { useState, type FormEvent } from "react";
import { ID } from "appwrite";
import { CheckCircle2, Send } from "lucide-react";
import { services } from "@/data/services";
import { whatsappHref } from "@/data/site";
import { ENQUIRIES_TABLE_ID, APPWRITE_DATABASE_ID, tablesDB } from "@/lib/appwrite";

export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

const EMPTY: Enquiry = { name: "", phone: "", email: "", service: "", message: "" };
const OTHER_SERVICE = "Not sure / something else";

/**
 * Persists the enquiry to Appwrite (readable by the admin dashboard) and still opens
 * WhatsApp with it pre-filled — WhatsApp stays the real-time notification path until the
 * business has email/SMS alerts set up, so a lead never depends on only one channel.
 * If the Appwrite write fails (e.g. offline), the enquiry still reaches WhatsApp rather than
 * being lost — this never throws for that reason alone.
 */
async function submitEnquiry(enquiry: Enquiry): Promise<void> {
  try {
    await tablesDB.createRow({
      databaseId: APPWRITE_DATABASE_ID,
      tableId: ENQUIRIES_TABLE_ID,
      rowId: ID.unique(),
      data: {
        name: enquiry.name,
        phone: enquiry.phone,
        email: enquiry.email || undefined,
        service: enquiry.service || undefined,
        message: enquiry.message || undefined,
      },
    });
  } catch (error) {
    console.error("Could not save enquiry to Appwrite:", error);
  }

  const lines = [
    "Hello DocsEazy, I would like to make an enquiry.",
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    enquiry.email && `Email: ${enquiry.email}`,
    enquiry.service && `Service: ${enquiry.service}`,
    enquiry.message && `Message: ${enquiry.message}`,
  ].filter(Boolean);
  window.open(whatsappHref(lines.join("\n")), "_blank", "noopener,noreferrer");
}

type Errors = Partial<Record<keyof Enquiry, string>>;

function validate(values: Enquiry): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  // Indian numbers: 10 digits, optionally with +91 / 0 and spaces or dashes.
  const digits = values.phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
  if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = "Please enter a valid 10-digit mobile number.";
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email, or leave it blank.";
  }
  return errors;
}

const fieldClass =
  "mt-1.5 block w-full rounded-lg border bg-white px-4 py-3 text-ink placeholder:text-muted/70 focus:border-amber-deep focus:outline-none";

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const update = (field: keyof Enquiry) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitEnquiry(values);
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="py-6 text-center">
        <CheckCircle2 className="mx-auto size-12 text-whatsapp" aria-hidden="true" />
        <p className="mt-4 font-display text-2xl font-semibold text-navy">Thank you</p>
        <p className="mt-2 text-muted">
          Your enquiry is ready in WhatsApp — press send there and we will call you back with the
          details.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-semibold text-amber-deep underline hover:text-navy"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const describedBy = (field: keyof Enquiry) =>
    errors[field] ? `enquiry-${field}-error` : undefined;
  const border = (field: keyof Enquiry) => (errors[field] ? "border-red-600" : "border-line");

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="enquiry-name" className="text-sm font-semibold text-navy">
            Your name <span className="text-amber-deep">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name")(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={`${fieldClass} ${border("name")}`}
          />
          {errors.name && (
            <p id="enquiry-name-error" className="mt-1 text-sm text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-phone" className="text-sm font-semibold text-navy">
            Mobile number <span className="text-amber-deep">*</span>
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            value={values.phone}
            onChange={(e) => update("phone")(e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
            className={`${fieldClass} ${border("phone")}`}
          />
          {errors.phone && (
            <p id="enquiry-phone-error" className="mt-1 text-sm text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-email" className="text-sm font-semibold text-navy">
            Email <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email")(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={`${fieldClass} ${border("email")}`}
          />
          {errors.email && (
            <p id="enquiry-email-error" className="mt-1 text-sm text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-service" className="text-sm font-semibold text-navy">
            Service
          </label>
          <select
            id="enquiry-service"
            name="service"
            value={values.service}
            onChange={(e) => update("service")(e.target.value)}
            className={`${fieldClass} border-line`}
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name}>
                {service.name}
              </option>
            ))}
            <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="enquiry-message" className="text-sm font-semibold text-navy">
            What do you need? <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(e) => update("message")(e.target.value)}
            placeholder="For example: marriage certificate for a visa application."
            className={`${fieldClass} resize-y border-line`}
          />
        </div>
      </div>

      {status === "failed" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Something went wrong. Please try again, or call us directly.
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We only use your details to reply to this enquiry.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-5 py-3.5 font-semibold text-paper transition-colors hover:bg-navy-soft disabled:opacity-60 sm:w-auto"
        >
          <Send className="size-5" aria-hidden="true" />
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}
