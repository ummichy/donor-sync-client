import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-20 px-4  md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-8 rounded-xl shadow-2xl border border-white"
        >
          <h2 className="text-3xl font-bold text-[#5C0000] mb-6 text-center">
            Contact Us
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border border-[#5C0000]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C0000] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-[#5C0000]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C0000] bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-[#5C0000]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C0000] bg-white"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#5C0000] hover:bg-[#4a0000] text-white font-semibold py-3 rounded-md transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-2xl border border-white space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#5C0000] mb-4">Get In Touch</h2>

          <div className="flex items-center gap-4 text-gray-700">
            <FiPhone className="text-[#5C0000]" size={20} />
            <span>+880 1234-567890</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FiMail className="text-[#5C0000]" size={20} />
            <span>donorsync@gmail.com</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FiMapPin className="text-[#5C0000]" size={20} />
            <span>Dhaka, Bangladesh</span>
          </div>

          <p className="text-sm text-gray-500 pt-4">
            We aim to respond to all queries within 24 hours. For urgent help, please call us directly.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
