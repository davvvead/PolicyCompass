"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePolicyEngine } from "./PolicyEngineContext";
import { CheckSquare, Clock, ExternalLink, FileText, AlertCircle, Scale, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

export default function UnifiedPathwayModal({ open, onOpenChange }) {
  const { scenario, step } = usePolicyEngine();
  const [simpleMode, setSimpleMode] = useState(false);

  if (step < 3) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg">Your Unified Pathway</DialogTitle>
          <DialogDescription className="text-xs">
            A consolidated, non-binding guide to income support, disability, and caregiver programs.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-4">
            {/* Context & Mode Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs pb-3 border-b">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Ontario · Permanent resident</Badge>
                <Badge variant="outline">Caregiver to disabled parent</Badge>
                <Badge variant="outline">Scenario v1.0 (mock)</Badge>
              </div>
              <ToggleGroup type="single" value={simpleMode ? "simple" : "detailed"} onValueChange={(val) => setSimpleMode(val === "simple")}>
                <ToggleGroupItem value="detailed" className="px-2 py-1 text-[10px]">Detailed</ToggleGroupItem>
                <ToggleGroupItem value="simple" className="px-2 py-1 text-[10px]">Simple Mode</ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Action Steps */}
            <div className="space-y-3">
              {scenario.pathway.map((pathStep, index) => (
                <motion.div
                  key={pathStep.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-[10px]">Step {index + 1}</Badge>
                        <div className="flex items-center text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {pathStep.deadline}
                        </div>
                      </div>
                      <CardTitle className="text-sm">{pathStep.title}</CardTitle>
                      {!simpleMode && <CardDescription className="text-xs">{pathStep.description}</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-muted-foreground">Rule reference:</span>
                        <Badge variant="outline" className="font-mono text-[9px]">{scenario.policies[index % scenario.policies.length]?.code || "N/A"}</Badge>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">Confidence: <strong>82%</strong></span>
                      </div>
                      {!simpleMode && (
                        <p className="text-xs text-muted-foreground leading-snug">
                          This step ensures alignment with federal income-support guidelines and provincial top-ups for caregiving roles.
                        </p>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full sm:w-auto text-xs mt-2"
                        onClick={() => {
                          if (pathStep.actionUrl && pathStep.actionUrl !== '#') {
                            window.open(pathStep.actionUrl, '_blank');
                          }
                        }}
                      >
                        Open official guidance <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Document Checklist & Deadlines */}
            <div className="grid gap-3 md:grid-cols-2 pt-2">
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <FileText className="w-3 h-3" />
                    Document Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-3 h-3 text-muted-foreground" />
                      Record of Employment (ROE)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-3 h-3 text-muted-foreground" />
                      Disability medical documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckSquare className="w-3 h-3 text-muted-foreground" />
                      Proof of Ontario residency
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-muted/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    Deadlines & Appeals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Initial application</span>
                    <span className="font-medium">Within 4 weeks</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Appeal EI decision</span>
                    <span>30 days from notice</span>
                  </div>
                  <div className="border-t pt-2 flex items-start gap-2 text-muted-foreground">
                    <Scale className="w-3 h-3 mt-0.5" />
                    <p className="text-[10px]">
                      Exceptions may be available in hardship situations. A human decision-maker must confirm deadline changes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Manual Review Note */}
            <Card className="bg-background border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs flex items-center gap-2">
                  <GitBranch className="w-3 h-3" />
                  Exceptions & Manual Review
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-1">
                <p>
                  This pathway is a mock, machine-generated view. Programs can make case-by-case exceptions, especially for disability and caregiving.
                </p>
                <p>
                  A trained officer should always validate complex cases before benefits are changed or stopped.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
