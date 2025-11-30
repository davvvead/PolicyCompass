"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function PolicyTagList() {
  const { step, scenario } = usePolicyEngine();

  if (step < 1) return null;

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <span>Active Policies & Regulations</span>
          <span className="bg-muted text-xs px-2 py-0.5 rounded-full text-muted-foreground">
            {scenario.policies.length}
          </span>
        </h3>
      </div>
      
      <div className="grid gap-3 sm:grid-cols-2">
        {scenario.policies.map((policy, index) => (
          <motion.div
            key={policy.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <Badge variant="outline" className="font-mono text-[11px] bg-muted/50">
                {policy.code}
              </Badge>
              <span className={cn(
                "text-[10px] px-2 py-0.5 rounded-full capitalize border font-medium",
                policy.status === 'conflict' ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800" :
                policy.status === 'ambiguous' ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800" :
                "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
              )}>
                {policy.status}
              </span>
            </div>
            <h4 className="text-sm font-semibold mb-2">{policy.name}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {policy.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
