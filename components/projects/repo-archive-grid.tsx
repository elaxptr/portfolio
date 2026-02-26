import Link from "next/link";
import type { Project } from "@/types/project";
import { formatMonthYear } from "@/lib/utils";

export function RepoArchiveGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) {
    return <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm text-muted">Additional public repositories will appear here when GitHub metadata is available.</div>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-fg">{project.displayName}</p>
            <span className="text-xs text-muted group-hover:text-accent">↗</span>
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">{project.description ?? "Repository metadata loaded from GitHub."}</p>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
            <span>{project.primaryLanguage ?? "Repo"}</span>
            <span>{formatMonthYear(project.updatedAt) ?? ""}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
