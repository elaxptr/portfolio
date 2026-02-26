import type { GitHubProfile, GitHubRepo } from "@/types/github";

const API_BASE = "https://api.github.com";

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function githubFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: githubHeaders(),
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status} for ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function getGitHubProfile(username: string): Promise<GitHubProfile> {
  const raw = await githubFetch<any>(`/users/${username}`);
  return {
    login: raw.login,
    name: raw.name,
    avatarUrl: raw.avatar_url,
    bio: raw.bio,
    htmlUrl: raw.html_url,
    blog: raw.blog,
    location: raw.location,
    publicRepos: raw.public_repos,
    followers: raw.followers,
    following: raw.following
  };
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const raw = await githubFetch<any[]>(
    `/users/${username}/repos?per_page=100&sort=updated&direction=desc`
  );
  return raw.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description,
    homepage: repo.homepage,
    language: repo.language,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    stargazersCount: repo.stargazers_count,
    forksCount: repo.forks_count,
    pushedAt: repo.pushed_at,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    archived: repo.archived,
    fork: repo.fork,
    private: repo.private
  }));
}

export async function getPortfolioGitHubData(username: string) {
  try {
    const [profile, repos] = await Promise.all([
      getGitHubProfile(username),
      getGitHubRepos(username)
    ]);
    return { profile, repos, error: null as string | null };
  } catch (error) {
    return {
      profile: null,
      repos: [],
      error: error instanceof Error ? error.message : "Unknown GitHub fetch error"
    };
  }
}
