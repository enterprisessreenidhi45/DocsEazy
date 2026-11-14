import { site } from "@/data/site";

export function Logo({ onNavy = false }: { onNavy?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-9 shrink-0">
        <path
          fill={onNavy ? "#fbf7ef" : "#0f2340"}
          d="M7 2h13l7 7v19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
        />
        <path fill="#efa92f" d="M20 2l7 7h-5a2 2 0 0 1-2-2V2Z" />
        <path
          fill="none"
          stroke={onNavy ? "#0f2340" : "#efa92f"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m10.5 18.5 4 4 7-8"
        />
      </svg>
      <span
        className={`font-display text-2xl leading-none font-semibold tracking-tight ${
          onNavy ? "text-paper" : "text-navy"
        }`}
      >
        {site.name}
      </span>
    </span>
  );
}
