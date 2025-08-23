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
      axios.get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
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
      const res = await axios.post("https://assignment-no-twelve-server.vercel.app/donations", donationRequest);
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
    <div className="max-w-2xl mx-auto px-6 py-8 sm:px-8 lg:px-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-[#5C0000] text-center mb-8">
        Create Donation Request
      </h2>

      {userStatus !== "active" && (
        <div className="bg-[#fee2e2] border border-[#fca5a5] text-[#5C0000] px-5 py-4 rounded-md mb-6 text-center font-semibold shadow-sm">
          You are blocked. You cannot create a donation request.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        autoComplete="off"
      >
        {/** Readonly fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Requester Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 text-gray-700 bg-gray-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Requester Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 text-gray-700 bg-gray-50 cursor-not-allowed"
            />
          </div>
        </div>

        {/** Editable fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Recipient Name</label>
            <input
              type="text"
              name="recipientName"
              value={formData.recipientName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#5C0000] font-semibold mb-2">Recipient District</label>
              <select
                onChange={handleDistrictChange}
                required
                className="w-full rounded-md border border-[#5C0000] px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[#5C0000] font-semibold mb-2">Recipient Upazila</label>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#5C0000] px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Hospital Name</label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
            />
          </div>

          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Full Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
            />
          </div>

          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-[#5C0000] px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
            >
              <option value="" disabled>
                Select Blood Group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#5C0000] font-semibold mb-2">Donation Date</label>
              <input
                type="date"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#5C0000] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
              />
            </div>

            <div>
              <label className="block text-[#5C0000] font-semibold mb-2">Donation Time</label>
              <input
                type="time"
                name="donationTime"
                value={formData.donationTime}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-[#5C0000] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5C0000] font-semibold mb-2">Request Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Why do you need blood?"
              className="w-full rounded-md border border-[#5C0000] px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#5C0000]"
              rows={5}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={userStatus !== "active"}
          className="w-full bg-[#5C0000] hover:bg-[#4a0000] disabled:opacity-50 text-white font-semibold py-3 rounded-lg shadow-lg transition-colors"
        >
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default CreateDonationReq;
