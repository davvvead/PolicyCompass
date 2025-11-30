'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, User, Bot, Copy, RotateCcw, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import scenarios from '../data/scenarios.json';

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get('prompt');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am PolicyCompass. How can I help you navigate government regulations today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const initialPromptProcessed = useRef(false);

  useEffect(() => {
    if (initialPrompt && !initialPromptProcessed.current) {
      handleSend(initialPrompt);
      initialPromptProcessed.current = true;
    }
  }, [initialPrompt]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const content = text || input;
    if (!content.trim()) return;

    // Add user message
    const userMsg = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Find matching scenario
    const lowerContent = content.toLowerCase();
    const matchedScenario = scenarios.find(s => 
      s.keywords.some(k => lowerContent.includes(k))
    );

    const responseText = matchedScenario 
      ? matchedScenario.response 
      : "I'm not sure I understand. Could you please clarify your question? I can help with topics like job loss, housing, disability support, and more.";

    // Simulate AI response delay
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={cn(
              "flex gap-4 p-6 rounded-2xl transition-colors",
              msg.role === 'assistant' ? "bg-white/60 dark:bg-[#1e293b]/60 shadow-sm backdrop-blur-sm" : ""
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm",
              msg.role === 'assistant' 
                ? "bg-[#252F3D] text-white" // Dark Blue
                : "bg-[#98F0E1] text-[#020202]" // Teal
            )}>
              {msg.role === 'assistant' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="flex-1 space-y-2">
              <div className="font-bold text-sm text-[#252F3D] dark:text-white">
                {msg.role === 'assistant' ? 'PolicyCompass' : 'You'}
              </div>
              <div className="text-[#252F3D]/90 dark:text-gray-200 leading-relaxed whitespace-pre-wrap font-medium">
                {msg.content}
              </div>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 pt-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <Copy size={14} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <RotateCcw size={14} />
                  </button>
                  <div className="flex-1" />
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <ThumbsUp size={14} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <ThumbsDown size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 p-6 rounded-2xl bg-white/60 dark:bg-[#1e293b]/60 shadow-sm backdrop-blur-sm">
            <div className="w-10 h-10 rounded-full bg-[#252F3D] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot size={20} />
            </div>
            <div className="flex items-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 pb-8">
        <div className="relative flex items-center gap-2 bg-white dark:bg-[#1e293b] shadow-xl rounded-full p-2 pl-6 border border-gray-100 dark:border-gray-700">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about government regulations..."
            className="flex-1 max-h-48 min-h-6 bg-transparent border-none focus:ring-0 resize-none py-3 text-[#252F3D] dark:text-white placeholder:text-gray-400"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-[#98F0E1] text-[#020202] rounded-full flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            PolicyCompass can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}