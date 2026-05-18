"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type AiPolishButtonProps = {
  comment: string;
  onPolished: (text: string) => void;
};

export function AiPolishButton({ comment, onPolished }: AiPolishButtonProps) {
  const t = useTranslations("contact");
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
        setError(json.error === "unavailable" ? t("polishUnavailable") : t("polishError"));
        return;
      }

      onPolished(json.text);
    } catch {
      setError(t("polishError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handlePolish}
        disabled={loading || !comment || comment.length < 5}
        className="text-xs font-medium text-primary underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? t("polishing") : t("polish")}
      </button>
      {error && <span className="max-w-[200px] text-right text-xs text-red-600">{error}</span>}
    </div>
  );
}
