"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{title}</h2>
      <div className="mt-3 h-px w-full bg-line" />
      {subtitle && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{subtitle}</p>
      )}
    </motion.div>
  );
}
