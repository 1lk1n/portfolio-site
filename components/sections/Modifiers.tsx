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
                  {t("columns.condition")}
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("columns.uplift")}
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-muted">
                  {t("columns.why")}
                </th>
              </tr>
            </thead>
            <tbody>
              {MODIFIERS.map((row) => (
                <tr key={row.id} className="border-b border-hairline last:border-0">
                  <td className="px-6 py-4 align-top text-sm text-foreground">
                    {t(`rows.${row.id}.condition`)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right align-top">
                    {/* Green is the money-saved colour; uplifts stay neutral. */}
                    <span
                      className={`text-sm font-medium tabular-nums ${
                        row.discount ? "text-success" : "text-foreground"
                      }`}
                    >
                      {t(`rows.${row.id}.uplift`)}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-top text-[13px] text-muted">
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
