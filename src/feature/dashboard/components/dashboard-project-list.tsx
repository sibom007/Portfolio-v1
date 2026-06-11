"use client";

import { useState } from "react";
import { projects } from "@prisma/client";
import { motion, AnimatePresence, Variants } from "framer-motion";

import { ProjectCreateDialog } from "./project-create-dialog";

import { DashboardProjectHeader } from "./dashboard-project-header";
import { EmptyProject } from "./empty-project";

import { useGetProjects } from "@/hooks/use-projects";
import { DashboardProjectCardSkeleton } from "./dashboard-project-card-skeleton";
import { DashboardProjectCard } from "./dashboard-project-card";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
};

export function DashboardProjectList() {
  const [createModelOpen, setCreateModelOpen] = useState(false);
  const { data, isLoading } = useGetProjects();

  const projectItems = data?.projects ?? [];

  return (
    <div className="min-h-screen  text-foreground ">
      <div className="max-w-7xl mx-auto ">
        {/* Unified Dashboard Header */}
        <DashboardProjectHeader
          onCreateClick={() => setCreateModelOpen(true)}
        />

        {/* Display Terminal Workspace */}
        <main className="relative min-h-100">
          <AnimatePresence mode="wait">
            {/* Loading Grid View */}
            {isLoading && (
              <motion.div
                key="loading-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {Array.from({ length: 6 }).map((_, i) => (
                  <DashboardProjectCardSkeleton key={i} />
                ))}
              </motion.div>
            )}

            {/* Empty Context View */}
            {!isLoading && projectItems.length === 0 && (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full">
                <EmptyProject onCreate={() => setCreateModelOpen(true)} />
              </motion.div>
            )}

            {/* Populated Projects Grid Layout */}
            {!isLoading && projectItems.length > 0 && (
              <motion.div
                key="populated-grid"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {projectItems.map((project: projects) => (
                  <motion.div
                    key={project.id}
                    variants={cardVariants}
                    layout
                    className="flex h-full w-full">
                    <DashboardProjectCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <ProjectCreateDialog
            open={createModelOpen}
            onOpenChange={setCreateModelOpen}
          />
        </main>
      </div>
    </div>
  );
}
