"use client"

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePolicyEngine } from "./PolicyEngineContext";
import ReasoningSteps from "./ReasoningSteps";
import ReasoningChainTimeline from "./ReasoningChainTimeline";

export default function ReasoningModal({ open, onOpenChange }) {
  const { step } = usePolicyEngine();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>How We Decided</DialogTitle>
          <DialogDescription>
            High-level reasoning steps this assistant followed to assemble your pathway.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 mt-3 pr-3">
          <div className="space-y-4 pb-6">
            {step >= 1 && <ReasoningSteps />}
            {step >= 2 && <ReasoningChainTimeline />}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
