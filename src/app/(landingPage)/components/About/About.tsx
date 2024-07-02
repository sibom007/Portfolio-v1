"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="mt-32 px-16 ">
      <div className="font-bold text-white/60 text-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className="bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb] via-[#804ceb] to-white text-center text-5xl font-bold mb-5">
          About Me
        </motion.h1>
        <p>
          {" "}
          Hello everyone! I’m Sibom, a student and aspiring full-stack
          developer. I’m currently pursuing my Diploma in Engineering, and I’m
          in my second semester. Passionate about coding I live in Patuakhali.
        </p>
        <p className="text-center text-xl font-bold mt-8">
          ! Never give up great things take time !
        </p>
      </div>
    </div>
  );
};

export default About;
