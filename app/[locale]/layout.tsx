import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AiAvailabilityProvider } from "@/components/ai/AiAvailabilityProvider";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { PortfolioChatbot } from "@/components/chat/PortfolioChatbot";
import { themeInitScript } from "@/lib/theme";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ru" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    // Next 16 no longer overrides `scroll-behavior` on navigation unless asked;
    // this page is all in-page anchors, so opt back in.
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      // The pre-paint script below stamps data-theme before React hydrates.
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Must be a plain synchronous script in <head>, not next/script:
            `beforeInteractive` orders against Next's modules but does not block
            the first paint, and React only hoists scripts that have a `src`.
            Running before <body> is parsed is the whole point — it is what a
            stored theme has to beat. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {/* Switching locale re-renders <html> and strips the theme attribute
            the pre-paint script set; this puts it back before the next paint. */}
        <ThemeSync />
        <NextIntlClientProvider messages={messages}>
          <AiAvailabilityProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <PortfolioChatbot />
          </AiAvailabilityProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
