// File: BloodFacts.jsx
import React from "react";
import { motion } from "framer-motion";

const BloodFacts = () => {
  const facts = [
    "One blood donation can save up to 3 lives.",
    "Every 2 seconds, someone in the world needs blood.",
    "The donation process takes only 8-10 minutes.",
    "Blood cannot be manufactured—it can only come from donors.",
    "Regular donors help maintain a stable blood supply for emergencies.",
    "Both men and women can donate blood, but women usually donate less frequently.",
    "Whole blood donations can be done every 3 months, while plasma can be donated more often.",
    "Blood donation not only saves lives but also improves the donor’s health by stimulating new blood cell production.",
  ];

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-32 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-3xl md:text-5xl font-bold text-[#5C0000]  mb-20"
        >
          Blood Donation Facts
        </motion.h2>

        {/* Facts Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {facts.map((fact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Top Badge Number */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: index * 0.3 }}
                className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <span className="text-[#5C0000]  font-bold text-2xl">{index + 1}</span>
              </motion.div>

              <p className="mt-12 text-black font-light text-lg">{fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodFacts;
