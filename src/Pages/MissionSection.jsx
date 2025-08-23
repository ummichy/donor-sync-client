import React from "react";
import { motion } from "framer-motion";

const MissionSection = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
        
        {/* Left Side Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Our Mission to Save Lives
          </h2>
          <p className="text-lg text-gray-600">
            At Donor Sync, we are dedicated to bridging the gap between blood
            donors and recipients. Every drop of blood counts, and with your
            help, we can make sure no life is lost due to shortages.
          </p>
          <p className="text-lg text-gray-600">
            Join thousands of compassionate people who are stepping forward to
            make a real difference. Together, we build a stronger, healthier
            tomorrow.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white rounded-2xl shadow hover:bg-red-700 transition">
            Become a Donor
          </button>
        </motion.div>

        {/* Right Side Video */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-96 md:h-full rounded-xl overflow-hidden shadow-lg"
        >
          <video
            className="w-full h-full object-cover"
            src="/video (2).mp4" // put your video in public folder
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>

      </div>
    </section>
  );
};

export default MissionSection;
