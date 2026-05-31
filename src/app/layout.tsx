import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Saikiran Kotichintala — AI & Data Science Engineer",
  description:
    "Portfolio of Saikiran Kotichintala, a B.Tech CS (AI & Data Science) student at Ramdeobaba University. Specializing in machine learning, data engineering, full-stack development, and AI-powered applications.",
  keywords: [
    "Saikiran Kotichintala",
    "AI engineer",
    "data science",
    "machine learning",
    "full stack developer",
    "Python",
    "React",
    "portfolio",
    "Nagpur",
    "Ramdeobaba University",
  ],
  authors: [{ name: "Saikiran Kotichintala" }],
  openGraph: {
    title: "Saikiran Kotichintala — AI & Data Science Engineer",
    description:
      "Building intelligent systems and full-stack applications powered by data and ML.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* ── Liquid Glass SVG Filter Definitions ─────────── */}
        <svg
          style={{ display: "none", position: "absolute" }}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft refraction — nav, badges, chips */}
            <filter id="lg-refract-soft" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.018 0.024" numOctaves="3" seed="8" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>

            {/* Medium refraction — cards, form */}
            <filter id="lg-refract-med" x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="4" seed="3" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>

            {/* Specular rim lighting */}
            <filter id="lg-specular" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="5" result="noise" />
              <feSpecularLighting
                in="noise"
                surfaceScale="4"
                specularConstant="0.9"
                specularExponent="28"
                lightingColor="#ffffff"
                result="specLight"
              >
                <fePointLight x="-200" y="-300" z="500" />
              </feSpecularLighting>
              <feComposite in="specLight" in2="SourceAlpha" operator="in" result="rimClipped" />
              <feComposite in="SourceGraphic" in2="rimClipped" operator="arithmetic" k1="0" k2="1" k3="0.4" k4="0" />
            </filter>

            {/* Combined: refraction + specular (hero-level strong) */}
            <filter id="lg-full" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.020" numOctaves="4" seed="11" result="warp" />
              <feDisplacementMap in="SourceGraphic" in2="warp" scale="8" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feSpecularLighting
                in="warp"
                surfaceScale="5"
                specularConstant="0.7"
                specularExponent="22"
                lightingColor="#ffffff"
                result="specLight"
              >
                <fePointLight x="-300" y="-500" z="800" />
              </feSpecularLighting>
              <feComposite in="specLight" in2="displaced" operator="arithmetic" k1="0" k2="1" k3="0.35" k4="0" />
            </filter>
          </defs>
        </svg>

        {children}
      </body>
    </html>
  );
}
