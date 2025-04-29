"use client";
import { motion } from 'framer-motion';
import { VscVscodeInsiders } from 'react-icons/vsc';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from 'react-icons/fa';
import { RiNextjsLine } from "react-icons/ri";
import { SiExpress, SiPrisma, SiReacthookform, SiTailwindcss, SiShadcnui } from "react-icons/si";
import { BiLogoMongodb } from "react-icons/bi";

const LoaderIcons = [
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

export const Loader = () => {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center flex-col z-50">
      {/* Rotating VSCode Icon */}
      <motion.div
        className="absolute"
        style={{
          fontSize: '60px',
          color: '#007ACC',
        }}
        whileInView={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
      >
        <VscVscodeInsiders />
      </motion.div>

      {/* Orbiting Skill Icons */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {LoaderIcons.map((skill, index) => {
          const angle = (index / LoaderIcons.length) * Math.PI * 2;
          const radius = 90; // smaller orbit
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
              }}
              animate={{
                scale: [0.7, 1.2, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut',
                delay: index * 0.1,
              }}
            >
              <motion.div
                className="text-xl"
                style={{
                  color: '#804ceb',
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
