


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";

const CreateDonationReq = () => {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [userStatus, setUserStatus] = useState("loading");

  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospital: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/district.json").then((res) => res.json()).then(setDistricts);
    fetch("/upazila.json").then((res) => res.json()).then(setUpazilas);
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter((u) => u.district_id === selectedDistrictId);
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilas]);

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setUserStatus(res.data?.status || "unknown");
        })
        .catch(() => setUserStatus("error"));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDistrictChange = (e) => {
    const id = e.target.value;
    setSelectedDistrictId(id);
    const districtName = districts.find((d) => d.id == id)?.name || "";
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      upazila: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userStatus !== "active") {
      alert("You are blocked from submitting donation requests.");
      return;
    }

    const donationRequest = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      ...formData,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:3000/donations", donationRequest);
      if (res.data.insertedId || res.data.acknowledged) {
        alert("Donation request submitted!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit request.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Create Donation Request</h2>

      {userStatus !== "active" && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          You are blocked. You cannot create a donation request.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-6"
      >
        {/* Requester Info */}
        <div>
          <label className="font-medium">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input"
          />
        </div>

        <div>
          <label className="font-medium">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        {/* District & Upazila */}
        <div>
          <label className="font-medium">Recipient District</label>
          <select
            onChange={handleDistrictChange}
            required
            className="input"
            defaultValue=""
          >
            <option value="" disabled>Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Recipient Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="" disabled>Select Upazila</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.name}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="font-medium">Hospital Name</label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="font-medium">Full Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="input"
          >
            <option value="" disabled>Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div>
          <label className="font-medium">Donation Date</label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        <div>
          <label className="font-medium">Donation Time</label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            required
            className="input"
          />
        </div>

        {/* Message */}
        <div>
          <label className="font-medium">Request Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="input h-28 resize-none"
            placeholder="Why do you need blood?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={userStatus !== "active"}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default CreateDonationReq;





