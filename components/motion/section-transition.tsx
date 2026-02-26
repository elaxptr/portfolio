"use client";

import { motion } from "framer-motion";
import { sectionLine } from "@/lib/motion";

export function SectionTransition() {
  return (
    <motion.div
      className="mb-8 h-px origin-left bg-gradient-to-r from-accent/70 via-white/30 to-transparent"
      variants={sectionLine}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    />
  );
}
