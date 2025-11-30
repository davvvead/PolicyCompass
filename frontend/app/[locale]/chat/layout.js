'use client';

import { useState, createContext, useContext } from 'react';
import Sidebar from '@/components/Sidebar';

const SidebarContext = createContext();

export const useSidebarContext = () => useContext(SidebarContext);

export default function ChatLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="flex h-screen w-full xs:w-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div 
          className="flex-1 flex flex-col transition-all duration-200 ease-in-out min-w-0"
          style={{
            marginLeft: isSidebarOpen ? '256px' : '0px'
          }}
        >
          {children}
        </div>
      </div>
    </SidebarContext.Provider>
  );
}