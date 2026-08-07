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
        {/* What you get stands out of the page; what costs extra sits in it. */}
        <motion.div
          variants={fadeUp}
          className="nm-raised rounded-2xl bg-background px-5 py-5"
        >
          <h3 className="text-[15px] font-semibold text-ink">{t("includedTitle")}</h3>
          <ul className="mt-4 space-y-2.5">
            {included.map((i) => (
              <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
                />
                {t(`included.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="nm-inset rounded-2xl bg-background px-5 py-5"
        >
          <h3 className="text-[15px] font-semibold text-foreground">{t("billedTitle")}</h3>
          <ul className="mt-4 space-y-2.5">
            {billed.map((i) => (
              <li key={i} className="flex gap-3 text-[13.5px] leading-relaxed text-muted">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full border border-muted"
                />
                {t(`billed.${i}`)}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
