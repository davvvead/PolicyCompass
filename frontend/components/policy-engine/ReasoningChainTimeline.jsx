"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePolicyEngine } from "./PolicyEngineContext";
import { cn } from "@/lib/utils";

const mockedSteps = [
  {
    id: 1,
    label: "Ingested client profile & household context",
    detail: "Employment status, caregiving role, jurisdiction and residency were parsed from the intake message.",
  },
  {
    id: 2,
    label: "Matched against core income-support programs",
    detail: "EI-Reg-12(c), CRA-CCC-2024 and ODSP-Inc-5 were retrieved as primary candidates.",
  },
  {
    id: 3,
    label: "Detected overlapping residency & income rules",
    detail: "Residency clauses in EI-Reg-12(c) conflict with ODSP-initial eligibility thresholds.",
  },
  {
    id: 4,
    label: "Applied federal-over-provincial hierarchy",
    detail: "Where rules conflict, federal minimum standards were treated as the baseline.",
  },
  {
    id: 5,
    label: "Checked disability-caregiver exceptions",
    detail: "Caregiver provisions and disability top-ups were applied to avoid benefit loss.",
  },
  {
    id: 6,
    label: "Stabilized final recommendation band",
    detail: "Outcome grouped into Eligible / Conditional / Not Eligible to support human review.",
  },
];

export default function ReasoningChainTimeline({ className }) {
  usePolicyEngine();

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Reasoning chain</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ol className="relative border-l border-border/60 space-y-4 ml-2 mt-1">
          {mockedSteps.map((step, idx) => (
            <li key={step.id} className="ml-3 pl-3">
              <div className="absolute -left-1.5 mt-1 w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="text-xs font-medium text-foreground">
                <span className="mr-1 text-muted-foreground">{idx + 1}.</span>
                {step.label}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
