"use client";

import { Button } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";

interface EmptyProjectProps {
  onCreate?: () => void;
}

export function EmptyProject({ onCreate }: EmptyProjectProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-20 rounded-2xl border border-dashed border-border bg-muted/20">
      <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-muted-foreground border border-border/80 shadow-sm mb-4">
        <FolderOpen className="w-5 h-5 stroke-[1.5]" />
      </div>

      <h3 className="text-lg font-bold tracking-tight text-foreground">
        No projects registered
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
        Your current branch environment is pristine. Get started by
        instantiating your first live configuration.
      </p>

      {onCreate && (
        <Button onClick={onCreate}>
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          Provision First App
        </Button>
      )}
    </div>
  );
}
