"use client";

import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@prisma/client";
import { EditProjectSchema } from "@/Types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useUpdateProject } from "../hooks/use-projects";

export type ProjectFormValues = z.infer<typeof EditProjectSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: projects;
}

export function EditProjectDialog({ onOpenChange, open, project }: Props) {
  const { mutate, isPending } = useUpdateProject();
  const form = useForm<z.infer<typeof EditProjectSchema>>({
    resolver: zodResolver(EditProjectSchema),
    defaultValues: {
      name: project.name ?? "",
      description: project.description ?? "",
      status: project.status,
      repo: project.repo,
      liveLink: project.liveLink ?? "",
      gitFrontend: project.gitFrontend ?? "",
      gitBackend: project.gitBackend ?? "",
      imageUrl: project.imageUrl,
    },
  });

  useEffect(() => {
    if (open && project) {
      form.reset({
        name: project.name,
        description: project.description,
        status: project.status,
        repo: project.repo,
        liveLink: project.liveLink ?? "",
        gitFrontend: project.gitFrontend,
        gitBackend: project.gitBackend ?? "",
        imageUrl: project.imageUrl,
      });
    }
  }, [open, project, form]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: ProjectFormValues) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== undefined,
      ),
    );

    mutate({
      id: project.id,
      updateData: cleanedData,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="p-0 max-w-4xl w-full max-h-[85vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="p-6 overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl text-foreground">
              Edit Project
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <Input placeholder="Project name" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Textarea
                placeholder="Project description"
                className="min-h-25"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Status + Repo */}
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
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
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Repo type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FRONTEND">Frontend</SelectItem>
                      <SelectItem value="BACKEND">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Git Repos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Frontend Git repo"
                  {...register("gitFrontend")}
                />
                {errors.gitFrontend && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.gitFrontend.message}
                  </p>
                )}
              </div>

              <Input
                placeholder="Backend Git repo (optional)"
                {...register("gitBackend")}
              />
            </div>

            {/* URLs */}
            <div className="gap-4">
              <Input placeholder="Live link" {...register("liveLink")} />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting && isPending}>
              {isSubmitting && isPending ? "Updating..." : "Update Project"}
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
