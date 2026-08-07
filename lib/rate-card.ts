/**
 * Structure and locale-independent values for the rate card.
 *
 * Figures, tech names and ids live here rather than in messages/*.json so a
 * number can't drift between ru and en. Everything a reader has to *read* —
 * labels, descriptions, prices quoted in a local currency — is translated and
 * looked up by the ids below.
 */

type Metric = {
  /** Absent for metrics that are a statement rather than a figure. */
  value?: string;
  id: string;
};

type Project = {
  id: string;
  /** Untranslated product name; absent when the title itself needs translating. */
  name?: string;
  solo: boolean;
  chips: readonly string[];
  metrics: readonly Metric[];
};

export const PROJECTS: readonly Project[] = [
  {
    id: "setflow",
    name: "SetFlow",
    solo: false,
    chips: [
      "TypeScript",
      "Node.js · Express",
      "Next.js · React",
      "Prisma · PostgreSQL",
      "WebSocket",
      "Docker · Railway",
      "Cloudflare",
    ],
    metrics: [
      { value: "142k", id: "lines" },
      { value: "27", id: "backendModules" },
      { value: "77", id: "pages" },
      { value: "93", id: "models" },
      { value: "71", id: "migrations" },
      { value: "10k", id: "testLines" },
      { value: "~50%", id: "commitShare" },
    ],
  },
  {
    id: "brain",
    name: "Brain",
    solo: true,
    chips: [
      "Turborepo · pnpm",
      "Expo · React Native",
      "NativeWind",
      "Express · Prisma",
      "PostgreSQL",
      "AWS S3 · MinIO",
      "React · Vite",
    ],
    metrics: [
      { value: "17k", id: "lines" },
      { value: "4", id: "monorepoApps" },
      { value: "33", id: "mobileScreens" },
      { value: "41", id: "models" },
    ],
  },
  {
    id: "qala",
    name: "Qala",
    solo: true,
    chips: [
      "Expo · React Native",
      "Express · Prisma",
      "PostgreSQL",
      "Next.js",
      "argon2 · JOSE · TOTP",
      "OpenAPI",
      "Anthropic API",
    ],
    metrics: [
      { value: "15k", id: "lines" },
      { value: "34", id: "mobileScreens" },
      { value: "29", id: "components" },
      { value: "31", id: "models" },
    ],
  },
] as const;

/** Converted at ≈500 ₸ per $1; the USD figure governs. */
export const RATE_ROWS = [
  { id: "support", usd: "25–35", kzt: "12 500–17 500", featured: false },
  { id: "frontend", usd: "30–45", kzt: "15 000–22 500", featured: false },
  { id: "mobile", usd: "35–50", kzt: "17 500–25 000", featured: false },
  { id: "backend", usd: "35–50", kzt: "17 500–25 000", featured: false },
  { id: "endToEnd", usd: "40–55", kzt: "20 000–27 500", featured: true },
  { id: "integrations", usd: "40–55", kzt: "20 000–27 500", featured: false },
  { id: "database", usd: "45–60", kzt: "22 500–30 000", featured: false },
  { id: "devops", usd: "45–60", kzt: "22 500–30 000", featured: false },
  { id: "testing", usd: "35–50", kzt: "17 500–25 000", featured: false },
  { id: "security", usd: "60–90", kzt: "30 000–45 000", featured: true },
  { id: "architecture", usd: "60–100", kzt: "30 000–50 000", featured: false },
] as const;

export const ENGAGEMENTS = ["fullTime", "partTime", "retainer", "fixedPrice"] as const;

/** `discount` rows read as pressed-in rather than raised — the palette has no green. */
export const MODIFIERS = [
  { id: "rush", discount: false },
  { id: "offHours", discount: false },
  { id: "onCall", discount: false },
  { id: "legacy", discount: false },
  { id: "longTerm", discount: true },
  { id: "prepay", discount: true },
] as const;

export const INCLUDED_COUNT = 5;
export const BILLED_COUNT = 5;
export const JUSTIFICATION_COUNT = 6;

/** Tech stack, from the CV. Group labels are translated; the tools are not. */
export const SKILL_GROUPS = [
  {
    id: "frontend",
    items: ["React", "Next.js", "Tailwind", "HTML", "CSS", "SCSS"],
  },
  { id: "backend", items: ["Node.js", "NestJS", "Express.js"] },
  { id: "mobile", items: ["React Native", "Expo"] },
  { id: "databases", items: ["MongoDB", "PostgreSQL", "Redis", "Supabase"] },
  { id: "state", items: ["Redux", "Redux Toolkit", "Zustand", "Context API"] },
  { id: "devops", items: ["Docker", "Kubernetes", "AWS"] },
  { id: "programming", items: ["JavaScript", "TypeScript", "Python", "Go"] },
  {
    id: "tools",
    items: ["Git", "Postman", "Figma", "TanStack Query", "TanStack Form"],
  },
] as const;

export const SPOKEN_COUNT = 2;
export const EDUCATION_COUNT = 2;
