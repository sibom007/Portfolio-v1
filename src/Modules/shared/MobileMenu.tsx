"use client";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/icons/—Pngtree—letter s logo png_8280506.png";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex gap-28 sm:gap-48 items-center">
        <button onClick={handleToggle}>
          {isOpen ? (
            <AiOutlineClose className="text-white size-5" />
          ) : (
            <AiOutlineMenu className="text-white size-5" />
          )}
        </button>
        <div className="flex items-center">
          <p className="text-2xl text-nowrap">
            <Image src={logo} alt="logo" width={50} height={50} />
          </p>
          <p className="text-2xl">Sibom saha</p>
        </div>
      </div>

      <motion.div
        className={`
         bg-gradient-to-r from-[#804ceb]/10  to-white/10 p-3 gap-5 w-1/3 rounded-lg font-semibold absolute z-222 ${
           isOpen ? "block " : "hidden "
         }`}>
        <p>Home</p>
        <p>Skills</p>
        <p>Contact</p>
        <p>About</p>
      </motion.div>
    </div>
  );
};

export default MobileMenu;
