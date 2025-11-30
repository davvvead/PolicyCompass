"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePolicyEngine } from "./PolicyEngineContext";
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle2, Scale, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  core: CheckCircle2,
  conflict: AlertCircle,
  hierarchy: Scale,
  exception: GitBranch,
};

export default function ReasoningSidebar({ open, onOpenChange }) {
  const { scenario, step } = usePolicyEngine();
  const [expandedSteps, setExpandedSteps] = useState(new Set());

  const toggleStep = (id) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSteps(newExpanded);
  };

  if (step < 2) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-base">Reasoning Path</SheetTitle>
          <SheetDescription className="text-xs">
            Step-by-step logic showing how policies were analyzed, conflicts resolved, and hierarchies applied.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-4 h-[calc(100vh-8rem)] pr-3">
          <div className="space-y-4">
            {/* Conflict & Priority Summary */}
            <div className="p-3 rounded-md bg-amber-50/60 border border-amber-200 text-xs space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-amber-900">
                <Scale className="w-3 h-3" />
                Conflict & Rule Priority Summary
              </h4>
              <p className="text-amber-900/90 leading-snug">
                When policies contradict, federal rules take precedence over provincial ones. Disability and caregiver exceptions are applied to prevent benefit loss.
              </p>
            </div>

            {/* Reasoning Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Analysis Steps</h4>
              {scenario.reasoningSteps.map((item, index) => {
                const isExpanded = expandedSteps.has(item.id);
                const Icon = iconMap[item.id === 3 ? "conflict" : item.id === 4 ? "hierarchy" : item.id === 5 ? "exception" : "core"] || CheckCircle2;

                return (
                  <div key={item.id} className="border rounded-md bg-card overflow-hidden">
                    <button
                      onClick={() => toggleStep(item.id)}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <Icon className={cn("w-3.5 h-3.5", item.id === 3 ? "text-red-500" : "text-primary")} />
                        <span className="text-xs font-medium">{item.step}</span>
                      </div>
                      {isExpanded ? <ChevronDown className="w-3 h-3 text-muted-foreground" /> : <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                    </button>
                    {isExpanded && (
                      <div className="px-3 pb-3 text-xs text-muted-foreground border-t pt-2 bg-muted/20">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
