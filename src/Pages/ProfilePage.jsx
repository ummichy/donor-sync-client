// src/Pages/ProfilePage.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user profile from backend on mount
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/users/${user.email}`)
        .then((res) => {
          setProfile(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save updated profile data to backend
    axios
      .put(`/api/users/${profile._id}`, profile)
      .then(() => {
        alert("Profile updated successfully");
        setEditMode(false);
      })
      .catch(() => alert("Failed to update profile"));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Cancel" : "Edit"}
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {/* Name */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            disabled={!editMode}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Email - always disabled */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email || ""}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>

        {/* Avatar URL */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={profile.avatar || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* District */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">District</label>
          <input
            type="text"
            name="district"
            value={profile.district || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Upazila */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={profile.upazila || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Blood Group */}
        <div className="mb-3">
          <label className="block mb-1 font-semibold">Blood Group</label>
          <select
            name="bloodGroup"
            value={profile.bloodGroup || ""}
            onChange={handleChange}
            disabled={!editMode}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Save button only in edit mode */}
        {editMode && (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
