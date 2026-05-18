"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const links = useTranslations("links");

  return (
    <footer className="border-t border-primary/10 bg-primary py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm opacity-90">
          © {new Date().getFullYear()} Ilkin Ibadov. {t("rights")}.
        </p>
        <div className="flex gap-6 text-sm">
          <a href={`mailto:${links("email")}`} className="opacity-90 hover:opacity-100">
            {links("email")}
          </a>
          <a
            href="https://linkedin.com/in/ilkinibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            {links("linkedin")}
          </a>
          <a
            href="https://github.com/ilkin-ibadov"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 hover:opacity-100"
          >
            {links("github")}
          </a>
        </div>
      </div>
    </footer>
  );
}
