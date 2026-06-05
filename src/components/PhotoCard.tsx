"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ── Exact lerp + remap helpers from animation.md ─────────── */
const lerp = (start: number, end: number, amount: number) =>
  (1 - amount) * start + amount * end;

const remap = (value: number, oldMax: number, newMax: number) => {
  const newValue = ((value + oldMax) * (newMax * 2)) / (oldMax * 2) - newMax;
  return Math.min(Math.max(newValue, -newMax), newMax);
};

const ANGLE = 18; // max tilt degrees

export function PhotoCard() {
  const cardRef    = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const rotateX    = useRef(0);
  const rotateY    = useRef(0);
  const targetX    = useRef(0);
  const targetY    = useRef(0);
  const rafId      = useRef<number>(0);
  const alive      = useRef(true);

  /* ── In-view for zoom-scroll entrance (animation.md zoom-scroll @keyframes) */
  const inView = useInView(wrapRef, { once: true, margin: "-80px" });

  /* ── Parallax scroll progress ── */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect    = card.getBoundingClientRect();
      const centerX = (rect.left + rect.right)   / 2;
      const centerY = (rect.top  + rect.bottom)  / 2;
      const posX    = e.clientX - centerX;
      const posY    = e.clientY - centerY;
      targetX.current = remap(posX, rect.width  / 2, ANGLE);
      targetY.current = remap(posY, rect.height / 2, ANGLE);

      /* glare position */
      const gx = ((e.clientX - rect.left) / rect.width)  * 100;
      const gy = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty("--gx", `${gx}%`);
      card.style.setProperty("--gy", `${gy}%`);
    };

    const onMouseLeave = () => {
      targetX.current = 0;
      targetY.current = 0;
    };

    card.addEventListener("mousemove",  onMouseMove,  { passive: true });
    card.addEventListener("mouseleave", onMouseLeave, { passive: true });

    /* 60fps lerp loop — exact pattern from animation.md */
    const update = () => {
      if (!alive.current) return;
      rafId.current = requestAnimationFrame(update);

      rotateX.current = lerp(rotateX.current, targetX.current, 0.07);
      rotateY.current = lerp(rotateY.current, targetY.current, 0.07);

      card.style.setProperty("--rotateY", `${rotateX.current}deg`);
      card.style.setProperty("--rotateX", `${-rotateY.current}deg`);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      alive.current = false;
      cancelAnimationFrame(rafId.current);
      card.removeEventListener("mousemove",  onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    /* ── Outer wrapper — zoom-scroll entrance from animation.md ── */
    <motion.div
      ref={wrapRef}
      className="photo-card-wrap"
      style={{ y }}
      initial={{ opacity: 0, scale: 0.82, filter: "blur(24px)", clipPath: "circle(0% at 50% 50%)" }}
      animate={
        inView
          ? { opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "circle(100% at 50% 50%)" }
          : { opacity: 0, scale: 0.82, filter: "blur(24px)", clipPath: "circle(0% at 50% 50%)" }
      }
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        className="photo-card"
        style={{
          width:     "clamp(240px, 28vw, 380px)",
          aspectRatio: "4 / 5",
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Photo */}
        <Image
          src="/photo.png"
          alt="Saikiran Kotichintala"
          fill
          style={{ objectFit: "cover", objectPosition: "top center" }}
          priority
          sizes="(max-width: 768px) 80vw, 380px"
        />

        {/* Glare highlight — moves with mouse */}
        <div className="photo-card-glare" />

        {/* Bottom name tag */}
        <div
          style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            padding:    "1.25rem 1.25rem 1rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)",
            zIndex:     3,
            transform:  "translateZ(12px)",
          }}
        >
          <div
            style={{
              fontSize:      "0.75rem",
              fontWeight:    600,
              color:         "rgba(255,255,255,0.9)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Saikiran Kotichintala
          </div>
          <div
            style={{
              fontSize:   "0.65rem",
              color:      "rgba(255,255,255,0.55)",
              marginTop:  "2px",
            }}
          >
            AI &amp; ML · Full-Stack
          </div>
        </div>
      </div>
    </motion.div>
  );
}
