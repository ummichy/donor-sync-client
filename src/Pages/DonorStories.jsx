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
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 0.95 },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-200"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-[#5C0000] mb-16 drop-shadow-lg">
          Donor Stories
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0 h-[550px]">
          {/* Left side: Enlarged transparent card */}
          <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={stories[current].id}
                className="w-[420px] rounded-3xl p-10 flex flex-col items-center text-center 
                           shadow-2xl backdrop-blur-2xl border border-white/30 bg-transparent"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="w-32 h-32 mb-6 rounded-full border-4 border-[#5C0000] shadow-xl"
                  style={{
                    backgroundImage: `url(${stories[current].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-3 drop-shadow-lg">
                  {stories[current].name}
                </h3>
                <p className="text-gray-800 text-lg leading-relaxed drop-shadow-md">
                  {stories[current].story}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right side: Animated image with overlay */}
          <div className="w-full md:w-1/2 h-full relative overflow-hidden rounded-3xl shadow-2xl">
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
