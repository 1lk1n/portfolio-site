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

  // Apple ID-style fields: hairline border, blue border + soft blue halo on focus.
  const fieldClass =
    "w-full rounded-xl border border-hairline bg-background px-4 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-accent focus:ring-4 focus:ring-accent/15";

  const labelClass = "mb-1.5 block text-[13px] font-medium text-foreground";

  const errorClass = "mt-1.5 text-[13px] text-danger";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          {t("name")}
        </label>
        <input id="name" {...register("name")} className={fieldClass} />
        {errors.name && (
          <p className={errorClass}>{t(`validation.${errors.name.message}`)}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {t("phone")}
        </label>
        <input id="phone" type="tel" {...register("phone")} className={fieldClass} />
        {errors.phone && (
          <p className={errorClass}>{t(`validation.${errors.phone.message}`)}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t("email")}
        </label>
        <input id="email" type="email" {...register("email")} className={fieldClass} />
        {errors.email && (
          <p className={errorClass}>{t(`validation.${errors.email.message}`)}</p>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label htmlFor="comment" className="text-[13px] font-medium text-foreground">
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
          <p className={errorClass}>{t(`validation.${errors.comment.message}`)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-accent-fill py-3 text-[15px] font-medium text-white transition-colors hover:bg-accent-fill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? t("loading") : t("submit")}
      </button>

      {status === "success" && (
        <p
          className="flex items-start gap-2.5 rounded-xl bg-success/10 px-4 py-3 text-[13px] font-medium text-success"
          role="status"
        >
          <span aria-hidden="true">✓</span>
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p
          className="rounded-xl bg-danger/10 px-4 py-3 text-[13px] font-medium text-danger"
          role="alert"
        >
          {t("error")}
        </p>
      )}
    </form>
  );
}
