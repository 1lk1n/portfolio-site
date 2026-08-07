"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { JUSTIFICATION_COUNT } from "@/lib/rate-card";

export function Justification() {
  const t = useTranslations("justification");
  const items = Array.from({ length: JUSTIFICATION_COUNT }, (_, i) => i);

  return (
    <AnimatedSection id="justification">
      <SectionHeading title={t("title")} />

      <motion.ul
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {items.map((i) => (
          <motion.li
            key={i}
            variants={fadeUp}
            className="nm-raised rounded-2xl bg-background px-5 py-4 text-[13.5px] leading-relaxed text-muted"
          >
            <strong className="font-semibold text-ink">{t(`items.${i}.strong`)}</strong>{" "}
            {t(`items.${i}.text`)}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="nm-inset mt-6 rounded-2xl bg-background px-5 py-5 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <p className="text-[13.5px] leading-relaxed text-muted">
          <strong className="font-semibold text-ink">{t("note.strong")}</strong>{" "}
          {t("note.text")}
        </p>
      </motion.div>
    </AnimatedSection>
  );
}
