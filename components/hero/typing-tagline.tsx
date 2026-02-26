"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export function TypingTagline({ phrases }: { phrases: string[] }) {
  const reduced = useReducedMotionSafe();
  const safePhrases = useMemo(() => phrases.filter(Boolean), [phrases]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!safePhrases.length) return;
    if (reduced) {
      setText(safePhrases[0]);
      return;
    }

    const current = safePhrases[phraseIndex % safePhrases.length];
    const doneTyping = text === current;
    const doneDeleting = text.length === 0;
    const step = deleting ? 22 : 34;
    const hold = doneTyping ? 1200 : 0;

    const timeout = window.setTimeout(
      () => {
        if (!deleting && !doneTyping) return setText(current.slice(0, text.length + 1));
        if (!deleting && doneTyping) return setDeleting(true);
        if (deleting && !doneDeleting) return setText(current.slice(0, text.length - 1));
        setDeleting(false);
        setPhraseIndex((i) => (i + 1) % safePhrases.length);
      },
      doneTyping ? hold : step
    );

    return () => window.clearTimeout(timeout);
  }, [deleting, phraseIndex, reduced, safePhrases, text]);

  return (
    <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
      <span>{text}</span>
      {!reduced ? <span className="ml-1 inline-block h-5 w-px animate-pulse bg-accent align-middle" /> : null}
    </p>
  );
}
