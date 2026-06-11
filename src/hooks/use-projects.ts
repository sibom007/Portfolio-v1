import { CreateProjectInput, EditProjectInput } from "@/Types";
import { projects } from "@prisma/client";
import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Global cache key for projects data management
const PROJECTS_QUERY_KEY = ["projects"] as const;

interface ProjectsResponse {
  count: number;
  projects: projects[];
}

export function useGetProjects() {
  return useQuery<ProjectsResponse, Error>({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await api.get<ProjectsResponse>("/projects");
      return data;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: CreateProjectInput) => {
      const { data } = await api.post("/projects", newProject);
      return data;
    },
    onSuccess: () => {
      // Refresh the projects grid automatically after a new creation
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

interface UpdateProjectPayload {
  id: string;
  updateData: EditProjectInput;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updateData }: UpdateProjectPayload) => {
      const { data } = await api.patch("/projects", { id, updateData });
      return data;
    },
    onSuccess: () => {
      // Re-fetch project list to mirror database state updates instantly
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/projects?id=${id}`);
      return data;
    },
    onSuccess: () => {
      // Evict deleted records from UI client cache immediately
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}
