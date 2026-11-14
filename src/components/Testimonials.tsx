import { testimonials } from "@/data/site";

export function Testimonials() {
  const [lead, ...rest] = testimonials;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
        What customers say
      </h2>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <figure className="flex flex-col justify-between rounded-xl bg-navy p-8 text-paper sm:p-10">
          <blockquote className="font-display text-xl leading-relaxed sm:text-2xl">“{lead.quote}”</blockquote>
          <figcaption className="mt-8">
            <span className="font-semibold">{lead.name}</span>
            {lead.context && <span className="text-amber-light"> · {lead.context}</span>}
          </figcaption>
        </figure>
        <div className="grid gap-6">
          {rest.map((item) => (
            <figure key={item.name} className="flex flex-col justify-between rounded-xl border border-line bg-white p-7">
              <blockquote className="leading-relaxed text-ink">“{item.quote}”</blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-navy">{item.name}</span>
                {item.context && <span className="text-muted"> · {item.context}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
