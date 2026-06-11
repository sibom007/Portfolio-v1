import { z } from "zod";

const BaseProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description cannot exceed 5000 characters")
    .trim(),

  status: z.enum(["WORKING", "DONE"], {
    errorMap: () => ({ message: "Please select a valid project status" }),
  }),

  repo: z.enum(["FRONTEND", "BACKEND", "FULL_STACK"], {
    errorMap: () => ({ message: "Please select a valid repository type" }),
  }),

  liveLink: z
    .string()
    .url("Invalid live link URL")
    .or(z.literal(""))
    .optional(),

  imageUrl: z.string().url("Invalid image URL").or(z.literal("")).optional(),

  gitFrontendLink: z
    .string()
    .url("Invalid frontend repository URL")
    .or(z.literal(""))
    .optional(),

  gitBackendLink: z
    .string()
    .url("Invalid backend repository URL")
    .nullable()
    .or(z.literal("")),
});

export const CreateProjectSchema = BaseProjectSchema.superRefine(
  (data, ctx) => {
    // FRONTEND or FULL_STACK -> Requires gitFrontendLink
    if (data.repo === "FRONTEND" || data.repo === "FULL_STACK") {
      if (!data.gitFrontendLink || data.gitFrontendLink === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Frontend repository link is required for this type",
          path: ["gitFrontendLink"],
        });
      }
    }

    // BACKEND -> Requires gitBackendLink
    if (data.repo === "BACKEND") {
      if (!data.gitBackendLink || data.gitBackendLink === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Backend repository link is required for backend projects",
          path: ["gitBackendLink"],
        });
      }
    }
  },
);

export const EditProjectSchema = BaseProjectSchema.omit({ password: true })
  .partial()
  .superRefine((data, ctx) => {
    if (data.repo) {
      if (
        (data.repo === "FRONTEND" || data.repo === "FULL_STACK") &&
        !data.gitFrontendLink
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Frontend repository link is required for this type",
          path: ["gitFrontendLink"],
        });
      }
      if (data.repo === "BACKEND" && !data.gitBackendLink) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Backend repository link is required for backend projects",
          path: ["gitBackendLink"],
        });
      }
    }
  });

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type EditProjectInput = z.infer<typeof EditProjectSchema>;