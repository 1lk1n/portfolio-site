import OpenAI from "openai";

/**
 * Whether the AI features can actually serve a request right now.
 *
 * "Available" means the key exists, the provider accepts it, and the account
 * still has credit — anything less and the UI hides the feature instead of
 * offering a button that fails.
 *
 * Live traffic keeps the answer fresh: every real chat/polish call reports its
 * outcome here, so the probe below only fires when nothing has been heard for a
 * while.
 */

const MODEL = "gpt-4o-mini";

/** Trust a success for a while; recheck a failure sooner so credit top-ups show up fast. */
const SUCCESS_TTL_MS = 5 * 60_000;
const FAILURE_TTL_MS = 60_000;

type Cached = { available: boolean; expiresAt: number };

let cached: Cached | null = null;
let probe: Promise<boolean> | null = null;

function remember(available: boolean): boolean {
  cached = {
    available,
    expiresAt: Date.now() + (available ? SUCCESS_TTL_MS : FAILURE_TTL_MS),
  };
  return available;
}

/** A real request succeeded — the provider is usable. */
export function recordAiSuccess(): void {
  remember(true);
}

/**
 * Classify a thrown provider error. Returns true when the failure means the
 * feature is unusable (bad key, no credit, provider down) rather than merely a
 * transient hiccup like a rate limit, which resolves on its own.
 */
export function recordAiFailure(error: unknown): boolean {
  const status = error instanceof OpenAI.APIError ? error.status : undefined;
  const code = error instanceof OpenAI.APIError ? error.code : undefined;

  const unusable =
    status === 401 || // rejected key
    status === 403 || // key not permitted to use the model
    code === "insufficient_quota" || // out of credit
    (typeof status === "number" && status >= 500) || // provider outage
    status === undefined; // never reached the provider at all

  if (unusable) remember(false);
  return unusable;
}

export function hasApiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

/** Smallest possible real completion — proves key, model access and credit. */
async function runProbe(apiKey: string): Promise<boolean> {
  try {
    const openai = new OpenAI({ apiKey });
    await openai.chat.completions.create({
      model: MODEL,
      messages: [{ role: "user", content: "1" }],
      max_tokens: 1,
    });
    return remember(true);
  } catch (error) {
    const unusable = recordAiFailure(error);
    // A transient failure (e.g. a rate limit) leaves the feature usable.
    return unusable ? false : remember(true);
  }
}

export async function isAiAvailable(): Promise<boolean> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return false;

  if (cached && cached.expiresAt > Date.now()) return cached.available;

  // Collapse concurrent callers onto one probe.
  probe ??= runProbe(apiKey).finally(() => {
    probe = null;
  });

  return probe;
}
