
import { ProjectPayload } from '@/Types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';



export const useCreateProject = () => {
    return useMutation({
        mutationFn: async (payload: ProjectPayload) => {
            const { data } = await axios.post('api/project', payload,
            );
            return data;
        },
    });
};
