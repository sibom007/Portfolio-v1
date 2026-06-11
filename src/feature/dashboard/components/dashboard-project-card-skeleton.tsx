"use client";

export function DashboardProjectCardSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-5 space-y-4 flex flex-col justify-between animate-pulse">
      <div className="space-y-3">
        {/* Image/Icon Block Representation */}
        <div className="w-12 h-12 rounded-xl bg-muted" />

        {/* Text Area Placements */}
        <div className="space-y-2">
          <div className="h-5 bg-muted rounded-md w-1/2" />
          <div className="h-3 bg-muted rounded-md w-full" />
          <div className="h-3 bg-muted rounded-md w-5/6" />
        </div>
      </div>

      {/* Button Tray Placements */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40 gap-4">
        <div className="h-8 bg-muted rounded-lg w-20" />
        <div className="h-8 bg-muted rounded-lg w-20" />
      </div>
    </div>
  );
}
