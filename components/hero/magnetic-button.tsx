"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const reduced = useReducedMotionSafe();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.12);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={reduced ? undefined : { x: sx, y: sy }}>
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
          variant === "primary"
            ? "border border-accent/40 bg-accent/10 text-fg shadow-glow hover:border-accent/70 hover:bg-accent/15"
            : "border border-white/10 bg-white/5 text-fg hover:border-white/20 hover:bg-white/10",
          className
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
