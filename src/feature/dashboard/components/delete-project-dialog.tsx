"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@prisma/client";
import { useDeleteProject } from "@/hooks/use-projects";

interface ProjectDeleteDialogProps {
  project: projects;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDeleteDialogProps) {
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleConfirmDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100 p-0 overflow-hidden border-none bg-background shadow-2xl rounded-3xl">
        <div className="relative p-6">
          {/* Subtle Background Warning Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-destructive/10 blur-[50px] pointer-events-none" />

          <DialogHeader className="items-center text-center space-y-4">
            {/* Animated Warning Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
              <AlertTriangle className="w-8 h-8" />
            </motion.div>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-black tracking-tight">
                Remove Project?
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                You are about to delete{" "}
                <span className="text-foreground font-bold underline decoration-destructive/30 underline-offset-4">
                  {project?.name}
                </span>
                . All repository links and metadata will be permanently erased
                from the terminal records.
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3 ">
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isPending}
              onClick={handleConfirmDelete}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Erase Build
                </>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
