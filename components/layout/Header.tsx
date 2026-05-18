"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { key: "about", href: "#about" },
  { key: "approach", href: "#approach" },
  { key: "experience", href: "#experience" },
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
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="text-lg font-bold text-primary">
          II
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={localePath}
            className="rounded-full border border-primary/20 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {locale === "ru" ? "EN" : "RU"}
          </Link>

          <button
            type="button"
            className="md:hidden text-primary"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <nav className="border-t border-primary/10 bg-white px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="block py-2 text-sm font-medium text-foreground/80"
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
