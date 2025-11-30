"use client";

import {useTranslations} from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import HeroInput from '../../components/HeroInput';

export default function Home() {
  const t = useTranslations('Index');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div 
      className="min-h-screen flex flex-col hero-background"
    >
      {/* Header */}
      <header className="w-full px-4 pt-4 pb-3 flex items-center justify-between gap-3 sm:px-6 sm:pt-6 sm:pb-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="text-xl sm:text-2xl font-bold text-[#252F3D] dark:text-white tracking-tight">
            PolicyCompass
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Desktop language + CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-[#98F0E1] text-[#020202] dark:bg-[#034ADE] dark:text-white px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
            >
              {t('getStarted')}
            </button>
          </div>
          {/* Mobile hamburger to open sidebar */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/80 border border-gray-200 text-gray-700 shadow-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#98F0E1] sm:hidden"
            aria-label="Open preferences sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 text-center mt-4 sm:mt-24 md:mt-32 max-w-3xl mx-auto w-full pb-10">
        {/* Pill */}
        <div className="bg-[#D6EEE9] text-[#020202] dark:bg-[#203660] dark:text-white rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
          {t('clarity')} · {t('alignment')} · {t('confidence')} · {t('navigation')}
        </div>

        {/* Heading */}
        <h1 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-7xl text-transparent bg-clip-text bg-linear-to-r from-[#252F3D] to-[#729D96] dark:from-[#FFFFFF] dark:to-[#AAAAAA] mb-6 pb-2 max-w-[18rem] xs:max-w-[22rem] sm:max-w-4xl mx-auto leading-tight">
          {t('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-white max-w-2xl text-lg mb-12 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Input Area */}
        <HeroInput />
      </main>

      {/* Right sidebar for language + CTA */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="fixed top-0 right-0 h-screen w-64 sm:w-72 bg-white dark:bg-[#020617] shadow-xl z-40 border-l border-gray-200/80 dark:border-gray-800 flex flex-col">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200/80 dark:border-gray-800 shrink-0">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-100">{t('preferences')}</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                aria-label="Close preferences sidebar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{t('language')}</p>
                <LanguageSwitcher />
              </div>
            </div>
            <div className="px-4 py-4 border-t border-gray-200/80 dark:border-gray-800 shrink-0">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-full bg-[#98F0E1] text-[#020202] dark:bg-[#034ADE] dark:text-white px-4 py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
              >
                {t('getStarted')}
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
