"use client"

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { usePolicyEngine } from "./PolicyEngineContext";
import PolicyTagList from "./PolicyTagList";
import ConflictDetectionBanner from "./ConflictDetectionBanner";
import { cn } from "@/lib/utils";

export default function PoliciesModal({ open, onOpenChange }) {
  const { step, scenario } = usePolicyEngine();

  // Group policies by status
  const alignedPolicies = scenario.policies.filter(p => p.status === 'aligned');
  const ambiguousPolicies = scenario.policies.filter(p => p.status === 'ambiguous');
  const conflictPolicies = scenario.policies.filter(p => p.status === 'conflict');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Policy Intersections & Conflicts</DialogTitle>
          <DialogDescription>
            How federal and provincial rules intersect for your situation.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 mt-3 pr-3">
          <div className="space-y-6 pb-6">
            {step >= 1 && <ConflictDetectionBanner />}
            
            {step >= 1 && (
              <>
                {/* Relationship Overview Widget */}
                <div className="space-y-4">
                  {alignedPolicies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Aligned ({alignedPolicies.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {alignedPolicies.map(p => (
                          <Badge 
                            key={p.id} 
                            variant="outline" 
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800 font-normal"
                          >
                            {p.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {ambiguousPolicies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Ambiguous ({ambiguousPolicies.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {ambiguousPolicies.map(p => (
                          <Badge 
                            key={p.id} 
                            variant="outline" 
                            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 font-normal"
                          >
                            {p.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {conflictPolicies.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Conflict ({conflictPolicies.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {conflictPolicies.map(p => (
                          <Badge 
                            key={p.id} 
                            variant="outline" 
                            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 font-normal"
                          >
                            {p.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Why This Matters Section */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <h4 className="text-sm font-semibold mb-1">Why this matters</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This conflict occurs because federal Employment Insurance must be considered before provincial benefits. Ontario Works (OW-Dir-4.1) creates timing and eligibility overlaps for permanent residents.
                  </p>
                </div>

                {/* Active Policies List */}
                <PolicyTagList />
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
