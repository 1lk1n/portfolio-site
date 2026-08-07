"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { PROJECTS } from "@/lib/rate-card";

export function Projects() {
  const t = useTranslations("projects");

  return (
    <AnimatedSection id="projects">
      <SectionHeading title={t("title")} />

      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {PROJECTS.map((project) => (
          <motion.article
            key={project.id}
            variants={fadeUp}
            className="nm-raised rounded-2xl bg-background px-5 py-5 md:px-6"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <h3 className="text-base font-semibold text-ink md:text-[17px]">
                {project.name ?? t(`items.${project.id}.title`)}
              </h3>
              <span className="nm-inset-sm rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                {project.solo ? t("roleSolo") : t("roleTeam")}
              </span>
            </div>

            <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">
              {t(`items.${project.id}.summary`)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-4">
              {project.metrics.map((metric) => (
                <div key={metric.id}>
                  {metric.value && (
                    <b className="block font-mono text-[15px] font-bold text-ink">
                      {metric.value}
                    </b>
                  )}
                  <span className="block text-xs text-muted">
                    {t(`metrics.${metric.id}`)}
                  </span>
                </div>
              ))}
            </div>
          </motion.article>
        ))}
      </motion.div>

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
