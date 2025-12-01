import React from 'react';

export default function IntersectionMapPreview({ 
  alignedCount = 0, 
  ambiguousCount = 0, 
  conflictCount = 0,
  totalCount = 0
}) {
  return (
    <div className="border rounded-lg p-4 bg-card shadow-sm">
      <h3 className="text-base xs:text-lg font-semibold mb-3">Policy relationships at a glance</h3>
      <div className="flex flex-wrap gap-4 text-base mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">Aligned: <span className="text-foreground font-medium">{alignedCount} programmes</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-muted-foreground">Ambiguous: <span className="text-foreground font-medium">{ambiguousCount} rules</span></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Conflict: <span className="text-foreground font-medium">{conflictCount} directive</span></span>
        </div>
      </div>
      
      {/* Visual Bar */}
      <div className="h-2 w-full flex rounded-full overflow-hidden bg-muted">
        {totalCount > 0 && (
          <>
            {alignedCount > 0 && (
              <div style={{ width: `${(alignedCount / totalCount) * 100}%` }} className="bg-emerald-500" />
            )}
            {ambiguousCount > 0 && (
              <div style={{ width: `${(ambiguousCount / totalCount) * 100}%` }} className="bg-amber-500" />
            )}
            {conflictCount > 0 && (
              <div style={{ width: `${(conflictCount / totalCount) * 100}%` }} className="bg-red-500" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
