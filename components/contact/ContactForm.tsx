"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "@/lib/validations/contact";
import { AiPolishButton } from "./AiPolishButton";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", phone: "", email: "", comment: "" },
  });

  const comment = watch("comment");

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-primary/20 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
          {t("name")}
        </label>
        <input id="name" {...register("name")} className={fieldClass} />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{t(`validation.${errors.name.message}`)}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-foreground">
          {t("phone")}
        </label>
        <input id="phone" type="tel" {...register("phone")} className={fieldClass} />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{t(`validation.${errors.phone.message}`)}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          {t("email")}
        </label>
        <input id="email" type="email" {...register("email")} className={fieldClass} />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{t(`validation.${errors.email.message}`)}</p>
        )}
      </div>

      <div>
        <div className="mb-1 flex items-center justify-between">
          <label htmlFor="comment" className="text-sm font-medium text-foreground">
            {t("comment")}
          </label>
          <AiPolishButton
            comment={comment}
            onPolished={(text) => setValue("comment", text, { shouldValidate: true })}
          />
        </div>
        <textarea
          id="comment"
          rows={5}
          {...register("comment")}
          className={`${fieldClass} resize-y`}
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{t(`validation.${errors.comment.message}`)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? t("loading") : t("submit")}
      </button>

      {status === "success" && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {t("error")}
        </p>
      )}
    </form>
  );
}
