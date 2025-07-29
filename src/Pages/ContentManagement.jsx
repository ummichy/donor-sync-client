import React from "react";
import { useNavigate } from "react-router";

const ContentManagement = () => {
  const navigate = useNavigate();

  const handleAddBlog = () => {
    navigate("/dashboard/add-blg");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-indigo-700">Content Management</h2>
        <button
          onClick={handleAddBlog}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Blog
        </button>
      </div>

      {/* Here you can add the list of existing blogs later */}
      <p className="text-gray-600">Click on add blog to add and view Blogs</p>
    </div>
  );
};

export default ContentManagement;
