import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Save Precious Lives",
    description:
      "Each donation can save up to 3 lives. Join a compassionate community committed to making a real difference.",
    iconBg: "bg-gradient-to-r from-red-600 to-red-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.72-7.72 1.06-1.06a5.5 5.5 0 000-7.84z" />
      </svg>
    ),
  },
  {
    title: "Verified Donor Network",
    description:
      "Connect with trusted, verified donors in your area, ensuring quick and reliable help when emergencies arise.",
    iconBg: "bg-gradient-to-r from-pink-600 to-pink-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx={12} cy={7} r={4} />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a8.38 8.38 0 0113 0" />
      </svg>
    ),
  },
  {
    title: "Effortless Scheduling",
    description:
      "Easily book appointments and manage your donations with our simple, user-friendly platform.",
    iconBg: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
        <line x1={16} y1={2} x2={16} y2={6} />
        <line x1={8} y1={2} x2={8} y2={6} />
        <line x1={3} y1={10} x2={21} y2={10} />
      </svg>
    ),
  },
  {
    title: "Locate Donors Fast",
    description:
      "Find available donors in your vicinity quickly and securely during critical times.",
    iconBg: "bg-gradient-to-r from-green-600 to-green-400",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <circle cx={12} cy={12} r={10} />
        <line x1={2} y1={12} x2={22} y2={12} />
        <line x1={12} y1={2} x2={12} y2={22} />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Featured = () => {
  return (
    <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
      <h2 className="text-center text-5xl font-extrabold text-[#5C0000] mb-16">
        Why Join Our Blood Donation Community?
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map(({ title, description, iconBg, icon }) => (
          <motion.div
            key={title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center cursor-default hover:shadow-2xl hover:-translate-y-4 transition-transform duration-500"
            variants={itemVariants}
          >
            <div
              className={`${iconBg} rounded-full p-5 mb-6 flex items-center justify-center drop-shadow-lg`}
            >
              {icon}
            </div>
            <h3 className="text-2xl font-semibold text-[#5C0000] mb-4">{title}</h3>
            <p className="text-gray-700 text-base leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Featured;
