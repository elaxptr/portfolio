"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export default function CustomCursor() {
  const reduced = useReducedMotionSafe();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35 });
  const sy = useSpring(y, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setEnabled(!coarse && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] h-5 w-5 rounded-full border border-accent/60 bg-accent/10 shadow-[0_0_24px_rgba(83,208,255,0.3)]"
      style={{ x: sx, y: sy }}
    />
  );
}
