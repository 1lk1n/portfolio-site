"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { ENGAGEMENTS } from "@/lib/rate-card";

export function Engagement() {
  const t = useTranslations("engagement");

  return (
    <AnimatedSection id="engagement">
      <SectionHeading title={t("title")} />

      <motion.div
        className="grid gap-4 sm:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {ENGAGEMENTS.map((id) => (
          <motion.div
            key={id}
            variants={fadeUp}
            className="nm-raised rounded-2xl bg-background px-5 py-5"
          >
            <h3 className="text-[15px] font-semibold text-foreground">
              {t(`items.${id}.title`)}
            </h3>
            <p className="mt-2 font-mono text-lg font-bold tracking-tight text-ink">
              {t(`items.${id}.price`)}
            </p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              {t(`items.${id}.text`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </AnimatedSection>
  );
}
