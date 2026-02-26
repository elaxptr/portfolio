import Image from "next/image";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/about/about-section";
import { TechStackSection } from "@/components/tech/tech-stack-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { TimelineSection } from "@/components/timeline/timeline-section";
import { ContactSection } from "@/components/contact/contact-section";
import { SiteFooter } from "@/components/footer/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { timelineItems } from "@/data/timeline";
import { siteConfig } from "@/data/site";
import { getPortfolioGitHubData } from "@/lib/github";
import { buildPortfolioProjects } from "@/lib/projects";
import { Container } from "@/components/layout/container";

export default async function Page() {
  const { profile, repos, error } = await getPortfolioGitHubData(siteConfig.githubUsername);
  const { featuredProjects, archiveProjects } = buildPortfolioProjects(repos);

  return (
    <SiteShell>
      <HeroSection />
      <Container className="mt-6">
        <div className="glass-panel rounded-2xl p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-4">
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={`${siteConfig.name} GitHub avatar`}
                width={48}
                height={48}
                suppressHydrationWarning
                className="rounded-full border border-white/10"
              />
            ) : (
              <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5" aria-hidden />
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-fg">{profile?.name || siteConfig.name}</p>
              <p className="truncate text-sm text-muted">
                {profile?.bio || "GitHub profile metadata connected for live project updates."}
              </p>
            </div>
            <div className="ml-auto flex flex-wrap gap-2 text-xs text-muted">
              {typeof profile?.publicRepos === "number" ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Repos: {profile.publicRepos}</span>
              ) : null}
              {typeof profile?.followers === "number" ? (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Followers: {profile.followers}</span>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
      <AboutSection />
      <TechStackSection />
      <ProjectsSection
        featuredProjects={featuredProjects}
        archiveProjects={archiveProjects.slice(0, 9)}
        githubError={error}
      />
      <TimelineSection items={timelineItems} />
      <ContactSection />
      <SiteFooter />
    </SiteShell>
  );
}
