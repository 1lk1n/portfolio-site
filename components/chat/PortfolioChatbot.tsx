"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAiAvailability } from "@/components/ai/AiAvailabilityProvider";
import type { ChatMessage } from "@/lib/validations/chat";

export function PortfolioChatbot() {
  const t = useTranslations("chatbot");
  const locale = useLocale() as "ru" | "en";
  const { available, markUnavailable } = useAiAvailability();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const seedWelcome = useCallback(() => {
    setMessages([{ role: "assistant", content: t("welcome") }]);
  }, [t]);

  useEffect(() => {
    if (open && messages.length === 0) seedWelcome();
  }, [open, messages.length, seedWelcome]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const nextMessages = [...messages, { role: "user" as const, content: text }];
    const previousMessages = messages;
    setInput("");
    setError(null);
    setMessages(nextMessages);
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, locale }),
      });
      const json = await res.json();
      if (!res.ok) {
        // Credit ran out or the provider went down mid-conversation: close the
        // widget and take it off the page rather than keep failing.
        if (json.error === "unavailable") {
          markUnavailable();
          return;
        }
        setError(t("error"));
        setMessages(previousMessages);
        return;
      }
      setMessages([...nextMessages, { role: "assistant", content: json.reply }]);
    } catch {
      setError(t("error"));
      setMessages(previousMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  // After the hooks, so the order stays stable when availability resolves.
  if (!available) return null;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/25 md:hidden"
            onClick={handleClose}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("title")}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="nm-raised-lg fixed bottom-24 right-4 z-50 flex h-[min(520px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl bg-background md:bottom-24 md:right-6"
          >
            <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink">{t("title")}</p>
                <p className="text-[11px] text-muted">{t("subtitle")}</p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="nm-raised-sm rounded-lg p-1.5 text-ink active:nm-inset-sm"
                aria-label={t("close")}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((msg, i) => (
                <div key={i} className={"flex " + (msg.role === "user" ? "justify-end" : "justify-start")}>
                  {/* Sender is carried by depth: what you said is pressed in,
                      what came back stands out. */}
                  <div
                    className={
                      "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed " +
                      (msg.role === "user"
                        ? "nm-inset-sm rounded-br-md text-foreground"
                        : "nm-raised-sm rounded-bl-md text-foreground")
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="nm-raised-sm rounded-2xl rounded-bl-md px-4 py-3">
                    <span className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:150ms]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:300ms]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="border-t border-line px-4 py-2 text-[11px] font-medium text-ink" role="alert">
                {error}
              </p>
            )}

            <div className="border-t border-line p-3">
              <div className="flex gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("placeholder")}
                  rows={2}
                  disabled={loading}
                  className="nm-inset-sm flex-1 resize-none rounded-xl bg-background px-3 py-2 text-[13px] text-foreground outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  aria-label={t("send")}
                  className="nm-raised-sm flex shrink-0 items-center justify-center rounded-xl px-3 text-ink transition-shadow active:nm-inset-sm disabled:cursor-not-allowed disabled:text-muted disabled:opacity-60"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-[10px] text-muted">{t("hint")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => (open ? handleClose() : setOpen(true))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? t("close") : t("open")}
        aria-expanded={open}
        className="nm-raised fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-background text-ink md:right-6"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>
    </>
  );
}
