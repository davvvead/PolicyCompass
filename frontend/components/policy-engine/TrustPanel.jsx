"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, AlertTriangle, BookOpen, Gauge, Scale, Info } from "lucide-react";

export default function TrustPanel() {
  const { isTrustPanelOpen, setIsTrustPanelOpen, scenario } = usePolicyEngine();

  const mockMeta = {
    confidence: 85,
  };

  return (
    <Sheet open={isTrustPanelOpen} onOpenChange={setIsTrustPanelOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-base">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            Trust & Safety
          </SheetTitle>
          <SheetDescription>
            Transparency summary for this mocked pathway. Frontend-only; all content is sample JSON.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-5 space-y-5 text-xs">
          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Confidence
            </h4>
            <div className="flex items-center gap-3">
              <Progress value={mockMeta.confidence} className="h-1.5" />
              <span className="text-[11px] font-semibold">{mockMeta.confidence}%</span>
            </div>
            <p className="text-muted-foreground">
              Indicates how stable this mocked recommendation is across similar test scenarios.
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Data sources
            </h4>
            <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
              {scenario.trustInfo.sources.map((source, i) => (
                <li key={i}>{source}</li>
              ))}
            </ul>
            <p className="text-[11px] text-muted-foreground pt-1">
              Last updated: {scenario.trustInfo.lastUpdated}
            </p>
          </section>

          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
              Known limitations
            </h4>
            <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
              {scenario.trustInfo.limitations.map((limitation, i) => (
                <li key={i}>{limitation}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Human review
            </h4>
            <p className="text-muted-foreground">
              Results are designed to support, not replace, a trained decision-maker. Complex or high-impact cases should always be checked by a human officer.
            </p>
          </section>

          <section className="space-y-2 p-3 bg-muted rounded-md">
            <h4 className="font-medium flex items-center gap-2 text-xs">
              <Info className="w-3 h-3" />
              Confidence & bias note
            </h4>
            <p className="text-[11px] text-muted-foreground">
              {scenario.trustInfo.biasNote}
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
