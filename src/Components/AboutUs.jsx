// File: AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="relative py-28 bg-gradient-to-br from-white via-red-50 to-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://i.ibb.co.com/xQ5wGN0/pexels-franco30-12193105.jpg"
            alt="About Us"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#5C0000] text-white px-6 py-4 rounded-xl shadow-lg">
            ❤️ Together We Save Lives
          </div>
        </motion.div>

        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-extrabold text-[#5C0000] mb-6">
            About <span className="text-red-700">Us</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our mission is simple yet powerful — to connect voluntary donors
            with those in urgent need of blood. We believe that saving lives
            should be easy, transparent, and accessible to everyone.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            With a trusted community of donors and recipients, we aim to make
            blood donation more efficient and reliable. Every drop counts, and
            together, we can build a healthier tomorrow.
          </p>
          <button className="px-6 py-3 bg-[#5C0000] text-white font-semibold rounded-lg shadow-md hover:bg-red-800 transition-all duration-300">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
