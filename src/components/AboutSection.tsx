"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PhotoCard } from "./PhotoCard";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function CountUp({ target, suffix = "", prefix = "", duration = 2000 }: CountUpProps) {
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

const STATS = [
  {
    value: 8,
    suffix: "+",
    label: "Projects Delivered",
    desc: "End-to-end ML and full-stack applications shipped to production",
  },
  {
    value: 4,
    suffix: "+",
    label: "Certifications",
    desc: "Google Cloud, Deloitte Data Analytics & more",
  },
  {
    value: 1,
    suffix: "",
    label: "NGO Certificate",
    desc: "Contribution award from Amarswarup Foundation for impactful software work",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section"
      style={{ background: "var(--surface)" }}
      aria-label="About me"
    >
      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="section-label">About</span>
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
          }}
        >
          {/* Left — Headline + Bio */}
          <div>
            <motion.h2
              className="text-headline"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "2rem" }}
            >
              Turning data into
              <br />
              <span className="gradient-text-blue">real-world impact.</span>
            </motion.h2>

            <motion.p
              className="text-body-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{ marginBottom: "1.5rem" }}
            >
              I&apos;m a result-driven B.Tech student in{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Computer Science (AI &amp; Data Science)
              </strong>{" "}
              at Ramdeobaba University, Nagpur, with hands-on experience in data engineering,
              statistical analysis, and machine learning.
            </motion.p>

            <motion.p
              className="text-body-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{ marginBottom: "1.5rem" }}
            >
              I&apos;m proficient in executing end-to-end{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                data pipelines
              </strong>
              , performing complex EDA, and building predictive models using{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Python, SQL, Pandas, and Scikit-learn
              </strong>
              and practical experience developing data-driven software solutions for an NGO initiative.
            </motion.p>

            <motion.p
              className="text-body-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              style={{ marginBottom: "2.5rem" }}
            >
              I excel at transforming raw datasets into{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                actionable insights and structured visualizations
              </strong>{" "}
              to drive strategic decision-making.
            </motion.p>

            <motion.a
              href="/resume.docx"
              download="Saikiran_Kotichintala_Resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              style={{ display: "inline-flex" }}
            >
              Download résumé
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "0.375rem" }}
              >
                <line x1="8" y1="3" x2="8" y2="13" />
                <polyline points="4,9 8,13 12,9" />
              </svg>
            </motion.a>
          </div>

          {/* Right — Profile card + badges */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ position: "relative" }}
          >
            {/* Real photo card */}
            <PhotoCard />


            {/* Floating badge — AI */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{
                position: "absolute",
                bottom: "6rem",
                right: "-1.5rem",
                background: "white",
                borderRadius: "14px",
                padding: "0.875rem 1.125rem",
                boxShadow: "0 8px 40px rgba(0,0,0,0.1)",
                border: "1px solid var(--border)",
              }}
            >
              <div style={{ fontSize: "1.25rem", marginBottom: "2px" }}>🤖</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)" }}>
                AI/ML
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}>
                Focus
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "5rem",
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="stat-card"
            >
              <div className="stat-number">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "0.5rem",
                  lineHeight: 1.5,
                }}
              >
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
