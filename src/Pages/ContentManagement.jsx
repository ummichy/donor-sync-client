import React from "react";
import { useNavigate } from "react-router";

const ContentManagement = () => {
  const navigate = useNavigate();

  const handleAddBlog = () => {
    navigate("/dashboard/add-blg");
  };

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh] p-8 bg-gradient-to-br from-[#fdf2f2] to-white rounded-2xl shadow-xl border border-[#d4a6a6]">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#5C0000] mb-5">
        Content Management
      </h2>

      <p className="text-gray-700 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">
        Streamline your blog content management and share meaningful updates that keep your community informed, inspired, and engaged.
      </p>

      <button
        onClick={handleAddBlog}
        className="bg-[#5C0000] hover:bg-[#4a0000] text-white text-lg md:text-xl font-semibold px-8 py-4 rounded-xl transition-all duration-300 ease-in-out shadow-lg hover:scale-105"
      >
      Add New Blog
      </button>
    </div>
  );
};

export default ContentManagement;
