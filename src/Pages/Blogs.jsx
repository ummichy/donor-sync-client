
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchPublishedBlogs = async () => {
      try {
        const res = await fetch("https://assignment-no-twelve-server.vercel.app/blogs?status=published");
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedBlogs();
  }, []);

  // Close modal handler
  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <div className="px-4 py-32 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-center text-[#5C0000] ">
        Released Blogs
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No published blogs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={blog.thumbnailUrl}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h3>
                <div
                  className="text-sm text-gray-600 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="bg-[#5C0000]  hover:bg-[#5C0000]  text-white px-4 py-2 rounded"
                >
                  Read Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-[#f8f2ea] bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside content
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedBlog.thumbnailUrl}
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;

