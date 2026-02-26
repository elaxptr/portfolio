import type { FeaturedProjectConfig } from "@/types/project";

// Intentionally minimal to avoid inventing details; GitHub metadata fills the rest.
export const featuredProjectsConfig: FeaturedProjectConfig[] = [
  {
    repoName: "lumina-saas",
    featuredOrder: 1,
    displayName: "Lumina SaaS",
    visualTheme: "cyan"
  },
  {
    repoName: "novus-website",
    featuredOrder: 2,
    displayName: "Novus Website",
    visualTheme: "blue"
  },
  {
    repoName: "BBGbot",
    featuredOrder: 3,
    displayName: "BBGbot",
    visualTheme: "slate"
  },
  {
    repoName: "lumina-api",
    featuredOrder: 4,
    displayName: "Lumina API",
    visualTheme: "cyan"
  }
];
