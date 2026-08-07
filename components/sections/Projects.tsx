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
            className="rounded-3xl bg-surface px-6 py-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-[17px] font-semibold text-foreground">
                {project.name ?? t(`items.${project.id}.title`)}
              </h3>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                {project.solo ? t("roleSolo") : t("roleTeam")}
              </span>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {t(`items.${project.id}.summary`)}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-hairline pt-4">
              {project.metrics.map((metric) => (
                <div key={metric.id}>
                  {metric.value && (
                    <b className="block text-[15px] font-semibold text-foreground tabular-nums">
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
        className="mt-6 rounded-2xl bg-surface px-6 py-5"
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
