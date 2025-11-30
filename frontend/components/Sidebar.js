'use client';

import { cn } from '@/lib/utils';
import { MessageSquare, Plus, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Sidebar({ className, isOpen = true, setIsOpen = () => {} }) {
  const t = useTranslations('Chat');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  // Mock history data
  const history = [
    { id: 1, title: "EU AI Act Compliance" },
    { id: 2, title: "GDPR Requirements" },
    { id: 3, title: "Carbon Tax Policies" },
  ];

  return (
    <>
      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform duration-200 ease-in-out w-64",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        <div className={cn(
          "flex flex-col h-full w-64 transition-opacity duration-150",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none select-none"
        )}>
          {/* Header / New Chat */}
          <div className="p-4 border-b border-sidebar-border/70">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-sidebar-accent/60 rounded-md transition-colors shrink-0"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
              <Link 
                href={`/${locale}/chat`}
                className="flex items-center justify-center gap-2 px-6 py-2.5 flex-1 bg-[#98F0E1] text-[#020202] dark:bg-[#034ADE] dark:text-white rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{t('newChat')}</span>
              </Link>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-2 py-1.5 text-xs font-semibold text-sidebar-foreground/70">
              Recent
            </div>
            {history.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-2 w-full px-2 py-2 text-sm text-left text-sidebar-foreground hover:bg-sidebar-accent/60 rounded-md transition-colors truncate"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Footer / User */}
          <div className="p-4 border-t border-sidebar-border/70">
            <button className="flex items-center gap-2 w-full px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
              <span>{t('settings')}</span>
            </button>
            <div className="mt-2 flex items-center gap-2 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#649DE1] to-[#90DDD1]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">User Name</p>
                <p className="text-xs text-sidebar-foreground/70 truncate">user@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay - only on smaller screens when open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}