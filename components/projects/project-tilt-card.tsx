"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { formatMonthYear } from "@/lib/utils";
import type { Project } from "@/types/project";

const gradients: Record<Project["visualTheme"], string> = {
  cyan: "from-cyan-300/20 via-cyan-400/5 to-transparent",
  blue: "from-blue-300/20 via-indigo-400/10 to-transparent",
  slate: "from-white/10 via-white/5 to-transparent"
};

export function ProjectTiltCard({
  project,
  onOpen
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 250, damping: 20 });
  const sry = useSpring(ry, { stiffness: 250, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Tilt uses local card coordinates so the transform stays smooth and GPU-friendly.
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 8);
    rx.set(-(py - 0.5) * 8);
  };

  const reset = () => {
    setHovered(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      whileTap={{ scale: 0.99 }}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className="group relative w-full rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradients[project.visualTheme]} opacity-80`} />
      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-base font-medium text-fg">{project.displayName}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{project.repoName}</p>
          </div>
          <div className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-xs text-muted">
            {project.primaryLanguage ?? "Project"}
          </div>
        </div>
        <p className="min-h-12 text-sm leading-6 text-muted">
          {project.description ?? "Project metadata is loaded from GitHub. Open for full details and links."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(project.tags.length ? project.tags : ["GitHub"]).slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-fg">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between text-xs text-muted">
          <span>{project.updatedAt ? `Updated ${formatMonthYear(project.updatedAt)}` : "GitHub project"}</span>
          <span className={`transition ${hovered ? "translate-x-0.5 text-accent" : ""}`}>Open ↗</span>
        </div>
      </div>
    </motion.button>
  );
}
