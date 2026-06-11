"use client";

import { projects } from "@prisma/client";
import {
  ExternalLink,
  GitBranch,
  Trash2,
  Pencil,
  Github,
  Database,
  Globe,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDeleteProject, useUpdateProject } from "@/hooks/use-projects";
import Image from "next/image";
import { EditProjectDialog } from "./edit-project-dialog";
import { useState } from "react";
import { DeleteProjectDialog } from "./delete-project-dialog";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface ProjectCardProps {
  project: projects;
}

export function DashboardProjectCard({ project }: ProjectCardProps) {
  const pathname = usePathname();
  const [editModelOpen, setEditModelOpen] = useState(false);
  const [deleteModelOpen, setDeleteModelOpen] = useState(false);

  const isDone = project.status === "DONE";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col w-full  border border-border/50 rounded-3xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20">
      <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {pathname === "/dashboard" && (
          <div className="flex gap-2">
            <button
              onClick={() => setEditModelOpen(true)}
              className="p-2 bg-background/80 backdrop-blur-md border border-border rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-xl"
              title="Edit Project">
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeleteModelOpen(true)}
              className="p-2 bg-background/80 backdrop-blur-md border border-border rounded-full text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all shadow-xl disabled:opacity-50"
              title="Delete Project">
              <Trash2 className={`w-4 h-4 }`} />
            </button>
          </div>
        )}
      </div>
      {/* Header Image Section */}
      <div className="relative h-48 w-full bg-muted overflow-hidden">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.name}
            width={50}
            height={50}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-primary/5">
            <span className="text-6xl font-black text-primary/10 select-none">
              {project.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-4 left-4">
          <span
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${
              isDone
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}>
            {isDone ? (
              <CheckCircle2 className="w-3 h-3" />
            ) : (
              <Clock className="w-3 h-3" />
            )}
            {project.status}
          </span>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          {/* Metadata Row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-primary" />
              <span className="uppercase tracking-tight">
                {project.repo.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Action Links */}
          <div className="grid grid-cols-2 gap-2">
            {/* Git Frontend */}
            {project.gitFrontendLink && (
              <Button variant={"outline"} asChild>
                <Link
                  href={project.gitFrontendLink}
                  target="_blank"
                  >
                  <Github className="w-3.5 h-3.5" />
                  <span>Frontend</span>
                </Link>
              </Button>
            )}

            {/* Git Backend */}
            {project.gitBackendLink && (
              <Button variant={"outline"} asChild>
                <Link href={project.gitBackendLink} target="_blank">
                  <Database className="w-3.5 h-3.5" />
                  <span>Backend</span>
                </Link>
              </Button>
            )}

            {project.liveLink && (
              <Button asChild>
                <Link
                  href={project.liveLink}
                  target="_blank"
                  className={` ${
                    !project.gitFrontendLink && !project.gitBackendLink
                      ? "col-span-2"
                      : "col-span-2"
                  }`}>
                  <Globe className="w-3.5 h-3.5" />
                  <span>Visit Live Demo</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <EditProjectDialog
        project={project}
        onOpenChange={setEditModelOpen}
        open={editModelOpen}
      />
      <DeleteProjectDialog
        project={project}
        onOpenChange={setDeleteModelOpen}
        open={deleteModelOpen}
      />
      {/* Decorative Shimmer Effect */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
    </motion.div>
  );
}
