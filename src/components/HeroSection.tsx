"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Typing animation hook ───────────────────────────────── */
function useTypingAnimation(words: string[], loop = true) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const current = words[wordIndex];
    const typeSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const next = current.slice(0, displayed.length + 1);
        setDisplayed(next);
        if (next === current) {
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
          }, 1800);
        }
      } else {
        const next = current.slice(0, displayed.length - 1);
        setDisplayed(next);
        if (next === "") {
          setIsDeleting(false);
          if (loop) setWordIndex((i: number) => (i + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayed, isDeleting, isPaused, wordIndex, words, loop]);

  return displayed;
}

/* ── Letter-by-letter reveal component ──────────────────── */
function LetterReveal({
  text,
  className,
  style,
  delay = 0,
  color,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  color?: string;
}) {
  return (
    <span
      className={className}
      style={{ display: "inline-block", ...style }}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: "inline-block",
            color: color,
            transformOrigin: "bottom",
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Word slide-up reveal ────────────────────────────────── */
function WordReveal({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
}

/* ── Main Hero Component ─────────────────────────────────────── */
export function HeroSection() {
  const heroRef  = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const typedText = useTypingAnimation([
    "Machine Learning",
    "Data Pipelines",
    "Full-Stack Apps",
    "AI Integration",
    "Predictive Models",
  ]);

  /* Always-dark color tokens */
  const c = {
    heading1:    "#f5f0e8",
    heading2:    "rgba(245,240,232,0.80)",
    via:         "rgba(255,200,80,0.70)",
    typed:       "linear-gradient(135deg, #ff8c00 0%, #ffd000 100%)",
    cursor:      "#ff8c00",
    solutions:   "rgba(255,200,80,0.45)",
    subtext:     "rgba(245,240,232,0.75)",
    subtextName: "#ffb300",
    subtextRole: "#ff8c00",
    divider:     "rgba(255,140,0,0.25)",
    statNum:     "#ffd000",
    statLabel:   "rgba(255,200,80,0.55)",
    scrollText:  "rgba(255,180,0,0.50)",
    scrollLine:  "linear-gradient(to bottom, rgba(255,140,0,0.5), transparent)",
    fadeBg:      "#0d0d0d",
  };

  useEffect(() => {
    // Ensure video plays on load
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => { });
    }
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const ST_BASE = {
        trigger: heroRef.current,
        start:   "top top",
        end:     "bottom top",
        scrub:   true,
      };

      /* Layer 1: Video bg — slowest, deepest */
      gsap.to(".hero-video-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: ST_BASE,
      });

      /* Layer 2: Dark overlay — intensifies as hero leaves */
      gsap.to(".hero-overlay", {
        opacity: 0.95,
        ease: "none",
        scrollTrigger: ST_BASE,
      });

      /* Layer 3: Noise — drifts upward, fades */
      gsap.to(".hero-noise", {
        yPercent: -12,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: ST_BASE,
      });

      /* Layer 4: Grid — counter-moves, shrinks */
      gsap.to(".hero-grid-layer", {
        yPercent: -18,
        opacity: 0,
        scale: 1.08,
        ease: "none",
        scrollTrigger: ST_BASE,
      });

      /* Layer 5: Content — slides up + fades out */
      gsap.to(".hero-content", {
        yPercent: -20,
        opacity: 0,
        ease: "none",
        scrollTrigger: ST_BASE,
      });

      /* Geo shapes — each drifts to its own corner */
      gsap.to(".geo-shape-1", {
        x: -80, y: -50, rotation: 55, opacity: 0,
        ease: "none",
        scrollTrigger: ST_BASE,
      });
      gsap.to(".geo-shape-2", {
        x: 100, y: 80, rotation: -40, opacity: 0,
        ease: "none",
        scrollTrigger: ST_BASE,
      });
      gsap.to(".geo-shape-3", {
        x: -40, y: 120, rotation: 30, opacity: 0,
        ease: "none",
        scrollTrigger: ST_BASE,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section"
      id="hero"
      aria-label="Hero section"
    >
      {/* ── Video background — oversized to absorb parallax ─ */}
      <div
        className="hero-video-bg"
        style={{
          background: "#0a0a0f",
          top: "-15%",
          bottom: "-15%",
          left: 0,
          right: 0,
          height: "130%",
          position: "absolute",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Dark overlay for text legibility ───────────────── */}
      <div
        className="hero-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.60) 100%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* ── Noise texture overlay ─────────────────────────── */}
      <div
        className="hero-noise"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
          zIndex: 2,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* ── Grid pattern ─────────────────────────────────── */}
      <div
        className="hero-grid-layer"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          zIndex: 3,
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* ── Background Shapes ──────────────────────────────── */}
      <div className="geo-shape geo-shape-1" style={{ zIndex: 0 }} />
      <div className="geo-shape geo-shape-2" style={{ zIndex: 0 }} />
      <div className="geo-shape geo-shape-3" style={{ zIndex: 0 }} />
 
      {/* ── Content ──────────────────────────────────────── */}
      <div
        className="container hero-content"
        style={{ zIndex: 10, paddingTop: "6rem", paddingBottom: "4rem" }}
      >
        <div style={{ maxWidth: "800px" }}>
 
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginBottom: "2.25rem" }}
          >
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              background: "rgba(255, 140, 0, 0.10)",
              border: "1px solid rgba(255, 140, 0, 0.30)",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#ffb300",
              letterSpacing: "0.03em",
            }}>
              <span className="availability-dot" />
              Open to opportunities &amp; collaborations
            </div>
          </motion.div>
 
          {/* Headline — line 1: letter reveal */}
          <div style={{ marginBottom: "0.2rem", overflow: "hidden" }}>
            <h1 className="text-display" style={{ color: c.heading1 }}>
              <LetterReveal
                text="Building"
                color={c.heading1}
                delay={0.3}
              />
              {" "}
              <LetterReveal
                text="intelligent"
                color={c.heading2}
                delay={0.65}
              />
            </h1>
          </div>
 
          {/* Headline — line 2: typed word */}
          <div style={{ marginBottom: "0.2rem" }}>
            <h1
              className="text-display"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
                style={{ color: c.via }}
              >
                via
              </motion.span>
              {/* Typed word */}
              <span
                style={{
                  background: c.typed,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  minWidth: "12ch",
                  display: "inline-block",
                }}
              >
                {typedText}
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{
                    display: "inline-block",
                    width: "3px",
                    height: "0.85em",
                    background: c.cursor,
                    marginLeft: "3px",
                    verticalAlign: "middle",
                    borderRadius: "2px",
                    WebkitTextFillColor: "initial",
                  }}
                />
              </span>
            </h1>
          </div>
 
          {/* Headline — line 3: letter reveal */}
          <div style={{ marginBottom: "2.25rem", overflow: "hidden" }}>
            <h1 className="text-display">
              <LetterReveal
                text="solutions."
                color={c.solutions}
                delay={1.0}
              />
            </h1>
          </div>
 
          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              lineHeight: 1.75,
              color: c.subtext,
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}
          >
            Hi, I&apos;m{" "}
            <strong style={{ color: c.subtextName, fontWeight: 600 }}>
              Saikiran Kotichintala
            </strong>{" "}&mdash;{" "}
            <span style={{ color: c.subtextRole }}>AI &amp; Machine Learning Enthusiast</span>
            {" · "}
            <span style={{ color: c.subtextRole }}>Data Analyst</span>
            {" · "}
            <span style={{ color: c.subtextRole }}>Full-Stack Developer</span>
            . B.Tech CS (AI &amp; DS) at{" "}
            <strong style={{ color: c.subtextName, fontWeight: 600 }}>Ramdeobaba University</strong>
            , Nagpur.
          </motion.p>
 
          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.a
              href="#projects"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.6
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                borderRadius: "100px",
                background: "linear-gradient(135deg, #ff8c00, #ffb300)",
                color: "#0d0d0d",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(255,140,0,0.40)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "linear-gradient(135deg, #ffb300, #ffd000)";
                el.style.boxShadow = "0 8px 32px rgba(255,140,0,0.60)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "linear-gradient(135deg, #ff8c00, #ffb300)";
                el.style.boxShadow = "0 4px 20px rgba(255,140,0,0.40)";
                el.style.transform = "translateY(0)";
              }}
            >
              View my work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="8" x2="13" y2="8" />
                <polyline points="9,4 13,8 9,12" />
              </svg>
            </motion.a>
            <motion.a
              href="#contact"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.75
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 2rem",
                borderRadius: "100px",
                background: "rgba(255,140,0,0.08)",
                color: "#ff8c00",
                fontWeight: 500,
                fontSize: "0.9rem",
                textDecoration: "none",
                border: "1px solid rgba(255,140,0,0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,140,0,0.18)";
                el.style.color = "#ffd000";
                el.style.borderColor = "rgba(255,140,0,0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,140,0,0.08)";
                el.style.color = "#ff8c00";
                el.style.borderColor = "rgba(255,140,0,0.35)";
              }}
            >
              Get in touch
            </motion.a>
          </div>

          {/* Metrics row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              gap: "2.5rem",
              marginTop: "5rem",
              paddingTop: "2.5rem",
              borderTop: `1px solid ${c.divider}`,
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "8+", label: "Projects shipped" },
              { num: "4+", label: "Certifications" },
              { num: "AI/DS", label: "Specialization" },
            ].map((m) => (
              <div key={m.label}>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    color: c.statNum,
                  }}
                >
                  {m.num}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: c.statLabel,
                    marginTop: "2px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: c.scrollText,
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "44px",
            background: c.scrollLine,
          }}
        />
      </div>

      {/* ── Bottom gradient fade into next section ──────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "180px",
          background: `linear-gradient(to bottom, transparent, ${c.fadeBg})`,
          zIndex: 5,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
