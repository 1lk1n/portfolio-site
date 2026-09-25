"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";
import { RATE_ROWS } from "@/lib/rate-card";

export function Rates() {
  const t = useTranslations("rates");

  return (
    <AnimatedSection id="rates">
      <SectionHeading title={t("title")} />

      <motion.div
        className="overflow-hidden rounded-3xl bg-surface"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-140 text-left text-sm">
            <thead>
              <tr className="border-b border-hairline">
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("columns.service")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("columns.usd")}
                </th>
              </tr>
            </thead>
            <tbody>
              {RATE_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-hairline last:border-0 ${
                    row.featured ? "bg-accent/5" : ""
                  }`}
                >
                  <td className="px-6 py-4 align-top">
                    {/* A featured row is a blue moment: tinted band, blue name, star. */}
                    <span
                      className={
                        row.featured
                          ? "font-semibold text-accent"
                          : "font-medium text-foreground"
                      }
                    >
                      {t(`rows.${row.id}.name`)}
                    </span>
                    {row.featured && (
                      <>
                        <span aria-hidden="true" className="ml-1.5 align-super text-[10px] text-accent">
                          ★
                        </span>
                        <span className="sr-only"> — {t("featuredLabel")}</span>
                      </>
                    )}
                    <small className="mt-1 block text-[13px] font-normal leading-snug text-muted">
                      {t(`rows.${row.id}.detail`)}
                    </small>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right align-top text-sm font-medium text-foreground tabular-nums">
                    {row.usd}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="mt-3 text-[13px] leading-relaxed text-muted">{t("footnote")}</p>

      <motion.div
        className="mt-6 rounded-2xl bg-surface px-6 py-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <p className="text-sm leading-relaxed text-muted">
          <strong className="font-semibold text-foreground">{t("payment.strong")}</strong>{" "}
          {t("payment.text")}
        </p>
      </motion.div>
    </AnimatedSection>
  );
}
