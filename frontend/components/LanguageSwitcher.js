'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'bg', name: 'BG', flag: '🇧🇬' },
  { code: 'cs', name: 'CS', flag: '🇨🇿' },
  { code: 'da', name: 'DA', flag: '🇩🇰' },
  { code: 'de', name: 'DE', flag: '🇩🇪' },
  { code: 'el', name: 'EL', flag: '🇬🇷' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'es', name: 'ES', flag: '🇪🇸' },
  { code: 'et', name: 'ET', flag: '🇪🇪' },
  { code: 'fi', name: 'FI', flag: '🇫🇮' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'ga', name: 'GA', flag: '🇮🇪' },
  { code: 'hr', name: 'HR', flag: '🇭🇷' },
  { code: 'hu', name: 'HU', flag: '🇭🇺' },
  { code: 'it', name: 'IT', flag: '🇮🇹' },
  { code: 'ja', name: 'JA', flag: '🇯🇵' },
  { code: 'lt', name: 'LT', flag: '🇱🇹' },
  { code: 'lv', name: 'LV', flag: '🇱🇻' },
  { code: 'mt', name: 'MT', flag: '🇲🇹' },
  { code: 'nl', name: 'NL', flag: '🇳🇱' },
  { code: 'pl', name: 'PL', flag: '🇵🇱' },
  { code: 'pt', name: 'PT', flag: '🇵🇹' },
  { code: 'ro', name: 'RO', flag: '🇷🇴' },
  { code: 'sk', name: 'SK', flag: '🇸🇰' },
  { code: 'sl', name: 'SL', flag: '🇸🇮' },
  { code: 'sv', name: 'SV', flag: '🇸🇪' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = pathname.split('/')[1] || 'en';
  const currentLang = languages.find(l => l.code === currentLocale) || languages[5];

  const handleSelect = (code) => {
    const segments = pathname.split('/');
    segments[1] = code;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white hover:text-black dark:hover:text-white transition-colors"
      >
        {currentLang.name} <span className="text-lg">{currentLang.flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#203660] rounded-md shadow-lg py-1 z-50 max-h-64 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#2a4575] flex items-center justify-between"
            >
              <span>{lang.name}</span>
              <span className="text-lg">{lang.flag}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}