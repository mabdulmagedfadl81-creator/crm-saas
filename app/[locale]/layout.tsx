import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Providers } from "./providers";
import { LanguageSwitcher } from "./language-switcher";
import { locales } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: "SalesCRM",
  description: "Professional CRM for sales teams",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = (await import(`@/public/locales/${locale}/common.json`)).default;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
