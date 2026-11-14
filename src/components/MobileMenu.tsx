"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsCurrent, type NavItem } from "./NavLinks";

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const isCurrent = useIsCurrent();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 grid size-11 place-items-center rounded-lg text-navy"
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-y border-line bg-paper px-5 py-2 shadow-lg"
        >
          {items.map((item) => {
            const current = isCurrent(item);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 border-b border-line py-3.5 last:border-b-0 ${
                  current ? "font-semibold text-amber-deep" : "font-medium text-navy"
                }`}
              >
                {current && <span className="h-5 w-1 rounded-full bg-amber" aria-hidden="true" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
