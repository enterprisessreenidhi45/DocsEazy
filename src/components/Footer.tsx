import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { buildYear, nav, site } from "@/data/site";
import { featuredServices, serviceHref } from "@/data/services";
import { LiveYear } from "./LiveYear";
import { Logo } from "./Logo";

export function Footer() {
  const contact = [
    { icon: MapPin, content: site.addressLines.join(", ") },
    { icon: Clock, content: site.hours },
    { icon: Phone, content: site.phoneDisplay, href: site.phoneHref },
    { icon: Mail, content: site.email, href: `mailto:${site.email}` },
  ];

  // The bottom padding clears the fixed MobileActionBar (h-14 plus the safe area). It lives
  // here, not on <main>, so the clearance is painted footer navy instead of opening a strip
  // of page background between the last section divider and the footer.
  return (
    <footer className="on-navy bg-navy-deep pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-paper/80 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo onNavy />
          <p className="mt-3 text-sm">{site.legalName}, Koramangala, Bengaluru</p>
          <ul className="mt-6 space-y-3 text-sm">
            {contact.map(({ icon: Icon, content, href }) => (
              <li key={content} className="flex gap-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                {href ? (
                  <a href={href} className="hover:text-paper">
                    {content}
                  </a>
                ) : (
                  <span>{content}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-paper">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featuredServices.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service)} className="hover:text-paper">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-paper">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/admin/" className="hover:text-paper">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-5 text-xs text-paper/70 md:flex-row md:justify-between">
          <p>
            © <LiveYear builtIn={buildYear} /> {site.name} ({site.legalName})
          </p>
          <p>{site.name} is a private agency, not a government office.</p>
        </div>
      </div>
    </footer>
  );
}
