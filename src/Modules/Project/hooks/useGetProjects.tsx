"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { projectRepo } from "@prisma/client";

export const useGetProjects = (params?: { repo?: projectRepo }) => {
    return useQuery({
        queryKey: ['projects', params?.repo],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (params?.repo) queryParams.append('repo', params.repo);

            const { data } = await axios.get(`/api/project?${queryParams.toString()}`);
            return data;
        },
        staleTime: 5000,
    });
};
