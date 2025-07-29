
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const EditDonor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing data
  useEffect(() => {
    axios
      .get(`http://localhost:3000/donations/${id}`)
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donation:", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData) return;

    // Remove _id before sending update
    const { _id, ...updateData } = formData;

    axios
      .put(`http://localhost:3000/donations/${id}`, updateData)
      .then(() => {
        alert("Donation request updated successfully");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Update failed", err);
        alert("Failed to update");
      });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!formData) return <div className="p-4">Donation not found</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Edit Donation Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName || ""}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="district"
          value={formData.district || ""}
          onChange={handleChange}
          placeholder="District"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="upazila"
          value={formData.upazila || ""}
          onChange={handleChange}
          placeholder="Upazila"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="date"
          name="donationDate"
          value={formData.donationDate?.split("T")[0] || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="time"
          name="donationTime"
          value={formData.donationTime || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <select
          name="bloodGroup"
          value={formData.bloodGroup || ""}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A−</option>
          <option value="B+">B+</option>
          <option value="B-">B−</option>
          <option value="O+">O+</option>
          <option value="O-">O−</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB−</option>
        </select>
        <textarea
          name="message"
          value={formData.message || ""}
          onChange={handleChange}
          placeholder="Additional Message"
          className="w-full border px-3 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Update Request
        </button>
      </form>
    </div>
  );
};

export default EditDonor;
