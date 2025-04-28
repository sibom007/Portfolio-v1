"use client";
import { motion } from "framer-motion";
import moduleName from "@/assets/banner/—Pngtree—man in shirt smiles and_13146348.png";
import Image from "next/image";

const BannerImg = () => {
  return (
    <motion.div
      initial={{
        y: 0,
      }}
      animate={{
        y: 10,
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      }}>
      <Image
        width={500}
        height={500}
        className="border-2 border-[#281350] -rotate-3 hover:border-primary hover:-rotate-0 duration-300 bg-[#0c1216] rounded-xl mr-20 xl:w-[430px] xl:h-[420px] lg:w[400px] lg:h-[330px] md:w-[310px] md:h-[290px] ml-7 md:ml-7"
        src={"https://res.cloudinary.com/dwor90h8p/image/upload/v1745845883/main_image_for_profile_izdjkc.jpg"}
        alt="banner"
      />
    </motion.div>
  );
};

export default BannerImg;
