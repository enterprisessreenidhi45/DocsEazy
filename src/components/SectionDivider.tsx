/**
 * The site's standard section seam: three overlapping wave layers at different heights and
 * opacity (client-supplied shape), rather than one hard-edged curve. Where the layers stack
 * near the bottom they read as fully `to`-coloured; near the top of the waves, the lower
 * opacity lets `from` show through, so the seam fades into depth rather than cutting cleanly.
 * Sits as its own sibling between two sections: `from` paints the area above it, `to` fills
 * the wave layers.
 *
 * `rotate` turns the whole shape a true 180° (both axes, via Tailwind's `rotate-180`) rather
 * than mirroring it left-right: the hill that bulges from the top down into the section
 * below instead bulges from the bottom up into the section above. Alternating it down a page
 * (first seam unrotated, the rest rotated) keeps every seam reading like the same shape
 * rather than a plain mirror of itself.
 *
 * Below `sm` the divider is only 40px tall, which squeezes the two translucent layers into a
 * thin muddy stripe that reads as a gap between the sections, so phones get the opaque wave
 * alone. The SVG also hangs 1px past its clipping wrapper so a fractional device-pixel edge
 * can never leave a hairline of the `from` colour above the next section.
 */
export function SectionDivider({
  from,
  to,
  rotate = false,
}: {
  /** Tailwind background class matching the section above, e.g. "bg-navy". */
  from: string;
  /** Tailwind fill class matching the section below, e.g. "fill-paper-dim". */
  to: string;
  rotate?: boolean;
}) {
  return (
    <div className={`${from} overflow-hidden leading-[0]`} aria-hidden="true">
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className={`-mb-px block h-10 w-full sm:h-16 md:h-20 ${rotate ? "rotate-180" : ""}`}
      >
        <path
          className={`${to} max-sm:hidden`}
          opacity=".5"
          d="M0 0v100c166.7 0 166.7-66 333.3-66S500 77 666.7 77 833.3 28 1000 28V0H0Z"
        />
        <path
          className={`${to} max-sm:hidden`}
          opacity=".5"
          d="M0 0v100c166.7 0 166.7-66 333.3-66S500 70 666.7 70 833.3 16 1000 16V0H0Z"
        />
        <path
          className={to}
          d="M0 0v100c166.7 0 166.7-66 333.3-66S500 63 666.7 63 833.3 4 1000 4V0H0Z"
        />
      </svg>
    </div>
  );
}
