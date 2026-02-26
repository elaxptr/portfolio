import { featuredProjectsConfig } from "@/data/featured-projects";
import type { GitHubRepo } from "@/types/github";
import type { Project, FeaturedProjectConfig } from "@/types/project";
import { toTitleFromRepoName } from "@/lib/utils";

function normalizeProjectUrl(url?: string | null) {
  if (!url) return undefined;
  return url.replace("revcodeshq.github.io", "elaxptr.github.io");
}

function buildProjectFromRepo(repo: GitHubRepo, config?: FeaturedProjectConfig): Project {
  const repoDescription = repo.description?.trim() || null;
  const description = config?.description ?? repoDescription;

  return {
    id: String(repo.id),
    repoName: repo.name,
    displayName: config?.displayName ?? toTitleFromRepoName(repo.name),
    description,
    longDescription: config?.longDescription,
    githubUrl: repo.htmlUrl,
    demoUrl: normalizeProjectUrl(config?.demoUrl) || normalizeProjectUrl(repo.homepage),
    featured: Boolean(config),
    featuredOrder: config?.featuredOrder,
    tags: config?.tags?.length ? config.tags : repo.topics.slice(0, 4),
    primaryLanguage: repo.language ?? undefined,
    stars: repo.stargazersCount,
    forks: repo.forksCount,
    updatedAt: repo.updatedAt,
    isArchived: repo.archived,
    isFork: repo.fork,
    visualTheme: config?.visualTheme ?? "slate"
  };
}

function fallbackFeatured(config: FeaturedProjectConfig): Project {
  return {
    id: config.repoName,
    repoName: config.repoName,
    displayName: config.displayName ?? toTitleFromRepoName(config.repoName),
    description: config.description ?? null,
    longDescription: config.longDescription,
    githubUrl: `https://github.com/elaxptr/${config.repoName}`,
    demoUrl: normalizeProjectUrl(config.demoUrl),
    featured: true,
    featuredOrder: config.featuredOrder,
    tags: config.tags ?? [],
    isArchived: false,
    isFork: false,
    visualTheme: config.visualTheme ?? "slate"
  };
}

export function buildPortfolioProjects(repos: GitHubRepo[]) {
  const publicRepos = repos.filter((repo) => !repo.private);
  const configByRepo = new Map(featuredProjectsConfig.map((item) => [item.repoName.toLowerCase(), item]));
  const repoByName = new Map(publicRepos.map((repo) => [repo.name.toLowerCase(), repo]));

  const featuredProjects = featuredProjectsConfig
    .map((config) => {
      const repo = repoByName.get(config.repoName.toLowerCase());
      return repo ? buildProjectFromRepo(repo, config) : fallbackFeatured(config);
    })
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));

  const featuredSet = new Set(featuredProjects.map((p) => p.repoName.toLowerCase()));

  const archiveProjects = publicRepos
    .filter((repo) => !featuredSet.has(repo.name.toLowerCase()))
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => buildProjectFromRepo(repo))
    .sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    });

  return { featuredProjects, archiveProjects };
}
