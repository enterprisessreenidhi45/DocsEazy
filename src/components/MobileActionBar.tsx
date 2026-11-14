import { Phone } from "lucide-react";
import { site, whatsappHref } from "@/data/site";
import { WhatsAppIcon } from "./ContactButtons";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-navy/20 pb-[env(safe-area-inset-bottom)] md:hidden">
      <a
        href={site.phoneHref}
        className="flex h-14 items-center justify-center gap-2 bg-amber font-semibold text-navy"
      >
        <Phone className="size-5" aria-hidden="true" />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 items-center justify-center gap-2 bg-whatsapp font-semibold text-navy-deep"
      >
        <WhatsAppIcon />
        WhatsApp
      </a>
    </div>
  );
}
