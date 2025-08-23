import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const MissionSection = () => {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current.offsetHeight);
    }
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start px-6">
        
        {/* Left Side Video */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg"
          style={{ height: textHeight }}
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

        {/* Right Side Text */}
        <motion.div
          ref={textRef}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 w-full md:w-1/2"
        >
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            Our Mission to Save Lives
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg text-gray-600"
          >
            At Donor Sync, our mission goes beyond merely connecting donors with recipients. We strive to create a world where every individual in need of blood can receive it in time. By fostering a network of compassionate donors, hospitals, and volunteers, we aim to ensure that no life is lost due to preventable shortages. Every contribution, no matter how small, plays a vital role in saving lives and building hope for families and communities alike.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-600"
          >
            We also emphasize education and awareness, teaching communities about the importance of blood donation and encouraging regular participation. By joining thousands of compassionate individuals around the country, you become part of a movement that values life, empathy, and the power of human connection. Together, we can reduce the gap between urgent need and timely help, making our society stronger, healthier, and more resilient.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-gray-600"
          >
            Every act of giving matters. By stepping forward to donate, advocating for awareness, or helping organize local drives, each person contributes to a ripple effect of life-saving change. Our vision is to build a community where compassion drives action, where no request for help goes unanswered, and where humanity shines through in every life touched by our efforts.
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
};

export default MissionSection;
