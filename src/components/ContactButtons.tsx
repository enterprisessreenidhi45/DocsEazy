import { Phone } from "lucide-react";
import { site, whatsappHref } from "@/data/site";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.97L2.1 22l5.17-1.36A9.9 9.9 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.07.8.82-2.99-.2-.31a8.23 8.23 0 1 1 6.94 3.83Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.96-.15.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.22-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.09-.16.05-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition-colors";

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a href={site.phoneHref} className={`${base} bg-amber text-navy hover:bg-amber-light ${className}`}>
      <Phone className="size-5" aria-hidden="true" />
      Call {site.phoneDisplay}
    </a>
  );
}

export function WhatsAppButton({
  className = "",
  message,
}: {
  className?: string;
  message?: string;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-whatsapp text-navy-deep hover:bg-[#4be083] ${className}`}
    >
      <WhatsAppIcon />
      Chat on WhatsApp
    </a>
  );
}
