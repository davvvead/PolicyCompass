import {useTranslations} from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Image from 'next/image';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div 
      className="min-h-screen flex flex-col hero-background"
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-[#252F3D] dark:text-white tracking-tight">
          PolicyCompass
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#034ADE] dark:text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
            {t('getStarted')}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center -mt-20">
        {/* Pill */}
        <div className="bg-[#D6EEE9] text-[#020202] dark:bg-[#203660] dark:text-white rounded-full px-6 py-2 text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
          {t('clarity')} · {t('alignment')} · {t('confidence')} · {t('navigation')}
        </div>

        {/* Heading */}
        <h1 className="font-montserrat font-bold text-5xl md:text-7xl text-transparent bg-clip-text bg-linear-to-r from-[#252F3D] to-[#729D96] dark:from-[#FFFFFF] dark:to-[#AAAAAA] mb-6 pb-2 max-w-4xl mx-auto leading-tight">
          {t('heroTitle')}
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl text-lg mb-12 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Input Area */}
        <div className="bg-white dark:bg-[#6093DD] rounded-full shadow-xl p-2 flex items-center gap-3 w-full max-w-3xl border border-gray-100 dark:border-none">
          {/* Plus Button */}
          <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
             <Image src="/icons/plus.svg" alt="Add" width={24} height={24} className="dark:invert" />
          </button>

          {/* Input */}
          <input 
            type="text" 
            placeholder={t('placeholder')}
            className="flex-1 bg-transparent outline-none px-2 text-gray-700 dark:text-white dark:placeholder-gray-200 placeholder-gray-400 text-lg"
          />

          {/* Get Started Button */}
          <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity whitespace-nowrap hidden sm:block">
            {t('getStarted')}
          </button>

          {/* Mic Button */}
          <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-12 h-12 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
            <Image src="/icons/mic.svg" alt="Mic" width={24} height={24} className="dark:invert" />
          </button>
        </div>
      </main>
    </div>
  );
}
