"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SkillsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Slow vertical parallax translations
  const videoY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const patternY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Video layer with parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: "-50px",
          bottom: "-50px",
          left: 0,
          right: 0,
          y: videoY,
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src="/skill.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay — deep navy gradient for readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(5,10,30,0.88) 0%, rgba(10,15,40,0.82) 50%, rgba(5,8,25,0.90) 100%)",
        }}
      />

      {/* Subtle dot-grid texture with its own parallax factor */}
      <motion.div
        style={{
          position: "absolute",
          top: "-80px",
          bottom: "-80px",
          left: 0,
          right: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          y: patternY,
        }}
      />

      {/* Edge fade — top & bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,10,30,0.4) 0%, transparent 20%, transparent 80%, rgba(5,10,30,0.4) 100%)",
        }}
      />
    </div>
  );
}
