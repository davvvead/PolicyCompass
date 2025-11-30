"use client"

import React from 'react';
import { usePolicyEngine } from './PolicyEngineContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ShieldCheck, AlertTriangle, BookOpen, Gauge, Scale, Info, CheckCircle2 } from "lucide-react";

export default function TrustPanel() {
  const { isTrustPanelOpen, setIsTrustPanelOpen, scenario } = usePolicyEngine();

  const mockMeta = {
    confidence: 85,
  };

  return (
    <Sheet open={isTrustPanelOpen} onOpenChange={setIsTrustPanelOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-linear-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <SheetHeader className="pb-4 border-b border-slate-200 dark:border-slate-800">
          <SheetTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            Trust & Safety
          </SheetTitle>
          <SheetDescription className="text-xs">
            Transparency summary for this assessment pathway.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6 text-sm">
          {/* Confidence Section */}
          <section className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/40 rounded">
                <Gauge className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-green-900 dark:text-green-200">Confidence</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400" style={{ width: `${mockMeta.confidence}%` }} />
                </div>
                <span className="text-xs font-bold text-green-700 dark:text-green-300 min-w-fit">High (80–90%)</span>
              </div>
              <p className="text-sm text-black dark:text-white leading-relaxed">
                Indicates how often this guidance aligns with official program criteria across similar scenarios. Confidence reflects pattern consistency, not legal certainty or guaranteed outcomes.
              </p>
            </div>
          </section>

          {/* Data Sources Section */}
          <section className="space-y-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/40 rounded">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">Data Sources</h4>
            </div>
            <ul className="space-y-2.5 text-sm text-indigo-700 dark:text-indigo-300">
              {scenario.trustInfo.sources.map((source, i) => {
                const sourceDescriptions = [
                  "Defines eligibility, insurable hours, and benefit periods for EI.",
                  "Outlines criteria for caregiver tax credits and related deductions.",
                  "Establishes provincial income-support rules and conflict-resolution hierarchy."
                ];
                return (
                  <li key={i} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500 dark:text-indigo-400" />
                      <span className="font-medium">{source}</span>
                    </div>
                    <p className="text-sm text-black dark:text-white ml-5 leading-relaxed">{sourceDescriptions[i]}</p>
                  </li>
                );
              })}
            </ul>
            <div className="pt-2 border-t border-indigo-200 dark:border-indigo-800 space-y-1.5">
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                Last updated: <span className="font-medium">{scenario.trustInfo.lastUpdated}</span>
              </p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 italic">
                These are public statutes only. No private records or personal data were accessed.
              </p>
            </div>
          </section>

          {/* Known Limitations Section */}
          <section className="space-y-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-semibold text-amber-900 dark:text-amber-200">Known Limitations</h4>
            </div>
            <ul className="space-y-2 text-sm text-black dark:text-white leading-relaxed">
              {[
                "Does not verify identity or documentation.",
                "Does not check real-time income, ROE status, or Service Canada records.",
                "Does not account for severance, vacation payouts, or special payments.",
                "Uses simplified residency assumptions for demonstrational purposes.",
                "Does not replace a formal eligibility assessment by a benefits officer."
              ].map((limitation, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0" />
                  <span>{limitation}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Human Review Section */}
          <section className="space-y-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/40 rounded">
                <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-purple-900 dark:text-purple-200">Human Review</h4>
            </div>
            <div className="space-y-2.5 text-sm text-black dark:text-white leading-relaxed">
              <p>This assessment is informational and does not make eligibility decisions.</p>
              <p>Complex, unusual, or high-impact cases should always be reviewed by a trained program officer.</p>
              <p>A human authority must confirm any changes to benefits or program status.</p>
            </div>
          </section>

          {/* Bias Note Section */}
          <section className="space-y-2 p-4 bg-slate-200/40 dark:bg-slate-700/30 rounded-lg border border-slate-300 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-slate-300/50 dark:bg-slate-600/50 rounded">
                <Info className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </div>
              <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-xs">Confidence & Bias Note</h4>
            </div>
            <div className="space-y-2 text-sm text-black dark:text-white leading-relaxed">
              <p>Definitions in legislation may differ from medical, cultural, or community interpretations.</p>
              <p>Always confirm eligibility terms with the appropriate program office.</p>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
