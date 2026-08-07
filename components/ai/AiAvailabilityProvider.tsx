"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type AiAvailability = {
  /** null while unknown — render nothing rather than flash a feature that may vanish. */
  available: boolean | null;
  /** Called when a live request proves the provider is unusable. */
  markUnavailable: () => void;
};

const AiAvailabilityContext = createContext<AiAvailability>({
  available: false,
  markUnavailable: () => {},
});

export function useAiAvailability(): AiAvailability {
  return useContext(AiAvailabilityContext);
}

/**
 * Asks the server once whether the AI provider can actually serve a request, so
 * the chatbot and the polish button are only ever rendered when they work.
 *
 * The check runs on the client on purpose: the page itself is statically
 * generated, and credit status at build time says nothing about right now.
 */
export function AiAvailabilityProvider({ children }: { children: ReactNode }) {
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/ai/status", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : { available: false }))
      .then((json: { available?: boolean }) => setAvailable(Boolean(json.available)))
      // Can't reach our own status route — assume unusable and stay hidden.
      .catch(() => {
        if (!controller.signal.aborted) setAvailable(false);
      });

    return () => controller.abort();
  }, []);

  const markUnavailable = useCallback(() => setAvailable(false), []);

  return (
    <AiAvailabilityContext value={{ available, markUnavailable }}>
      {children}
    </AiAvailabilityContext>
  );
}
