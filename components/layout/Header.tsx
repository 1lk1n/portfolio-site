"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { key: "record", href: "#record" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "rates", href: "#rates" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = locale === "ru" ? "en" : "ru";
  const localePath = pathname.replace(`/${locale}`, `/${switchLocale}`) || `/${switchLocale}`;

  return (
    <header className="sticky top-0 z-50 bg-background/95 shadow-[0_8px_18px_-12px_var(--sink)] backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <Link
          href={`/${locale}`}
          className="nm-raised-sm rounded-xl px-3 py-2 text-sm font-bold tracking-tight text-ink"
        >
          II
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href={localePath}
            className="nm-raised-sm rounded-xl px-3 py-2 font-mono text-[11px] font-bold tracking-[0.06em] text-muted transition-colors hover:text-ink"
          >
            {locale === "ru" ? "EN" : "RU"}
          </Link>

          <button
            type="button"
            className="nm-raised-sm rounded-xl p-2 text-ink md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line px-5 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="block py-2 text-sm font-medium text-muted"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
