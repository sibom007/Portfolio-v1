"use client";

import {
  Github,
  Mail,
  MessageCircle,
  CopyIcon,
  CopyCheckIcon,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Magnet from "@/components/magnet";
import { FaWhatsapp } from "react-icons/fa";

const contacts = [
  {
    name: "GitHub",
    value: "github.com/sibom007",
    icon: Github,
    link: "https://github.com/sibom007",
  },
  {
    name: "Email",
    value: "sibomsaha77@gmail.com",
    icon: Mail,
    copy: "sibomsaha77@gmail.com",
  },
  {
    name: "Phone",
    value: "+8801625334383",
    icon: FaWhatsapp,
    link: "https://wa.me/8801625334383",
  },
  {
    name: "Discord",
    value: "sibom77",
    icon: MessageCircle,
    copy: "sibom77",
  },
];

export function ContactUsView() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copy = async (text: string, name: string) => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopiedItem(name);

    setTimeout(() => {
      setCopiedItem(null);
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-foreground animate-gradient">
            Let’s Talk
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 max-w-xl mb-14">
          Reach out through any channel. Clean. Fast. Direct.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((item, i) => (
            <Magnet
              key={i}
              magnetStrength={3}
              wrapperClassName="w-full"
              innerClassName="w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  item.link
                    ? window.open(item.link, "_blank")
                    : copy(item.copy!, item.name)
                }
                className="group relative cursor-pointer rounded-2xl border border-gray-700 p-6 overflow-hidden">
                {/* Neon glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-pink-600 to-indigo-600 blur-xl opacity-30" />
                </div>

                <div className="relative z-10 flex justify-between items-center gap-5">
                  <div className="flex gap-5 items-center ">
                    <motion.div
                      whileHover={{ rotate: 12, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="text-white">
                      <item.icon size={26} />
                    </motion.div>

                    <div>
                      <p className="text-sm text-gray-400">{item.name}</p>
                      <p className="font-semibold tracking-wide">
                        {item.value}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end items-end">
                    {item.copy &&
                      (copiedItem === item.name ? (
                        <CopyCheckIcon className="size-5 text-green-400" />
                      ) : (
                        <CopyIcon className="size-5 text-gray-400 group-hover:text-white transition" />
                      ))}
                  </div>
                </div>
              </motion.div>
            </Magnet>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-xs text-gray-500">
          © {new Date().getFullYear()} — Always online
        </motion.div>
      </div>

      {/* Gradient animation */}
      <style jsx>{`
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientMove 6s ease infinite;
        }
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
