import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useDeleteProject } from "../hooks/use-projects";
import { EditProjectDialog } from "./edit-project-dialog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: projects;
}

export const DashboardProjectCard = ({
  onOpenChange,
  open,
  project,
}: Props) => {
  const { mutate, isPending } = useDeleteProject();
  const handleDelete = (id: string) => {
    mutate(id);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative">
      {/* Gradient Glow Border */}
      <div className="absolute -inset-px rounded-2xl bg-linear-to-br from-primary/40 via-transparent to-primary/40 opacity-0 group-hover:opacity-100 blur-md transition duration-500" />

      <Card className="relative overflow-hidden rounded-2xl border bg-background/70 backdrop-blur-xl shadow-sm transition-all duration-300 group-hover:shadow-2xl">
        {/* Image Section */}
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

            {/* Floating Actions */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <EditProjectDialog
                project={project}
                open={open}
                onOpenChange={onOpenChange}
              />

              <Button
                size="icon"
                variant="secondary"
                className="backdrop-blur-md"
                onClick={() => handleDelete(project.id)}
                disabled={isPending}>
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        )}

        <CardHeader className="space-y-3">
          {/* Title */}
          <CardTitle className="text-xl font-semibold tracking-tight flex items-center gap-2">
            {project.name}
          </CardTitle>

          {/* Description */}
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {project.description}
          </CardDescription>

          {/* Badges */}
          <div className="flex gap-2 pt-1">
            <motion.div whileHover={{ scale: 1.08 }}>
              <Badge
                variant={project.status === "DONE" ? "default" : "secondary"}
                className="capitalize">
                {project.status.toLowerCase()}
              </Badge>
            </motion.div>

            <motion.div whileHover={{ scale: 1.08 }}>
              <Badge variant="outline">
                {project.repo === "FRONTEND" ? "Frontend" : "Backend"}
              </Badge>
            </motion.div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="">
          <div className="flex  items-center gap-3">
            {project.gitFrontend && (
              <motion.a
                whileHover={{ y: -2 }}
                href={project.gitFrontend}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Github className="w-3.5 h-3.5" />
                Frontend
              </motion.a>
            )}

            {project.gitBackend && (
              <motion.a
                whileHover={{ y: -2 }}
                href={project.gitBackend}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Github className="w-3.5 h-3.5" />
                Backend
              </motion.a>
            )}

            {project.liveLink && (
              <motion.a
                whileHover={{ y: -2 }}
                href={project.liveLink}
                target="_blank"
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary transition">
                <Globe className="w-3.5 h-3.5" />
                Live
              </motion.a>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4 pb-2 text-xs text-muted-foreground">
          <span className="opacity-70">Last updated</span>
          <span className="font-medium text-foreground">
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
