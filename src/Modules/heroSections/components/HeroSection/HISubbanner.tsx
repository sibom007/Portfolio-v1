"use client";
import { motion } from "framer-motion";

const HISubbanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="mt-0 -z-50 relative ">
      <p className="bg-clip-text bg-primary/40 font-bold md:text-[200px] lg:text-[300px] absolute md:-top-[310px] md:left-[110px] lg:-top-[450px] lg:left-[380px]  text-[#140d27]">
        HI
      </p>
    </motion.div>
  );
};

export default HISubbanner;
