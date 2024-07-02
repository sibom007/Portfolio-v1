"use client";
import { motion } from "framer-motion";
import { AiOutlinePhone } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillShop } from "react-icons/ai";

const Contact = () => {
  return (
    <div className="mt-20 bg-[#130c25] text-white">
      <div className="pt-16 pb-16 px-16 md:flex gap-10 md:gap-20 lg:gap-36 items-center">
        <div>
          <div className="bg-[#140c1c] p-7 md:p-14 lg:p-16 rounded-lg shadow-md">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
              className="bg-clip-text text-transparent
         bg-gradient-to-r from-[#804ceb] via-[#804ceb] to-white text-center text-3xl md:text-5xl font-bold mb-5">
              Let’s work together!
            </motion.h1>
            <p className="text-gray-400 mb-6">
              I design and code beautifully simple things, just like that!
            </p>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="w-full p-2 rounded-md bg-[#050709] outline-primary text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  className="w-full p-2 rounded-md bg-[#050709] outline-primary text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="w-full p-2 rounded-md bg-[#050709] outline-primary text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  placeholder="Your message"
                  className="w-full p-2 rounded-md bg-[#050709] outline-primary text-white h-24"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-indigo-900 text-white px-4 py-2 rounded-md">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex items-center  gap-3">
            <p>
              <AiOutlinePhone className="bg-gradient-to-r from-purple-600 to-indigo-900  rounded-full p-2 text-white size-14" />
            </p>
            <p className="text-xl text-white/70 font-semibold">
              Phone <br /> <span className="text-white">01625334383</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p>
              <AiOutlineMail className="bg-gradient-to-r from-purple-600 to-indigo-900  rounded-full p-2 text-white size-14" />
            </p>
            <p className="text-xl text-white/70 font-semibold">
              Email <br />{" "}
              <span className="text-white">sibomsaha77@gamil.com</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p>
              <AiFillShop className="bg-gradient-to-r from-purple-600 to-indigo-900  rounded-full p-2 text-white size-14" />
            </p>
            <p className="text-xl text-white/70 font-semibold">
              Address <br />{" "}
              <span className="text-white">Bangladesh,Patuakhali</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
