"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Plus, Mic, ArrowUp } from "lucide-react";
import { usePolicyEngine } from './PolicyEngineContext';
import InsightStack from "./InsightStack";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function ChatWindow() {
  const t = useTranslations('Chat');
  const searchParams = useSearchParams();
  const { messages, addMessage, runSimulation, step, scenario } = usePolicyEngine();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const [hasShownPlan, setHasShownPlan] = useState(false);
  const hasProcessedPrompt = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Track if we've shown the plan for this session
  useEffect(() => {
    if (step >= 3 && !hasShownPlan) {
      setHasShownPlan(true);
    }
  }, [step, hasShownPlan]);

  // Check for prompt in URL query params and auto-send
  useEffect(() => {
    if (!hasProcessedPrompt.current && messages.length === 1 && step === 0) {
      const promptParam = searchParams.get('prompt');
      if (promptParam) {
        hasProcessedPrompt.current = true;
        setInput(promptParam);
        // Auto-send the prompt after a brief delay
        setTimeout(() => {
          addMessage({ role: 'user', content: promptParam });
          setInput("");
          
          // Trigger simulation
          setTimeout(() => {
            addMessage({ 
              role: 'system', 
              content: "I'm analyzing your situation against federal and provincial databases. I've detected a few relevant policies and a potential conflict regarding your residency status. Let me resolve that for you." 
            });
            
            setTimeout(() => {
              runSimulation();
            }, 800);
          }, 1000);
        }, 500);
      }
    }
  }, [searchParams, messages, step, addMessage, runSimulation]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage({ role: 'user', content: input });
    setInput("");
    
    // Trigger simulation if it's the first user message
    if (step === 0) {
      setTimeout(() => {
        addMessage({ 
          role: 'system', 
          content: "I'm analyzing your situation against federal and provincial databases. I've detected a few relevant policies and a potential conflict regarding your residency status. Let me resolve that for you." 
        });
        
        setTimeout(() => {
          runSimulation();
        }, 800);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Card className="h-full flex flex-col border bg-white shadow-sm min-w-0">
      <CardContent className="flex-1 flex flex-col p-1.5 xs:p-2 sm:p-4 gap-1.5 xs:gap-2 sm:gap-3 overflow-hidden min-w-0">
        <ScrollArea className="flex-1 pr-1 xs:pr-2 sm:pr-4">
          <div className="space-y-1.5 xs:space-y-2 sm:space-y-3 pb-3 text-xs xs:text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-full gap-3",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === 'system' && (
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3 xs:w-4 h-3 xs:h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-1.5 xs:px-2 sm:px-4 py-1 xs:py-1.5 sm:py-2 max-w-full min-w-0 text-xs xs:text-sm overflow-wrap-break-word",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 xs:w-8 h-6 xs:h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-3 xs:w-4 h-3 xs:h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {messages.some((m) => m.role === 'system') && step >= 3 && (
              <InsightStack 
                scenario={scenario} 
                isFirstPlanForSession={!hasShownPlan} 
              />
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        
        <div className="pt-1 xs:pt-1.5 sm:pt-2 mt-1 bg-background/80 min-w-0">
          <div className="bg-white dark:bg-[#6093DD] rounded-full shadow-md p-0.5 xs:p-1 sm:p-1.5 flex items-center gap-0.5 xs:gap-1 sm:gap-2 w-full border border-gray-100 dark:border-none min-w-0">
            {/* Plus Button */}
            <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
               <Plus className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4" />
            </button>

            {/* Input */}
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('inputPlaceholder')}
              className="flex-1 bg-transparent outline-none px-0.5 xs:px-1 sm:px-2 text-gray-700 dark:text-white dark:placeholder-gray-200 placeholder-gray-400 text-[11px] xs:text-xs sm:text-sm min-w-0"
            />

            {/* Mic Button */}
            <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
               <Mic className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4" />
            </button>

            {/* Send Button */}
            <button 
              onClick={handleSend}
              className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-6 xs:w-7 sm:w-8 h-6 xs:h-7 sm:h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <ArrowUp className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
