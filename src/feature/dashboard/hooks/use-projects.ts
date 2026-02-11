import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  CreatePayloadType,
  EditProjectSchema,
  SearchParam,
} from "@/Types/index";
import { z } from "zod";
import { toast } from "sonner";
import { projectRepo } from "@prisma/client";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreatePayloadType) => {
      const res = await axios.post("/api/project", payload);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success(data.message);
    },
  });
};

export const useGetProject = (params?: { repo?: projectRepo }) => {
  return useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.repo) queryParams.append("repo", params.repo);

      const { data } = await axios.get(
        `/api/project?${queryParams.toString()}`,
      );
      return data;
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updateData,
    }: {
      id: string;
      updateData: Partial<z.infer<typeof EditProjectSchema>>;
    }) => {
      const res = await axios.patch("/api/project", {
        id,
        updateData,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success(data.message);
    },
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axios.delete("/api/project", {
        params: { id },
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
      toast.success(data.message);
    },
  });
};
