"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function EligibilitySummaryCard() {
  const { step, scenario } = usePolicyEngine();

  if (step < 3) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Eligibility Verdict</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {scenario.eligibility.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg border bg-card/50">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                item.status === 'eligible' ? 'bg-green-500' :
                item.status === 'ineligible' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              <div>
                <p className="text-sm font-medium">{item.program}</p>
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] h-5">
                {item.confidence} Conf.
              </Badge>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <HelpCircle className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click for detailed reasoning</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
