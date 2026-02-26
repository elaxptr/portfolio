"use client";

import { motion } from "framer-motion";
import type { TechCategory } from "@/data/tech-stack";

export function SkillsVisualization({ categories }: { categories: TechCategory[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.05, duration: 0.45 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-accent/80">{category.title}</p>
          <div className="flex flex-wrap gap-2">
            {category.items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-fg">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
