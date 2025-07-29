// src/Pages/Profile.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user.email}`)
      .then(res => {
        setFormData(res.data);
      });
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put(`http://localhost:3000/users/${user.email}`, formData)
      .then(() => {
        Swal.fire("Updated!", "Profile updated successfully.", "success");
        setEditMode(false);
      });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-40">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        {!editMode ? (
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>

      <form className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="district"
          value={formData.district}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="District"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="upazila"
          value={formData.upazila}
          disabled={!editMode}
          onChange={handleChange}
          placeholder="Upazila"
          className="w-full p-2 border rounded"
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          disabled={!editMode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
      </form>
    </div>
  );
};

export default ProfilePage;
