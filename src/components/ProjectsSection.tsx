"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

function ProjectVisual({ project }: { project: Project }) {
  if (project.video) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {/* Dark overlay gradients for a high-end look and readable badge */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.5) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Inner shadow to separate from content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
            pointerEvents: "none",
          }}
        />
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
            zIndex: 10,
          }}
        >
          Live
        </div>
      </div>
    );
  }

  return (
    <div
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

        {/* Content area */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {/* Header bar */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: `${project.accentColor}20`,
                border: `1px solid ${project.accentColor}30`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ height: "8px", width: "60%", background: "rgba(255, 255, 255, 0.1)", borderRadius: "4px", marginBottom: "4px" }} />
              <div style={{ height: "6px", width: "40%", background: "rgba(255, 255, 255, 0.05)", borderRadius: "4px" }} />
            </div>
          </div>

          {/* Chart / data viz area */}
          <div
            style={{
              height: "80px",
              background: `${project.accentColor}08`,
              border: `1px solid ${project.accentColor}20`,
              borderRadius: "8px",
              display: "flex",
              alignItems: "flex-end",
              padding: "0.5rem",
              gap: "4px",
            }}
          >
            {[60, 80, 45, 90, 70, 85, 55, 75, 95, 65].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: `${project.accentColor}${i % 2 === 0 ? "80" : "40"}`,
                  borderRadius: "3px 3px 0 0",
                }}
              />
            ))}
          </div>

          {/* Info rows */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
            {[70, 50, 80, 60].map((w, i) => (
              <div
                key={i}
                style={{
                  height: "28px",
                  background: i === 0 ? `${project.accentColor}15` : "rgba(255, 255, 255, 0.03)",
                  border: i === 0 ? `1px solid ${project.accentColor}25` : "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "6px",
                }}
              />
            ))}
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
    </div>
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
            <div
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
              <div
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
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {project.category}
              </div>

              <h3
                style={{
                  fontSize: "clamp(1.25rem, 3vh, 2rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  color: "var(--text-primary)",
                }}
              >
                {project.title}
              </h3>

              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "500px" }}>
                {project.description}
              </p>

              {/* Highlights */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                {project.highlights.map((h) => (
                  <li
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
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>{tag}</span>
                ))}
              </div>

              {/* Metrics */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {project.metrics.map((m) => (
                  <div
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
                  </div>
                ))}
              </div>

              <a
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
              </a>
            </div>
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

