import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <section id="faq" className="bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 lg:grid-cols-[1fr_2fr] lg:gap-14">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Common questions
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.q} className="faq-item group">
              <summary className="flex items-center justify-between gap-4 py-5 text-lg font-semibold text-navy transition-colors duration-200 hover:text-amber-deep">
                {item.q}
                <Plus
                  className="size-5 shrink-0 text-amber-deep transition-transform duration-300 ease-out group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-2xl pb-5 leading-relaxed text-muted">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
