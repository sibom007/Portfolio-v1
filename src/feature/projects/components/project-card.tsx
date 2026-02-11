"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { projects } from "@prisma/client";
import { Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  project: projects;
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative">
      {/* Glow Border */}
      <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/40 via-transparent to-primary/40 opacity-0 group-hover:opacity-100 blur-md transition duration-500" />

      <Card className="relative overflow-hidden rounded-2xl border bg-background/70 backdrop-blur-xl shadow-sm transition-all duration-300 group-hover:shadow-2xl">
        {/* Image */}
        {project.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full">
              <Image
                src={project.imageUrl}
                alt={project.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
          </div>
        )}

        <CardHeader className="space-y-3">
          <CardTitle className="text-xl font-semibold tracking-tight">
            {project.name}
          </CardTitle>

          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {project.description}
          </CardDescription>

          {/* Badges */}
          <div className="flex gap-2 pt-1">
            <Badge
              variant={project.status === "DONE" ? "default" : "secondary"}
              className="capitalize">
              {project.status.toLowerCase()}
            </Badge>

            <Badge variant="outline">
              {project.repo === "FRONTEND" ? "Frontend" : "Backend"}
            </Badge>
          </div>
        </CardHeader>

        {/* Links */}
        <CardContent className="pt-2 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            {project.gitFrontend && (
              <Link
                href={project.gitFrontend}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Github className="w-3.5 h-3.5" />
                Frontend
              </Link>
            )}

            {project.gitBackend && (
              <Link
                href={project.gitBackend}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Github className="w-3.5 h-3.5" />
                Backend
              </Link>
            )}

            {project.liveLink && (
              <Link
                href={project.liveLink}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Globe className="w-3.5 h-3.5" />
                Live
              </Link>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4 pb-3 text-xs text-muted-foreground">
          <span>Updated</span>
          <span className="font-medium text-foreground">
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
