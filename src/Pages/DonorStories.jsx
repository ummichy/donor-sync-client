// File: DonorStories.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DonorStories = () => {
  const stories = [
    {
      id: 1,
      name: "Amina Rahman",
      story:
        "Donating blood changed my perspective on life. I felt I contributed to saving lives.",
      image:
        "https://ui-avatars.com/api/?name=Amina+Rahman&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 2,
      name: "Imran Hossain",
      story:
        "I joined a donation camp and realized how small actions can make a huge difference.",
      image:
        "https://ui-avatars.com/api/?name=Imran+Hossain&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 3,
      name: "Fatema Akter",
      story:
        "Being part of donor drives gave me a sense of community and purpose.",
      image:
        "https://ui-avatars.com/api/?name=Fatema+Akter&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 4,
      name: "Tanvir Ahmed",
      story:
        "Blood donation drives taught me the importance of giving back to society.",
      image:
        "https://ui-avatars.com/api/?name=Tanvir+Ahmed&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 5,
      name: "Shabnam Sultana",
      story:
        "I feel proud to be a regular donor and help patients in urgent need.",
      image:
        "https://ui-avatars.com/api/?name=Shabnam+Sultana&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
    {
      id: 6,
      name: "Rashed Khan",
      story:
        "Seeing the impact of my donation motivated me to encourage others too.",
      image:
        "https://ui-avatars.com/api/?name=Rashed+Khan&background=5C0000&color=FFFFFF&rounded=true&size=128",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.9 },
  };

  const visibleStories = [
    stories[currentIndex % stories.length],
    stories[(currentIndex + 1) % stories.length],
    stories[(currentIndex + 2) % stories.length],
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#826767]  via-white to-[#826767] "
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5C0000] mb-16 drop-shadow-lg">
          Donor Stories
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0">
          {/* Left side: smaller story cards */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 h-[600px] justify-center relative">
            <AnimatePresence mode="wait">
              {visibleStories.map((story) => (
                <motion.div
                  key={story.id}
                  className="w-full rounded-2xl p-4 flex flex-col items-center text-center 
                             shadow-xl backdrop-blur-xl border border-white/30 bg-transparent"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.7 }}
                >
                  <motion.div
                    className="w-20 h-20 mb-3 rounded-full border-4 border-[#5C0000] shadow-lg"
                    style={{
                      backgroundImage: `url(${story.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-1 drop-shadow-lg">
                    {story.name}
                  </h3>
                  <p className="text-gray-800 text-sm leading-relaxed drop-shadow-md">
                    {story.story}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right side: Animated image */}
          <div className="w-full md:w-1/2 h-[600px] relative overflow-hidden rounded-3xl shadow-2xl">
            <motion.img
              src="https://i.ibb.co/qFdCSxCG/20200628-YM01-blood-donation-pack.jpg"
              alt="Blood Donation"
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ scale: [1, 1.1, 1], x: [0, -25, 0] }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorStories;
