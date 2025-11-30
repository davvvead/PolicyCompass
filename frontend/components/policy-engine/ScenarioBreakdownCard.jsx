"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePolicyEngine } from './PolicyEngineContext';
import { motion } from "framer-motion";
import { Briefcase, Home, Heart, MapPin, Flag } from "lucide-react";

const iconMap = {
  employment: Briefcase,
  family: Home,
  health: Heart,
  location: MapPin,
  immigration: Flag
};

const colorMap = {
  employment: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800",
  family: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-800",
  health: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800",
  location: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-200 dark:border-teal-800",
  immigration: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800"
};

export default function ScenarioBreakdownCard() {
  const { step, scenario } = usePolicyEngine();

  if (step < 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, staggerChildren: 0.04 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-1">
        <Briefcase className="w-3.5 h-3.5" />
        <span>Scenario Context</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {scenario.parsedFactors.map((factor) => {
          const Icon = iconMap[factor.category] || Flag;
          const colorClass = colorMap[factor.category] || "bg-secondary/60 text-secondary-foreground border-border/60";
          
          return (
            <motion.div
              key={factor.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className={`flex items-center gap-1.5 py-1.5 px-3 rounded-md text-xs border ${colorClass}`}>
                <Icon className="w-3 h-3 opacity-80" />
                <span>{factor.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
