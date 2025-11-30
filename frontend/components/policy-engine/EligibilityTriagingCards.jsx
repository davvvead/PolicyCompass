"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const bands = [
  {
    id: "eligible",
    label: "Eligible",
    description: "Client appears to meet core program rules.",
    confidence: 82,
  },
  {
    id: "conditional",
    label: "Conditionally eligible",
    description: "Eligibility depends on missing or borderline data.",
    confidence: 64,
  },
  {
    id: "not_eligible",
    label: "Not eligible",
    description: "Current information does not meet minimum criteria.",
    confidence: 28,
  },
];

export default function EligibilityTriagingCards() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {bands.map((band) => (
        <Card key={band.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>{band.label}</span>
              <span className="text-[11px] text-muted-foreground">{band.confidence}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs flex-1 flex flex-col">
            <p className="text-muted-foreground leading-snug">{band.description}</p>
            <div className="space-y-1">
              <Progress value={band.confidence} className="h-1.5" />
              <p className="text-[11px] text-muted-foreground">Model confidence in this band.</p>
            </div>
            <div className="pt-1 mt-auto">
              <Button variant="outline" size="sm" className="w-full text-xs">
                Why?
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
