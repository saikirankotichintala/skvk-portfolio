"use client";

import { useState, useRef, useEffect } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    handle: "@saikirankotichintala",
    href: "https://github.com/saikirankotichintala",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "Saikiran Kotichintala",
    href: "https://linkedin.com/in/saikirankotichintala",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    handle: "@saikirankoti",
    href: "https://x.com/saikirankoti",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

const socialContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 15,
    },
  },
};

const formVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formFieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function MagneticButton({ children, style, ...props }: HTMLMotionProps<"button">) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * 0.25; // 25% magnetic force
    const y = (clientY - centerY) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{
        ...style,
        position: "relative",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ── Interactive Particle Field ───────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Particles */
    const N = 80;
    const particles = Array.from({ length: N }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r:  1 + Math.random() * 2,
      brightness: 0.3 + Math.random() * 0.5,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", () => { mouse.current = { x: -9999, y: -9999 }; });

    function tick() {
      rafRef.current = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      /* Update + draw */
      for (const p of particles) {
        /* Mouse repulsion */
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        /* Damping */
        p.vx *= 0.97;
        p.vy *= 0.97;

        /* Move + wrap */
        p.x = (p.x + p.vx + canvas!.width)  % canvas!.width;
        p.y = (p.y + p.vy + canvas!.height) % canvas!.height;

        /* Draw particle */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,140,0,${p.brightness})`;
        ctx.fill();
      }

      /* Connections */
      const CONNECT_DIST = 90;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,140,0,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }
    tick();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "auto",
      }}
    />
  );
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "var(--surface)", position: "relative", overflow: "hidden" }}
      aria-label="Contact"
    >
      {/* Mouse-reactive particle field canvas */}
      <ParticleField />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "0.75rem" }}
        >
          <span className="section-label">Contact</span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
          }}
        >
          {/* Left — Copy */}
          <div>
            <motion.h2
              className="text-headline"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: "1.5rem" }}
            >
              Let&apos;s build
              <br />
              something great together.
            </motion.h2>

            <motion.p
              className="text-body-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ maxWidth: "380px", marginBottom: "3rem" }}
            >
              I&apos;m a B.Tech CS (AI &amp; Data Science) student open to internships,
              research collaborations, and freelance data/web projects. Let&apos;s connect!
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}
            >
              <a
                href="mailto:saikirankotichintala@gmail.com"
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0066ff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                  }}
                >
                  ✉️
                </span>
                saikirankotichintala@gmail.com
              </a>

              <div
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.875rem",
                  }}
                >
                  📍
                </span>
                Nagpur, India · +91 7249224974 · Open to remote
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={socialContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              style={{ display: "flex", gap: "0.75rem" }}
            >
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.name}
                  variants={socialItemVariants}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="social-icon-btn"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-secondary)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "var(--accent)";
                    el.style.color = "white";
                    el.style.transform = "translateY(-2px)";
                    el.style.borderColor = "transparent";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "";
                    el.style.color = "";
                    el.style.transform = "";
                    el.style.borderColor = "";
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "rgba(0, 200, 100, 0.05)",
                  border: "1px solid rgba(0, 200, 100, 0.2)",
                  borderRadius: "20px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎉</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                  Message sent!
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                variants={formVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                style={{
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
                noValidate
              >
                <motion.div variants={formFieldVariants}>
                  <label
                    htmlFor="contact-name"
                    style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}
                  >
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="contact-input"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <label
                    htmlFor="contact-email"
                    style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="contact-input"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <label
                    htmlFor="contact-message"
                    style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact-input"
                    placeholder="Tell me about your project..."
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    style={{ resize: "vertical", minHeight: "120px" }}
                  />
                </motion.div>

                <motion.div variants={formFieldVariants}>
                  <MagneticButton
                    type="submit"
                    className="btn-primary"
                    style={{ justifyContent: "center", width: "100%" }}
                  >
                    Send message
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="8" x2="13" y2="8" />
                      <polyline points="9,4 13,8 9,12" />
                    </svg>
                  </MagneticButton>
                </motion.div>

                <motion.p variants={formFieldVariants} style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>
                  No spam ever. I respond within 24 hours.
                </motion.p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
