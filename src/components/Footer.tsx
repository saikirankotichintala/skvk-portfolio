"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "2.5rem 0",
        background: "var(--bg)",
      }}
      role="contentinfo"
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            © {year} Saikiran Kotichintala. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: "2rem" }}>
            {[
              { label: "GitHub", href: "https://github.com/saikirankotichintala" },
              { label: "LinkedIn", href: "https://linkedin.com/in/saikirankotichintala" },
              { label: "Email", href: "mailto:saikirankotichintala@gmail.com" },
              { label: "Resume", href: "/resume.docx" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                download={link.label === "Resume" ? "Saikiran_Kotichintala_Resume.docx" : undefined}
                className="footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
