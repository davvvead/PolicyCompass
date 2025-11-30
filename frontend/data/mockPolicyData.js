export const mockScenario = {
  id: "scenario_001",
  userInput: "I lost my job, I’m a permanent resident in Ontario, and I take care of my disabled mom.",
  parsedFactors: [
    { id: "f1", label: "Employment Status: Unemployed", category: "employment" },
    { id: "f2", label: "Role: Caregiver", category: "family" },
    { id: "f3", label: "Care Recipient: Disabled Parent", category: "health" },
    { id: "f4", label: "Status: Permanent Resident", category: "immigration" },
    { id: "f5", label: "Jurisdiction: Ontario", category: "location" }
  ],
  policies: [
    { 
      id: "p1", 
      name: "EI Regular Benefits", 
      code: "EI-Reg-12(c)", 
      status: "aligned",
      description: "Provides temporary income support to unemployed workers who have lost their job through no fault of their own, based on insurable hours."
    },
    { 
      id: "p2", 
      name: "Canada Caregiver Credit", 
      code: "CRA-CCC-2024", 
      status: "aligned",
      description: "A non-refundable tax credit for those who support a spouse, common-law partner, or dependent with a physical or mental impairment."
    },
    { 
      id: "p3", 
      name: "Ontario Works Directive", 
      code: "OW-Dir-4.1", 
      status: "conflict",
      description: "Provincial social assistance of last resort. Income from other sources (like EI) is deducted dollar-for-dollar, creating a potential eligibility conflict."
    },
    { 
      id: "p4", 
      name: "ODSP Income Rules", 
      code: "ODSP-Inc-5", 
      status: "ambiguous",
      description: "Rules governing income treatment for disability support. Ambiguity exists regarding how caregiver benefits interact with household income caps."
    }
  ],
  conflicts: [
    {
      id: "c1",
      title: "Income Support Overlap",
      description: "Simultaneous claim of EI and Ontario Works is restricted.",
      severity: "high",
      resolution: "EI takes precedence. Ontario Works acts as top-up only after EI exhaustion."
    }
  ],
  reasoningSteps: [
    {
      id: "r1",
      step: "Identify Federal Eligibility",
      detail: "Client meets insurable hours for EI based on recent employment history.",
      relatedPolicyId: "p1"
    },
    {
      id: "r2",
      step: "Assess Caregiver Status",
      detail: "Caregiver duties validated. Canada Caregiver Credit applies for tax year.",
      relatedPolicyId: "p2"
    },
    {
      id: "r3",
      step: "Resolve Provincial Conflict",
      detail: "Detected overlap with Ontario Works. Applied 'Federal First' rule.",
      relatedPolicyId: "p3"
    },
    {
      id: "r4",
      step: "Synthesize Pathway",
      detail: "Primary stream: EI. Secondary: Caregiver Tax Credit. Tertiary: ODSP check for mother.",
      relatedPolicyId: "p4"
    }
  ],
  eligibility: [
    {
      program: "Employment Insurance (EI)",
      status: "eligible",
      confidence: "High",
      reason: "Sufficient insurable hours & involuntary job loss."
    },
    {
      program: "Canada Caregiver Credit",
      status: "eligible",
      confidence: "High",
      reason: "Dependent parent with disability."
    },
    {
      program: "Ontario Works",
      status: "ineligible",
      confidence: "Medium",
      reason: "Income from EI exceeds threshold."
    }
  ],
  pathway: [
    {
      id: "step1",
      title: "Apply for Employment Insurance",
      description: "Submit application via Service Canada. Do this immediately as there is a 1-week waiting period.",
      deadline: "Within 4 weeks of last day worked",
      actionUrl: "#"
    },
    {
      id: "step2",
      title: "Secure Caregiver Documentation",
      description: "Obtain Form T2201 (Disability Tax Credit Certificate) signed by your mother's medical practitioner.",
      deadline: "Before tax filing deadline",
      actionUrl: "#"
    },
    {
      id: "step3",
      title: "Review Provincial Benefits",
      description: "Check if your mother qualifies for ODSP if not already enrolled. This is separate from your income.",
      deadline: "No strict deadline",
      actionUrl: "#"
    }
  ],
  trustInfo: {
    lastUpdated: "November 2025",
    sources: ["Employment Insurance Act", "Income Tax Act", "Ontario Works Act, 1997"],
    limitations: ["Does not account for severance pay specifics.", "Assumes standard PR residency obligations met."],
    biasNote: "Caregiver definitions may vary by medical practitioner assessment."
  }
};
