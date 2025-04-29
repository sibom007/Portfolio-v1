"use client";

import { motion } from "framer-motion";
import jsPDF from "jspdf";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
const Links = () => {
  const handledw = () => {
    const doc = new jsPDF("portrait", "px", "a4", false);
    doc.addImage(
      "https://res.cloudinary.com/dwor90h8p/image/upload/v1745930515/Screenshot_2025-04-29_173905_waalzp.png",
      "JPEG",
      0,
      0,
      428,
      525
    );
    doc.save("resume.pdf");
  };

  const Links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Servise",
      path: "/",
    },
    {
      name: "About",
      path: "/",
    },
    {
      name: "Contact",
      path: "#contact",
    },
    {
      name: "Skills",
      path: "#skills",
    },
  ];

  const [hoverAnimations, setHoverAnimations] = useState(
    Links.map(() => ({ x: 0, opacity: 0 }))
  );
  const handleHover = (index: number) => {
    setHoverAnimations((prevAnimations) =>
      prevAnimations.map((animation, i) =>
        i === index ? { x: 0, opacity: 1 } : animation
      )
    );
  };
  const handleHoverEnd = (index: number) => {
    setHoverAnimations((prevAnimations) =>
      prevAnimations.map((animation, i) =>
        i === index ? { x: 20, opacity: 0 } : animation
      )
    );
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.4,
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      }}
      className="flex md:gap-7 lg:gap-10 items-center">
      {Links.map((link, index) => (
        <Link
          className="text-white hover:text-primary"
          href={link.path}
          key={link.name}>
          <motion.div
            onHoverStart={() => handleHover(index)}
            onHoverEnd={() => handleHoverEnd(index)}
            className={`font-semibold`}>
            {link.name}
            <motion.p
              animate={hoverAnimations[index]}
              className={`border-2 border-primary `}
            />
          </motion.div>
        </Link>
      ))}

      <button
        onClick={handledw}
        className="hover:text-white text-primary flex items-center gap-3  border-2 border-primary hover:bg-primary duration-500 px-4 py-2 rounded-3xl">
        Download Resume <AiOutlineCloudDownload className="size-4 " />
      </button>
    </motion.div>
  );
};

export default Links;
