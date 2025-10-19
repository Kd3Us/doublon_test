"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type TransitionPhase = "idle" | "entering" | "waiting" | "exiting";

const ENTER_DURATION_MS = 500; // keep in sync with CSS animation-duration
const EXIT_DURATION_MS = 500;
const MAX_WAIT_READY_MS = 4000; // safety timeout to avoid hanging

export default function PageTransitionOverlay(): React.ReactNode {
  const pathname = usePathname();
  const router = useRouter();
  const lastPathRef = useRef<string | null>(null);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pendingHrefRef = useRef<string | null>(null);
  const waitingForReadyRef = useRef<boolean>(false);
  const waitTimeoutRef = useRef<number | null>(null);

  // Ensure first render doesn't animate
  useEffect(() => {
    setIsMounted(true);
    lastPathRef.current = pathname;
  }, []);

  // Listen to manual transition start events (pre-navigation) with target href
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ href: string }>;
      const href = custom.detail?.href;
      if (!href) return;
      // Normalize and check if navigating to the same path (ignore query/hash)
      let targetPath = href;
      try {
        targetPath = new URL(href, window.location.origin).pathname;
      } catch {}
      const normalize = (p: string) => p.split("?")[0].split("#")[0].replace(/\/?$/, "");
      const currentLocationPath = typeof window !== 'undefined' ? window.location.pathname : pathname;
      const current = normalize(currentLocationPath);
      const target = normalize(targetPath);

      // Always start entering for visual feedback
      setPhase("entering");

      if (current === target) {
        // No navigation; complete enter then exit without waiting for ready
        pendingHrefRef.current = null;
        waitingForReadyRef.current = false;
        if (waitTimeoutRef.current) { window.clearTimeout(waitTimeoutRef.current); waitTimeoutRef.current = null; }
        const t1 = window.setTimeout(() => {
          setPhase("exiting");
          const t2 = window.setTimeout(() => {
            setPhase("idle");
          }, EXIT_DURATION_MS);
          return () => window.clearTimeout(t2);
        }, ENTER_DURATION_MS);
        return () => window.clearTimeout(t1);
      }

      // Different route: proceed with normal navigation flow
      pendingHrefRef.current = href;
      window.setTimeout(() => {
        if (pendingHrefRef.current) {
          waitingForReadyRef.current = true;
          router.push(pendingHrefRef.current);
        }
      }, ENTER_DURATION_MS);
    };
    window.addEventListener("page-transition-navigate", handler as EventListener);
    return () => window.removeEventListener("page-transition-navigate", handler as EventListener);
  }, []);

  // When the pathname changes (navigation happened), wait for ready signal
  useEffect(() => {
    if (!isMounted) return;
    if (lastPathRef.current !== null && lastPathRef.current !== pathname) {
      setPhase("waiting");
      // Start safety timeout in case the page never dispatches ready
      if (waitTimeoutRef.current) { window.clearTimeout(waitTimeoutRef.current); }
      waitTimeoutRef.current = window.setTimeout(() => {
        if (waitingForReadyRef.current) {
          waitingForReadyRef.current = false;
          setPhase("exiting");
          const t = window.setTimeout(() => {
            setPhase("idle");
            pendingHrefRef.current = null;
          }, EXIT_DURATION_MS);
          return () => window.clearTimeout(t);
        }
      }, MAX_WAIT_READY_MS);
    }
    lastPathRef.current = pathname;
  }, [pathname, isMounted]);

  // Listen for ready signal from the newly navigated page, then exit the overlay
  useEffect(() => {
    const onReady = () => {
      if (!waitingForReadyRef.current) return;
      waitingForReadyRef.current = false;
      if (waitTimeoutRef.current) { window.clearTimeout(waitTimeoutRef.current); waitTimeoutRef.current = null; }
      setPhase("exiting");
      const t = window.setTimeout(() => {
        setPhase("idle");
        pendingHrefRef.current = null;
      }, EXIT_DURATION_MS);
      return () => window.clearTimeout(t);
    };
    window.addEventListener("page-transition-ready", onReady);
    return () => window.removeEventListener("page-transition-ready", onReady);
  }, []);

  const isVisible = phase !== "idle";

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed inset-0 z-50 transition-none",
        isVisible ? "block" : "hidden",
      ].join(" ")}
    >
      <div
        className={[
          "absolute inset-y-0 right-0 w-full bg-gradient-to-br from-[#98D8EF]  to-[#CBEBE9] overlay-pane",
          phase === "entering" ? "overlay-slide-in" : "",
          phase === "exiting" ? "overlay-slide-out" : "",
        ].join(" ")}
      />
      {phase !== "idle" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="overlay-spinner" />
        </div>
      )}
    </div>
  );
}


