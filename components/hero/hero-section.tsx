"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { MagneticButton } from "@/components/hero/magnetic-button";
import { TypingTagline } from "@/components/hero/typing-tagline";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Container } from "@/components/layout/container";

const HeroCanvas = dynamic(() => import("@/components/hero/hero-canvas").then((m) => m.HeroCanvas), {
  ssr: false
});

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden hero-noise">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_35%,rgba(83,208,255,0.15),transparent_45%),radial-gradient(circle_at_75%_30%,rgba(120,140,255,0.16),transparent_40%)]" />
      <div className="absolute inset-0 opacity-60">
        <HeroCanvas />
      </div>
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel rounded-3xl border border-white/10 p-6 shadow-glow sm:p-8"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-accent/90">elaxptr.dev</p>
            <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
              {siteConfig.name}
              <span className="mt-2 block text-gradient">{siteConfig.role}</span>
            </h1>
            <div className="mt-5 min-h-14">
              <TypingTagline phrases={siteConfig.heroTypingPhrases} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#projects">View Projects</MagneticButton>
              <MagneticButton href="#contact" variant="secondary">
                Contact Me
              </MagneticButton>
            </div>
          </motion.div>
          <ParallaxLayer strength={18} scrollStrength={-0.03} className="relative hidden lg:block">
            <div className="pointer-events-none relative mx-auto aspect-square w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.025]">
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-accent/90 shadow-[0_0_24px_rgba(83,208,255,0.8)]" />
              <div className="absolute right-8 top-10 h-20 w-20 rounded-full bg-accent/10 blur-2xl" />
              <div className="absolute bottom-10 left-10 h-28 w-28 rounded-full bg-accent2/10 blur-2xl" />
              <div className="absolute bottom-8 right-8 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 font-mono text-xs text-muted">
                Performance-first motion
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </Container>
    </section>
  );
}
