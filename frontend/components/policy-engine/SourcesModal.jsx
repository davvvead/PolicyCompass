"use client"

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePolicyEngine } from "./PolicyEngineContext";
import ExplainabilityThread from "./ExplainabilityThread";

export default function SourcesModal({ open, onOpenChange }) {
  const { step } = usePolicyEngine();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col">
        <DialogHeader className="pb-2 border-b">
          <DialogTitle>Source explanations</DialogTitle>
          <DialogDescription>
            Mocked excerpts and references from underlying policy sources.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 mt-3 pr-3">
          <div className="pb-6">
            {step >= 2 && <ExplainabilityThread />}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
