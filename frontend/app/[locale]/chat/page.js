"use client"

import React from 'react';
import { PolicyEngineProvider, usePolicyEngine } from '@/components/policy-engine/PolicyEngineContext';
import ChatWindow from '@/components/policy-engine/ChatWindow';
import TrustPanel from '@/components/policy-engine/TrustPanel';
import AccessibilityControls from '@/components/policy-engine/AccessibilityControls';
import { useSidebarContext } from './layout';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Menu } from "lucide-react";

function PolicyEngineApp() {
  const { setIsTrustPanelOpen } = usePolicyEngine();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

  return (
    <div className="flex h-full flex-col hero-background text-foreground">
        {/* Top Bar */}
        <header className="h-14 border-b flex items-center justify-between px-4 bg-[#020202] dark:bg-black">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/10 rounded-md transition-colors"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            )}
            <div className="font-bold text-lg tracking-tight text-white">PolicyCompass</div>
            <div className="hidden md:block w-px h-4 bg-white/20 mx-2" />
            <div className="hidden md:block text-sm text-white/70">
              Government-grade policy navigation and explainability
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AccessibilityControls />
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden bg-background/0">
          {/* Chat-first layout: single column */}
          <div className="flex-1 flex flex-col max-w-5xl mx-auto px-4 py-4 overflow-y-auto">
            <ChatWindow />
          </div>

          {/* Floating Trust Button */}
          <div className="pointer-events-none fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
            <Button
              onClick={() => setIsTrustPanelOpen(true)}
              className="shadow-md rounded-full gap-1.5 pointer-events-auto text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
              size="sm"
            >
              <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:inline">Trust & Safety</span>
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
