'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="absolute top-6 left-6 flex gap-3 bg-white p-2 rounded-lg shadow-lg border-2 border-blue-500">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-5 py-2 rounded-md font-bold text-base transition ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        English 🇬🇧
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-5 py-2 rounded-md font-bold text-base transition ${
          locale === 'ar'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        العربية 🇸🇦
      </button>
    </div>
  );
}
