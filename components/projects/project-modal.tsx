"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/types/project";
import { formatMonthYear } from "@/lib/utils";
import { useEffect } from "react";

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="glass-panel w-full max-w-2xl rounded-2xl p-6"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.99 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent/85">{project.repoName}</p>
                <h3 id="project-modal-title" className="mt-2 text-xl font-semibold text-fg sm:text-2xl">
                  {project.displayName}
                </h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-fg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                Close
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted">
              {project.longDescription || project.description || "Project details are available on GitHub."}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                <p className="text-muted">Primary language</p>
                <p className="mt-1 text-fg">{project.primaryLanguage ?? "Not available"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                <p className="text-muted">Last update</p>
                <p className="mt-1 text-fg">{formatMonthYear(project.updatedAt) ?? "Not available"}</p>
              </div>
            </div>
            {project.tags.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-fg">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-fg hover:border-accent/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                View Repository ↗
              </Link>
              {project.demoUrl ? (
                <Link href={project.demoUrl} target="_blank" rel="noreferrer" className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-fg hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                  Open Demo ↗
                </Link>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
