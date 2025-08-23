import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const BloodDonationReq = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://assignment-no-twelve-server.vercel.app/donations/all")
      .then((res) => {
        const pending = res.data.filter(
          (req) => req.status.toLowerCase() === "pending"
        );
        setPendingRequests(pending);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch donations:", err);
        setLoading(false);
      });
  }, []);

  const handleViewClick = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/blood-req-d/${id}`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading pending requests...</div>;
  }

  if (pendingRequests.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No pending donation requests at the moment.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-36">
      <h2 className="text-2xl font-bold mb-8 text-[#5C0000] text-center">
        Pending Blood Donation Requests
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {pendingRequests.map((req) => (
          <div
            key={req._id}
            className="border border-[#e6d9cd] rounded-xl p-6 shadow-md bg-white hover:shadow-xl transition"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg text-[#5C0000]">
                {req.recipientName}
              </p>
              <p className="text-sm text-gray-700">
                📍 {req.district}, {req.upazila}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                Blood Group:{" "}
                <span className="text-[#5C0000] font-bold">
                  {req.bloodGroup}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                🗓 {new Date(req.donationDate).toLocaleDateString()} at{" "}
                {req.donationTime}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => handleViewClick(req._id)}
                className="inline-block bg-[#5C0000] hover:bg-[#4a0000] text-white px-4 py-2 rounded-md transition font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationReq;
