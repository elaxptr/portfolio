"use client";

import { motion } from "framer-motion";
import type { TechCategory } from "@/data/tech-stack";

export function TechIconGrid({ categories }: { categories: TechCategory[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <div key={category.title} className="glass-panel rounded-2xl p-5">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent/80">{category.title}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {category.items.map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -4, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-fg"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
