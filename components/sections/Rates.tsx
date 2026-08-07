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
        className="nm-raised overflow-hidden rounded-2xl bg-background"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-foreground/25">
                <th className="px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-muted">
                  {t("columns.service")}
                </th>
                <th className="px-5 py-3.5 text-right font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-muted">
                  {t("columns.usd")}
                </th>
                <th className="px-5 py-3.5 text-right font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-muted">
                  {t("columns.kzt")}
                </th>
              </tr>
            </thead>
            <tbody>
              {RATE_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3.5 align-top">
                    {/* The palette has no accent colour, so a featured row is
                        marked by weight and a rule rather than a highlight. */}
                    <div
                      className={row.featured ? "border-l-[3px] border-ink pl-3" : undefined}
                    >
                      <span
                        className={
                          row.featured
                            ? "font-bold text-ink"
                            : "font-semibold text-foreground"
                        }
                      >
                        {t(`rows.${row.id}.name`)}
                      </span>
                      {row.featured && (
                        <>
                          <span aria-hidden="true" className="ml-1.5 align-super text-[10px] text-ink">
                            ★
                          </span>
                          <span className="sr-only"> — {t("featuredLabel")}</span>
                        </>
                      )}
                      <small className="mt-1 block text-[12.5px] font-normal leading-snug text-muted">
                        {t(`rows.${row.id}.detail`)}
                      </small>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right align-top font-mono text-[13.5px] text-foreground">
                    {row.usd}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right align-top font-mono text-[13.5px] text-foreground">
                    {row.kzt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <p className="mt-3 text-[12.5px] leading-relaxed text-muted">{t("footnote")}</p>
    </AnimatedSection>
  );
}
