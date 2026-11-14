import { buildYear, site, stats } from "@/data/site";
import { TrustStatsRow } from "./TrustStatsRow";

// A server component on purpose: `buildYear` must be computed here, once, at build time,
// and threaded down as a plain prop. If a client component imported it directly, the
// browser would re-run `new Date().getFullYear()` itself during hydration, and on any
// visit after a year has turned over since the last build, that would disagree with the
// year already baked into the static HTML and break hydration.
export function TrustStats() {
  return (
    <section aria-label="DocsEazy in numbers" className="bg-paper-dim">
      <TrustStatsRow builtInYear={buildYear} foundedYear={site.foundedYear} stats={stats} />
    </section>
  );
}
