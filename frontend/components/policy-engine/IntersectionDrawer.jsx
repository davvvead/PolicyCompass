"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { usePolicyEngine } from "./PolicyEngineContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const mockNodes = [
  { id: "ei", label: "EI-Reg-12(c)", status: "aligned", excerpt: "Employment Insurance regular benefits for job loss. Federal minimum standards apply." },
  { id: "cra", label: "CRA-CCC-2024", status: "ambiguous", excerpt: "Canada Caregiver Credit - may require additional medical documentation to confirm eligibility." },
  { id: "odsp", label: "ODSP-Inc-5", status: "conflict", excerpt: "Ontario Disability Support Program income rules conflict with EI eligibility thresholds for initial application." },
  { id: "axs", label: "A11y Guideline", status: "access", excerpt: "Accessibility provisions ensure that forms and documentation are provided in alternate formats upon request." },
];

const statusColor = {
  aligned: "bg-emerald-500",
  ambiguous: "bg-amber-400",
  conflict: "bg-red-500",
  access: "bg-sky-500",
};

export default function IntersectionDrawer({ open, onOpenChange }) {
  const { scenario } = usePolicyEngine();
  const [selectedNode, setSelectedNode] = useState(null);

  const selectedNodeData = mockNodes.find((n) => n.id === selectedNode);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[70vh]">
        <SheetHeader>
          <SheetTitle className="text-base">Policy Intersection Map</SheetTitle>
          <SheetDescription className="text-xs">
            Visual representation of how policies interact. Click a node to view details.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground border-b pb-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Aligned
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Ambiguous
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Conflict
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Accessibility
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Graph */}
            <div className="flex-1 relative h-64 rounded-md bg-muted/30 border overflow-hidden">
              <svg viewBox="0 0 200 120" className="w-full h-full text-muted-foreground/40">
                {/* Connections */}
                <line x1="35" y1="60" x2="100" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" />
                <line x1="100" y1="35" x2="165" y2="60" stroke="currentColor" strokeWidth="1.5" />
                <line x1="100" y1="35" x2="50" y2="95" stroke="currentColor" strokeWidth="2" className="stroke-red-400" />
                <line x1="50" y1="95" x2="165" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />

                {/* Nodes */}
                {mockNodes.map((node) => {
                  const positions = {
                    ei: { cx: 35, cy: 60 },
                    cra: { cx: 100, cy: 35 },
                    odsp: { cx: 165, cy: 60 },
                    axs: { cx: 50, cy: 95 },
                  };
                  const pos = positions[node.id];

                  return (
                    <TooltipProvider key={node.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <g
                            className="cursor-pointer transition-transform hover:scale-110"
                            onClick={() => setSelectedNode(node.id)}
                          >
                            <circle cx={pos.cx} cy={pos.cy} r={12} className="fill-background stroke-border" strokeWidth="2" />
                            <circle cx={pos.cx} cy={pos.cy} r={8} className={cn(statusColor[node.status], "shadow-md")} />
                          </g>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">{node.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </svg>
            </div>

            {/* Node detail sidebar */}
            <div className="w-full md:w-64 space-y-3">
              <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Node Details</h4>
              {selectedNodeData ? (
                <div className="border rounded-md p-3 bg-card space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs font-mono">
                      {selectedNodeData.label}
                    </Badge>
                    <span className={cn("w-2 h-2 rounded-full", statusColor[selectedNodeData.status])} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{selectedNodeData.excerpt}</p>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">Click a node to see policy details.</p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
