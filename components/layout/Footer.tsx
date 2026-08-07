"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const links = useTranslations("links");

  return (
    /* Apple-style closing band: full-bleed grey, hairline top, small quiet type. */
    <footer className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-5xl px-5 py-10 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Ilkin Ibadov. {t("rights")}.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <a href={`mailto:${links("email")}`} className="text-muted transition-colors hover:text-foreground">
              {links("email")}
            </a>
            <a
              href="https://github.com/1lk1n"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {links("github")}
            </a>
            <a href="https://t.me/ilkin_i" className="text-muted transition-colors hover:text-foreground">
              {links("telegram")}
            </a>
          </div>
        </div>
        <p className="mt-6 border-t border-hairline pt-6 text-xs text-muted">
          {t("validity")}
        </p>
      </div>
    </footer>
  );
}
