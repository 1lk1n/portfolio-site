"use client";

import { useTranslations } from "next-intl";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Flips between the light and dark palettes.
 *
 * Deliberately stateless: the current theme already lives on `<html>` (or in
 * the system preference), and CSS decides which icon shows. So this renders the
 * same markup on the server either way — no hydration mismatch, no flash, and
 * no re-render needed when the theme changes.
 */
export function ThemeToggle() {
  const t = useTranslations("nav");

  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";

    root.dataset.theme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked — the choice still applies for this page view.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("theme")}
      title={t("theme")}
      className="nm-raised-sm rounded-xl p-2 text-muted transition-colors hover:text-ink active:nm-inset-sm"
    >
      {/* Sun — shown while the light palette is active. */}
      <svg
        className="theme-icon-light h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>

      {/* Moon — shown while the dark palette is active. */}
      <svg
        className="theme-icon-dark h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
        />
      </svg>
    </button>
  );
}
