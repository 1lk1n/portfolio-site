export const THEME_STORAGE_KEY = "theme";

/**
 * Runs synchronously in <head>, before the browser paints, so a stored choice
 * is applied to the first frame instead of flashing the system theme first.
 *
 * With no stored choice it sets nothing, leaving `prefers-color-scheme` in
 * charge — which is why the CSS keys its dark block off that media query and
 * only overrides it when `data-theme` is present.
 */
export const themeInitScript = `
try {
  var t = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
  if (t === "dark" || t === "light") document.documentElement.dataset.theme = t;
} catch (e) {}
`.trim();
