import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: "SalesCRM",
  description: "Professional CRM for sales teams",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>{children}</body>
    </html>
  );
}
