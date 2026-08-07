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

  // Fields are pressed into the page; the outline on focus is what carries
  // visibility, since a soft shadow alone is not a focus indicator.
  const fieldClass =
    "nm-inset w-full rounded-xl bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  const labelClass = "mb-1.5 block text-[13px] font-medium text-foreground";

  // No red in a black-and-white palette — errors read through the marker,
  // the weight and the text itself.
  const errorClass = "mt-1.5 flex items-start gap-1.5 text-[12.5px] font-medium text-ink";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          {t("name")}
        </label>
        <input id="name" {...register("name")} className={fieldClass} />
        {errors.name && (
          <p className={errorClass}>
            <span aria-hidden="true">!</span>
            {t(`validation.${errors.name.message}`)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          {t("phone")}
        </label>
        <input id="phone" type="tel" {...register("phone")} className={fieldClass} />
        {errors.phone && (
          <p className={errorClass}>
            <span aria-hidden="true">!</span>
            {t(`validation.${errors.phone.message}`)}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          {t("email")}
        </label>
        <input id="email" type="email" {...register("email")} className={fieldClass} />
        {errors.email && (
          <p className={errorClass}>
            <span aria-hidden="true">!</span>
            {t(`validation.${errors.email.message}`)}
          </p>
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
          <p className={errorClass}>
            <span aria-hidden="true">!</span>
            {t(`validation.${errors.comment.message}`)}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="nm-raised w-full rounded-full py-3.5 text-sm font-semibold text-ink transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink active:nm-inset disabled:cursor-not-allowed disabled:nm-inset disabled:text-muted"
      >
        {status === "loading" ? t("loading") : t("submit")}
      </button>

      {status === "success" && (
        <p
          className="nm-raised flex items-start gap-2.5 rounded-xl px-4 py-3 text-[13px] text-ink"
          role="status"
        >
          <span aria-hidden="true">✓</span>
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p
          className="nm-inset flex items-start gap-2.5 rounded-xl px-4 py-3 text-[13px] font-medium text-ink"
          role="alert"
        >
          <span aria-hidden="true">!</span>
          {t("error")}
        </p>
      )}
    </form>
  );
}
