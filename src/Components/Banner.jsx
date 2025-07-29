import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-red-200 via-red-100 to-red-200 text-red-900 py-20 px-4 md:px-10 text-center"
    >
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-5"
      >
        Join as a Donor
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
      >
        Donate blood, save lives. Be the reason someone gets a second chance. Our
        community connects donors with patients in urgent need.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <button
          onClick={() => navigate("/register")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
        >
          Join as a Donor
        </button>
        <button
          onClick={() => navigate("/search")}
          className="bg-white hover:bg-red-100 text-red-500 border border-red-500 font-bold px-6 py-3 rounded-full shadow-md transition duration-300 transform hover:scale-105"
        >
          Search Donors
        </button>
      </motion.div>
    </motion.section>
  );
};

export default Banner;