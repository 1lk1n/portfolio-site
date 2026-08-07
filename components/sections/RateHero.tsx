"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function RateHero() {
  const t = useTranslations("rateHero");
  const links = useTranslations("links");

  return (
    /* Apple product-page hero: centred, type-led, one blue pill. */
    <section className="pt-16 pb-4 md:pt-24 md:pb-6">
      <motion.div
        className="mx-auto max-w-5xl px-5 text-center md:px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-semibold tracking-[-0.02em] text-foreground md:text-6xl lg:text-7xl"
        >
          {t("name")}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-4 text-xl font-medium text-foreground md:text-2xl"
        >
          {t("role")}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted md:text-[17px]"
        >
          {t("lede")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#rates"
            className="rounded-full bg-accent-fill px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-fill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80"
          >
            {t("ctaRates")}
          </a>
          <a
            href="#contact"
            className="rounded-full bg-surface px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-hairline/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {t("ctaContact")}
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[13px]"
        >
          <a href={`mailto:${links("email")}`} className="text-muted transition-colors hover:text-accent">
            {links("email")}
          </a>
          <a
            href="https://linkedin.com/in/ilkinibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            {links("linkedin")}
          </a>
          <a
            href="https://github.com/ilkin-ibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            {links("github")}
          </a>
          <a href="https://t.me/+994515391161" className="text-muted transition-colors hover:text-accent">
            {links("telegram")}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
