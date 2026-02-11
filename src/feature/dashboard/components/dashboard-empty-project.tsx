"use client";

import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onCreate: () => void;
}

export const DashboardEmptyProject = ({ onCreate }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="col-span-full flex flex-col items-center justify-center py-24 text-center border-2">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-foreground">
        No projects yet
      </h3>

      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        You haven’t created any projects. Start by creating your first one.
      </p>

      <Button onClick={onCreate} className="mt-6">
        Create Project
      </Button>
    </motion.div>
  );
};
