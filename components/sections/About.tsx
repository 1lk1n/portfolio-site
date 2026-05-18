"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function About() {
  const t = useTranslations("about");
  const stackKeys = [
    "frontend",
    "backend",
    "mobile",
    "databases",
    "state",
    "devops",
    "languages",
    "tools",
  ] as const;

  return (
    <AnimatedSection id="about" alternate>
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <motion.p
        className="mx-auto max-w-3xl text-center text-base leading-relaxed text-foreground/80 md:text-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        {t("bio")}
      </motion.p>

      <motion.div
        className="mt-12"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <h3 className="mb-6 text-center text-xl font-semibold text-primary">{t("stackTitle")}</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stackKeys.map((key) => (
            <motion.div
              key={key}
              variants={fadeUp}
              className="rounded-xl bg-cream p-4 text-sm text-foreground/80 shadow-sm transition-shadow hover:shadow-md"
            >
              {t(`stack.${key}`)}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 grid gap-6 md:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="rounded-xl border border-primary/10 bg-cream p-6">
          <h3 className="font-semibold text-primary">{t("languagesTitle")}</h3>
          <p className="mt-2 text-foreground/80">{t("languages")}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="rounded-xl border border-primary/10 bg-cream p-6">
          <h3 className="font-semibold text-primary">{t("educationTitle")}</h3>
          <p className="mt-2 text-foreground/80">{t("education")}</p>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  );
}
