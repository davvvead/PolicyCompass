"use client"

import React from 'react';
import { PolicyEngineProvider, usePolicyEngine } from '@/components/policy-engine/PolicyEngineContext';
import ChatWindow from '@/components/policy-engine/ChatWindow';
import TrustPanel from '@/components/policy-engine/TrustPanel';
import AccessibilityControls from '@/components/policy-engine/AccessibilityControls';
import { useSidebarContext } from './layout';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

function PolicyEngineApp() {
  const t = useTranslations('Chat');
  const { setIsTrustPanelOpen } = usePolicyEngine();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  return (
    <div className="flex h-full flex-col hero-background text-foreground min-w-0">
        {/* Top Bar */}
        <header className="h-14 border-b flex items-center px-2 sm:px-4 bg-[#020202] dark:bg-black">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 sm:gap-3 overflow-hidden">
              {!isSidebarOpen && (
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-1.5 hover:bg-white/10 rounded-md transition-colors shrink-0"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-5 h-5 text-white" />
                </button>
              )}
              <div className="font-bold text-sm sm:text-lg tracking-tight text-white truncate">PolicyCompass</div>
              <div className="hidden md:block w-px h-4 bg-white/20 mx-2 shrink-0" />
              <div className="hidden md:block text-sm text-white/70 truncate">
                {t('description')}
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <div className="bg-background border rounded-md p-0.5 sm:p-1 shadow-sm flex items-center">
                <LanguageSwitcher className="h-8 px-1.5 sm:px-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-xs sm:text-sm" />
              </div>
              <div className="hidden md:flex">
                <AccessibilityControls />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden bg-sidebar">
          {/* Chat-first layout: single column */}
          <div className="flex-1 flex flex-col px-1.5 xs:px-2 sm:px-4 py-3 xs:py-4 overflow-y-auto min-w-0">
            <ChatWindow />
          </div>

          {/* Floating Trust Button - positioned above input */}
          <div className="pointer-events-none fixed right-3 bottom-40 xs:bottom-48 sm:bottom-28 sm:right-6 z-40">
            <Button
              onClick={() => setIsTrustPanelOpen(true)}
              className="shadow-md rounded-full gap-1.5 pointer-events-auto text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              size="sm"
            >
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">{t('trustSafety')}</span>
            </Button>
          </div>
        </div>
        {/* Global panel */}
        <TrustPanel />
      </div>
  );
}

export default function ChatPage() {
  return (
    <PolicyEngineProvider>
      <PolicyEngineApp />
    </PolicyEngineProvider>
  );
}
