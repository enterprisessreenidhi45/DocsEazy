import Link from "next/link";
import { Phone } from "lucide-react";
import { nav, site, whatsappHref } from "@/data/site";
import { WhatsAppIcon } from "./ContactButtons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

const navItems = nav.map((item) => ({ ...item, matches: [item.href] }));

// A plain, always-solid header: sticky on top of the page, no scroll-driven blur or
// transparency. Simpler and reads reliably over every section colour (navy hero, paper
// hero, navy footer), so it no longer depends on JS or a client bundle to render correctly.
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper shadow-sm">
      <div className="relative mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-5">
        <Link href="/" aria-label={`${site.name} home`} className="py-1">
          <Logo />
        </Link>

        <NavLinks items={navItems} />

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="text-navy hover:text-amber-deep"
          >
            <WhatsAppIcon className="size-6" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 font-semibold text-paper transition-colors hover:bg-navy-soft"
          >
            <Phone className="size-4" aria-hidden="true" />
            <span className="whitespace-nowrap">{site.phoneDisplay}</span>
          </a>
        </div>

        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
