import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, Variants } from "motion/react";
import {
  Plus,
  Link,
  ImageIcon,
  Code2,
  ShieldAlert,
  Loader2,
} from "lucide-react";

import { CreateProjectSchema } from "@/Types"; // Adjust mapping matching your types index file

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProject } from "@/hooks/use-projects";

export type ProjectFormValues = z.infer<typeof CreateProjectSchema>;

interface ProjectCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Staggering text transitions
const formContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const formFieldVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function ProjectCreateDialog({
  open,
  onOpenChange,
}: ProjectCreateDialogProps) {
  const { mutate: createProject, isPending } = useCreateProject();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "WORKING",
      repo: "FRONTEND",
      liveLink: "",
      gitFrontendLink: "",
      gitBackendLink: "",
      imageUrl: "",
      password: "",
    },
  });

  // Watch repo selection type to dynamically handle required conditional sub-fields
  const selectedRepoType = watch("repo");

  // Reset form status configurations when target dialog transitions open
  useEffect(() => {
    if (open) {
      reset({
        name: "",
        description: "",
        status: "WORKING",
        repo: "FRONTEND",
        liveLink: "",
        gitFrontendLink: "",
        gitBackendLink: "",
        imageUrl: "",
        password: "",
      });
    }
  }, [open, reset]);

  const onSubmit = (data: ProjectFormValues) => {
    createProject(data, {
      onSuccess: () => {
        reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-137.5 p-0 overflow-hidden border border-border bg-background shadow-lg rounded-2xl">
        <DialogHeader className="px-6 pt-6 border-b border-border/60 bg-muted/20">
          <DialogTitle className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Provision New Project
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            variants={formContainerVariants}
            initial="hidden"
            animate="show"
            className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* 1. Name */}
            <motion.div variants={formFieldVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Project Name
              </label>
              <Input
                placeholder="e.g. CanvasFlow Whiteboard"
                className="h-10 rounded-xl"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.name.message}
                </p>
              )}
            </motion.div>

            {/* 2. Description */}
            <motion.div variants={formFieldVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Description
              </label>
              <Textarea
                placeholder="Describe your design choices, framework selections, and structural architecture details..."
                className="min-h-25 rounded-xl resize-none leading-relaxed"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.description.message}
                </p>
              )}
            </motion.div>

            {/* 3. Status + Repo Context Mapping Row */}
            <motion.div
              variants={formFieldVariants}
              className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-xl w-full">
                        <SelectValue placeholder="Select status" />
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
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Architecture Type
                </label>
                <Controller
                  name="repo"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-10 rounded-xl w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="FRONTEND">Frontend Only</SelectItem>
                        <SelectItem value="BACKEND">Backend Only</SelectItem>
                        <SelectItem value="FULL_STACK">
                          Full Stack Layout
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </motion.div>

            {/* 4. Dynamic Git Repository Management Block */}
            <motion.div
              variants={formFieldVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/40 pt-4">
              {selectedRepoType !== "BACKEND" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Frontend Repository Link
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="https://github.com/..."
                      className="h-10 pl-9 rounded-xl"
                      {...register("gitFrontendLink")}
                    />
                    <Code2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/60" />
                  </div>
                  {errors.gitFrontendLink && (
                    <p className="text-xs font-medium text-destructive mt-1">
                      {errors.gitFrontendLink.message}
                    </p>
                  )}
                </div>
              )}

              {selectedRepoType !== "FRONTEND" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Backend Repository Link{" "}
                    {selectedRepoType === "FULL_STACK" && (
                      <span className="text-muted-foreground/60 font-normal"></span>
                    )}
                  </label>
                  <div className="relative">
                    <Input
                      placeholder="https://github.com/..."
                      className="h-10 pl-9 rounded-xl"
                      {...register("gitBackendLink")}
                    />
                    <Code2 className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/60" />
                  </div>
                  {errors.gitBackendLink && (
                    <p className="text-xs font-medium text-destructive mt-1">
                      {errors.gitBackendLink.message}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* 5. Production Live Demos & Cover Previews */}
            <motion.div
              variants={formFieldVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Live Deployment Link
                </label>
                <div className="relative">
                  <Input
                    placeholder="https://yourdomain.com"
                    className="h-10 pl-9 rounded-xl"
                    {...register("liveLink")}
                  />
                  <Link className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/60" />
                </div>
                {errors.liveLink && (
                  <p className="text-xs font-medium text-destructive mt-1">
                    {errors.liveLink.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Cover Image URL
                </label>
                <div className="relative">
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    className="h-10 pl-9 rounded-xl"
                    {...register("imageUrl")}
                  />
                  <ImageIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground/60" />
                </div>
                {errors.imageUrl && (
                  <p className="text-xs font-medium text-destructive mt-1">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </motion.div>

            {/* 6. Security Authentication Gate */}
            <motion.div
              variants={formFieldVariants}
              className="space-y-1.5 border-t border-border/40 pt-4">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" /> Terminal
                Access Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-10 rounded-xl"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs font-medium text-destructive mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>

            {/* Submit Actions */}
            <motion.div variants={formFieldVariants} className="pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 rounded-xl text-sm font-semibold gap-2 active:scale-[0.99] transition-all">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deploying Branch...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    Initialize Deployment
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
