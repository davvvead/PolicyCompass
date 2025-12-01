"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, ExternalLink, FileText, AlertCircle, Scale, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

export default function UnifiedPathwayView() {
  const { step, scenario } = usePolicyEngine();

  if (step < 3) return (
    <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
      Pathway generation pending analysis...
    </div>
  );

  return (
    <div className="space-y-5 p-1">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-3 h-3 shrink-0" />
          <span>Typical completion time: 4–6 weeks</span>
        </div>
      </div>

      <div className="grid gap-4">
        {scenario.pathway.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="border-l-4 border-l-[#90DDD1] dark:border-l-[#649DE1] shadow-sm hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="secondary" className="mb-2 bg-[#90DDD1]/20 text-teal-900 dark:bg-[#649DE1]/20 dark:text-blue-100 hover:bg-[#90DDD1]/30 whitespace-nowrap shrink-0">Step {index + 1}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground text-right">
                    <Clock className="w-3 h-3 mr-1 shrink-0" />
                    {step.deadline}
                  </div>
                </div>
                <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                <CardDescription className="text-sm">{step.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Button 
                  className="w-full sm:w-auto border-[#90DDD1]/50 dark:border-[#649DE1]/50 hover:bg-[#90DDD1]/10 dark:hover:bg-[#649DE1]/10 text-foreground" 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    if (step.actionUrl && step.actionUrl !== '#') {
                      window.open(step.actionUrl, '_blank');
                    }
                  }}
                >
                  Open official guidance <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base xs:text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <FileText className="w-4 h-4" />
              Document checklist
            </CardTitle>
            {/* <CardDescription className="text-xs text-blue-600/80 dark:text-blue-400/80">Mocked example — not legal advice.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-blue-900/80 dark:text-blue-100/80">
              <li className="flex items-center gap-2">
                <CheckSquare className="w-3 h-3 text-blue-500" />
                Record of Employment (ROE)
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="w-3 h-3 text-blue-500" />
                Disability-related medical documentation
              </li>
              <li className="flex items-center gap-2">
                <CheckSquare className="w-3 h-3 text-blue-500" />
                Proof of residency in Ontario
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base xs:text-lg flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertCircle className="w-4 h-4" />
              Deadlines & appeals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-amber-900/80 dark:text-amber-100/80">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span>Initial application window</span>
                <span className="font-medium">Within 4 weeks of job loss</span>
              </div>
              <div className="flex items-center justify-between opacity-80">
                <span>Appeal EI decision</span>
                <span>30 days from notice</span>
              </div>
            </div>
            <div className="border-t border-amber-200/50 dark:border-amber-800/50 pt-2 flex items-start gap-2 opacity-80">
              <Scale className="w-3 h-3 mt-0.5" />
              <p>
                Exceptions and extensions may be available in hardship situations. A human decision-maker must confirm any change to deadlines.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-background border-dashed">
        <CardHeader className="pb-2">
          <CardTitle className="text-base xs:text-lg flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            Exceptions & manual review
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This pathway is a machine-generated preview. Real programs can make case-by-case exceptions, especially for disability and caregiving situations. A trained officer should review complex cases before any benefits are confirmed, changed, or stopped.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

