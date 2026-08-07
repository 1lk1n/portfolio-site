"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { FACTS } from "@/lib/rate-card";

export function TrackRecord() {
  const t = useTranslations("trackRecord");

  return (
    <AnimatedSection id="record">
      <SectionHeading title={t("title")} subtitle={t("intro")} />

      <motion.div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {FACTS.map((fact) => (
          <motion.div
            key={fact.id}
            variants={fadeUp}
            className="nm-raised rounded-2xl bg-background px-5 py-5"
          >
            <b className="block font-mono text-2xl font-bold tracking-tight text-ink md:text-[27px]">
              {fact.value}
            </b>
            <span className="mt-2 block text-xs leading-snug text-muted">
              {t(`facts.${fact.id}`)}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
