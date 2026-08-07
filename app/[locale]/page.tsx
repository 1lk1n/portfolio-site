import { setRequestLocale } from "next-intl/server";
import { RateHero } from "@/components/sections/RateHero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Rates } from "@/components/sections/Rates";
import { Engagement } from "@/components/sections/Engagement";
import { Modifiers } from "@/components/sections/Modifiers";
import { Included } from "@/components/sections/Included";
import { Justification } from "@/components/sections/Justification";
import { Contact } from "@/components/sections/Contact";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <RateHero />
      <Skills />
      <Projects />
      <Rates />
      <Engagement />
      <Modifiers />
      <Included />
      <Justification />
      <Contact />
    </>
  );
}
