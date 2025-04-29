"use client";

import { motion } from "framer-motion";
import { AiFillGithub, AiOutlineFacebook, AiOutlineLinkedin, AiOutlineDiscord } from "react-icons/ai";
import HISubbanner from "./HISubbanner";
import BannerImg from "./BannerImg";
import Link from "next/link";

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Banner = () => {
  return (
    <div className="px-6 md:px-16 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-10 z-10">
        {/* Left Content */}
        <motion.div
          className="text-center md:text-left flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="text-lg lg:text-4xl md:text-2xl font-bold text-white/80 mb-2">
            I am Sibom
          </motion.p>

          <motion.h1
            className="text-3xl xl:text-7xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#804ceb] to-white/65"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Fullstack + <br />
            Web Developer
          </motion.h1>

          <motion.p
            className="text-sm md:text-base text-white/80 mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Certainly! A Full Stack Developer is a <br /> versatile professional skilled in both front-end and <br /> back-end development.
          </motion.p>

          {/* Buttons and Social Icons */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center md:justify-start gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link
              href="https://drive.google.com/file/d/1V4oNHV8M2mrSkB2MqY1bjrk9yi9h-Iqr/view?usp=sharing"
              target="_blank"
              className="text-sm font-semibold border-2 border-primary text-white px-5 py-2 md:px-6 md:py-3 md:text-base rounded-full hover:bg-primary hover:text-white transition duration-500"
            >
              View Resume
            </Link>

            {/* Social Media Icons */}
            <motion.ul className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="https://www.facebook.com/" target="_blank">
                <AiOutlineFacebook className="text-primary border-2 border-primary rounded-full p-1 md:p-1.5 size-7 md:size-8 lg:size-10 hover:text-white hover:bg-primary transition duration-500" />
              </Link>

              <div className="relative group">
                <AiOutlineDiscord className="text-primary border-2 border-primary rounded-full p-1 md:p-1.5 size-7 md:size-8 lg:size-10 hover:text-white hover:bg-primary transition duration-500 cursor-pointer" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">sibom77</span>
              </div>
              <Link href="https://github.com/" target="_blank">
                <AiFillGithub className="text-primary border-2 border-primary rounded-full p-1 md:p-1.5 size-7 md:size-8 lg:size-10 hover:text-white hover:bg-primary transition duration-500" />
              </Link>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1 mt-10 md:mt-0 flex justify-center md:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BannerImg />
        </motion.div>
      </div>

      {/* Sub Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
      >
        <HISubbanner />
      </motion.div>
    </div>
  );
};

export default Banner;
