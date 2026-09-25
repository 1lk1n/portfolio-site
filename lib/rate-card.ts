/**
 * Structure and locale-independent values for the rate card.
 *
 * Figures, tech names and ids live here rather than in messages/*.json so a
 * number can't drift between ru and en. Everything a reader has to *read* —
 * labels and descriptions — is translated and looked up by the ids below.
 */

/** USD per hour. */
export const RATE_ROWS = [
  { id: "support", usd: "35–50", featured: false },
  { id: "backend", usd: "50–70", featured: false },
  { id: "payments", usd: "60–85", featured: true },
  { id: "crypto", usd: "65–95", featured: true },
  { id: "eventDriven", usd: "55–80", featured: false },
  { id: "data", usd: "50–70", featured: false },
  { id: "integrations", usd: "50–70", featured: false },
  { id: "infrastructure", usd: "50–75", featured: false },
  { id: "observability", usd: "50–70", featured: false },
  { id: "risk", usd: "60–90", featured: false },
  { id: "architecture", usd: "75–110", featured: false },
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
  { id: "programming", items: ["Go", "TypeScript", "Python"] },
  {
    id: "backend",
    items: [
      "NestJS",
      "gRPC",
      "REST",
      "WebSockets",
      "Event-driven architecture",
      "CQRS",
      "Sagas",
      "Outbox pattern",
    ],
  },
  {
    id: "data",
    items: [
      "PostgreSQL",
      "Redis",
      "ClickHouse",
      "MongoDB",
      "Kafka",
      "RabbitMQ",
      "NATS",
    ],
  },
  {
    id: "payments",
    items: [
      "Double-entry ledgers",
      "Idempotency",
      "USDT (TRC-20 / ERC-20)",
      "BTC",
      "ETH",
      "Confirmation & reorg handling",
      "Hot/cold wallet flows",
      "Fireblocks",
      "KYC/AML integrations",
    ],
  },
  {
    id: "infrastructure",
    items: ["Kubernetes", "Docker", "AWS", "Terraform", "ArgoCD", "GitHub Actions"],
  },
  {
    id: "observability",
    items: ["Prometheus", "Grafana", "OpenTelemetry", "Loki", "Sentry", "k6 load testing"],
  },
  {
    id: "ai",
    items: [
      "Fraud & risk scoring models",
      "LLM integration (OpenAI, Anthropic)",
      "Embeddings",
      "RAG",
    ],
  },
] as const;

export const SPOKEN_COUNT = 2;
