import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-fg">{siteConfig.domain}</p>
          <p className="mt-1 text-xs text-muted">
            {siteConfig.name} - {siteConfig.role}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            href={siteConfig.contact.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            GitHub
          </Link>
          <Link
            href={`mailto:${siteConfig.contact.email}`}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            Email
          </Link>
          <Link
            href={siteConfig.contact.discordInvite}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            Discord
          </Link>
          <Link
            href="#hero"
            className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 hover:bg-accent/15"
          >
            Top
          </Link>
        </div>
      </Container>
    </footer>
  );
}
