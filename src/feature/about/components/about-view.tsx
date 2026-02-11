"use client";

import Link from "next/link";
import Image from "next/image";
import { PiRabbit } from "react-icons/pi";
import CircularText from "@/components/CircularText";
import { FaGithub, FaWhatsapp, FaDiscord } from "react-icons/fa6";
import { motion, useMotionValue, useTransform } from "framer-motion";

const lines = [
  "Hi! I’m Sibom Saha, a passionate full-stack web developer focused on crafting modern, user-friendly web applications.",
  "I specialize in React.js, Next.js, Express.js, and Tailwind CSS.",
  "Currently a third-semester student at Patuakhali Polytechnic Institute, balancing academics with real-world development.",
  "I love solving problems, building meaningful projects, and staying ahead with modern technologies.",
  "My goal is to create impactful digital experiences while maintaining a healthy lifestyle.",
];

export function AboutView() {
  // 🔥 Proper parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useTransform(mouseX, [-300, 300], [-40, 40]);
  const y = useTransform(mouseY, [-300, 300], [-40, 40]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden px-6 py-24">
      {/* Floating social icons */}
      <FloatingIcon
        href="https://github.com/sibom007"
        icon={<FaGithub />}
        className="top-24 left-10"
      />

      <FloatingIcon
        href="https://discord.com/users/000000000000000000"
        icon={<FaDiscord />}
        label="sibom77"
        className="bottom-24 right-16"
      />

      <FloatingIcon
        href="https://wa.me/8801625334383"
        icon={<FaWhatsapp />}
        className="top-1/3 right-8"
      />

      <div className="container mx-auto flex flex-col md:flex-row items-center gap-20">
        {/* Image with REAL parallax */}
        <motion.div
          style={{ x, y }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full md:w-1/2 flex justify-center ">
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -top-10 right-12  z-20">
            <CircularText
              text=" Never Give Up "
              className="w-28 h-28 text-orange-200 "
              centerContent={
                <div className=" rounded-full flex items-center justify-center">
                  <PiRabbit className="size-5 text-orange-600" />
                </div>
              }
            />
          </div>
          <Image
            src="https://res.cloudinary.com/dwor90h8p/image/upload/v1745845883/main_image_for_profile_izdjkc.jpg"
            alt="About Image"
            width={420}
            height={420}
            className="relative rounded-3xl shadow-2xl border border-white/10"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About Me
          </h2>

          <div className="space-y-5 text-white/80 leading-relaxed">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}>
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ✅ Floating icon = ALWAYS a link */
function FloatingIcon({
  icon,
  href,
  label,
  className,
}: {
  icon: React.ReactNode;
  href: string;
  label?: string;
  className: string;
}) {
  return (
    <motion.div
      className={`absolute z-20 ${className}`}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.25 }}>
      <Link
        href={href}
        target="_blank"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20
                   text-purple-400 text-xl hover:text-white transition">
        {icon}

        {label && (
          <span
            className="absolute -top-9 whitespace-nowrap rounded-md bg-black/90
                           px-2 py-1 text-xs text-white opacity-0
                           group-hover:opacity-100 transition">
            {label}
          </span>
        )}
      </Link>
    </motion.div>
  );
}
