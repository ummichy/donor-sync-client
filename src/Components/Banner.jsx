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
      className="relative h-[80vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/blood.mp4" // put your video in public folder
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative z-20 max-w-xl ml-4 md:ml-24 lg:ml-20 px-4 md:px-8 lg:px-12 text-center lg:text-left"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6"
          style={{ color: "#5C0000" }}
        >
          Make a <span className="text-white">Life</span>saving{" "}
          <span className="text-center">Impact</span>
        </h1>

        <p className="text-base sm:text-lg text-white md:text-xl mb-6 md:mb-8">
          Every drop counts. Become a blood donor and help save lives when it
          matters most. Join our mission to connect compassionate donors with
          patients in urgent need of hope and healing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            onClick={() => navigate("/register")}
            className="bg-[#5C0000] hover:bg-[#3f0000] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-300 border border-transparent"
          >
            Join as a Donor
          </button>

          <button
            onClick={() => navigate("/search")}
            className="bg-white/70 hover:bg-[#5C0000] hover:text-white text-[#5C0000] font-semibold px-6 py-3 rounded-md shadow-md hover:shadow-lg border border-[#5C0000] transition-all duration-300"
          >
            Search Donors
          </button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Banner;
