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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
