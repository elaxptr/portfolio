"use client";

import { motion, type MotionProps } from "framer-motion";
import { reveal } from "@/lib/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: MotionProps & { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reveal.hidden,
        visible: {
          ...reveal.visible,
          transition: { ...reveal.visible.transition, delay }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
