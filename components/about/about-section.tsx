import { siteConfig } from "@/data/site";
import { techStack } from "@/data/tech-stack";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillCard } from "@/components/about/skill-card";
import { SkillsVisualization } from "@/components/about/skills-visualization";
import { Reveal } from "@/components/motion/reveal";
import { SectionTransition } from "@/components/motion/section-transition";

export function AboutSection() {
  return (
    <SectionShell id="about">
      <SectionTransition />
      <SectionHeading eyebrow="About" title="Minimal, technical, and delivery-focused." description={siteConfig.about.summary} />
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <Reveal>
            <SkillCard title="Engineering Approach" description="Build practical systems with strong UX polish and maintainable implementation details." />
          </Reveal>
          <Reveal delay={0.05}>
            <SkillCard title="Current Focus" description="Freelance delivery, modern web apps, API-backed products, and automation-oriented tooling." />
          </Reveal>
          <Reveal delay={0.1}>
            <SkillCard title="Experience Arc" description={siteConfig.about.highlights.join(" • ")} />
          </Reveal>
        </div>
        <Reveal delay={0.08}>
          <div className="glass-panel rounded-2xl p-5 sm:p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent/80">Skills Visualization</p>
            <SkillsVisualization categories={techStack} />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
