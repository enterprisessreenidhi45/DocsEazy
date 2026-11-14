"use client";

import { Odometer } from "./Odometer";
import { useInView } from "./useInView";
import { YearsOdometer } from "./YearsOdometer";

type Stat = { value: number; suffix?: string; label: string };

// Takes `builtInYear`/`foundedYear` as plain props rather than importing `site.ts` itself,
// so the browser never recomputes the build year during hydration. See TrustStats.tsx.
export function TrustStatsRow({
  builtInYear,
  foundedYear,
  stats,
}: {
  builtInYear: number;
  foundedYear: number;
  stats: Stat[];
}) {
  const [ref, inView] = useInView<HTMLDListElement>(0.3);

  const items = [
    {
      node: <YearsOdometer builtIn={builtInYear} since={foundedYear} start={inView} />,
      label: "Years in business",
    },
    ...stats.map((stat) => ({
      node: <Odometer value={stat.value} suffix={stat.suffix} start={inView} />,
      label: stat.label,
    })),
  ];

  return (
    <dl ref={ref} className="mx-auto grid max-w-6xl grid-cols-2 px-5 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col-reverse border-line px-2 py-8 text-center md:border-l md:first:border-l-0"
        >
          <dt className="mt-1 text-sm text-muted">{item.label}</dt>
          <dd className="font-display text-3xl font-semibold text-navy sm:text-4xl">{item.node}</dd>
        </div>
      ))}
    </dl>
  );
}
