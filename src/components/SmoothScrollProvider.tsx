"use client";

import { useEffect } from "react";

/**
 * Registers GSAP ScrollTrigger on mount.
 * Smooth scrolling is handled natively via `html { scroll-behavior: smooth }`.
 * All GSAP imports are dynamic (inside useEffect) to avoid SSR module errors.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanupFns: Array<() => void> = [];

    Promise.all([
      import("gsap").then((m) => m.default),
      import("gsap/ScrollTrigger").then((m) => m.ScrollTrigger),
    ])
      .then(([gsap, ScrollTrigger]) => {
        gsap.registerPlugin(ScrollTrigger);
        cleanupFns.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
      })
      .catch(() => {
        // Graceful degradation — animations still work, just without ScrollTrigger
      });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return <>{children}</>;
}
