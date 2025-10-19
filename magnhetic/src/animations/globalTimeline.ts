"use client";

import { gsap } from "gsap";

let tl: gsap.core.Timeline | null = null;
let playQueued = false;

export function getGlobalTimeline() {
  if (!tl) {
    tl = gsap.timeline({ paused: true });
  }
  return tl;
}

export function queuePlay(delayMs = 50) {
  if (playQueued) return;
  playQueued = true;
  setTimeout(() => {
    const timeline = getGlobalTimeline();
    if (!timeline.isActive()) timeline.play(0);
    playQueued = false;
  }, delayMs);
}

export function clearGlobalTimeline() {
  if (tl) {
    tl.clear();
    tl.pause(0);
  }
}


