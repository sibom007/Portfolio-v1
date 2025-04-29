import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface UpdateProjectData {
    name?: string;
    description?: string;
    status?: "WORKING" | "DONE";
    repo?: "FRONTEND" | "BACKEND";
    url?: string;
    liveLink?: string;
    gitFrontend?: string;
    gitBackend?: string;
}

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: UpdateProjectData }) => {
            const response = await axios.put(`/api/project/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Project updated successfully");
            queryClient.invalidateQueries({ queryKey: ["projects"] });

        },
        onError: (error) => {
            toast.error("Failed to update project");
            console.error("Update project error:", error);
        },
    });
};
