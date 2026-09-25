import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "en",
  // Always land on English; Russian is one click away in the header. Without
  // this a Russian-language browser would be redirected to /ru.
  localeDetection: false,
});
