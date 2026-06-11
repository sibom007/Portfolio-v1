"use client";

import { Plus, Layers } from "lucide-react";

interface ProjectHeaderProps {
  onCreateClick: () => void;
}

export function DashboardProjectHeader({ onCreateClick }: ProjectHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5 text-primary" />
          <span>Console Terminal</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Projects Engine
        </h1>
        <p className="text-muted-foreground text-sm max-w-md">
          Create, optimize, and supervise deployment branches linked to
          production databases.
        </p>
      </div>

      <button
        onClick={onCreateClick}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 h-10 px-4 rounded-xl active:scale-[0.98] transition-all self-start sm:self-auto w-full sm:w-auto">
        <Plus className="w-4 h-4 stroke-[2.5]" />
        Create Project
      </button>
    </header>
  );
}
