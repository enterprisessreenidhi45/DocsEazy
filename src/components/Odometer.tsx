"use client";

import { useEffect, useRef, useState } from "react";

const format = (n: number, suffix: string) => `${n.toLocaleString("en-IN")}${suffix}`;

/**
 * Counts up from 0 to `value` like a trip meter, once `start` turns true. Renders the final
 * value up front, so a visitor without JavaScript, or a crawler, still sees the real number,
 * and a screen reader is never read a number mid-count.
 */
export function Odometer({
  value,
  suffix = "",
  start,
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  start: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const hasStarted = useRef(false);

  // Before the count-up begins, track a `value` that changes under us (e.g. years-in-business
  // ticking over after mount) rather than freezing on whatever it was at first render.
  useEffect(() => {
    if (!hasStarted.current) setDisplay(value);
  }, [value]);

  useEffect(() => {
    if (!start || hasStarted.current) return;
    hasStarted.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let frame: number;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - t) ** 3;
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, value, duration]);

  return (
    <span className="tabular-nums">
      <span aria-hidden="true">{format(display, suffix)}</span>
      <span className="sr-only">{format(value, suffix)}</span>
    </span>
  );
}
