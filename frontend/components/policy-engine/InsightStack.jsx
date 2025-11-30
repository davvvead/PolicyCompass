"use client"

import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Network, 
  GitBranch, 
  ChevronDown, 
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import UnifiedPathwayView from "./UnifiedPathwayView";
import PolicyTagList from "./PolicyTagList";
import ConflictDetectionBanner from "./ConflictDetectionBanner";
import ReasoningSteps from "./ReasoningSteps";
import ScenarioBreakdownCard from "./ScenarioBreakdownCard";
import IntersectionMapPreview from "./IntersectionMapPreview";

export default function InsightStack({ 
  scenario, 
  isFirstPlanForSession = false 
}) {
  const [openSection, setOpenSection] = useState(isFirstPlanForSession ? 'plan' : null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  // Group policies for Section B
  const alignedPolicies = scenario.policies.filter(p => p.status === 'aligned');
  const ambiguousPolicies = scenario.policies.filter(p => p.status === 'ambiguous');
  const conflictPolicies = scenario.policies.filter(p => p.status === 'conflict');

  return (
    <div className="w-full space-y-1 xs:space-y-1.5 sm:space-y-2 mt-3 xs:mt-4 overflow-hidden min-w-0">
      
      {/* Section A: Your Action Plan */}
      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('plan')}
          className="w-full flex items-center justify-between p-2 xs:p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
            <div className="p-1 xs:p-1.5 bg-primary/10 rounded-md text-primary shrink-0">
              <ClipboardCheck className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs xs:text-sm font-medium text-foreground">Your Action Plan</div>
              <div className="text-[9px] xs:text-[11px] text-muted-foreground truncate">
                {scenario.pathway.length} steps • 4–6 weeks • {scenario.policies.slice(0, 2).map(p => p.name.split(' ')[0]).join(', ')}...
              </div>
            </div>
          </div>
          {openSection === 'plan' ? <ChevronUp className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" />}
        </button>
        
        {openSection === 'plan' && (
          <div className="p-2 xs:p-4 border-t bg-background animate-in slide-in-from-top-2 duration-200 space-y-3">
            <div>
              <ScenarioBreakdownCard />
            </div>
            <UnifiedPathwayView />
          </div>
        )}
      </div>

      {/* Section B: Policies & Intersections */}
      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('policies')}
          className="w-full flex items-center justify-between p-2 xs:p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
            <div className="p-1 xs:p-1.5 bg-indigo-100 text-indigo-700 rounded-md border border-indigo-200 shrink-0">
              <Network className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs xs:text-sm font-medium text-foreground">Policies & intersections</div>
              <div className="text-[9px] xs:text-[11px] text-muted-foreground truncate">
                {alignedPolicies.length} aligned • {ambiguousPolicies.length} ambiguous • {conflictPolicies.length} conflict
              </div>
            </div>
          </div>
          {openSection === 'policies' ? <ChevronUp className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" />}
        </button>
        
        {openSection === 'policies' && (
          <div className="p-2 xs:p-4 border-t bg-background animate-in slide-in-from-top-2 duration-200 space-y-3 xs:space-y-5">
            <ConflictDetectionBanner />
            
            <IntersectionMapPreview 
              alignedCount={alignedPolicies.length}
              ambiguousCount={ambiguousPolicies.length}
              conflictCount={conflictPolicies.length}
              totalCount={scenario.policies.length}
            />
            
            {/* Relationship Overview Widget */}
            <div className="space-y-3">
              {alignedPolicies.length > 0 && (
                <div>
                  <h4 className="text-[10px] xs:text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Aligned ({alignedPolicies.length})</h4>
                  <p className="text-[9px] xs:text-[11px] text-muted-foreground mb-1.5">Programs that work together without issue.</p>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {alignedPolicies.map(p => (
                      <Badge 
                        key={p.id} 
                        variant="outline" 
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800 font-normal text-[10px] xs:text-xs px-2 py-0.5 xs:px-3 xs:py-1"
                      >
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {ambiguousPolicies.length > 0 && (
                <div>
                  <h4 className="text-[10px] xs:text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Ambiguous ({ambiguousPolicies.length})</h4>
                  <p className="text-[9px] xs:text-[11px] text-muted-foreground mb-1.5">Programs that may behave differently depending on income/timing.</p>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {ambiguousPolicies.map(p => (
                      <Badge 
                        key={p.id} 
                        variant="outline" 
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800 font-normal text-[10px] xs:text-xs px-2 py-0.5 xs:px-3 xs:py-1"
                      >
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {conflictPolicies.length > 0 && (
                <div>
                  <h4 className="text-[10px] xs:text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">Conflict ({conflictPolicies.length})</h4>
                  <p className="text-[9px] xs:text-[11px] text-muted-foreground mb-1.5">Programs that cannot be combined in this scenario.</p>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {conflictPolicies.map(p => (
                      <Badge 
                        key={p.id} 
                        variant="outline" 
                        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 font-normal text-[10px] xs:text-xs px-2 py-0.5 xs:px-3 xs:py-1"
                      >
                        {p.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Why This Matters Section */}
            <div className="bg-muted/30 rounded-lg p-2 xs:p-4 border border-border/50">
              <h4 className="text-xs xs:text-sm font-semibold mb-1">Why this matters</h4>
              <p className="text-[10px] xs:text-sm text-muted-foreground leading-relaxed">
                Ontario Works (OW-Dir-4.1) conflicts with Employment Insurance because EI must be considered first. This creates timing and eligibility overlaps for permanent residents.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section C: How We Decided */}
      <div className="border rounded-lg bg-card overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('decisions')}
          className="w-full flex items-center justify-between p-2 xs:p-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
        >
          <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
            <div className="p-1 xs:p-1.5 bg-violet-100 text-violet-700 rounded-md border border-violet-200 shrink-0">
              <GitBranch className="w-3.5 xs:w-4 h-3.5 xs:h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs xs:text-sm font-medium text-foreground">How we decided</div>
              <div className="text-[9px] xs:text-[11px] text-muted-foreground truncate">
                {scenario.reasoningSteps.length} key checks • 1 flagged for human review
              </div>
            </div>
          </div>
          {openSection === 'decisions' ? <ChevronUp className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-muted-foreground shrink-0" />}
        </button>
        
        {openSection === 'decisions' && (
          <div className="p-2 xs:p-4 border-t bg-background animate-in slide-in-from-top-2 duration-200">
            <div className="mb-3 text-[10px] xs:text-sm text-muted-foreground">
              Based on your profile, we prioritized federal benefits over provincial ones to maximize your eligible support.
            </div>
            <ReasoningSteps />
          </div>
        )}
      </div>

    </div>
  );
}
