import React from "react";
import { motion } from "framer-motion";

const DonorStories = () => {
  const stories = [
    {
      id: 1,
      name: "Amina Rahman",
      story: "Donating blood changed my perspective on life. I felt I contributed to saving lives.",
      image: "https://ui-avatars.com/api/?name=Amina+Rahman&background=FF0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 2,
      name: "Imran Hossain",
      story: "I joined a donation camp and realized how small actions can make a huge difference.",
      image: "https://ui-avatars.com/api/?name=Imran+Hossain&background=FF0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 3,
      name: "Fatema Akter",
      story: "Being part of donor drives gave me a sense of community and purpose.",
      image: "https://ui-avatars.com/api/?name=Fatema+Akter&background=FF0000&color=FFFFFF&rounded=true&size=128",
    },
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-red-50 via-white to-red-100 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-red-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-16 w-72 h-72 bg-red-300 rounded-full opacity-20 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5C0000] mb-16">
          Donor Stories
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-transform flex flex-col items-center text-center relative"
            >
              {/* Avatar Image */}
              <div className="w-28 h-28 mb-4">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full rounded-full object-cover border-4 border-red-600 shadow-md"
                />
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{story.name}</h3>

              {/* Story */}
              <p className="text-gray-700 text-base">{story.story}</p>

              {/* Decorative small dot behind card */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-red-100 rounded-full opacity-40 -z-10"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonorStories;
