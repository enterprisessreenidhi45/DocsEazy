import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredServices, otherServices, serviceHref } from "@/data/services";

export function TopServices() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            What we can help with
          </h2>
          <p className="mt-3 max-w-xl text-lg text-muted">
            Our main services, all from one service provider.
          </p>
        </div>
        <Link
          href="/services/"
          className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-amber-deep hover:text-navy"
        >
          All services
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <ul className="mt-12 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service) => {
          const Icon = service.icon;
          return (
            <li key={service.slug}>
              <Link
                href={serviceHref(service)}
                className="file-card group relative flex h-full flex-col rounded-lg rounded-tl-none border border-line bg-white p-6 transition-colors hover:border-amber"
              >
                <Icon className="size-8 text-navy" strokeWidth={1.6} aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">{service.name}</h3>
                <p className="mt-1.5 text-muted">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-deep">
                  {service.startingPrice === null
                    ? "Get a quote"
                    : `Starting from Rs. ${service.startingPrice.toLocaleString("en-IN")}`}
                  <ArrowRight
                    className="size-4 transition-transform motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-12 border-t border-line pt-8">
        <h3 className="font-semibold text-navy">We also handle</h3>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {otherServices.map((service) => (
            <li key={service.slug}>
              <Link
                href={serviceHref(service)}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-navy transition-colors hover:border-amber"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
