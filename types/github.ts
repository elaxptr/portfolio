export type GitHubProfile = {
  login: string;
  name: string | null;
  avatarUrl: string | null;
  bio: string | null;
  htmlUrl: string;
  blog: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  fullName: string;
  htmlUrl: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazersCount: number;
  forksCount: number;
  pushedAt: string;
  updatedAt: string;
  createdAt: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
};
