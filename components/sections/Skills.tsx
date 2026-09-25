"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SKILL_GROUPS, SPOKEN_COUNT } from "@/lib/rate-card";

export function Skills() {
  const t = useTranslations("skills");
  const spoken = Array.from({ length: SPOKEN_COUNT }, (_, i) => i);

  return (
    <AnimatedSection id="skills">
      <SectionHeading title={t("title")} subtitle={t("intro")} />

      <motion.div
        className="grid gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div
            key={group.id}
            variants={fadeUp}
            className="rounded-3xl bg-surface px-6 py-6"
          >
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t(`groups.${group.id}`)}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Sits in the same grid so the odd number of stack groups still
            closes the two columns evenly. */}
        <motion.div variants={fadeUp} className="rounded-3xl bg-surface px-6 py-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t("spokenTitle")}
          </h3>
          <ul className="mt-4 space-y-1.5">
            {spoken.map((i) => (
              <li key={i} className="text-sm text-foreground">
                {t(`spoken.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
