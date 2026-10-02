'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    // إزالة الـ locale الحالي من الـ URL و استبداله بـ الجديد
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <button
        onClick={() => switchLanguage('ar')}
        className={`px-4 py-2 rounded font-semibold transition ${
          locale === 'ar'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        عربي
      </button>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded font-semibold transition ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
}
