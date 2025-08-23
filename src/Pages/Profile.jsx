import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    district: "",
    upazila: "",
    bloodGroup: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    fetch(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          avatar: data.avatar || "",
          district: data.district || "",
          upazila: data.upazila || "",
          bloodGroup: data.bloodGroup || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  const handleChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    fetch(`https://assignment-no-twelve-server.vercel.app/users/${formData.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then(() => {
        setIsEditing(false);
        alert("Profile updated successfully");
      })
      .catch((err) => {
        console.error(err);
        alert("Update failed");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-[#5C0000] font-semibold text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
      {/* Accent bar on left */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#5C0000] rounded-l-3xl" />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <h2 className="text-3xl font-extrabold text-[#5C0000] tracking-wide">
          My Profile
        </h2>
        {!isEditing ? (
          <button
            onClick={handleEditClick}
            className="bg-[#5C0000] text-white px-5 py-2 rounded-full shadow-lg hover:bg-[#430000] transition"
          >
            Edit
          </button>
        ) : (
          <button
            onClick={handleSaveClick}
            className="bg-green-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            Save
          </button>
        )}
      </div>

      <form className="space-y-6 relative z-10">
        {/* Avatar section */}
        <div className="flex items-center space-x-6">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#5C0000]"
          />
          {isEditing && (
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
            />
          )}
        </div>

        {/* Input fields */}
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email (not editable)", name: "email", type: "email", disabled: true },
          { label: "Blood Group", name: "bloodGroup", type: "select", options: ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
          { label: "District", name: "district", type: "text" },
          { label: "Upazila", name: "upazila", type: "text" },
        ].map(({ label, name, type, disabled = false, options }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block mb-2 font-semibold text-[#5C0000]"
            >
              {label}
            </label>

            {type === "select" ? (
              <select
                id={name}
                name={name}
                value={formData[name]}
                disabled={!isEditing || disabled}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#5C0000] ${
                  !isEditing || disabled
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                }`}
              >
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || "Select Blood Group"}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                disabled={!isEditing || disabled}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#5C0000] ${
                  !isEditing || disabled
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white"
                }`}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default Profile;
