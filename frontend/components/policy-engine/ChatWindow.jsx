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

export default function ChatWindow() {
  const { messages, addMessage, runSimulation, step, scenario } = usePolicyEngine();
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const [hasShownPlan, setHasShownPlan] = useState(false);

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

  const handleSend = () => {
    if (!input.trim()) return;
    
    addMessage({ role: 'user', content: input });
    setInput("");
    
    // Trigger simulation if it's the first user message
    if (step === 0) {
      // Simulate system thinking/response
      setTimeout(() => {
        addMessage({ 
          role: 'system', 
          content: "I'm analyzing your situation against federal and provincial databases. I've detected a few relevant policies and a potential conflict regarding your residency status. Let me resolve that for you." 
        });
        
        // Delay showing the policies slightly so it feels like they are being pulled up after the statement
        setTimeout(() => {
          runSimulation();
        }, 800);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  // Pre-fill for demo
  useEffect(() => {
    if (messages.length === 1 && step === 0) {
      const timer = setTimeout(() => {
        setInput(scenario.userInput);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages, step, scenario.userInput]);

  return (
    <Card className="h-full flex flex-col border bg-white shadow-sm">
      <CardContent className="flex-1 flex flex-col p-4 gap-3 overflow-hidden">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-3 pb-3 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-full gap-3",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {msg.role === 'system' && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[85%] text-sm",
                    msg.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
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
        
        <div className="pt-2 mt-1 bg-background/80">
          <div className="bg-white dark:bg-[#6093DD] rounded-full shadow-md p-1.5 flex items-center gap-2 w-full border border-gray-100 dark:border-none">
            {/* Plus Button */}
            <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
               <Plus className="w-4 h-4" />
            </button>

            {/* Input */}
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your situation..."
              className="flex-1 bg-transparent outline-none px-2 text-gray-700 dark:text-white dark:placeholder-gray-200 placeholder-gray-400 text-sm"
            />

            {/* Mic Button */}
            <button className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0">
               <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button 
              onClick={handleSend}
              className="bg-[#98F0E1] text-[#020202] dark:bg-[#001643] dark:text-white rounded-full w-8 h-8 flex items-center justify-center hover:opacity-90 transition-opacity shrink-0"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
