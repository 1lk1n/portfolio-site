"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function RateHero() {
  const t = useTranslations("rateHero");
  const links = useTranslations("links");

  return (
    <section className="pt-12 pb-4 md:pt-20 md:pb-6">
      <motion.div
        className="mx-auto max-w-5xl px-5 md:px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl font-bold tracking-tight text-ink md:text-4xl"
        >
          {t("name")}
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-2 text-base font-semibold md:text-lg">
          {t("role")}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted md:text-[15px]"
        >
          {t("lede")}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#rates"
            className="nm-raised rounded-full px-6 py-3 text-sm font-semibold text-ink transition-shadow active:nm-inset"
          >
            {t("ctaRates")}
          </a>
          <a
            href="#contact"
            className="nm-inset-sm rounded-full px-6 py-3 text-sm font-semibold text-muted transition-shadow hover:text-ink"
          >
            {t("ctaContact")}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-muted"
        >
          <a href={`mailto:${links("email")}`} className="hover:text-ink">
            {links("email")}
          </a>
          <a
            href="https://linkedin.com/in/ilkinibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            {links("linkedin")}
          </a>
          <a
            href="https://github.com/ilkin-ibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            {links("github")}
          </a>
          <a href="https://t.me/+994515391161" className="hover:text-ink">
            {links("telegram")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
