import {useTranslations} from 'next-intl';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import HeroInput from '../../components/HeroInput';

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
        <p className="text-gray-600 dark:text-white max-w-2xl text-lg mb-12 leading-relaxed">
          {t('heroSubtitle')}
        </p>

        {/* Input Area */}
        <HeroInput />
      </main>
    </div>
  );
}
