"use client";

import { useState } from "react";
import type { Project } from "@/types/project";
import { ProjectTiltCard } from "@/components/projects/project-tilt-card";
import { ProjectModal } from "@/components/projects/project-modal";

export function FeaturedProjectCards({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectTiltCard key={project.id} project={project} onOpen={setActive} />
        ))}
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}
