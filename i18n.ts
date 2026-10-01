import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;
export const defaultLocale = "en";

export default getRequestConfig(async ({ locale }) => ({
  locale,
  messages: (
    await import(`./public/locales/${locale}/common.json`)
  ).default,
}));
