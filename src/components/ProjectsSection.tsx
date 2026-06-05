"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

function CountUp({ target, suffix = "", prefix = "", duration = 2000 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  metrics: string[];
  highlights: string[];
  color: string;
  accentColor: string;
  github: string;
  featured: boolean;
  video?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Flight Price Prediction System",
    category: "Machine Learning · Data Science",
    description:
      "Developed an end-to-end machine learning model to predict flight ticket prices using historical travel data. Performed data preprocessing, complex EDA, feature engineering, and model training to improve prediction accuracy and analyze pricing trends.",
    tags: ["Python", "NumPy", "Pandas", "Scikit-learn", "Matplotlib", "Jupyter Notebook"],
    metrics: ["End-to-end ML pipeline", "EDA & feature engineering", "Price trend analysis"],
    highlights: [
      "Built complete data pipeline from raw CSV ingestion to trained model",
      "Applied feature engineering on departure time, airline, and route data",
      "Evaluated multiple regression models to maximize accuracy",
    ],
    color: "rgba(255, 140, 0, 0.03)",
    accentColor: "#ff8c00",
    github: "https://github.com/saikirankotichintala",
    featured: true,
    video: "/sorry.mp4",
  },
  {
    id: 2,
    title: "Artisan Story QR Platform",
    category: "Full-Stack · AI Integration",
    description:
      "Engineered a full-stack web application using a React and JavaScript frontend alongside a Python Flask backend. Provides QR-code-driven access to artisan profiles with AI-generated stories. Integrated Groq API and LLaMA 3 to dynamically generate engaging digital stories about artisan heritages, enhancing supply chain transparency.",
    tags: ["React", "JavaScript", "Python", "Flask", "Groq API", "LLaMA 3", "MongoDB", "Git"],
    metrics: ["AI story generation", "QR code access", "Offline verification"],
    highlights: [
      "Integrated Groq API (LLaMA 3) for real-time AI story generation about artisans",
      "Built QR-code-driven access system for artisan profile discovery",
      "Engineered fingerprint-based offline authenticity verification for product integrity",
    ],
    color: "rgba(255, 208, 0, 0.03)",
    accentColor: "#ffd000",
    github: "https://github.com/saikirankotichintala",
    featured: true,
  },
];

/* ─── ML Pipeline Exploded-View Component ─────────────────── */
const PIPELINE_NODES = [
  { id: "raw",    label: "RAW DATA",     icon: "📂", desc: "CSV Input",     angle: -90,  r: 130 },
  { id: "prep",   label: "PREPROCESS",   icon: "⚙️",  desc: "Cleaning",      angle: -18,  r: 130 },
  { id: "eda",    label: "EDA",          icon: "📊", desc: "Feature Eng.",  angle:  54,  r: 130 },
  { id: "model",  label: "TRAIN MODEL",  icon: "🤖", desc: "Scikit-learn",  angle: 126,  r: 130 },
  { id: "pred",   label: "PREDICTION",   icon: "🎯", desc: "93% Accuracy",  angle: 198,  r: 130 },
];

function MLPipelineViz({ accentColor }: { accentColor: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const CX = 50; // center % in SVG viewBox 0 0 100 100
  const CY = 50;

  /* Convert polar (angle°, radius in %) to Cartesian SVG coords */
  const toXY = (angleDeg: number, radiusPct: number) => ({
    x: CX + radiusPct * Math.cos((angleDeg * Math.PI) / 180),
    y: CY + radiusPct * Math.sin((angleDeg * Math.PI) / 180),
  });

  /* Explode positions: nodes start exploded (2× radius), collapse to target */
  const nodePositions = PIPELINE_NODES.map((n) => ({
    ...n,
    target: toXY(n.angle, n.r / 5),       // target in 0–100 SVG coords
    exploded: toXY(n.angle, (n.r * 2.2) / 5), // start exploded
  }));

  /* Arrow connector path from node i to node i+1 (in order 0→4 then 4→0) */
  function arrowPath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2 - 4;
    return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  }

  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, zIndex: 8, pointerEvents: "none" }}
    >
      {/* SVG for connector arrows */}
      <svg
        viewBox="0 0 100 100"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker id="arrow-head" markerWidth="3" markerHeight="3" refX="1.5" refY="1.5" orient="auto">
            <polygon points="0 0, 3 1.5, 0 3" fill={accentColor} opacity="0.7" />
          </marker>
        </defs>

        {/* Connector paths — draw in on assemble */}
        {nodePositions.map((node, i) => {
          const next = nodePositions[(i + 1) % nodePositions.length];
          return (
            <motion.path
              key={`arrow-${i}`}
              d={arrowPath(node.target, next.target)}
              fill="none"
              stroke={accentColor}
              strokeWidth="0.5"
              strokeDasharray="1 1"
              opacity="0.5"
              markerEnd="url(#arrow-head)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            />
          );
        })}

        {/* Center accuracy ring */}
        <motion.circle
          cx={CX} cy={CY} r="7"
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          opacity="0.2"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ transformOrigin: `${CX}% ${CY}%`, transformBox: "fill-box" }}
        />
        <motion.circle
          cx={CX} cy={CY} r="7"
          fill="none"
          stroke={accentColor}
          strokeWidth="1.5"
          strokeDasharray="44"
          initial={{ strokeDashoffset: 44 }}
          animate={isInView ? { strokeDashoffset: 44 * 0.065 } : {}}
          transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
        />
        <text x={CX} y={CY + 0.7} textAnchor="middle" dominantBaseline="middle"
          fontSize="3.5" fontWeight="700" fill="#f5f0e8">93%</text>
        <text x={CX} y={CY + 5} textAnchor="middle" dominantBaseline="middle"
          fontSize="2" fill="#c8b89a" opacity="0.7">Accuracy</text>
      </svg>

      {/* Pipeline nodes — animate from exploded → assembled */}
      {nodePositions.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{
            left: `${node.exploded.x}%`,
            top:  `${node.exploded.y}%`,
            scale: 0.4,
            opacity: 0,
          }}
          animate={isInView ? {
            left: `${node.target.x}%`,
            top:  `${node.target.y}%`,
            scale: 1,
            opacity: 1,
          } : {}}
          transition={{
            duration: 0.9,
            delay: 0.2 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <motion.div
            animate={isInView ? { boxShadow: [`0 0 0px ${accentColor}`, `0 0 14px ${accentColor}60`, `0 0 0px ${accentColor}`] } : {}}
            transition={{ duration: 2.5, delay: 1.0 + i * 0.12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(15,15,15,0.92)",
              border: `1.5px solid ${accentColor}55`,
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            {node.icon}
          </motion.div>
          <div style={{ fontSize: "0.42rem", fontWeight: 700, color: accentColor, letterSpacing: "0.08em", textAlign: "center", whiteSpace: "nowrap" }}>
            {node.label}
          </div>
          <div style={{ fontSize: "0.38rem", color: "rgba(200,184,154,0.55)", textAlign: "center" }}>
            {node.desc}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.video) {
    return (
      <motion.div
        initial={{ opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", background: "#000", overflow: "hidden" }}
      >
        {/* Background video — atmospheric dark layer */}
        <video
          src={project.video}
          autoPlay loop muted playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.25, filter: "saturate(0.4)" }}
        />

        {/* Heavy dark overlay so pipeline nodes pop */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.82)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 60px rgba(0,0,0,0.9)", pointerEvents: "none" }} />

        {/* ── ML Pipeline Exploded-View ─────────────────────── */}
        <MLPipelineViz accentColor={project.accentColor} />

        {/* Live badge */}
        <div style={{
          position: "absolute", top: "1.25rem", right: "1.25rem",
          background: project.accentColor, color: "#0d0d0d",
          borderRadius: "8px", padding: "0.3rem 0.6rem",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.06em",
          textTransform: "uppercase", zIndex: 10,
        }}>
          Live
        </div>
      </motion.div>
    );
  }


  // Artisan Story QR Platform (id: 2) mockup with scanline and tracking info
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: "100%",
        height: "100%",
        background: project.color,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Abstract mockup */}
      <div
        style={{
          width: "90%",
          maxWidth: "450px",
          background: "var(--surface)",
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 140, 0, 0.05)",
          overflow: "hidden",
          border: "1px solid var(--border)",
        }}
      >
        {/* Browser bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.625rem 0.875rem",
            background: "rgba(0, 0, 0, 0.3)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fca5a5" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#fcd34d" }} />
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#86efac" }} />
          <div style={{ flex: 1, height: "12px", background: "rgba(255, 255, 255, 0.05)", borderRadius: "4px", marginLeft: "0.5rem" }} />
        </div>

        {/* Content area: QR scan line & product card tracking */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", height: "110px" }}>
            
            {/* Left: QR Code container */}
            <div style={{ position: "relative", width: "90px", height: "90px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,208,0,0.2)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
              {/* QR Code Graphic (SVG) */}
              <svg width="68" height="68" viewBox="0 0 29 29" fill="none">
                <path d="M0 0h9v9H0V0zm1 1v7h7V1H1zm11 0h9v9h-9V1zm1 1v7h7V1h-7zM0 12h9v9H0v-9zm1 1v7h7v-7H1zm11 0h2v2h-2v-2zm3 0h3v3h-3v-3zm3 0h3v3h-3v-3zm-6 3h3v3h-3v-3zm3 0h3v3h-3v-3zm3 3h3v3h-3v-3zm-6 2h3v3h-3v-3zm3 1h3v3h-3v-3zm-9-3h2v2H6v-2zm0 3h2v2H6v-2zm9-6h2v2h-2v-2zm0 3h2v2h-2v-2z" fill="#ffd000" />
                {/* QR corner anchors */}
                <rect x="2" y="2" width="5" height="5" fill="#ffd000" />
                <rect x="14" y="2" width="5" height="5" fill="#ffd000" />
                <rect x="2" y="14" width="5" height="5" fill="#ffd000" />
              </svg>

              {/* Red/Orange laser scan line animation */}
              <motion.div
                animate={{ top: ["5%", "95%", "5%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  left: "5%",
                  right: "5%",
                  height: "2px",
                  background: "#ffd000",
                  boxShadow: "0 0 8px #ffd000",
                  zIndex: 2,
                }}
              />
            </div>

            {/* Center: Connecting line (SVG path) */}
            <div style={{ flex: 1, height: "40px", display: "flex", alignItems: "center" }}>
              <svg viewBox="0 0 60 20" width="100%" height="20">
                <motion.path
                  d="M 5,10 H 55"
                  fill="none"
                  stroke="rgba(255, 208, 0, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: -20 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </div>

            {/* Right: Product details card (Reveals after QR scanning appears/is active) */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                width: "130px",
                background: "rgba(255, 208, 0, 0.05)",
                border: "1px solid rgba(255, 208, 0, 0.2)",
                borderRadius: "12px",
                padding: "0.6rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.35rem",
              }}
            >
              {/* Product header */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ fontSize: "0.8rem" }}>🏺</span>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#f5f0e8" }}>Artisan Pot</span>
              </div>
              {/* Details (staggered fade-in) */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{ height: "4px", width: "90%", background: "rgba(255, 255, 255, 0.15)", borderRadius: "2px" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
                style={{ height: "4px", width: "70%", background: "rgba(255, 255, 255, 0.1)", borderRadius: "2px" }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                style={{
                  marginTop: "0.2rem",
                  fontSize: "0.55rem",
                  color: "#ffd000",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.15rem"
                }}
              >
                <span>✓</span> Verified Origin
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Accent badge */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: project.accentColor,
          color: "#0d0d0d",
          borderRadius: "8px",
          padding: "0.3rem 0.6rem",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        Live
      </div>
    </motion.div>
  );
}

function ZoomCard({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale   = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0,   1,    1,    1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0,   1,    1,    0]);
  const blur    = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [80,  0,    0,    48]);
  const filter  = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div ref={containerRef} className="project-card-runway">
      <motion.div
        className="project-card-sticky"
        style={{
          scale,
          opacity,
          filter,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}


const contentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const numberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const descriptionVariants = (idx: number) => ({
  hidden: { opacity: 0, x: idx % 2 === 0 ? 50 : -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
});

const highlightItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tagsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const tagItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } },
};

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section"
      style={{ background: "var(--surface)", padding: 0 }}
      aria-label="Projects"
    >
      {/* Section header — inside a container */}
      <div className="container" style={{ paddingTop: "var(--section-padding)" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "0.75rem" }}
        >
          <span className="section-label">Work</span>
        </motion.div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <motion.h2
            className="text-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Selected
            <br />
            projects.
          </motion.h2>

          <motion.p
            className="text-body-lg"
            style={{ maxWidth: "380px" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            End-to-end builds spanning machine learning pipelines, AI integrations,
            and full-stack web applications built for real-world impact.
          </motion.p>
        </div>
      </div>

      {/* Full-screen project panels */}
      {PROJECTS.map((project, idx) => (
        <ZoomCard key={project.id}>
          {/* Inner panel fills the sticky wrapper */}
          <div
            style={{
              height: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--surface)",
              borderTop: "1px solid var(--border)",
            }}
            className="project-fullscreen-grid"
          >
            {/* Visual side */}
            <div
              style={{
                order: idx % 2 === 0 ? 1 : 2,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <ProjectVisual project={project} />
            </div>

            {/* Content side */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{
                order: idx % 2 === 0 ? 2 : 1,
                padding: "clamp(1rem, 3vh, 2.5rem) clamp(1.5rem, 5vw, 3.5rem)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "clamp(0.6rem, 2vh, 1rem)",
                height: "100%",
              }}
            >
              {/* Project number */}
              <motion.div
                variants={numberVariants}
                style={{
                  fontSize: "clamp(3rem, 6vh, 5rem)",
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "var(--border)",
                  letterSpacing: "-0.05em",
                  userSelect: "none",
                }}
              >
                0{idx + 1}
              </motion.div>

              <motion.div
                variants={categoryVariants}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </motion.div>

              <motion.h3
                variants={titleVariants}
                style={{
                  fontSize: "clamp(1.25rem, 3vh, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                }}
              >
                {project.title}
              </motion.h3>

              <motion.p
                variants={descriptionVariants(idx)}
                style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "500px" }}
              >
                {project.description}
              </motion.p>

              {/* Highlights */}
              <motion.ul
                variants={tagsContainerVariants}
                style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}
              >
                {project.highlights.map((h) => (
                  <motion.li
                    variants={highlightItemVariants}
                    key={h}
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      lineHeight: 1.4,
                    }}
                  >
                    <span
                      style={{
                        color: project.accentColor,
                        fontSize: "0.55rem",
                        marginTop: "5px",
                        flexShrink: 0,
                      }}
                    >
                      ●
                    </span>
                    {h}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Tags */}
              <motion.div
                variants={tagsContainerVariants}
                style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}
              >
                {project.tags.map((tag) => (
                  <motion.span
                    variants={tagItemVariants}
                    key={tag}
                    className="project-tag"
                    style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>

              {/* Metrics */}
              <motion.div
                variants={tagsContainerVariants}
                style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
              >
                {project.metrics.map((m) => (
                  <motion.div
                    variants={tagItemVariants}
                    key={m}
                    style={{
                      padding: "0.25rem 0.6rem",
                      background: "var(--bg)",
                      border: "1px solid var(--border)",
                      borderRadius: "100px",
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {m}
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                variants={buttonVariants}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  alignSelf: "flex-start",
                  fontSize: "0.82rem",
                  padding: "0.5rem 1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </motion.a>
            </motion.div>
          </div>
        </ZoomCard>
      ))}

      {/* GitHub CTA */}
      <div className="container" style={{ paddingBottom: "var(--section-padding)" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          style={{
            marginTop: "3rem",
            textAlign: "center",
            padding: "3rem",
            background: "var(--bg)",
            borderRadius: "20px",
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ color: "var(--text-muted)", marginBottom: "1.25rem", fontSize: "0.95rem" }}>
            More projects &amp; experiments on GitHub
          </p>
          <a
            href="https://github.com/saikirankotichintala"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: "0.25rem" }}
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            github.com/saikirankotichintala
          </a>
        </motion.div>
      </div>
    </section>
  );
}

