"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Restores the stored theme after a client-side navigation.
 *
 * `data-theme` is stamped onto <html> imperatively by the pre-paint script, so
 * React has no idea it exists. Switching locale re-renders the `[locale]`
 * layout — and with it the <html> element — and React reconciles that unknown
 * attribute away, dropping the reader back to their system preference even
 * though their choice is still in localStorage.
 */

/* Restoring before paint is the point: a passive effect would run after the
   browser had already drawn one frame in the wrong theme. useLayoutEffect has
   no server counterpart, so fall back on the server, where neither runs. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function ThemeSync() {
  const pathname = usePathname();

  useBeforePaint(() => {
    const root = document.documentElement;

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage blocked — leave the system preference in charge.
    }

    if (stored === "dark" || stored === "light") {
      if (root.dataset.theme !== stored) root.dataset.theme = stored;
    } else if (root.dataset.theme) {
      // No stored choice: the absence of the attribute is what hands control
      // back to prefers-color-scheme.
      delete root.dataset.theme;
    }
  }, [pathname]);

  return null;
}
