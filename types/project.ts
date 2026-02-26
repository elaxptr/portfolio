export type ProjectVisualTheme = "cyan" | "blue" | "slate";

export type Project = {
  id: string;
  repoName: string;
  displayName: string;
  description: string | null;
  longDescription?: string;
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  featuredOrder?: number;
  tags: string[];
  primaryLanguage?: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isArchived: boolean;
  isFork: boolean;
  visualTheme: ProjectVisualTheme;
};

export type FeaturedProjectConfig = {
  repoName: string;
  displayName?: string;
  featuredOrder: number;
  description?: string;
  longDescription?: string;
  demoUrl?: string;
  tags?: string[];
  visualTheme?: ProjectVisualTheme;
};
