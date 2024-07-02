"use client";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import p from "@/assets/ProjectsPhoto/Screenshot 2024-07-01 112416.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import { projects } from "@/Data/data";
import { Tprojects } from "@/Types";
const Projects = () => {
  return (
    <div className="mt-40 px-16 ">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb] via-[#804ceb] to-white text-center text-5xl font-bold">
        My Recent Works
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="text-white flex justify-center mt-12">
        <TabGroup>
          <TabList className=" bg-black/30 px-4 py-3 sm:px-10 sm:py-4 rounded-full w-[370px] sm:w-[500px] flex justify-around items-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}>
              {" "}
              <Tab className="data-[selected]:bg-gradient-to-r from-purple-600 to-indigo-900 px-4 sm:px-8 py-1 text-xl rounded-full">
                All
              </Tab>
              <Tab className="data-[selected]:bg-gradient-to-r from-purple-600 to-indigo-900 px-4 sm:px-8 py-1 text-xl rounded-full">
                Frontend
              </Tab>
              <Tab className="data-[selected]:bg-gradient-to-r from-purple-600 to-indigo-900 px-4 sm:px-8 py-1 text-xl rounded-full">
                Backend
              </Tab>
            </motion.div>
          </TabList>
          <TabPanels className="mt-10">
            <TabPanel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                {projects.map((item: Tprojects, i: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      ease: "easeInOut",
                    }}
                    key={i}
                    className="border-t-[30px] group duration-700 border-l-[30px] border-r-[30px] border-[#140c1c] rounded-xl relative">
                    <Image
                      src={p}
                      alt="p"
                      width={500}
                      height={400}
                      className="rounded-xl brightness-50"
                    />
                    <div>
                      <div className="absolute bottom-7 left-4 sm:left-24 md:bottom-16 md:left-10 lg:left-8 bg-gradient-to-r from-purple-600 to-indigo-900 w-36 sm:w-64 md:w-[200px] lg:w-[340px] xl:w-[400px]   py-1 px-2 sm:py-2 sm:px-4 md:px-2 md:py-2 lg:px-7 rounded-xl font-semibold opacity-0 group-hover:opacity-100  duration-500">
                        <div className="flex md:gap-2 justify-between items-center">
                          <div>
                            <p className="text-sm sm:text-base md:text-lg">
                              {item.name}
                            </p>
                            <p className="text-white/60 text-xs sm:text-sm md:text-base">
                              {item.driscaption}
                            </p>
                          </div>
                          <div>
                            <button>
                              <BsArrowRight className="size-4 sm:size-5 md:size-6 -rotate-45 font-bold group-hover:rotate-[315deg] duration-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </motion.div>
    </div>
  );
};

export default Projects;
