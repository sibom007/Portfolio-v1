"use client";
import { Blogs } from "@/Data/data";
import { Tblogs } from "@/Types";
import { motion } from "framer-motion";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import {
  AiFillCalendar,
  AiFillMessage,
  AiOutlineCalendar,
} from "react-icons/ai";

const Blog = () => {
  return (
    <div className="mt-40 px-16 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
        className="bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb] via-[#804ceb] to-white text-center text-5xl font-bold">
        Recent Blogs
      </motion.h1>
      <p className="mt-4 text-center text-xl">
        We put your ideas and thus your wishes in the form of a unique web{" "}
        <br />
        project that inspires you and you customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {Blogs.map((item: Tblogs, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className=" group duration-700  relative">
            <div className="overflow-hidden  rounded-md mt-2">
              <Image
                src="https://images.unsplash.com/photo-1719749938286-fcc01bf5755b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MH
            xwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="p"
                width={500}
                height={500}
                className="rounded-xl brightness-50 group-hover:scale-[1.1]  duration-700"
              />
            </div>
            <div>
              <div className="absolute bottom-7 md:bottom-5 lg:bottom-5 xl:bottom-7 left-4 sm:left-24 16 md:left-10 lg:left-6 bg-[#2a1454] w-60 sm:w-64 md:w-[200px] lg:w-[240px] xl:w-[350px]   py-1 px-2 sm:py-2 sm:px-4 md:px-2 md:py-2 lg:px-6 rounded-xl font-semibold group-hover:brightness-100 brightness-50  duration-500">
                <div className="flex md:gap-2 justify-between items-center">
                  <div>
                    <p className="text-sm sm:text-base md:text-xs lg:text-lg xl:flex items-center gap-2 group-hover:text-white text-primary">
                      <span className="flex items-center gap-1">
                        <AiFillCalendar className="size-6" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <AiFillMessage />
                        No comments
                      </span>
                    </p>
                    <p className="text-sm sm:text-base md:text-sm">
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
    </div>
  );
};

export default Blog;
