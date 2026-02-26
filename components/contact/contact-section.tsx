"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionTransition } from "@/components/motion/section-transition";
import { GlassPanel } from "@/components/ui/glass-panel";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <SectionShell id="contact" className="pb-16">
      <SectionTransition />
      <SectionHeading
        eyebrow="Contact"
        title="Open to freelance work and collaborations."
        description="Reach out directly by email, check the GitHub profile, or join the Discord server."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GlassPanel className="p-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">Email</p>
          <p className="mt-3 break-all text-sm text-fg">{siteConfig.contact.email}</p>
          <div className="mt-4 flex gap-2">
            <Link href={`mailto:${siteConfig.contact.email}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-fg hover:bg-white/10">
              Send Email
            </Link>
            <button type="button" onClick={copyEmail} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-fg hover:bg-white/10">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">GitHub</p>
          <p className="mt-3 text-sm text-fg">github.com/elaxptr</p>
          <Link href={siteConfig.contact.github} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-fg hover:bg-white/10">
            Visit Profile ↗
          </Link>
        </GlassPanel>
        <GlassPanel className="p-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent/80">Discord</p>
          <p className="mt-3 text-sm text-fg">discord.gg/ArJ3kFc3Dj</p>
          <Link href={siteConfig.contact.discordInvite} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-fg hover:bg-white/10">
            Join Server ↗
          </Link>
        </GlassPanel>
      </div>
    </SectionShell>
  );
}
