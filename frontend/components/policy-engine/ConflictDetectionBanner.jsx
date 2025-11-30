"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePolicyEngine } from "./PolicyEngineContext";

export default function ConflictDetectionBanner() {
  const { scenario } = usePolicyEngine();

  const conflicting = scenario.policies.filter((p) => p.status === "conflict").slice(0, 3);
  if (!conflicting.length) return null;

  return (
    <Card className="border-amber-500/70 bg-amber-50 text-amber-900 flex items-start gap-3 px-4 py-3 text-sm">
      <div className="mt-0.5">
        <AlertTriangle className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <div className="font-medium">Policy conflict detected</div>
        <p className="text-xs text-amber-900/90">
          One or more benefits appear to pull in different directions. Review the conflicting rules before finalizing a recommendation.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {conflicting.map((policy) => (
            <Badge key={policy.id} variant="outline" className="border-amber-500/60 text-amber-900 bg-amber-100/60 text-[11px]">
              {policy.code}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
