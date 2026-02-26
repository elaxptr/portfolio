"use client";

import { motion } from "framer-motion";
import type { TimelineItem as TimelineItemType } from "@/types/timeline";

export function TimelineItem({ item, isLast }: { item: TimelineItemType; isLast: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-accent/60 bg-accent/20 shadow-[0_0_18px_rgba(83,208,255,0.25)]" />
      {!isLast ? <span className="absolute left-[5px] top-5 h-[calc(100%+1rem)] w-px bg-white/10" /> : null}
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent/75">{item.dateLabel}</p>
      <h3 className="mt-2 text-base font-medium text-fg">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
    </motion.li>
  );
}
