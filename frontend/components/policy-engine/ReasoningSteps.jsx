"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ReasoningSteps() {
  const { step, scenario } = usePolicyEngine();

  if (step < 2) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Resolution Logic</h3>
      <div className="relative border-l-2 border-muted ml-2 space-y-6 pb-2">
        {scenario.reasoningSteps.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5 }}
            className="relative pl-6"
          >
            <div className={cn(
              "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center",
              index === 2 ? "border-red-500 text-red-500" : "border-primary text-primary"
            )}>
              {index === 2 ? <AlertCircle className="w-2 h-2" /> : <CheckCircle2 className="w-2 h-2" />}
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium leading-none">{item.step}</p>
              <p className="text-sm text-muted-foreground">{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
