'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUp } from 'lucide-react';
import { mockScenario } from '@/data/mockPolicyData';

export default function HeroInput() {
  const t = useTranslations('Index');
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState('');

  // Pre-populate with scenario userInput on mount
  useEffect(() => {
    setInput(mockScenario.userInput);
  }, []);

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
    <div className="bg-white dark:bg-[#6093DD] rounded-full shadow-xl p-2 flex items-center gap-2 sm:gap-3 w-full max-w-3xl border border-gray-100 dark:border-none">
      {/* Plus Button */}
      <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
         <Image src="/icons/plus.svg" alt="Add" width={24} height={24} className="dark:invert" />
      </button>

      {/* Input */}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('placeholder')}
        className="flex-1 bg-transparent outline-none px-1 sm:px-2 text-gray-700 dark:text-white dark:placeholder-gray-200 placeholder-gray-400 text-base sm:text-lg min-w-0"
      />

      {/* Send / Get Started Button (icon on small screens, pill on larger) */}
      <button 
        onClick={handleSearch}
        className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-10 h-10 sm:w-auto sm:h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0 px-0 sm:px-5 text-sm sm:text-base font-medium"
        aria-label={t('getStarted')}
      >
        <span className="sm:hidden flex items-center justify-center">
          <ArrowUp className="w-4 h-4" />
        </span>
        <span className="hidden sm:inline whitespace-nowrap">{t('getStarted')}</span>
      </button>

      {/* Mic Button */}
      <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
        <Image src="/icons/mic.svg" alt="Mic" width={24} height={24} className="dark:invert" />
      </button>
    </div>
  );
}