"use client";
import { Loader } from "@/components/Loader/Loader";
import { useGetProjects } from "@/Modules/Project/hooks/useGetProjects";
import { projects } from "@prisma/client";
import { ProjectUpdateModel } from "./ProjectUpdateModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectList() {
    const { data, isLoading, isError } = useGetProjects();

    if (isError) {
        return <div className="text-red-500">Error loading projects</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {data?.projects?.map((project: projects) => (
                <Card key={project.id} className="bg-ThemePrimary-200">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {project.status}
                            </span>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {project.repo}
                            </span>
                        </div>
                        <div className="flex justify-end">
                            <ProjectUpdateModel project={project} />
                        </div>
                    </CardContent>
                </Card>
            ))}
            {isLoading && <Loader />}
        </div>
    );
}