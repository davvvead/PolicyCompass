"use client"

import React, { createContext, useContext, useState } from 'react';
import { mockScenario } from '@/data/mockPolicyData';

const PolicyEngineContext = createContext();

export const usePolicyEngine = () => useContext(PolicyEngineContext);

export const PolicyEngineProvider = ({ children }) => {
  const [step, setStep] = useState(0); // 0: Initial, 1: Analyzing, 2: Conflict, 3: Resolved
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to PolicyCompass. How can I help you navigate government services today?' }
  ]);
  const [isTrustPanelOpen, setIsTrustPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("map");

  const runSimulation = () => {
    // Step 1: User input (handled in ChatWindow)
    setStep(1); // Analyzing
    
    setTimeout(() => {
      setStep(2); // Conflict Detected
    }, 1500);

    setTimeout(() => {
      setStep(3); // Resolved / Unified Pathway
      setActiveTab("pathway");
    }, 3500);
  };

  const addMessage = (msg) => {
    setMessages(prev => [...prev, msg]);
  };

  return (
    <PolicyEngineContext.Provider value={{
      step,
      setStep,
      messages,
      addMessage,
      runSimulation,
      scenario: mockScenario,
      isTrustPanelOpen,
      setIsTrustPanelOpen,
      activeTab,
      setActiveTab
    }}>
      {children}
    </PolicyEngineContext.Provider>
  );
};
