import { processSteps } from "@/data/site";

export function Process() {
  return (
    <section className="on-navy ledger bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, index) => (
            <li key={step.title} className="border-t-2 border-amber pt-5">
              <span className="font-display text-4xl font-semibold text-amber">{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-paper/80">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
