"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

import logo from "@/assets/icons/—Pngtree—letter s logo png_8280506.png";
import jsPDF from "jspdf";

export const Navbar = () => {
  const handledw = () => {
    const doc = new jsPDF("portrait", "px", "a4", false);
    doc.addImage(
      "https://res.cloudinary.com/dwor90h8p/image/upload/v1745930515/Screenshot_2025-04-29_173905_waalzp.png",
      "JPEG",
      0,
      0,
      428,
      525,
    );
    doc.save("resume.pdf");
  };
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="py-4 px-4 sm:px-6 md:px-10 lg:px-16 sticky top-0 z-50 ">
      {/* Desktop view */}
      <div className="hidden md:flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative">
            <Image
              src={logo}
              alt="Sibom Saha Logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </motion.div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Sibom Saha
          </h1>
        </motion.div>

        <div className="flex items-center justify-end gap-4 lg:gap-6">
          {/* Download Resume Button */}
          <motion.a
            href="/Sibom_Resume.pdf"
            download="Sibom_Resume.pdf"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="
      flex items-center gap-2
      px-5 py-2.5
      rounded-full
      font-semibold
      text-white
      bg-primary
      hover:brightness-110
      transition-all duration-300
    ">
            <Download className="w-4 h-4" />
            Resume
          </motion.a>
        </div>
      </div>

      {/* Mobile & Tablet view */}
      <div className="md:hidden flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <motion.div whileTap={{ rotate: 360 }} transition={{ duration: 0.7 }}>
            <Image
              src={logo}
              alt="Sibom Saha Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </motion.div>
          <h1 className="text-lg sm:text-xl font-bold ">Sibom Saha</h1>
        </motion.div>

        {/* Mobile Menu & Resume Button */}
        <div className="flex items-center gap-3">
          {/* Mobile Resume Button */}
          <motion.a
            href="/resume.pdf"
            download="Sibom_Saha_Resume.pdf"
            whileTap={{ scale: 0.9 }}
            className="px-3 py-2 sm:px-4 sm:py-2  text-sm font-semibold rounded-full flex items-center gap-1.5 shadow-md hover:shadow-lg transition-shadow">
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Resume</span>
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};
