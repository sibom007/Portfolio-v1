import { z } from "zod";

export const CreateProjectSchema = z.object({
  password: z.string().min(6, "password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: z.enum(["WORKING", "DONE"]),
  repo: z.enum(["FRONTEND", "BACKEND"]),
  liveLink: z.string().url("Invalid live link"),
  imageUrl: z.string().url("Invalid Image link"),

  gitFrontend: z.string().url("Invalid frontend repository URL"),
  gitBackend: z
    .string()
    .url("Invalid backend repository URL")
    .optional()
    .or(z.literal("")),
});
export const EditProjectSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["WORKING", "DONE"]),
  repo: z.enum(["FRONTEND", "BACKEND"]),
  liveLink: z.string().url("Invalid live link").optional(),
  imageUrl: z.string().url("Invalid Image link").optional(),
  gitFrontend: z.string().url("Invalid frontend repository URL").optional(),
  gitBackend: z
    .string()
    .url("Invalid backend repository URL")
    .optional()
    .or(z.literal("")),
});

export type CreatePayloadType = z.infer<typeof CreateProjectSchema>;
export type EditPayloadType = z.infer<typeof EditProjectSchema>;

export const SEARCH_PARAMS = {
  ALL: "ALL",
  TRENDING: "TRENDING",
  FRONTEND: "FRONTEND",
  BACKEND: "BACKEND",
} as const;

export type SearchParam = (typeof SEARCH_PARAMS)[keyof typeof SEARCH_PARAMS];
