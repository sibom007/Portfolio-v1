"use client";

import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CreateProjectSchema } from "@/Types";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCreateProject } from "../hooks/use-projects";

// ----------------------------
// Zod Schema (Prisma aligned)
// ----------------------------

export type ProjectFormValues = z.infer<typeof CreateProjectSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// ----------------------------
// Framer Motion Variants
// ----------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ----------------------------
// Component
// ----------------------------
export function ProjectCreateDialog({ open, onOpenChange }: Props) {
  const { mutate, isPending, data: SuccessData } = useCreateProject();
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "WORKING",
      repo: "FRONTEND",
      liveLink: "",
      gitFrontend: "",
      gitBackend: "",
      password: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        description: "",
        status: "WORKING",
        repo: "FRONTEND",
        liveLink: "",
        gitFrontend: "",
        gitBackend: "",
      });
    }
  }, [open, form]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ProjectFormValues) => {
    mutate(data);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 ">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-foreground text-xl">
              Create Project
            </DialogTitle>
          </DialogHeader>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show">
            {/* Project Name */}
            <motion.div variants={itemVariants}>
              <Input placeholder="Project name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <Textarea
                placeholder="Short project description"
                className="min-h-25 w-84 line-clamp-2"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.description.message}
                </p>
              )}
            </motion.div>

            {/* Status + Repo */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4">
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WORKING">Working</SelectItem>
                      <SelectItem value="DONE">Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <Controller
                name="repo"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select repo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FRONTEND">Frontend</SelectItem>
                      <SelectItem value="BACKEND">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </motion.div>

            {/* Git Repos */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Frontend Git repository"
                  {...register("gitFrontend")}
                />
                {errors.gitFrontend && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.gitFrontend.message}
                  </p>
                )}
              </div>

              <Input
                placeholder="Backend Git repository (optional)"
                {...register("gitBackend")}
              />
            </motion.div>

            {/* URLs */}
            <motion.div
              variants={itemVariants}
              className=" grid grid-cols-2 gap-4">
              <Input placeholder="Live demo link" {...register("liveLink")} />
              <Input placeholder="Image link" {...register("imageUrl")} />
            </motion.div>

            <Input placeholder="Password" {...register("password")} />
            {/* Submit */}
            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                disabled={isSubmitting && isPending}
                className="w-full">
                {isSubmitting && isPending ? "Creating..." : "Create Project"}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
