"use client"

import React from "react";
import { usePolicyEngine } from "./PolicyEngineContext";
import ScenarioBreakdownCard from "./ScenarioBreakdownCard";
import PolicyTagList from "./PolicyTagList";
import UnifiedPathwayView from "./UnifiedPathwayView";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Network, GitBranch, FileText } from "lucide-react";

export default function UnifiedPathwayResponse({
  onOpenPolicies,
  onOpenReasoning,
  onOpenSources,
}) {
  const { step } = usePolicyEngine();

  if (step < 3) return null;

  return (
    <Card className="mt-4 border-border/60 bg-card/60">
      <CardHeader className="space-y-3 pb-3 border-b bg-card/60">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Your unified pathway
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground max-w-2xl">
            A consolidated, non-binding view of how income support, disability and caregiver programs may apply to your situation.
          </CardDescription>
        </div>

        {/* Scenario context + active policies inline */}
        <div className="space-y-2 pt-1">
          <ScenarioBreakdownCard />
          <PolicyTagList />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Typical completion time: 4–6 weeks</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Reuse existing pathway step cards */}
        <UnifiedPathwayView />

        {/* Deep insight actions */}
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          <Button
            type="button"
            className="justify-start gap-2 text-xs h-9 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border border-indigo-200 shadow-sm"
            onClick={onOpenPolicies}
          >
            <Network className="w-3 h-3" />
            <span>View policies & intersections</span>
          </Button>
          <Button
            type="button"
            className="justify-start gap-2 text-xs h-9 bg-violet-100 text-violet-700 hover:bg-violet-200 border border-violet-200 shadow-sm"
            onClick={onOpenReasoning}
          >
            <GitBranch className="w-3 h-3" />
            <span>View How We Decided</span>
          </Button>
          <Button
            type="button"
            className="justify-start gap-2 text-xs h-9 bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200 shadow-sm"
            onClick={onOpenSources}
          >
            <FileText className="w-3 h-3" />
            <span>View source explanations</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
