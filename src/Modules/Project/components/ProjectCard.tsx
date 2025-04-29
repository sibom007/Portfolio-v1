import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GithubIcon, GlobeIcon, ServerIcon, XIcon } from "lucide-react";
import { projects } from "@prisma/client";

export const ProjectCard = ({ project }: { project: projects }) => {
    const [open, setOpen] = useState(false);
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <>
            {/* Project Card */}
            <motion.div
                key={project.id}
                layoutId={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                variants={item}
                className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer"
                onClick={() => setOpen(true)}
            >
                <Image
                    width={500}
                    height={500}
                    src={project.url}
                    alt={project.name}
                    className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Blur overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm group-hover:backdrop-blur-0 group-hover:bg-black/20 transition-all duration-500" />

                {/* View Details Button */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-all duration-500">
                    <h1 className="text-4xl text-white text-center font-semibold">{project.name}</h1>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Button size="sm" variant="secondary" className="w-72 max-w-5xl group-hover:bg-ThemePrimary-300 group-hover:text-white">
                        View Details
                    </Button>
                </div>
            </motion.div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)} // clicking outside closes
                    >
                        {/* Modal Content */}
                        <motion.div
                            layoutId={project.id}
                            className="bg-ThemePrimary-700 text-white rounded-xl p-6 max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                        >
                            {/* ❌ Close Button */}
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 text-black dark:text-white hover:text-primary"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>

                            {/* Left: Image */}
                            <div className="w-full h-80">
                                <Image
                                    width={500}
                                    height={500}
                                    src={project.url}
                                    alt={project.name}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            </div>

                            {/* Right: Details */}
                            <div className="flex flex-col justify-center space-y-4">
                                <h2 className="text-3xl font-bold">{project.name}</h2>
                                <p className="text-white">{project.description}</p>
                                <div className="flex items-center gap-4">
                                    {project.liveLink && (
                                        <Button size="icon" variant="outline" className="hover:text-ThemePrimary-600 text-ThemePrimary-400" asChild>
                                            <a href={project.liveLink} target="_blank">
                                                <GlobeIcon className="w-5 h-5 " />
                                            </a>
                                        </Button>
                                    )}
                                    {project.gitFrontend && (
                                        <Button size="icon" variant="outline" className="hover:text-ThemePrimary-600 text-ThemePrimary-400" asChild>
                                            <a href={project.gitFrontend} target="_blank">
                                                <GithubIcon className="w-5 h-5" />
                                            </a>
                                        </Button>
                                    )}
                                    {project.gitBackend && (
                                        <Button size="icon" variant="outline" className="hover:text-ThemePrimary-600 text-ThemePrimary-400" asChild>
                                            <a href={project.gitBackend} target="_blank">
                                                <ServerIcon className="w-5 h-5" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
