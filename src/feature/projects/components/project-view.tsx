"use client";
import { motion } from "motion/react";
import { projects } from "@prisma/client";
import { useGetProjects } from "@/hooks/use-projects";
import { DashboardProjectCardSkeleton } from "@/feature/dashboard/components/dashboard-project-card-skeleton";
import { EmptyProject } from "@/feature/dashboard/components/empty-project";
import { DashboardProjectCard } from "@/feature/dashboard/components/dashboard-project-card";

export function ProjectView() {
  const { data, isLoading } = useGetProjects();

  return (
    <section className="relative py-12 container mx-auto">
      {/* Clean Minimal Header */}
      <div className="max-w-6xl mx-auto mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Projects
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto text-sm sm:text-base">
          A selection of things I’ve built recently
        </p>
      </div>

      {/* Grid Content Wrapper */}
      <div className="max-w-6xl mx-auto min-h-100">
        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-stretch">
            {Array.from({ length: 6 }).map((_, i) => (
              <DashboardProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !data?.projects?.length && <EmptyProject />}

        {/* Beautiful Uniform Grid */}
        {!isLoading && data?.projects && data.projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-stretch">
            {data.projects.map((project: projects) => (
              <div key={project.id} className="flex h-full w-full">
                <DashboardProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
