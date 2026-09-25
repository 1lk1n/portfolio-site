"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { key: "skills", href: "#skills" },
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
    /* The Apple nav bar: slim, frosted glass over the content, closed off by a
       hairline rather than a shadow. */
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-4 px-5 md:px-6">
        <Link
          href={`/${locale}`}
          className="text-[15px] font-semibold tracking-tight text-foreground"
        >
          II
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Link
            href={localePath}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {locale === "ru" ? "EN" : "RU"}
          </Link>

          <button
            type="button"
            className="rounded-full p-2 text-foreground transition-colors hover:bg-surface md:hidden"
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
        <nav className="border-t border-hairline bg-background/95 px-5 py-3 backdrop-blur-xl md:hidden">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="block py-2.5 text-sm font-medium text-foreground"
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
