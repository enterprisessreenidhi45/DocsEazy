"use client";

import { useEffect, useState } from "react";

const TYPING_MS = 70;
const DELETING_MS = 40;
const HOLD_MS = 1400;

/**
 * Cycles through `words`, typing and deleting each in turn. Respects
 * prefers-reduced-motion by showing the first word statically instead of animating.
 */
export function Typewriter({ words }: { words: string[] }) {
  const [reduced, setReduced] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const word = words[wordIndex % words.length] ?? "";

  useEffect(() => {
    if (reduced || words.length === 0) return;

    if (!deleting && length === word.length) {
      const t = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(t);
    }
    if (deleting && length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setLength((l) => l + (deleting ? -1 : 1)),
      deleting ? DELETING_MS : TYPING_MS,
    );
    return () => clearTimeout(t);
  }, [length, deleting, word, words.length, reduced]);

  const display = reduced ? (words[0] ?? "") : word.slice(0, length);

  return (
    <span className="inline-flex items-baseline">
      <span>{display}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-0.5 animate-pulse bg-current align-text-bottom"
      />
    </span>
  );
}
