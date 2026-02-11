"use client";

import { motion } from "framer-motion";
import Magnet from "@/components/magnet";
import { useEffect, useState } from "react";
import TextType from "@/components/TextType";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoJavascript } from "react-icons/io5";
import { FaNodeJs, FaReact } from "react-icons/fa6";
import { CodeXml, SparklesIcon } from "lucide-react";
import { SiNextdotjs, SiVercel } from "react-icons/si";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const codingIcons = [
    { name: "React", color: "#61DAFB" },
    { name: "Node.js", color: "#339933" },
    { name: "TypeScript", color: "#3178C6" },
    { name: "Next.js", color: "#000000" },
    { name: "JavaScript", color: "#F7DF1E" },
    { name: "Python", color: "#3776AB" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-40 h-40 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-52 h-52 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full">
              <SparklesIcon className="size-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">
                Sibom is here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
              Fullstack <br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300">
              Crafting elegant digital experiences through clean code,
              innovative design, and thoughtful engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4">
              <Magnet magnetStrength={3}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-white font-semibold rounded-lg shadow-lg">
                  View Projects
                </motion.button>
              </Magnet>
              <Magnet magnetStrength={3}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border border-white/20">
                  Contact Me
                </motion.button>
              </Magnet>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-8 pt-8">
              {[
                ["1.5+", "Years Experience"],
                ["10+", "Projects Done"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — CLIENT ONLY */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center scale-75 sm:scale-90 lg:scale-100">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative w-48 sm:w-64 lg:w-72 aspect-square flex items-center justify-center">
                <CodeXml className="absolute size-44 text-muted-foreground right-6 bottom-4" />

                {codingIcons.map((icon, index) => {
                  const angle = (index / codingIcons.length) * 360;
                  const radius = 110; // fixed → SSR safe
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={icon.name}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute"
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: x,
                        marginTop: y,
                      }}>
                      <motion.div
                        whileHover={{ scale: 1.2, y: -5 }}
                        className="group cursor-pointer">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-sm"
                          style={{
                            background: `linear-gradient(135deg, ${icon.color}20, ${icon.color}40)`,
                            boxShadow: `0 8px 32px ${icon.color}30`,
                          }}>
                          <span className="text-sm sm:text-lg lg:text-2xl text-white">
                            {icon.name === "React" && <FaReact />}
                            {icon.name === "Node.js" && <FaNodeJs />}
                            {icon.name === "TypeScript" && <BiLogoTypescript />}
                            {icon.name === "Next.js" && <SiVercel />}
                            {icon.name === "JavaScript" && <IoLogoJavascript />}
                            {icon.name === "Python" && <SiNextdotjs />}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* FLOATING TEXT */}
              <div className="hidden md:block absolute top-0 right-0 bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700 font-mono text-sm text-green-400">
                <TextType
                  as="pre"
                  className="whitespace-pre"
                  text={[
                    `<code>
  Clean
</code>`,
                  ]}
                  typingSpeed={70}
                  pauseDuration={1200}
                  deletingSpeed={40}
                  showCursor
                  cursorCharacter="_"
                  loop={false}
                />
              </div>

              <div className="hidden md:block absolute bottom-0 -left-14 bg-slate-800/50 px-4 py-3 rounded-lg border border-slate-700 font-mono text-sm text-blue-400">
                <TextType
                  as="pre"
                  className="whitespace-pre"
                  text={[
                    `const build = () => {
  return 'fast'
}`,
                  ]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  deletingSpeed={50}
                  showCursor
                  cursorCharacter="*"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
