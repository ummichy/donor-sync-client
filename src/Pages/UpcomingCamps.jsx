import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

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
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white relative">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#5C0000] mb-4">
          <span className="md:text-7xl text-5xl">U</span>pcoming Donation Camps
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Mark your calendar and be part of life-saving events. Every drop makes a difference.
        </p>

        {/* Timeline container */}
        <div className="relative border-l-4 border-[#5C0000] ml-6">
          {camps.map((camp, index) => (
            <div key={camp.id} className="mb-12 ml-6">
              {/* Timeline dot */}
              <span className="absolute -left-[22px] flex items-center justify-center w-10 h-10 bg-[#5C0000] text-white rounded-full shadow-lg font-bold">
                {index + 1}
              </span>

              {/* Card with subtle hover animation */}
              <div className="bg-white shadow-xl rounded-xl border border-gray-100 transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row overflow-hidden duration-300 ease-in-out">
                {/* Left Side - Text */}
                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{camp.title}</h3>
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

                {/* Right Side - Image with subtle hover zoom */}
                <div className="md:w-1/3 overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingCamps;
