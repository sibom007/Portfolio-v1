"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const BannerImg = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: 10,
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      }}
      className="flex justify-center md:justify-end"
    >
      <motion.div
        whileHover={{
          rotate: 0,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        initial={{ rotate: -3 }}
        className="border-2 border-[#281350] hover:border-primary duration-300  rounded-xl overflow-hidden"
      >
        <Image
          width={500}
          height={500}
          src="https://res.cloudinary.com/dwor90h8p/image/upload/v1745845883/main_image_for_profile_izdjkc.jpg"
          alt="banner image"
          className="w-full h-auto object-cover
            xl:max-w-[430px] xl:max-h-[420px]
            lg:max-w-[400px] lg:max-h-[330px]
            md:max-w-[310px] md:max-h-[290px]
            rounded-xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default BannerImg;
