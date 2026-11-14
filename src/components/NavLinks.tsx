"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = { label: string; href: string; matches: string[] };

/** Returns a check for whether a nav item is the page being viewed. */
export function useIsCurrent() {
  const pathname = usePathname();
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (item: NavItem) => item.matches.includes(path);
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const isCurrent = useIsCurrent();

  return (
    <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
      {items.map((item) => {
        const current = isCurrent(item);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`relative py-2 font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:rounded-full after:bg-amber after:transition-transform after:duration-300 after:ease-out ${
              current
                ? "text-amber-deep after:scale-x-100"
                : "text-navy after:scale-x-0 hover:text-amber-deep hover:after:scale-x-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
