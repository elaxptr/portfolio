import { techStack } from "@/data/tech-stack";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionTransition } from "@/components/motion/section-transition";
import { TechIconGrid } from "@/components/tech/tech-icon-grid";

export function TechStackSection() {
  return (
    <SectionShell id="tech-stack">
      <SectionTransition />
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools and platforms used to ship production work."
        description="Interactive categories with subtle motion and hover feedback, designed to stay fast on desktop and mobile."
      />
      <TechIconGrid categories={techStack} />
    </SectionShell>
  );
}
