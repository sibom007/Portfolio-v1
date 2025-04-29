'use client'

import { ProjectPayload } from '@/Types';
import { useForm } from 'react-hook-form';
import { useCreateProject } from '../hooks/useCreateProject';
import { Loader } from '@/components/Loader/Loader';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



export default function ProjectForm() {
    const router = useRouter()
    const { mutate, isPending, isSuccess, isError } = useCreateProject()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProjectPayload>();

    const onSubmit = (data: ProjectPayload) => {
        mutate(data)
    };
    if (isPending) { <Loader /> }
    if (isSuccess) {

        toast.success("Project add Successfully")
        router.push("/")
    }
    if (isError) { toast.error("Something went wrong") }



    return (
        <div className="max-w-4xl mx-auto p-6 bg-ThemePrimary-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Project</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div>
                    <label className="block mb-1 font-medium">Project Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Project name is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project description"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Status */}
                <div>
                    <label className="block mb-1 font-medium">Status</label>
                    <select
                        {...register('status', { required: 'Status is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Status</option>
                        <option value="WORKING">Working</option>
                        <option value="DONE">Done</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                </div>

                {/* Repo */}
                <div>
                    <label className="block mb-1 font-medium">Repository Type</label>
                    <select
                        {...register('repo', { required: 'Repository type is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Repository</option>
                        <option value="FRONTEND">Frontend</option>
                        <option value="BACKEND">Backend</option>
                    </select>
                    {errors.repo && <p className="text-red-500 text-sm mt-1">{errors.repo.message}</p>}
                </div>

                {/* URL */}
                <div>
                    <label className="block mb-1 font-medium">URL</label>
                    <input
                        type="url"
                        {...register('url', { required: 'URL is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter project URL"
                    />
                    {errors.url && <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>}
                </div>

                {/* Live Link */}
                <div>
                    <label className="block mb-1 font-medium">Live Link</label>
                    <input
                        type="url"
                        {...register('liveLink', { required: 'Live link is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter live link"
                    />
                    {errors.liveLink && <p className="text-red-500 text-sm mt-1">{errors.liveLink.message}</p>}
                </div>

                {/* Git Frontend */}
                <div>
                    <label className="block mb-1 font-medium">Git Frontend</label>
                    <input
                        type="url"
                        {...register('gitFrontend', { required: 'Frontend repo link is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter frontend GitHub repo link"
                    />
                    {errors.gitFrontend && <p className="text-red-500 text-sm mt-1">{errors.gitFrontend.message}</p>}
                </div>

                {/* Git Backend */}
                <div>
                    <label className="block mb-1 font-medium">Git Backend</label>
                    <input
                        type="url"
                        {...register('gitBackend', { required: 'Backend repo link is required' })}
                        className="w-full border rounded-lg p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter backend GitHub repo link"
                    />
                    {errors.gitBackend && <p className="text-red-500 text-sm mt-1">{errors.gitBackend.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="text-center md:col-span-2">
                    <button
                        type="submit"
                        className="bg-ThemePrimary-600 text-white w-full py-2 px-6 rounded-lg hover:bg-ThemePrimary-900 transition-all"
                    >
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
}
