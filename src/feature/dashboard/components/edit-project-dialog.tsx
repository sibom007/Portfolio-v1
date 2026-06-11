"use client";

import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, Variants } from "motion/react";
import {
  Settings2,
  LayoutGrid,
  Link2,
  GitBranch,
  CheckCircle2,
  FileText,
  ImageIcon,
  Loader2,
  X,
} from "lucide-react";

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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { projects } from "@prisma/client";
import { EditProjectSchema } from "@/Types";
import { useUpdateProject } from "@/hooks/use-projects";

export type ProjectFormValues = z.infer<typeof EditProjectSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: projects;
}

// Staggered animation configuration
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
};

export function EditProjectDialog({ onOpenChange, open, project }: Props) {
  const { mutate, isPending } = useUpdateProject();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(EditProjectSchema),
    // 'values' keeps the form in sync with the 'project' prop automatically
    values: {
      name: project?.name ?? "",
      description: project?.description ?? "",
      status: project?.status ?? "WORKING",
      repo: project?.repo ?? "FRONTEND",
      liveLink: project?.liveLink ?? "",
      gitFrontendLink: project?.gitFrontendLink ?? "",
      gitBackendLink: project?.gitBackendLink ?? "",
      imageUrl: project?.imageUrl ?? "",
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = form;

  const selectedRepo = watch("repo");

  const onSubmit = (data: ProjectFormValues) => {
    // Filter out empty strings to prevent sending broken URLs to Prisma
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? (key === "gitBackend" ? null : "") : value,
      ]),
    );

    mutate(
      { id: project.id, updateData: cleanedData },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-150 p-0 overflow-hidden border border-border shadow-2xl rounded-2xl bg-background">
        {/* Header Section */}
        <DialogHeader className="px-6 py-5 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-sm border border-primary/20">
              <Settings2 className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-muted tracking-tight">
                Project Settings
              </DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Adjusting configurations for{" "}
                <span className="text-foreground font-bold">
                  {project?.name}
                </span>
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Form Body - Scrollable */}
        <AnimatePresence>
          <motion.form
            id="edit-project-form"
            onSubmit={handleSubmit(onSubmit)}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="px-6 py-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
            {/* Section 1: Core Identity */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Basic Information
                </label>
                <Input placeholder="Project Title" {...register("name")} />
                {errors.name && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Textarea
                  placeholder="Tell us about the technology stack and goals..."
                  className="min-h-27.5 rounded-xl resize-none leading-relaxed "
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs font-semibold text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Section 2: Strategy Selectors */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="WORKING">Working</SelectItem>
                        <SelectItem value="DONE">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                  <LayoutGrid className="w-3 h-3" /> Architecture
                </label>
                <Controller
                  name="repo"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="FRONTEND">Frontend Stack</SelectItem>
                        <SelectItem value="BACKEND">Backend Stack</SelectItem>
                        <SelectItem value="FULL_STACK">Full Stack</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </motion.div>

            {/* Section 3: Repository Paths */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 pt-2 border-t border-border/40">
              {selectedRepo !== "BACKEND" && (
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                    <GitBranch className="w-3 h-3" /> Frontend Repository
                  </label>
                  <Input
                    placeholder="https://github.com/..."
                    {...register("gitFrontendLink")}
                  />
                  {errors.gitFrontendLink && (
                    <p className="text-xs font-semibold text-destructive">
                      {errors.gitFrontendLink.message}
                    </p>
                  )}
                </div>
              )}

              {selectedRepo !== "FRONTEND" && (
                <div className="flex flex-col space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                    <GitBranch className="w-3 h-3" /> Backend Repository
                  </label>
                  <Input
                    placeholder="https://github.com/... (optional)"
                    {...register("gitBackendLink")}
                  />
                </div>
              )}
            </motion.div>

            {/* Section 4: Public Links */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-2 border-t border-border/40">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                  <Link2 className="w-3 h-3" /> Production URL
                </label>
                <Input placeholder="https://..." {...register("liveLink")} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80 flex items-center gap-2">
                  <ImageIcon className="w-3 h-3" /> Image Cover
                </label>
                <Input
                  placeholder="URL to image..."
                  {...register("imageUrl")}
                />
              </div>
            </motion.div>
          </motion.form>
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-border/60 bg-muted/20 flex items-center justify-end gap-3 shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="edit-project-form" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
