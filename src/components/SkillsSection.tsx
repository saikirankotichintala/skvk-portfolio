"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkillsBackground } from "./SkillsBackground";

/* ── Accurate brand SVG icons (Simple Icons paths) ───────── */
// bg values are now dark-vivid for use on the dark video background
const ICONS: Record<string, { svg: React.ReactNode; color: string; bg: string }> = {

  /* Python – official two-tone logo */
  Python: {
    color: "#FFD43B", bg: "rgba(55, 118, 171, 0.35)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.008 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.031v-2.867s-.109-3.404 3.345-3.404h5.766s3.236.052 3.236-3.127V3.242S18.28 0 11.914 0zM8.708 1.87a1.044 1.044 0 1 1 0 2.087 1.044 1.044 0 0 1 0-2.087z" fill="#3776AB"/>
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.132S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.031v2.867s.109 3.404-3.345 3.404H9.455s-3.236-.052-3.236 3.127v5.289S5.72 24 12.086 24zm3.206-1.87a1.044 1.044 0 1 1 0-2.087 1.044 1.044 0 0 1 0 2.087z" fill="#FFD43B"/>
      </svg>
    ),
  },

  /* Scikit-learn – actual Simple Icons path */
  "Scikit-learn": {
    color: "#F7931E", bg: "rgba(247, 147, 30, 0.22)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M12 0C8.175 0 5.01 2.025 3.372 5.028A6.066 6.066 0 0 0 0 10.419c0 3.37 2.745 6.099 6.132 6.099a6.139 6.139 0 0 0 4.358-1.798C9.975 16.418 9.506 18.66 9.506 21c0 1.657 1.343 3 3 3s3-1.343 3-3c0-2.34-.47-4.582-.984-6.279a6.14 6.14 0 0 0 4.358 1.798C22.254 16.519 25 13.79 25 10.42a6.066 6.066 0 0 0-3.372-5.391C19.99 2.025 16.825 0 12 0zM7.9 9.96a2.073 2.073 0 1 1 0-4.147 2.073 2.073 0 0 1 0 4.147zm8.2 0a2.073 2.073 0 1 1 0-4.147 2.073 2.073 0 0 1 0 4.147z" fill="#F7931E"/>
      </svg>
    ),
  },

  /* Pandas – official column-bar logo */
  Pandas: {
    color: "#c8b8ff", bg: "rgba(100, 60, 200, 0.30)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M9.025.375H7.03v7.156H9.025V.375zM16.97.375h-1.995v7.156h1.995V.375zM9.025 9.594H7.03v4.781H9.025V9.594zM16.97 12.015h-1.995v4.781h1.995v-4.781zM9.025 16.469H7.03V23.625H9.025V16.469zM16.97 16.469h-1.995V23.625h1.995V16.469zM6.01 3.75H4.015v6H6.01v-6zM3.015 6.75H1.02v6h1.995v-6zM18.985 6.75H16.99v6h1.995v-6zM21.98 3.75h-1.995v6h1.995v-6zM6.01 14.25H4.015v6H6.01v-6zM3.015 17.25H1.02v6h1.995v-6zM18.985 17.25H16.99v6h1.995v-6zM21.98 14.25h-1.995v6h1.995v-6z" fill="#c8b8ff"/>
      </svg>
    ),
  },

  /* NumPy – official hexagonal logo */
  NumPy: {
    color: "#4fc3f7", bg: "rgba(1, 50, 67, 0.40)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M11.517 0L.374 6.147v11.706L11.517 24l11.143-6.147V6.147zm0 1.25l9.977 5.504v11.009l-9.977 5.504-9.977-5.504V6.754zm-4.31 3.48v3.63H3.56v1.23h3.647v3.68H8.47v-3.68h3.648V8.36H8.47V4.73zm5.918 0v3.63h-1.23v1.23h1.23v3.68h3.648V12.34h-3.648V8.36h3.648V7.13h-3.648V4.73z" fill="#4fc3f7"/>
      </svg>
    ),
  },

  /* Matplotlib – their actual logo circle+M */
  Matplotlib: {
    color: "#81d4fa", bg: "rgba(17, 85, 124, 0.35)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <circle cx="12" cy="12" r="11" fill="none" stroke="#81d4fa" strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="#81d4fa" strokeWidth="1"/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="#E8762C" strokeWidth="1"/>
        <circle cx="12" cy="12" r="1.5" fill="#E8762C"/>
        {/* M letter */}
        <path d="M7 15.5V9l2.5 4 2.5-4v6.5M14.5 9v6.5M14.5 9l2.5 6.5" fill="none" stroke="#81d4fa" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },

  /* EDA – bar chart with magnifier */
  "Exploratory Data Analysis": {
    color: "#60a5fa", bg: "rgba(0, 102, 255, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect x="3" y="14" width="3" height="6" rx="1" fill="#60a5fa" opacity="0.4"/>
        <rect x="8" y="10" width="3" height="10" rx="1" fill="#60a5fa" opacity="0.65"/>
        <rect x="13" y="6" width="3" height="14" rx="1" fill="#60a5fa"/>
        <circle cx="18.5" cy="6.5" r="3.5" stroke="#60a5fa" strokeWidth="1.6"/>
        <line x1="21" y1="9" x2="23" y2="11" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },

  /* React – official atom logo */
  "React / JavaScript": {
    color: "#61DAFB", bg: "rgba(32, 35, 42, 0.50)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <circle cx="12" cy="12" r="2.139" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.3" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },

  /* Flask – actual Simple Icons Flask path */
  "Python Flask": {
    color: "#e2e8f0", bg: "rgba(255, 255, 255, 0.12)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M14.78 8.37c.15.2.27.49.27.8 0 1.35-1.63 2.46-3.68 2.46-2.05 0-3.68-1.11-3.68-2.46 0-.3.12-.59.27-.8C5.87 9.43 4.5 11.18 4.5 13.22 4.5 16.65 7.9 19.5 12 19.5s7.5-2.85 7.5-6.28c0-2.04-1.37-3.79-3.72-4.85zM12 1.5C9.47 1.5 7.5 3.1 7.5 5.18v.23c.74-.25 1.55-.4 2.41-.44v-.05c0-.78.92-1.42 2.09-1.42s2.09.64 2.09 1.42v.05c.86.04 1.67.19 2.41.44v-.23C16.5 3.1 14.53 1.5 12 1.5z" fill="#000"/>
        <path d="M9.91 4.92v-.03c0-.78.92-1.42 2.09-1.42s2.09.64 2.09 1.42v.03c-.67-.07-1.37-.11-2.09-.11s-1.42.04-2.09.11z" fill="#fff" opacity="0.2"/>
      </svg>
    ),
  },

  /* MongoDB – official leaf */
  MongoDB: {
    color: "#6ee7a0", bg: "rgba(71, 162, 72, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218z" fill="#47A248"/>
      </svg>
    ),
  },

  /* HTML5 – official shield */
  "HTML / CSS": {
    color: "#fca5a5", bg: "rgba(227, 79, 38, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
  },

  /* SQL / PostgreSQL cylinder */
  SQL: {
    color: "#93c5fd", bg: "rgba(51, 103, 145, 0.30)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M12 2C7.03 2 3 3.794 3 6v12c0 2.206 4.03 4 9 4s9-1.794 9-4V6c0-2.206-4.03-4-9-4zm7 14c0 1.103-3.14 2.5-7 2.5S5 17.103 5 16v-2.127C6.763 14.9 9.26 15.5 12 15.5s5.237-.6 7-1.627V16zm0-5c0 1.103-3.14 2.5-7 2.5S5 12.103 5 11V8.873C6.763 9.9 9.26 10.5 12 10.5s5.237-.6 7-1.627V11zm-7-3C7.14 8 4 6.603 4 5.5S7.14 3 12 3s8 1.397 8 2.5S16.86 8 12 8z" fill="#93c5fd"/>
      </svg>
    ),
  },

  /* Plotly / Dash – official Plotly icon */
  "Dash (Plotly)": {
    color: "#a5b4fc", bg: "rgba(63, 79, 117, 0.35)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 1 1 0 19.2A9.6 9.6 0 0 1 12 2.4zm-4.8 4.8v9.6h1.6V7.2H7.2zm3.2 3.2v6.4h1.6v-6.4h-1.6zm3.2-1.6v8h1.6v-8h-1.6zm3.2 3.2v4.8h1.6v-4.8h-1.6z" fill="#a5b4fc"/>
      </svg>
    ),
  },

  /* Git – official logo */
  "Git / GitHub": {
    color: "#fda4af", bg: "rgba(240, 80, 50, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" fill="#F05032"/>
      </svg>
    ),
  },

  /* Jupyter – actual logo (three circles + ring) */
  "Jupyter Notebook": {
    color: "#fdba74", bg: "rgba(243, 118, 38, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M7.157 22.201A1.784 1.784 0 0 1 5.374 24a1.784 1.784 0 0 1-1.784-1.799 1.784 1.784 0 0 1 1.784-1.784 1.784 1.784 0 0 1 1.783 1.784zM20.582 1.427a1.176 1.176 0 0 1-1.177 1.174 1.176 1.176 0 0 1-1.174-1.174A1.176 1.176 0 0 1 19.405.252a1.176 1.176 0 0 1 1.177 1.175zM9.169 2.753a1.687 1.687 0 0 1-1.688 1.688 1.687 1.687 0 0 1-1.688-1.688 1.687 1.687 0 0 1 1.688-1.688 1.687 1.687 0 0 1 1.688 1.688z" fill="#9E9E9E"/>
        <path d="M12 2.577c-5.177 0-9.373 4.195-9.373 9.373 0 5.177 4.196 9.372 9.373 9.372s9.373-4.195 9.373-9.372c0-5.178-4.196-9.373-9.373-9.373zm0 1.497c4.348 0 7.876 3.528 7.876 7.876S16.348 19.826 12 19.826 4.124 16.298 4.124 11.95 7.652 4.074 12 4.074z" fill="#F37626"/>
        <path d="M8.908 12.437c.766 1.827 2.574 3.11 4.683 3.11a5.07 5.07 0 0 0 4.684-3.11" fill="none" stroke="#F37626" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.725 11.475c.766-1.827 2.574-3.11 4.683-3.11a5.07 5.07 0 0 1 4.684 3.11" fill="none" stroke="#9E9E9E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },

  /* Google Cloud – official multicolor logo */
  "Google Cloud": {
    color: "#93c5fd", bg: "rgba(66, 133, 244, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M6.19 6.935l-1.267-1.267A7.956 7.956 0 0 0 3.6 10.6h1.8a6.172 6.172 0 0 1 .79-3.665z" fill="#EA4335"/>
        <path d="M12 4.4a6.15 6.15 0 0 1 3.917 1.408L17.197 4.53A7.953 7.953 0 0 0 12 2.6c-2.952 0-5.526 1.6-6.914 3.981l1.556 1.556A6.176 6.176 0 0 1 12 4.4z" fill="#4285F4"/>
        <path d="M12 18.4a6.176 6.176 0 0 1-5.505-3.386L4.94 16.57A7.953 7.953 0 0 0 12 21.4a7.95 7.95 0 0 0 5.18-1.916l-1.531-1.531A6.148 6.148 0 0 1 12 18.4z" fill="#34A853"/>
        <path d="M20.4 10.6h-8.4v2.8h5.356A5.342 5.342 0 0 1 15.649 15.953l1.531 1.531A7.956 7.956 0 0 0 19.8 12c0-.476-.044-.94-.127-1.4h.727z" fill="#FBBC05"/>
        <path d="M17.197 4.53A7.953 7.953 0 0 1 19.8 12c0 .476-.044.94-.127 1.4H20.4a8.1 8.1 0 0 0 .2-1.8 8.052 8.052 0 0 0-2.135-5.462L17.197 4.53z" fill="#4285F4"/>
      </svg>
    ),
  },

  /* Groq / LLaMA – AI chip icon */
  "Groq API / LLaMA 3": {
    color: "#c4b5fd", bg: "rgba(110, 86, 207, 0.28)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect x="6" y="6" width="12" height="12" rx="3" stroke="#c4b5fd" strokeWidth="1.8"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#c4b5fd" opacity="0.25"/>
        <line x1="9" y1="3" x2="9" y2="6" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="15" y1="3" x2="15" y2="6" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="9" y1="18" x2="9" y2="21" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="15" y1="18" x2="15" y2="21" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="3" y1="9" x2="6" y2="9" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="3" y1="15" x2="6" y2="15" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="18" y1="9" x2="21" y2="9" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="18" y1="15" x2="21" y2="15" stroke="#c4b5fd" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },

  /* OOP / DSA – class hierarchy tree */
  "OOP / DSA": {
    color: "#d8b4fe", bg: "rgba(124, 58, 237, 0.28)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <rect x="8" y="1" width="8" height="5" rx="1.5" fill="#d8b4fe" opacity="0.85"/>
        <line x1="12" y1="6" x2="12" y2="9" stroke="#d8b4fe" strokeWidth="1.5"/>
        <line x1="6" y1="9" x2="18" y2="9" stroke="#d8b4fe" strokeWidth="1.5"/>
        <line x1="6" y1="9" x2="6" y2="12" stroke="#d8b4fe" strokeWidth="1.5"/>
        <line x1="18" y1="9" x2="18" y2="12" stroke="#d8b4fe" strokeWidth="1.5"/>
        <rect x="2" y="12" width="8" height="5" rx="1.5" fill="#d8b4fe" opacity="0.6"/>
        <rect x="14" y="12" width="8" height="5" rx="1.5" fill="#d8b4fe" opacity="0.6"/>
      </svg>
    ),
  },

  /* Problem Solving – lightbulb */
  "Problem Solving": {
    color: "#7dd3fc", bg: "rgba(14, 165, 233, 0.25)",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
        <path d="M12 2a7 7 0 0 1 4 12.8V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.2A7 7 0 0 1 12 2z" stroke="#7dd3fc" strokeWidth="1.7" fill="#7dd3fc" fillOpacity="0.15"/>
        <path d="M9 19h6M10 21h4" stroke="#7dd3fc" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M10 14.5v-2l-1.5-2M14 14.5v-2l1.5-2" stroke="#7dd3fc" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="12" cy="8" r="1.5" fill="#7dd3fc"/>
      </svg>
    ),
  },

  /* Google Cloud (cert) re-exported below */
  "__gcert__": {
    color: "#4285F4", bg: "#EBF1FE",
    svg: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
        <path d="M6.19 6.935l-1.267-1.267A7.956 7.956 0 0 0 3.6 10.6h1.8a6.172 6.172 0 0 1 .79-3.665z" fill="#EA4335"/>
        <path d="M12 4.4a6.15 6.15 0 0 1 3.917 1.408L17.197 4.53A7.953 7.953 0 0 0 12 2.6c-2.952 0-5.526 1.6-6.914 3.981l1.556 1.556A6.176 6.176 0 0 1 12 4.4z" fill="#4285F4"/>
        <path d="M12 18.4a6.176 6.176 0 0 1-5.505-3.386L4.94 16.57A7.953 7.953 0 0 0 12 21.4a7.95 7.95 0 0 0 5.18-1.916l-1.531-1.531A6.148 6.148 0 0 1 12 18.4z" fill="#34A853"/>
        <path d="M20.4 10.6h-8.4v2.8h5.356A5.342 5.342 0 0 1 15.649 15.953l1.531 1.531A7.956 7.956 0 0 0 19.8 12c0-.476-.044-.94-.127-1.4h.727z" fill="#FBBC05"/>
      </svg>
    ),
  },
};

/* ── Certifications with icons ────────────────────────────── */
const CERTS = [
  {
    name: "Google Cloud Career Launchpad",
    sub: "Cloud Computing Foundations",
    bg: "#EBF1FE",
    iconBg: "white",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M6.19 6.935l-1.267-1.267A7.956 7.956 0 0 0 3.6 10.6h1.8a6.172 6.172 0 0 1 .79-3.665z" fill="#EA4335"/>
        <path d="M12 4.4a6.15 6.15 0 0 1 3.917 1.408L17.197 4.53A7.953 7.953 0 0 0 12 2.6c-2.952 0-5.526 1.6-6.914 3.981l1.556 1.556A6.176 6.176 0 0 1 12 4.4z" fill="#4285F4"/>
        <path d="M12 18.4a6.176 6.176 0 0 1-5.505-3.386L4.94 16.57A7.953 7.953 0 0 0 12 21.4a7.95 7.95 0 0 0 5.18-1.916l-1.531-1.531A6.148 6.148 0 0 1 12 18.4z" fill="#34A853"/>
        <path d="M20.4 10.6h-8.4v2.8h5.356A5.342 5.342 0 0 1 15.649 15.953l1.531 1.531A7.956 7.956 0 0 0 19.8 12c0-.476-.044-.94-.127-1.4h.727z" fill="#FBBC05"/>
        <path d="M17.197 4.53A7.953 7.953 0 0 1 19.8 12c0 .476-.044.94-.127 1.4H20.4a8.1 8.1 0 0 0 .2-1.8 8.052 8.052 0 0 0-2.135-5.462L17.197 4.53z" fill="#4285F4"/>
      </svg>
    ),
  },
  {
    name: "Deloitte Data Analytics",
    sub: "Job Simulation Certificate",
    bg: "#F3FAED",
    iconBg: "white",
    icon: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        {/* Deloitte green dot logo mark */}
        <text x="3" y="18" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="900" fill="#86BC25">D.</text>
        <circle cx="18" cy="18" r="3" fill="#86BC25"/>
      </svg>
    ),
  },
];

const SKILL_CATEGORIES = [
  {
    id: "ai-ml",
    label: "AI & ML",
    skills: [
      { name: "Python",                    pct: 88 },
      { name: "Scikit-learn",              pct: 82 },
      { name: "Pandas",                    pct: 86 },
      { name: "NumPy",                     pct: 84 },
      { name: "Matplotlib",                pct: 80 },
      { name: "Exploratory Data Analysis", pct: 85 },
    ],
  },
  {
    id: "web",
    label: "Web & Backend",
    skills: [
      { name: "React / JavaScript", pct: 80 },
      { name: "Python Flask",       pct: 78 },
      { name: "MongoDB",            pct: 72 },
      { name: "HTML / CSS",         pct: 82 },
      { name: "SQL",                pct: 78 },
      { name: "Dash (Plotly)",      pct: 68 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Cloud",
    skills: [
      { name: "Git / GitHub",       pct: 85 },
      { name: "Jupyter Notebook",   pct: 90 },
      { name: "Google Cloud",       pct: 65 },
      { name: "Groq API / LLaMA 3", pct: 70 },
      { name: "OOP / DSA",          pct: 72 },
      { name: "Problem Solving",    pct: 80 },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("ai-ml");
  const active = SKILL_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <section
      id="skills"
      className="section"
      aria-label="Skills and technologies"
      style={{ overflow: "hidden", position: "relative", background: "#05081a" }}
    >
      {/* Seamless Premium Canvas Background */}
      <SkillsBackground />

      <div className="container" style={{ position: "relative", zIndex: 10 }}>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "0.75rem" }}
        >
          <span className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>Skills</span>
        </motion.div>

        {/* Headline + Tabs row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <motion.h2
            className="text-headline"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: "#ffffff" }}
          >
            The tools I<br />work with.
          </motion.h2>

          {/* Category pill tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "flex",
              gap: "0.4rem",
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              padding: "5px",
              borderRadius: "100px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            }}
            role="tablist"
            aria-label="Skill categories"
          >
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "0.45rem 1.1rem",
                  borderRadius: "100px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.825rem",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeCategory === cat.id ? "rgba(255,255,255,0.92)" : "transparent",
                  color: activeCategory === cat.id ? "#0a0a0a" : "rgba(255,255,255,0.55)",
                  boxShadow: activeCategory === cat.id ? "0 2px 12px rgba(0,0,0,0.25)" : "none",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
            }}
          >
            {active.skills.map((skill) => {
              const ic = ICONS[skill.name];
              return (
                <motion.div
                  key={skill.name}
                  variants={cardVariants}
                  whileHover={{ scale: 1.04, y: -5 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  style={{
                    borderRadius: "24px",
                    padding: "1.375rem 1.375rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.06)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.875rem",
                    cursor: "default",
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      background: ic?.bg ?? "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {ic?.svg ?? <span style={{ fontSize: "1.5rem" }}>🔧</span>}
                  </div>

                  {/* Name */}
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.90)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {skill.name}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            marginTop: "3rem",
            padding: "1.75rem",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.06)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              marginBottom: "1.25rem",
            }}
          >
            Certifications
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "18px",
                  flex: "1 1 260px",
                }}
              >
                {/* Icon — same size & style as skill icon bubbles */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    minWidth: "48px",
                    borderRadius: "14px",
                    background: cert.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.10)",
                  }}
                >
                  {cert.icon}
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.92)",
                      lineHeight: 1.3,
                    }}
                  >
                    {cert.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.45)",
                      marginTop: "3px",
                    }}
                  >
                    {cert.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
