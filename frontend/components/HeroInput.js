'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function HeroInput() {
  const t = useTranslations('Index');
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (!input.trim()) return;
    
    // Get current locale from pathname
    const locale = pathname.split('/')[1] || 'en';
    
    // Navigate to chat page with prompt
    router.push(`/${locale}/chat?prompt=${encodeURIComponent(input)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white dark:bg-[#6093DD] rounded-full shadow-xl p-2 flex items-center gap-3 w-full max-w-3xl border border-gray-100 dark:border-none">
      {/* Plus Button */}
      <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
         <Image src="/icons/plus.svg" alt="Add" width={24} height={24} className="dark:invert" />
      </button>

      {/* Input */}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        className="flex-1 bg-transparent outline-none px-2 text-gray-700 dark:text-white dark:placeholder-gray-200 placeholder-gray-400 text-lg"
      />

      {/* Get Started Button */}
      <button 
        onClick={handleSearch}
        className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap hidden sm:block"
      >
        {t('getStarted')}
      </button>

      {/* Mic Button */}
      <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
        <Image src="/icons/mic.svg" alt="Mic" width={24} height={24} className="dark:invert" />
      </button>
    </div>
  );
}