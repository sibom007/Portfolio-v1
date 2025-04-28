"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ProjectCard } from "./ProjectCard"
import { motion } from "motion/react"

const projects = [
    {
        id: "1",
        name: "Awesome Project 1",
        description: "This is a cool project made with love and passion.",
        image: "https://res.cloudinary.com/dwor90h8p/image/upload/v1745817250/Screenshot_2025-04-27_195627_iay4t2.png",
        liveUrl: "#",
        frontendUrl: "#",
        backendUrl: "#",
    },
    {
        id: "2",
        name: "Awesome Project 2",
        description: "This is a cool project made with love and passion.",
        image: "https://res.cloudinary.com/dwor90h8p/image/upload/v1745817250/Screenshot_2025-04-27_195627_iay4t2.png",
        liveUrl: "#",
        frontendUrl: "#",
        backendUrl: "#",
    },
    {
        id: "3",
        name: "Awesome Project 3",
        description: "This is a cool project made with love and passion.",
        image: "https://res.cloudinary.com/dwor90h8p/image/upload/v1745817250/Screenshot_2025-04-27_195627_iay4t2.png",
        liveUrl: "#",
        frontendUrl: "#",
        backendUrl: "#",
    },
    {
        id: "4",
        name: "Awesome Project 4",
        description: "This is a cool project made with love and passion.",
        image: "https://res.cloudinary.com/dwor90h8p/image/upload/v1745817250/Screenshot_2025-04-27_195627_iay4t2.png",
        liveUrl: "#",
        frontendUrl: "#",
        backendUrl: "#",
    },
];

const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // delay between each card
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Projects() {
    return (
        <div>

            <Tabs defaultValue="all" className="w-full mt-24">
                <TabsList className="grid w-full max-w-5xl mx-auto grid-cols-3 bg-primary text-white">
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="all">All</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="frontEnd">FrontEnd</TabsTrigger>
                    <TabsTrigger className="data-[state=active]:bg-ThemePrimary-700 data-[state=active]:text-white" value="backEnd">BackEnd</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-3">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-2 mt-3"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </TabsContent>

                <TabsContent value="frontEnd" className="mt-3">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-2 mt-3"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </TabsContent>

                <TabsContent value="backEnd" className="mt-3">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-2 mt-3"
                    >
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
