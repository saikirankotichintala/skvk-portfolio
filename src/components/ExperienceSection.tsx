"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Experience Data ──────────────────────────────────────
const EXPERIENCES = [
  {
    company: "Amarswarup Foundation",
    role: "Project Team Member",
    period: "Jan 2026 – Apr 2026",
    location: "Nagpur, India",
    description:
      "Collaborated with a cross-functional team to build digital solutions supporting artisan initiatives under an NGO initiative. Delivered software that blended full-stack development with AI-driven features.",
    highlights: [
      "Software Development: Built digital solutions supporting artisan initiatives including QR-code-driven profile access.",
      "QR Architecture: Developed functionality for users to scan QR codes and access detailed artisan profiles seamlessly.",
      "Security: Engineered a fingerprint-based offline authenticity verification system to protect artisan product integrity.",
    ],
    logo: "🌱",
    color: "#16a34a",
    award: "NGO Contribution Certificate",
  },
];

// ─── Education Data ───────────────────────────────────────
const EDUCATION = [
  {
    institution: "Ramdeobaba University",
    location: "Nagpur, India",
    degree: "B.Tech in Computer Science & Engineering (AI & Data Science)",
    period: "Aug 2024 – Present",
    icon: "🎓",
    color: "#0066ff",
    note: "Currently pursuing",
  },
  {
    institution: "Narayana Vidyalayam",
    location: "Padoli, India",
    degree: "Higher Secondary Education (12th)",
    period: "May 2024",
    icon: "📚",
    color: "#7c3aed",
    note: "Completed",
  },
  {
    institution: "Indira Gandhi Garden School",
    location: "Chandrapur, India",
    degree: "Secondary School (10th)",
    period: "July 2022",
    icon: "🏫",
    color: "var(--color-orange)" as string,
    note: "Completed",
  },
];

// ─── Achievements Data ────────────────────────────────────
const ACHIEVEMENTS = [
  {
    title: "NGO Recognition Award",
    desc: "Awarded a formal Contribution Certificate by the Amarswarup Foundation for impactful full-stack software development contributions.",
    icon: "🏆",
    color: "#16a34a",
  },
];

function ExperienceEntry({ exp }: { exp: typeof EXPERIENCES[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1.5rem" }}
    >
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.25rem" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: exp.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.35rem",
            flexShrink: 0,
            boxShadow: `0 4px 16px ${exp.color}40`,
          }}
        >
          {exp.logo}
        </div>
      </div>

      {/* Content */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "0.2rem",
              }}
            >
              {exp.role}
            </h3>
            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 500 }}>
              {exp.company} · {exp.location}
            </div>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "0.25rem 0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            {exp.period}
          </div>
        </div>

        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
          {exp.description}
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {exp.highlights.map((h) => (
            <li
              key={h}
              style={{
                fontSize: "0.83rem",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: exp.color, marginTop: "4px", fontSize: "0.55rem", flexShrink: 0 }}>●</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Award tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.35rem 0.75rem",
            background: `${exp.color}10`,
            border: `1px solid ${exp.color}30`,
            borderRadius: "100px",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: exp.color,
          }}
        >
          🏆 {exp.award}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section" aria-label="Experience and education">
      <div className="container">
        {/* ── Experience ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "0.75rem" }}
        >
          <span className="section-label">Experience</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
            marginBottom: "5rem",
          }}
        >
          {/* Left — Sticky headline */}
          <div style={{ position: "sticky", top: "7rem" }}>
            <motion.h2
              className="text-headline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "1.5rem" }}
            >
              Where I&apos;ve
              <br />
              contributed.
            </motion.h2>

            <motion.p
              className="text-body-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ maxWidth: "360px" }}
            >
              Hands-on experience building real products that serve real people —
              from NGO-backed software to AI-integrated full-stack systems.
            </motion.p>
          </div>

          {/* Right — Experience entries */}
          <div>
            {EXPERIENCES.map((exp) => (
              <ExperienceEntry key={exp.company} exp={exp} />
            ))}
          </div>
        </div>

        {/* ── Education ──────────────────────────────────── */}
        <div className="divider" style={{ marginBottom: "4rem" }} />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span className="section-label">Education</span>
          <motion.h2
            className="text-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{ marginTop: "0.5rem" }}
          >
            Academic
            <br />
            background.
          </motion.h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "5rem" }}>
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                padding: "1.5rem",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                transition: "all 0.25s ease",
              }}
              whileHover={{ borderColor: `${edu.color}40`, boxShadow: `0 4px 20px ${edu.color}10` }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${edu.color}15`,
                  border: `1px solid ${edu.color}25`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.4rem",
                  flexShrink: 0,
                }}
              >
                {edu.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem" }}>
                  <div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      {edu.location}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem", flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "100px",
                        padding: "0.2rem 0.625rem",
                      }}
                    >
                      {edu.period}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        color: edu.color,
                        fontWeight: 500,
                        padding: "0.15rem 0.5rem",
                        background: `${edu.color}10`,
                        borderRadius: "100px",
                        border: `1px solid ${edu.color}20`,
                      }}
                    >
                      {edu.note}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Achievements ───────────────────────────────── */}
        <div className="divider" style={{ marginBottom: "4rem" }} />

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "2rem" }}
        >
          <span className="section-label">Achievements</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "1rem",
          }}
        >
          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              style={{
                padding: "2rem",
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start",
                transition: "all 0.25s ease",
              }}
              whileHover={{ borderColor: `${ach.color}40`, boxShadow: `0 4px 20px ${ach.color}08` }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${ach.color}12`,
                  border: `1px solid ${ach.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.35rem",
                  flexShrink: 0,
                }}
              >
                {ach.icon}
              </div>
              <div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.375rem", letterSpacing: "-0.01em" }}>
                  {ach.title}
                </div>
                <div style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {ach.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
