// // src/pages/AddBlog.jsx
// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router";
// import JoditEditor from "jodit-react";
// import axios from "axios";

// const AddBlog = () => {
//   const navigate = useNavigate();
//   const editor = useRef(null);

//   const [title, setTitle] = useState("");
//   const [thumbnailUrl, setThumbnailUrl] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title.trim() || !thumbnailUrl.trim() || !content.trim()) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:3000/blogs", {
//         title,
//         thumbnailUrl,
//         content,
//         // status will be set as 'draft' in backend
//       });
//       alert("Blog created successfully! Status: draft");
//       navigate("/dashboard/content-management");
//     } catch (error) {
//       console.error("Failed to create blog", error);
//       alert("Failed to create blog");
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-red-700">Add Blog</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block font-medium mb-1">Title</label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="Blog title"
//           />
//         </div>

//         <div>
//           <label htmlFor="thumbnailUrl" className="block font-medium mb-1">Thumbnail Image URL</label>
//           <input
//             id="thumbnailUrl"
//             type="text"
//             value={thumbnailUrl}
//             onChange={(e) => setThumbnailUrl(e.target.value)}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//             placeholder="https://example.com/image.jpg"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Content</label>
//           <JoditEditor
//             ref={editor}
//             value={content}
//             onChange={setContent}
//             config={{
//               readonly: false,
//               height: 300,
//               toolbarSticky: false,
//               // You can add more config here
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
//         >
//           Create Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddBlog;
import React, { useContext, useEffect, useState, useRef } from "react";
// import { AuthContext } from "../../provider/AuthProvider";
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

  // Blog list
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/blogs")
      .then(res => setBlogs(res.data));

    if (user?.email) {
      axios.get(`http://localhost:3000/users/${user.email}`)
        .then(res => setUserRole(res.data.role));
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
      status: "draft"
    };
    try {
      const res = await axios.post("http://localhost:3000/blogs", newBlog);
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

  const filteredBlogs = blogs.filter(blog =>
    filter === "all" ? true : blog.status === filter
  );

  const toggleStatus = async (id, newStatus) => {
    await axios.put(`http://localhost:3000/blogs/${id}`, { status: newStatus });
    setBlogs(prev =>
      prev.map(blog =>
        blog._id === id ? { ...blog, status: newStatus } : blog
      )
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await axios.delete(`http://localhost:3000/blogs/${id}`);
    setBlogs(prev => prev.filter(blog => blog._id !== id));
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Add Blog</h2>
        <button
          onClick={() => navigate("/dashboard/add-blog")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Blog
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Thumbnail Image URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          className="w-full border px-3 py-2 rounded"
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
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      <hr className="my-6" />

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">All Blogs</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="border rounded shadow p-4 bg-white">
            <img
              src={blog.thumbnailUrl}
              alt={blog.title}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <h4 className="text-lg font-semibold mb-1">{blog.title}</h4>
            <p className="text-sm text-gray-600 mb-2">
              Status:{" "}
              <span className={`font-medium ${blog.status === "published" ? "text-green-600" : "text-orange-500"}`}>
                {blog.status}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {userRole === "admin" && (
                <>
                  {blog.status === "draft" ? (
                    <button
                      onClick={() => toggleStatus(blog._id, "published")}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(blog._id, "draft")}
                      className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;
