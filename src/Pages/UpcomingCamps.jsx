import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const UpcomingCamps = () => {
  const camps = [
    {
      id: 1,
      title: "Blood Donation Camp - Dhaka",
      date: "Sept 10, 2025",
      location: "Dhaka Medical College",
      attendees: "200+",
      image: "https://i.ibb.co/9kpyQq22/M34hc-Oxq-UAFr-JXOK-dmc.jpg",
    },
    {
      id: 2,
      title: "Organ Donation Awareness Drive",
      date: "Sept 15, 2025",
      location: "Rajshahi Medical College",
      attendees: "150+",
      image: "https://i.ibb.co/qLF6NZVm/unnamed3.jpg",
    },
    {
      id: 3,
      title: "Plasma Donation Camp",
      date: "Sept 20, 2025",
      location: "Sylhet Osmani Hospital",
      attendees: "100+",
      image: "https://i.ibb.co/yn5sFZ2T/2560px-Sylhet-MAG-Osmani-Medical-College-Building.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100
     to-white relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#5C0000] mb-4">
          Upcoming Donation Camps
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Mark your calendar and be part of life-saving events. Every drop makes
          a difference.
        </p>

        {/* Timeline container */}
        <div className="relative border-l-4 border-[#5C0000] ml-6">
          {camps.map((camp, index) => (
            <motion.div
              key={camp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              viewport={{ once: true }}
              className="mb-12 ml-6"
            >
              {/* Timeline dot */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-[#5C0000] text-white rounded-full shadow-lg font-bold"
              >
                {index + 1}
              </motion.span>

              {/* Card */}
              <motion.div
                whileHover={{ rotate: [0, 1, -1, 0] }}
                className="bg-white shadow-xl rounded-xl border border-gray-100 transition flex flex-col md:flex-row overflow-hidden"
              >
                {/* Left Side - Text */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {camp.title}
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <Calendar size={18} className="text-black" />
                      {camp.date}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={18} className="text-black" />
                      {camp.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={18} className="text-black" />
                      Expected: {camp.attendees}
                    </p>
                  </div>
                </div>

                {/* Right Side - Image */}
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="md:w-1/3"
                >
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCamps;
