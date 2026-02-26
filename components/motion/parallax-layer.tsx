"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion-safe";

export function ParallaxLayer({
  children,
  strength = 12,
  scrollStrength = 0,
  className
}: {
  children: React.ReactNode;
  strength?: number;
  scrollStrength?: number;
  className?: string;
}) {
  const reduced = useReducedMotionSafe();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 18 });
  const sy = useSpring(y, { stiffness: 120, damping: 18 });
  const sscrollY = useSpring(scrollY, { stiffness: 120, damping: 18 });
  const combinedY = useTransform([sy, sscrollY], (values) => {
    const [mouseY, scrollOffset] = values as [number, number];
    return mouseY + scrollOffset;
  });

  useEffect(() => {
    if (reduced) return;

    let frame = 0;
    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Normalize cursor to -0.5..0.5 and keep movement small for a subtle "depth" effect.
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        x.set(nx * strength);
        y.set(ny * strength);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduced, strength, x, y]);

  useEffect(() => {
    if (reduced || !scrollStrength) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        scrollY.set(window.scrollY * scrollStrength);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced, scrollStrength, scrollY]);

  return (
    <motion.div className={className} style={reduced ? undefined : { x: sx, y: scrollStrength ? combinedY : sy }}>
      {children}
    </motion.div>
  );
}
