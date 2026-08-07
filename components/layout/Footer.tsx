"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const links = useTranslations("links");

  return (
    <footer className="mt-10 pb-10">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="nm-inset rounded-2xl bg-background px-5 py-5 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[12.5px] text-muted">
              © {new Date().getFullYear()} Ilkin Ibadov. {t("rights")}.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12.5px]">
              <a href={`mailto:${links("email")}`} className="text-muted hover:text-ink">
                {links("email")}
              </a>
              <a
                href="https://linkedin.com/in/ilkinibadov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink"
              >
                {links("linkedin")}
              </a>
              <a
                href="https://github.com/ilkin-ibadov"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-ink"
              >
                {links("github")}
              </a>
            </div>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-[12px] text-muted">
            {t("validity")}
          </p>
        </div>
      </div>
    </footer>
  );
}
