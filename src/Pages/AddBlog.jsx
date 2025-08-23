import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    axios.get("https://assignment-no-twelve-server.vercel.app/blogs").then((res) => setBlogs(res.data));
    if (user?.email) {
      axios
        .get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
        .then((res) => setUserRole(res.data.role));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      thumbnailUrl,
      content,
      author: user.displayName || "Unknown",
      email: user.email,
      status: "draft",
    };
    try {
      const res = await axios.post("https://assignment-no-twelve-server.vercel.app/blogs", newBlog);
      if (res.data.insertedId) {
        alert("Blog created as draft");
        setBlogs([...blogs, newBlog]);
        setTitle("");
        setThumbnailUrl("");
        setContent("");
      }
    } catch (err) {
      console.error("Failed to create blog", err);
    }
  };

  const filteredBlogs = blogs.filter((blog) =>
    filter === "all" ? true : blog.status === filter
  );

  const toggleStatus = async (id, newStatus) => {
    await axios.put(`https://assignment-no-twelve-server.vercel.app/blogs/${id}`, { status: newStatus });
    setBlogs((prev) =>
      prev.map((blog) => (blog._id === id ? { ...blog, status: newStatus } : blog))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await axios.delete(`https://assignment-no-twelve-server.vercel.app/blogs/${id}`);
    setBlogs((prev) => prev.filter((blog) => blog._id !== id));
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#5C0000]">Post a Blog</h2>
        
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 shadow-sm p-6 rounded-lg space-y-5"
      >
        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
          required
        />
        <input
          type="text"
          placeholder="Thumbnail Image URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
          required
        />
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-[#5C0000] hover:bg-[#450000] text-white font-semibold px-6 py-2 rounded-md transition-all duration-200 shadow"
        >
          	Set Up
        </button>
      </form>

      <hr className="my-10" />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#5C0000]">Your Content</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800">{blog.title}</h4>
              <p className="text-sm text-gray-600 mb-2">
                Status:{" "}
                <span
                  className={`font-medium ${
                    blog.status === "published" ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {blog.status}
                </span>
              </p>

              {userRole === "admin" && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() => toggleStatus(blog._id, "published")}
                      className="bg-[#5C0000] hover:bg-[#450000] text-white text-sm px-4 py-1 rounded-md transition"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(blog._id, "draft")}
                      className="bg-[#5C0000] hover:bg-[#5C0000] text-white text-sm px-4 py-1 rounded-md transition"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;
