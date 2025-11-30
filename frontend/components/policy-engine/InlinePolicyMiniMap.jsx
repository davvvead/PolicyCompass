"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Expand } from "lucide-react";
import { usePolicyEngine } from "./PolicyEngineContext";

const mockNodes = [
  { id: "ei", label: "EI-Reg-12(c)", status: "aligned" },
  { id: "cra", label: "CRA-CCC-2024", status: "ambiguous" },
  { id: "odsp", label: "ODSP-Inc-5", status: "conflict" },
  { id: "axs", label: "A11y Guideline", status: "access" },
];

const statusColor = {
  aligned: "bg-emerald-500",
  ambiguous: "bg-amber-400",
  conflict: "bg-red-500",
  access: "bg-sky-500",
};

const badgeVariants = {
  aligned: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
  ambiguous: "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  conflict: "bg-red-100 text-red-800 hover:bg-red-200 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
  access: "bg-sky-100 text-sky-800 hover:bg-sky-200 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
};

export default function InlinePolicyMiniMap({ onExpand }) {
  const { scenario } = usePolicyEngine();

  return (
    <div className="mt-3 border-t pt-3 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">Relevant Policies & Regulations</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {scenario.policies.map((policy) => (
          <div 
            key={policy.id} 
            className={`flex flex-col gap-0.5 p-2.5 rounded-md border cursor-pointer transition-all hover:shadow-sm hover:opacity-90 ${badgeVariants[policy.status] || badgeVariants.aligned}`}
            onClick={onExpand}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[11px]">{policy.code}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${
                  policy.status === 'conflict' ? "bg-red-600 dark:bg-red-400" :
                  policy.status === 'ambiguous' ? "bg-amber-600 dark:bg-amber-400" :
                  "bg-emerald-600 dark:bg-emerald-400"
               }`} />
            </div>
            <span className="text-[10px] opacity-85 truncate font-medium">{policy.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
