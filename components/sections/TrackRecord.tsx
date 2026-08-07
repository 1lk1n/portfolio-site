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
            className="rounded-3xl bg-surface px-6 py-6"
          >
            <b className="block text-3xl font-semibold tracking-tight text-foreground tabular-nums md:text-[34px]">
              {fact.value}
            </b>
            <span className="mt-1.5 block text-[13px] leading-snug text-muted">
              {t(`facts.${fact.id}`)}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
