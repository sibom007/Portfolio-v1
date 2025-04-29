import { motion } from "motion/react";

const container = {
    hidden: { opacity: 1 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const ProjectCardSkeleton = () => {
    return (
        <motion.div
            variants={item}
            className="relative overflow-hidden rounded-xl shadow-lg bg-ThemePrimary-200/50"
        >
            <div className="w-full h-64 bg-ThemePrimary-300/30 animate-pulse" />

            {/* Blur overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Title skeleton */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4">
                <div className="h-8 bg-ThemePrimary-300/30 rounded animate-pulse" />
            </div>

            {/* Button skeleton */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-72">
                <div className="h-10 bg-ThemePrimary-300/30 rounded animate-pulse" />
            </div>
        </motion.div>
    );
};

export const ProjectSkeletonList = () => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2 mt-3"
        >
            {[...Array(6)].map((_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </motion.div>
    );
}; 