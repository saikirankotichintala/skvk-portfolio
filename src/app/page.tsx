import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CursorGlow } from "@/components/CursorGlow";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/SectionReveal";

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Global UI chrome */}
      <CursorGlow />
      <ScrollProgress />
      <Navigation />

      {/* Main content */}
      <main id="main-content">
        {/* Hero — has its own entrance animations */}
        <HeroSection />

        <SectionReveal delay={0}>
          <AboutSection />
        </SectionReveal>

        <SectionReveal delay={0.05} direction="up">
          <SkillsSection />
        </SectionReveal>

        <SectionReveal delay={0.05} direction="up">
          <ProjectsSection />
        </SectionReveal>

        <SectionReveal delay={0.05} direction="up">
          <ExperienceSection />
        </SectionReveal>

        <SectionReveal delay={0.05} direction="up">
          <ContactSection />
        </SectionReveal>
      </main>

      <SectionReveal delay={0} direction="fade">
        <Footer />
      </SectionReveal>
    </SmoothScrollProvider>
  );
}
