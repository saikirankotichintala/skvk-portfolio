"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Floating orb specs (pure CSS, no WebGL) ──────────────── */
const ORBS = [
  { w: 320, h: 320, top: "8%",  left: "12%",  blur: 90,  opacity: 0.18, delay: 0   },
  { w: 200, h: 200, top: "60%", left: "5%",   blur: 70,  opacity: 0.10, delay: 1.2 },
  { w: 160, h: 160, top: "25%", left: "72%",  blur: 60,  opacity: 0.08, delay: 2.1 },
  { w: 100, h: 100, top: "75%", left: "80%",  blur: 50,  opacity: 0.07, delay: 0.6 },
  { w: 80,  h: 80,  top: "45%", left: "55%",  blur: 40,  opacity: 0.06, delay: 1.8 },
];

/* ── Dot particle specs ───────────────────────────────────── */
const DOTS = Array.from({ length: 28 }, (_, i) => ({
  size: 1.5 + (i % 3),
  top:  `${5 + (i * 37 + 13) % 90}%`,
  left: `${3 + (i * 53 + 7)  % 94}%`,
  opacity: 0.15 + (i % 4) * 0.08,
  duration: 4 + (i % 5) * 1.2,
  delay: (i * 0.35) % 4,
}));

export function InfiniteZoomSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const glowRef     = useRef<HTMLDivElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  /* GSAP scroll parallax layers */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const base = {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1200",
        scrub: 1.4,
        pin: true,
        pinSpacing: true,
      };

      /* Glow — drifts diagonally */
      gsap.to(glowRef.current, {
        x: 80, y: 60, scale: 1.25, opacity: 0.08,
        ease: "none",
        scrollTrigger: base,
      });

      /* Grid — counter-move, fades */
      gsap.to(gridRef.current, {
        yPercent: -14, opacity: 0.3,
        ease: "none",
        scrollTrigger: base,
      });

      /* Content — slides up + fades out */
      gsap.to(contentRef.current, {
        yPercent: -18, opacity: 0,
        ease: "none",
        scrollTrigger: { ...base, pin: false, pinSpacing: false },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="infinite-zoom"
      aria-label="Into the stack — scroll experience"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--surface)",   /* matches Projects: #141414 */
      }}
    >
      {/* ── Primary orange radial glow — top-left ───────────── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-8%",
          width: "65vw",
          height: "65vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,100,0,0.55) 0%, rgba(255,60,0,0.20) 40%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Secondary smaller glow — bottom-right ───────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "5%",
          right: "-5%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,140,0,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ── Floating soft orbs ──────────────────────────────── */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 10, -6, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: orb.duration ?? 8,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            width:  orb.w,
            height: orb.h,
            borderRadius: "50%",
            background: "rgba(255,120,0,1)",
            opacity: orb.opacity,
            filter: `blur(${orb.blur}px)`,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Subtle dot grid ─────────────────────────────────── */}
      <div
        ref={gridRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,140,0,0.25) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.5,
          zIndex: 2,
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* ── Floating particles (CSS only) ───────────────────── */}
      {DOTS.map((d, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{ y: [0, -12, 0], opacity: [d.opacity, d.opacity * 1.8, d.opacity] }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "#ff8c00",
            opacity: d.opacity,
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Top & bottom edge fades ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.4) 0%, transparent 15%, transparent 82%, rgba(20,20,20,0.5) 100%)",
        }}
      />

      {/* ── Text content ────────────────────────────────────── */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            whileInView={{ opacity: 0.85, letterSpacing: "0.22em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2 }}
            style={{
              display: "block",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#ff8c00",
              marginBottom: "1.5rem",
            }}
          >
            Deep Dive
          </motion.span>

          <h2
            style={{
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              color: "#f5f0e8",
              marginBottom: "1.5rem",
            }}
          >
            Into the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ff8c00, #ffd000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              stack.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(0.88rem, 1.6vw, 1.05rem)",
              color: "rgba(200,184,154,0.60)",
              maxWidth: "400px",
              lineHeight: 1.7,
              margin: "0 auto",
            }}
          >
            Every layer of the technology — from raw data pipelines to deployed AI models.
          </p>
        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 12, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "rgba(255,180,0,0.5)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "42px",
            background: "linear-gradient(to bottom, rgba(255,140,0,0.65), transparent)",
          }}
        />
      </motion.div>

      {/* ── Corner accent dots ──────────────────────────────── */}
      {[
        { top: "2rem",    left: "2rem"  },
        { top: "2rem",    right: "2rem" },
        { bottom: "2rem", left: "2rem"  },
        { bottom: "2rem", right: "2rem" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 200, damping: 15 }}
          aria-hidden="true"
          style={{
            position: "absolute",
            ...pos,
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#ff8c00",
            boxShadow: "0 0 8px #ff8c00, 0 0 18px rgba(255,140,0,0.4)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
      ))}
    </section>
  );
}
