"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { BILLED_COUNT, INCLUDED_COUNT } from "@/lib/rate-card";

export function Included() {
  const t = useTranslations("included");
  const included = Array.from({ length: INCLUDED_COUNT }, (_, i) => i);
  const billed = Array.from({ length: BILLED_COUNT }, (_, i) => i);

  return (
    <AnimatedSection id="included">
      <SectionHeading title={t("title")} />

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Twin cards; the markers carry the distinction — blue ✓ for what the
            rate covers, a quiet dot for what it doesn't. */}
        <motion.div variants={fadeUp} className="rounded-3xl bg-surface px-6 py-6">
          <h3 className="text-[17px] font-semibold text-foreground">{t("includedTitle")}</h3>
          <ul className="mt-4 space-y-2.5">
            {included.map((i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                <span aria-hidden="true" className="mt-px font-semibold text-accent">
                  ✓
                </span>
                {t(`included.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="rounded-3xl bg-surface px-6 py-6">
          <h3 className="text-[17px] font-semibold text-foreground">{t("billedTitle")}</h3>
          <ul className="mt-4 space-y-2.5">
            {billed.map((i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                <span aria-hidden="true" className="mt-px text-muted">
                  •
                </span>
                {t(`billed.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
