"use client";

import { useRef, useEffect, type ReactNode, type CSSProperties } from "react";

interface LiquidGlassProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  radius?: number;
  /** "dark" = on the video hero, "light" = on white sections */
  surface?: "dark" | "light";
  /** Visual intensity of the glass effect */
  intensity?: "soft" | "medium" | "strong";
  /** Apply SVG refraction distortion filter */
  refract?: boolean;
  as?: keyof HTMLElementTagNameMap;
  onClick?: () => void;
}

export function LiquidGlass({
  children,
  className = "",
  style,
  radius = 16,
  surface = "light",
  intensity = "medium",
  refract = false,
  as: Tag = "div",
  onClick,
}: LiquidGlassProps) {
  const elRef = useRef<HTMLElement>(null);

  // Track mouse position → update CSS custom properties for specular highlight
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--lg-mx", `${x}%`);
      el.style.setProperty("--lg-my", `${y}%`);
    };

    const handleMouseLeave = () => {
      el.style.setProperty("--lg-mx", "30%");
      el.style.setProperty("--lg-my", "0%");
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const cls = [
    "lg-base",
    `lg-surface-${surface}`,
    `lg-intensity-${intensity}`,
    refract ? "lg-refract" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Component = Tag as any;

  return (
    <Component
      ref={elRef}
      className={cls}
      style={{ borderRadius: radius, ...style }}
      onClick={onClick}
    >
      {/* Iridescent prismatic shimmer layer (behind content) */}
      <span className="lg-prism" aria-hidden="true" />
      {/* Top specular rim */}
      <span className="lg-rim" aria-hidden="true" />
      {/* Content */}
      <span className="lg-content">{children}</span>
    </Component>
  );
}
