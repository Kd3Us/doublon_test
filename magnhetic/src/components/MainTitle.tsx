"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { getGlobalTimeline, queuePlay } from "@/animations/globalTimeline";
import { MAIN_TITLE_START } from "@/animations/timing";

type AnimatedTextProps = {
  text: string;
  className?: string;
  /** seconds between each letter */
  stagger?: number;
  /** total duration for each letter animation */
  duration?: number;
  /** initial y offset in px */
  fromY?: number;
};

export default function MainTitle({
  text,
  className = "",
  stagger = 0.03,
  duration = 0.6,
  fromY = 20,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLHeadingElement | null>(null);

  // Precompute characters so React re-renders when text changes
  const characters = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all letter spans
    const letters = container.querySelectorAll<HTMLSpanElement>("span[data-letter]");
    if (!letters.length) return;

    // Reset initial state (important when text changes)
    gsap.set(letters, { y: fromY, opacity: 0 });

    // Register on global timeline after Stripe
    const tl = getGlobalTimeline();
    tl.add(gsap.to(letters, {
      y: 0,
      opacity: 1,
      ease: "power3.out",
      duration,
      stagger,
    }), MAIN_TITLE_START);

    queuePlay();
  }, [text, duration, stagger, fromY]);

  return (
    <h1 ref={containerRef} className={className} aria-label={text}>
      {characters.map((ch, idx) => (
        ch === " " ? (
          <span key={`space-${idx}`} aria-hidden="true">&nbsp;</span>
        ) : (
          <span
            key={`ch-${idx}-${ch}`}
            data-letter
            className="inline-block will-change-transform"
          >
            {ch}
          </span>
        )
      ))}
    </h1>
  );
}


