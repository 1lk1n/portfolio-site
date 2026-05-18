"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Experience() {
  const t = useTranslations("experience");
  const jobIndices = [0, 1, 2, 3, 4, 5] as const;

  return (
    <AnimatedSection id="experience" alternate>
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <motion.div
        className="grid gap-6 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {jobIndices.map((i) => {
          const bullets = t.raw(`jobs.${i}.bullets`) as string[];
          return (
            <motion.article
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-cream p-6 shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-primary">{t(`jobs.${i}.role`)}</h3>
                <span className="text-sm text-foreground/60">{t(`jobs.${i}.period`)}</span>
              </div>
              <p className="mt-1 font-medium text-foreground">{t(`jobs.${i}.company`)}</p>
              <ul className="mt-4 space-y-2">
                {bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm text-foreground/75">
                    <span className="text-primary">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </motion.div>
    </AnimatedSection>
  );
}
