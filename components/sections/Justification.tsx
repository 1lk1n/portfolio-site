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

      {/* Unboxed feature grid — bold claim over muted explanation, the way
          Apple lays out feature blurbs, with whitespace doing the separating. */}
      <motion.ul
        className="grid gap-x-10 gap-y-8 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {items.map((i) => (
          <motion.li
            key={i}
            variants={fadeUp}
            className="text-sm leading-relaxed text-muted"
          >
            <strong className="mb-1 block font-semibold text-foreground">
              {t(`items.${i}.strong`)}
            </strong>
            {t(`items.${i}.text`)}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="mt-10 rounded-2xl bg-surface px-6 py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <p className="text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-foreground">{t("note.strong")}</strong>{" "}
          {t("note.text")}
        </p>
      </motion.div>
    </AnimatedSection>
  );
}
