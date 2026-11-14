"use client";

import { useLiveYear } from "./LiveYear";
import { Odometer } from "./Odometer";

/** The years-in-business stat: a live-computed number, animated like the others. */
export function YearsOdometer({ builtIn, since, start }: { builtIn: number; since: number; start: boolean }) {
  return <Odometer value={useLiveYear(builtIn, since)} start={start} />;
}
