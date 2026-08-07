"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EDUCATION_COUNT, SKILL_GROUPS, SPOKEN_COUNT } from "@/lib/rate-card";

export function Skills() {
  const t = useTranslations("skills");
  const spoken = Array.from({ length: SPOKEN_COUNT }, (_, i) => i);
  const education = Array.from({ length: EDUCATION_COUNT }, (_, i) => i);

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
            className="nm-raised rounded-2xl bg-background px-5 py-5"
          >
            <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              {t(`groups.${group.id}`)}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-4 grid gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div
          variants={fadeUp}
          className="nm-raised rounded-2xl bg-background px-5 py-5"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            {t("spokenTitle")}
          </h3>
          <ul className="mt-3 space-y-1.5">
            {spoken.map((i) => (
              <li key={i} className="text-sm text-foreground">
                {t(`spoken.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="nm-raised rounded-2xl bg-background px-5 py-5"
        >
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
            {t("educationTitle")}
          </h3>
          <ul className="mt-3 space-y-3">
            {education.map((i) => (
              <li key={i}>
                <p className="text-sm text-foreground">{t(`education.${i}.degree`)}</p>
                <p className="text-[13px] font-semibold text-ink">
                  {t(`education.${i}.school`)}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
