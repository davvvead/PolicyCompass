"use client"

import React, { useState } from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ExplainabilityThread() {
  const { step, scenario } = usePolicyEngine();
  const [hoveredStep, setHoveredStep] = useState(null);

  if (step < 2) return (
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm p-4 text-center">
      Reasoning thread will appear here after analysis.
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-full divide-x divide-border bg-slate-50/60">
      {/* Column 1: Raw Policy */}
      <div className="p-4 bg-blue-50/50 hidden md:block">
        <h3 className="text-xs font-semibold tracking-wider text-blue-900 mb-2 flex items-center justify-between">
          <span>Raw policy text</span>
          <span className="text-[10px] uppercase text-blue-700/80">Source</span>
        </h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4 text-xs font-mono text-muted-foreground">
            {scenario.policies.map((policy) => (
              <div 
                key={policy.id}
                className={cn(
                  "p-2 rounded transition-colors",
                  hoveredStep === policy.id ? "bg-yellow-100 dark:bg-yellow-900/30 text-foreground" : ""
                )}
              >
                <div className="font-bold mb-1">{policy.code}</div>
                <div className="opacity-80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sec 12(c) applies when...
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Column 2: Reasoning Logic */}
      <div className="p-4 bg-amber-50/40">
        <h3 className="text-xs font-semibold tracking-wider text-amber-900 mb-2">System logic</h3>
        <div className="space-y-6 relative">
          {scenario.reasoningSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3 }}
              className={cn(
                "relative pl-4 border-l-2 transition-colors",
                hoveredStep === step.relatedPolicyId ? "border-primary" : "border-muted"
              )}
            >
              <div className="text-sm font-medium">{step.step}</div>
              <div className="text-xs text-muted-foreground mt-1">{step.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Column 3: Plain Language */}
      <div className="p-4 bg-teal-50/50">
        <h3 className="text-xs font-semibold tracking-wider text-teal-900 mb-2">Plain-language explanation</h3>
        <div className="space-y-4 text-sm leading-relaxed">
          <p 
            onMouseEnter={() => setHoveredStep("p1")}
            onMouseLeave={() => setHoveredStep(null)}
            className="hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-1 rounded cursor-help transition-colors"
          >
            First, we confirmed you are eligible for <strong>Employment Insurance</strong> because you have enough work hours.
          </p>
          <p 
            onMouseEnter={() => setHoveredStep("p3")}
            onMouseLeave={() => setHoveredStep(null)}
            className="hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-1 rounded cursor-help transition-colors"
          >
            However, we noticed a conflict with <strong>Ontario Works</strong>. Since EI is a federal program, it takes priority, so you must apply for EI first.
          </p>
          <p 
            onMouseEnter={() => setHoveredStep("p2")}
            onMouseLeave={() => setHoveredStep(null)}
            className="hover:bg-yellow-100 dark:hover:bg-yellow-900/30 p-1 rounded cursor-help transition-colors"
          >
            Additionally, your role as a caregiver qualifies you for the <strong>Canada Caregiver Credit</strong>, which can help reduce your taxes.
          </p>
        </div>
      </div>
    </div>
  );
}
