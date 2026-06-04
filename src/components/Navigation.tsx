"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Work",       href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-scrolled" : "bg-transparent"
      }`}
    >
      <div className="container">
        <nav
          className="flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight"
            style={{ color: "#f5f0e8" }}
            aria-label="Saikiran Kotichintala — Home"
          >
            Saikiran<span style={{ color: "#ff8c00" }}>.</span>K
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "rgba(245,240,232,0.55)" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#ff8c00")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "rgba(245,240,232,0.55)")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="mailto:saikirankotichintala@gmail.com"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #ff8c00, #ffb300)",
              color: "#0d0d0d",
              boxShadow: "0 4px 18px rgba(255,140,0,0.35)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "linear-gradient(135deg, #ffb300, #ffd000)";
              el.style.boxShadow = "0 8px 28px rgba(255,140,0,0.55)";
              el.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "linear-gradient(135deg, #ff8c00, #ffb300)";
              el.style.boxShadow = "0 4px 18px rgba(255,140,0,0.35)";
              el.style.transform = "translateY(0)";
            }}
          >
            Let&apos;s talk
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            style={{ color: "rgba(245,240,232,0.6)" }}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6"  x2="17" y2="6"  />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
