"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp } from "@/lib/motion";
import { MODIFIERS } from "@/lib/rate-card";

export function Modifiers() {
  const t = useTranslations("modifiers");

  return (
    <AnimatedSection id="modifiers">
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
                  {t("columns.condition")}
                </th>
                <th className="px-5 py-3.5 text-right font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-muted">
                  {t("columns.uplift")}
                </th>
                <th className="px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-muted">
                  {t("columns.why")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MODIFIERS.map((row) => (
                <tr key={row.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3.5 align-top text-foreground">
                    {t(`rows.${row.id}.condition`)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-right align-top">
                    {/* A discount presses into the surface, an uplift stands out of
                        it — the distinction the original made with green. */}
                    <span
                      className={`inline-block rounded-lg px-2.5 py-1.5 font-mono text-[13px] ${
                        row.discount
                          ? "nm-inset-sm text-muted"
                          : "nm-raised-sm font-semibold text-ink"
                      }`}
                    >
                      {t(`rows.${row.id}.uplift`)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 align-top text-[13.5px] text-muted">
                    {t(`rows.${row.id}.why`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}
