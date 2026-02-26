import type { Project } from "@/types/project";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionTransition } from "@/components/motion/section-transition";
import { FeaturedProjectCards } from "@/components/projects/featured-project-card";
import { RepoArchiveGrid } from "@/components/projects/repo-archive-grid";

export function ProjectsSection({
  featuredProjects,
  archiveProjects,
  githubError
}: {
  featuredProjects: Project[];
  archiveProjects: Project[];
  githubError?: string | null;
}) {
  return (
    <SectionShell id="projects">
      <SectionTransition />
      <SectionHeading
        eyebrow="Projects"
        title="Selected work with live GitHub-backed metadata."
        description="Featured projects are curated. The archive grid is sourced from public repositories and gracefully degrades if the GitHub API is unavailable."
      />
      {githubError ? <div className="mb-5 rounded-xl border border-amber-300/20 bg-amber-300/5 px-4 py-3 text-sm text-amber-100/80">GitHub data is temporarily unavailable. Showing curated project entries with reduced metadata.</div> : null}
      <FeaturedProjectCards projects={featuredProjects} />
      <div className="mt-10">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent/80">Repository Archive</p>
        <RepoArchiveGrid projects={archiveProjects} />
      </div>
    </SectionShell>
  );
}
