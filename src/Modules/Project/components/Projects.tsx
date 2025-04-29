"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ProjectCard } from "./ProjectCard"
import { motion } from "motion/react"
import { useGetProjects } from "../hooks/useGetProjects";
import { projects, projectRepo } from "@prisma/client";
import { useState } from "react";
import { ProjectSkeletonList } from "./ProjectCardSkeleton";

const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // delay between each card
        },
    },
};

export function Projects() {
    const [selectedRepo, setSelectedRepo] = useState<projectRepo | undefined>(undefined);
    const { data, isLoading } = useGetProjects({ repo: selectedRepo });

    const handleTabChange = (value: string) => {
        switch (value) {
            case "frontEnd":
                setSelectedRepo("FRONTEND");
                break;
            case "backEnd":
                setSelectedRepo("BACKEND");
                break;
            default:
                setSelectedRepo(undefined);
        }
    };

    const renderProjects = () => {
        if (isLoading) {
            return <ProjectSkeletonList />;
        }

        return (
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 mt-3"
            >
                {data?.projects?.map((project: projects) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </motion.div>
        );
    };

    return (
        <div>
            <Tabs defaultValue="all" className="w-full mt-24 px-2" onValueChange={handleTabChange}>
                <TabsList className="grid w-full max-w-5xl  mx-auto grid-cols-3 bg-primary text-white">
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="all">All</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="frontEnd">FrontEnd</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="backEnd">BackEnd</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-3">
                    {renderProjects()}
                </TabsContent>

                <TabsContent value="frontEnd" className="mt-3">
                    {renderProjects()}
                </TabsContent>

                <TabsContent value="backEnd" className="mt-3">
                    {renderProjects()}
                </TabsContent>
            </Tabs>
        </div>
    );
}
