"use client";

import { useEffect, useState } from "react";

/**
 * Returns the current year, or the years elapsed since `since`. Starts from `builtIn` so the
 * first client render matches the server, then re-reads the real date once mounted, because
 * this static site will not be rebuilt once it launches.
 */
export function useLiveYear(builtIn: number, since?: number) {
  const [year, setYear] = useState(builtIn);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return since === undefined ? year : year - since;
}

export function LiveYear({ builtIn, since }: { builtIn: number; since?: number }) {
  return <>{useLiveYear(builtIn, since)}</>;
}
