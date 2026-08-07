"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { useAiAvailability } from "@/components/ai/AiAvailabilityProvider";

type AiPolishButtonProps = {
  comment: string;
  onPolished: (text: string) => void;
};

export function AiPolishButton({ comment, onPolished }: AiPolishButtonProps) {
  const t = useTranslations("contact");
  const { available, markUnavailable } = useAiAvailability();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePolish = async () => {
    if (!comment || comment.length < 5) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/polish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: comment }),
      });
      const json = await res.json();

      if (!res.ok) {
        // Credit ran out or the provider went down mid-session: take the button
        // away rather than leave a control that can only fail.
        if (json.error === "unavailable") {
          markUnavailable();
          return;
        }
        setError(t("polishError"));
        return;
      }

      onPolished(json.text);
    } catch {
      setError(t("polishError"));
    } finally {
      setLoading(false);
    }
  };

  if (!available) return null;

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handlePolish}
        disabled={loading || !comment || comment.length < 5}
        className="nm-raised-sm rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-muted transition-shadow hover:text-ink active:nm-inset-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t("polishing") : t("polish")}
      </button>
      {error && (
        <span className="max-w-55 text-right text-[11px] font-medium text-ink">
          {error}
        </span>
      )}
    </div>
  );
}
