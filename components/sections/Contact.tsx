"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <AnimatedSection id="contact">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <ContactForm />
    </AnimatedSection>
  );
}
