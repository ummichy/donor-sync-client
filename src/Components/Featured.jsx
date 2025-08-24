// File: Featured.jsx
import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Give Life, Feel Alive",
    description:
      "Every blood donation creates hope and saves lives. Experience the joy of giving and making a tangible impact in your community.",
    image:
      "https://i.ibb.co.com/xQ5wGN0/pexels-franco30-12193105.jpg",
  },
  {
    title: "Trusted Donor Network",
    description:
      "Join a verified network of donors and recipients. Your donation reaches the right people at the right time with safety and reliability.",
    image:
      "https://i.ibb.co.com/WN3BP1n4/pexels-ketut-subiyanto-4963437.jpg",
  },
  {
    title: "Simple and Convenient",
    description:
      "Schedule donations effortlessly with our easy-to-use platform. Spend less time managing, more time saving lives.",
    image:
      "https://i.ibb.co.com/7JGbVgTg/pexels-pixabay-39396.jpg",
  },
  {
    title: "Empower Your Community",
    description:
      "Be a hero in your neighborhood. Locate donors quickly, assist in emergencies, and inspire others to give the gift of life.",
    image:
      "https://i.ibb.co.com/1G3ZGX8h/pexels-karolina-grabowska-6629369.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Featured = () => {
  return (
    <section className="relative py-28 bg-gradient-to-br from-red-50 via-white to-red-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-5xl font-extrabold text-[#5C0000] mb-20"
        >
          Why Join Our Blood Donation Community?
        </motion.h2>

        {/* Cards */}
        <motion.div
          className="grid gap-10 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-500 flex items-start gap-6 border border-red-100"
            >
              {/* Image instead of icon */}
              <div className="flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden shadow-md">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
