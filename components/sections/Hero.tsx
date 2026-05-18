"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/motion";

const PHOTO_URL =
  "https://avatars.githubusercontent.com/u/97884714?s=400&u=e78324f2020cedbe3f1e490de25040440995c2b3&v=4";

export function Hero() {
  const t = useTranslations("hero");
  const links = useTranslations("links");

  return (
    <section className="relative overflow-hidden bg-cream pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 md:order-1"
        >
          <motion.p variants={fadeUp} className="text-sm font-medium uppercase tracking-widest text-primary">
            {t("greeting")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            {t("name")}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 text-xl text-primary md:text-2xl">
            {t("role")}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              {t("cta")}
            </a>
            <a
              href="#experience"
              className="rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              {t("ctaSecondary")}
            </a>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${links("email")}`} className="text-foreground/70 hover:text-primary">
              {links("email")}
            </a>
            <a
              href="https://linkedin.com/in/ilkinibadov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary"
            >
              {links("linkedin")}
            </a>
            <a
              href="https://github.com/ilkin-ibadov"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary"
            >
              {links("github")}
            </a>
            <a href="https://t.me/+994515391161" className="text-foreground/70 hover:text-primary">
              {links("telegram")}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="order-1 flex justify-center md:order-2"
        >
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary shadow-xl md:h-80 md:w-80">
            <Image
              src={PHOTO_URL}
              alt={t("name")}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 256px, 320px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
