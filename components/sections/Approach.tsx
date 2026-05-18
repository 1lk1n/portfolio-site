"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Approach() {
  const t = useTranslations("approach");
  const items = [0, 1, 2] as const;
  const aiItems = [0, 1, 2] as const;

  return (
    <AnimatedSection id="approach">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <motion.div
        className="grid gap-6 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {items.map((i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-primary">{t(`items.${i}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">{t(`items.${i}.text`)}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 rounded-2xl border-2 border-primary/20 bg-white p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h3 className="text-xl font-semibold text-primary">{t("aiTitle")}</h3>
        <ul className="mt-4 space-y-3">
          {aiItems.map((i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
              {t(`aiItems.${i}`)}
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatedSection>
  );
}
