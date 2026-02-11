"use client";

import { useState } from "react";
import { SearchParam } from "@/Types";
import { motion } from "framer-motion";
import { NoProject } from "./no-project";
import { TrendingUp } from "lucide-react";
import { ProjectCard } from "./project-card";
import { projects, projectRepo } from "@prisma/client";
import { ProjectCardSkeleton } from "./project-card-skeleton";
import { useGetProject } from "@/feature/dashboard/hooks/use-projects";

type TabKey = "all" | "trending" | "frontend" | "backend";

export function ProjectView() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const repoMap: Record<TabKey, SearchParam | undefined> = {
    all: undefined,
    trending: "TRENDING",
    frontend: "FRONTEND",
    backend: "BACKEND",
  };

  const { data, isLoading } = useGetProject({
    repo: repoMap[activeTab] as projectRepo | undefined,
  });

  return (
    <section className="relative px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Projects
        </h2>
        <p className="text-muted-foreground mt-2">
          A selection of things I’ve built recently
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-2 rounded-full p-1 bg-muted/60 backdrop-blur">
          <TabButton
            label="All"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
          />

          <TabButton
            label="Trending"
            icon={<TrendingUp className="w-4 h-4" />}
            active={activeTab === "trending"}
            onClick={() => setActiveTab("trending")}
          />

          <TabButton
            label="Frontend"
            active={activeTab === "frontend"}
            onClick={() => setActiveTab("frontend")}
          />

          <TabButton
            label="Backend"
            active={activeTab === "backend"}
            onClick={() => setActiveTab("backend")}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {isLoading && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !data?.projects?.length && <NoProject />}

        {/* <AnimatePresence mode="wait"> */}
        {!isLoading && data?.projects && (
          <motion.div
            key={activeTab}
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {data.projects.map((project: projects) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
        {/* </AnimatePresence> */}
      </div>
    </section>
  );
}

/* =======================
   Tab Button
======================= */

function TabButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1 px-4 py-1.5
        rounded-full text-sm font-medium transition-all
        ${
          active
            ? "bg-primary text-primary-foreground shadow"
            : "text-muted-foreground hover:text-foreground"
        }
      `}>
      {icon}
      {label}
    </button>
  );
}
