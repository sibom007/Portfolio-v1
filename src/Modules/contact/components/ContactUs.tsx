"use client";
import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export const ContactUs = () => {
    return (
        <div className="max-h-screen ">
            <h1 className="text-4xl font-bold text-center  mt-4 text-white">Get in Touch</h1>
            <div className="flex flex-col md:flex-row items-center justify-center p-6 gap-8">
                {/* Left: Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 bg-ThemePrimary-600/20 rounded-2xl shadow-lg p-8"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Contact Form</h2>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border border-ThemePrimary-300 p-3 bg-ThemePrimary-100 text-gray-700 placeholder:text-gray-700 placeholder:font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-ThemePrimary-500"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border border-ThemePrimary-300 p-3 bg-ThemePrimary-100 text-gray-700 placeholder:text-gray-700 placeholder:font-semibold  rounded-lg focus:outline-none focus:ring-2 focus:ring-ThemePrimary-500"
                        />
                        <textarea
                            placeholder="Describe your problem"
                            rows={5}
                            className="border border-ThemePrimary-300 p-3 bg-ThemePrimary-100 text-gray-700 placeholder:text-gray-700 placeholder:font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-ThemePrimary-500 resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-ThemePrimary-500 text-white py-3 rounded-lg hover:bg-ThemePrimary-600 transition"
                        >
                            Submit
                        </button>
                    </form>
                </motion.div>

                {/* Right: WhatsApp and Email */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white/90 rounded-2xl shadow-lg p-8"
                >
                    <h2 className="text-2xl font-bold text-ThemePrimary-700 mb-6">Reach Us Directly</h2>
                    <div className="flex flex-col gap-6 text-center text-ThemePrimary-800 text-lg">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="https://wa.me/8801625334383"
                            target="_blank"
                            className="flex items-center gap-4 justify-center hover:text-ThemePrimary-500 transition"
                        >
                            <FaWhatsapp size={30} />
                            +880 1625 334383
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            href="mailto:sibomsaha77@gmail.com"
                            target="_blank"
                            className="flex items-center gap-4 justify-center hover:text-ThemePrimary-500 transition"
                        >
                            <FaEnvelope size={30} />
                            sibomsaha77@gmail.com
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
