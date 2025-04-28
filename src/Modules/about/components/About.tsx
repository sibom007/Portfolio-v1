'use client';

import { motion } from 'framer-motion';
import { Code, Paintbrush, Settings } from 'lucide-react';
import Image from 'next/image';

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
                        src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    <p className="text-[#c9b4fb] mb-6 leading-relaxed">
                        I am a passionate Full Stack Developer who enjoys crafting intuitive front-end experiences and building powerful backend systems.
                    </p>

                    {/* Icons */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        <div className="flex items-center gap-2">
                            <Code className="text-[#804ceb] w-6 h-6" />
                            <span className="text-white">Development</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Paintbrush className="text-[#9369f7] w-6 h-6" />
                            <span className="text-white">Design</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Settings className="text-[#ae8ef9] w-6 h-6" />
                            <span className="text-white">Problem Solving</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
