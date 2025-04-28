"use client";
import { motion } from 'framer-motion'; // Corrected import

// Importing VScode icon and other skill icons
import { VscVscodeInsiders } from 'react-icons/vsc';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { RiNextjsLine } from "react-icons/ri";
import { SiExpress, SiPrisma, SiReacthookform, SiTailwindcss, SiShadcnui } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";

const skills = [
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'Next.js', icon: <RiNextjsLine /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'Prisma', icon: <SiPrisma /> },
    { name: 'MongoDB', icon: <BiLogoMongodb /> },
    { name: 'React Hook Form', icon: <SiReacthookform /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Shadcn', icon: <SiShadcnui /> },
];

export const Skills = () => {
    return (
        <div className="relative w-full h-screen flex items-center justify-center flex-col">
            {/* Title at the top */}
            <motion.h1
                className="absolute top-10 text-4xl font-bold mb-8 mt-10"
                style={{
                    color: '#ffff',
                    textShadow: '0 4px 6px rgba(0, 78, 146, 0.5)',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                My Skills
            </motion.h1>

            {/* Vscode icon (rotating with gradient color) */}
            <motion.div
                className="absolute"
                style={{
                    fontSize: '120px', // Make the icon bigger
                    color: '#007ACC', // VS Code color
                }}
                whileInView={{ rotate: 360 }} // Adding rotation effect
                transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            >
                <VscVscodeInsiders />
            </motion.div>

            {/* Skill icons orbiting around VS Code icon */}
            <div className="absolute w-full h-full flex items-center justify-center">
                {skills.map((skill, index) => {
                    const angle = (index / skills.length) * Math.PI * 2; // Angle for orbiting
                    const radius = 150; // Orbit radius
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                        <motion.div
                            key={index}
                            className="absolute"
                            style={{
                                top: `calc(50% + ${y}px)`,
                                left: `calc(50% + ${x}px)`,
                                transformOrigin: 'center',
                            }}
                            animate={{
                                scale: [0.5, 1.5, 1], // Animation to make it bounce
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: 'easeInOut',
                                delay: index * 0.1,
                            }}
                        >
                            <motion.div
                                className="text-2xl"
                                style={{
                                    color: '#804ceb',
                                    transform: 'scale(1.5)',
                                }}
                            >
                                {skill.icon}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};


