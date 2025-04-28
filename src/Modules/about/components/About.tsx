'use client';

import { motion } from 'framer-motion';
import { Code, GitBranch, Paintbrush, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaWhatsapp } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa6";
const lines = [
    "Hi! I’m Sibom Saha, a passionate full-stack web developer with a strong focus on creating high-quality, user-friendly web applications.",
    "I specialize in technologies like React.js, Next.js, Express.js, and Tailwind CSS.",
    "Currently, I am a third-semester student at Patuakhali Polytechnic Institute, balancing academics with my growing career in web development.",
    "I love solving problems, building useful projects, and continuously learning to stay updated with modern technologies.",
    "My goal is to create impactful digital solutions while maintaining a healthy, balanced lifestyle."
];

export function About() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-[#0B071E] p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">

                {/* Image side */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center"
                >
                    <Image
                        width={500}
                        height={500}
                        src="https://res.cloudinary.com/dwor90h8p/image/upload/v1745845883/main_image_for_profile_izdjkc.jpg"
                        alt="About Image"
                        className="rounded-2xl shadow-lg max-w-xs md:max-w-sm bg-[#090719]"
                    />
                </motion.div>

                {/* Text side */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        About Me
                    </h2>
                    {lines.map((line, index) => (
                        <motion.p
                            key={index}
                            whileHover={{ scale: 1.05 }} // move up slightly and scale
                            transition={{ type: "spring", stiffness: 300 }}
                            className="cursor-pointer text-white"
                        >
                            {line}
                        </motion.p>))}

                    {/* Icons */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        <Link href={"https://github.com/sibom007"} className="flex items-center gap-2">
                            <FaGithub className="text-[#804ceb] w-6 h-6" />
                            <span className="text-white">Github</span>
                        </Link>
                        <div className="flex items-center gap-2 relative group">
                            <FaDiscord className="text-[#9369f7] w-6 h-6" />
                            <span className="text-white">Discord (sibom007)</span>
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">sibom77</span>
                        </div>
                        <Link href={"https://wa.me/8801625334383"} className="flex items-center gap-2">
                            <FaWhatsapp className="text-[#ae8ef9] w-6 h-6" />
                            <span className="text-white">WhatsApp</span>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
