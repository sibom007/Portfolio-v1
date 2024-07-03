"use client";
import Image from "next/image";
import Github from "@/assets/icons/code.png";
import { motion } from "framer-motion";
import { skills } from "@/Data/data";
import { Tskills } from "@/Types";
import { useGetSkillsListQuery } from "@/Redux/api/skillsApi";
import LoaderPage from "@/components/Loader/Loader";

const Skills = () => {
  const { data, isFetching, isLoading } = useGetSkillsListQuery("");
  return (
    <div className="mt-40 px-16 skills">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb] via-[#804ceb] to-white text-center text-5xl font-bold">
        My Skills
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="text-center text-lg mt-3 text-white/60">
        We put your ideas and thus your wishes in the form of a unique <br />{" "}
        web project that inspires you and you customers.
      </motion.p>
      <div className="grid  grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10  md:gap-7 mt-10">
        {isFetching && isLoading ? (
          <LoaderPage />
        ) : (
          data?.result?.map((i: Tskills, index: number) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.7,
                  ease: "easeInOut",
                }}
                className="bg-[#1d1129] group rounded-2xl hover:bg-primary/20 hover:border-2 hover:border-primary w-[140px] h-[140px] md:w-[180px] md:h-[180px] duration-500">
                <div className="flex justify-center items-center pt-5  group-hover:scale-110 duration-500 ease-in-out">
                  <Image
                    src={i.icon}
                    alt="Github"
                    width={70}
                    height={70}
                    className="contrast-[.15] group-hover:filter-none duration-500 ease-in-out"
                  />
                </div>
                <p className="text-center text-lg md:text-xl text-[#717578] font-bold group-hover:text-primary/70 mt-2">
                  {i.percentage}%
                </p>
              </motion.div>
              <p className="ml-10 md:ml-14 text-xl text-primary font-semibold mt-2">
                {i.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Skills;
