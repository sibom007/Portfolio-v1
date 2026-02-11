"use client";

import { useState } from "react";
import { projects } from "@prisma/client";

import { ProjectCreateDialog } from "./project-create-dialog";
import { DashboardProjectCard } from "./dashboard-project-card";
import { DashboardEmptyProject } from "./dashboard-empty-project";
import { DashboardProjectCardSkeleton } from "./dashboard-project-card-skeleton";
import { useGetProject } from "../hooks/use-projects";

export const ProjectList = () => {
  const { data, isLoading } = useGetProject();

  const [CreateModelOpen, setCreateModelOpen] = useState(false);
  const [EditModelOpen, setEditModelOpen] = useState(false);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl font-bold text-foreground">Projects</h1>

        {/* Create Project Dialog */}
        <ProjectCreateDialog
          open={CreateModelOpen}
          onOpenChange={setCreateModelOpen}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <DashboardProjectCardSkeleton key={i} />
          ))}

        {!isLoading && data?.projects?.length === 0 && (
          <DashboardEmptyProject onCreate={() => setCreateModelOpen(true)} />
        )}

        {data?.projects?.map((project: projects) => (
          <DashboardProjectCard
            project={project}
            open={EditModelOpen}
            onOpenChange={setEditModelOpen}
            key={project.id}
          />
        ))}
      </div>
    </div>
  );
};
