import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const BloodReqDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://assignment-no-twelve-server.vercel.app/donations/${id}`)
      .then((res) => {
        setDonation(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donation details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDonateConfirm = () => {
    axios
      .put(`https://assignment-no-twelve-server.vercel.app/donations/${id}`, {
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      })
      .then((res) => {
        setDonation((prev) => ({
          ...prev,
          status: "inprogress",
          donorName: user.displayName,
          donorEmail: user.email,
        }));
        setShowModal(false);
      })
      .catch((err) => {
        console.error("Error updating donation status:", err);
      });
  };

  if (loading) return <div className="p-6 text-center text-gray-600">Loading...</div>;
  if (!donation) return <div className="p-6 text-center text-gray-600">Donation not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 mb-14 mt-20 bg-white rounded-2xl shadow-xl border border-[#e8ddd0]">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-[#5C0000] mb-8 text-center tracking-tight">
        Donation Request Details
      </h2>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
        {[
          ["Requester Name", donation.requesterName],
          ["Recipient Name", donation.recipientName],
          ["District", donation.district],
          ["Upazila", donation.upazila],
          ["Donation Date", new Date(donation.donationDate).toLocaleDateString()],
          ["Donation Time", donation.donationTime],
          ["Blood Group", <span className="font-bold text-[#5C0000]">{donation.bloodGroup}</span>],
        ].map(([label, value], idx) => (
          <div key={idx}>
            <h3 className="font-semibold text-[#5C0000] mb-1">{label}:</h3>
            <p>{value}</p>
          </div>
        ))}

        <div className="sm:col-span-2">
          <h3 className="font-semibold text-[#5C0000] mb-1">Message:</h3>
          <p>{donation.message || "No additional message"}</p>
        </div>

        <div>
          <h3 className="font-semibold text-[#5C0000] mb-1">Status:</h3>
          <p
            className={`capitalize font-semibold px-3 py-1 rounded inline-block
              ${
                donation.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : donation.status === "inprogress"
                  ? "bg-blue-100 text-[#5C0000]"
                  : donation.status === "done"
                  ? "bg-green-100 text-[#5C0000]"
                  : "bg-red-100 text-[#5C0000]"
              }`}
          >
            {donation.status}
          </p>
        </div>
      </div>

      {/* Buttons side by side */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          &larr; Back
        </button>

        {donation.status === "pending" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#5C0000] hover:bg-[#4a0000] text-white font-medium px-6 py-2 rounded-md transition"
          >
            Donate
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 transition-all">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md border border-[#e6d9cd]">
            <h3 className="text-xl font-bold text-center text-[#5C0000] mb-5">
              Confirm Donation
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Name
              </label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Donor Email
              </label>
              <input
                type="text"
                readOnly
                value={user?.email || ""}
                className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDonateConfirm}
                className="px-4 py-2 bg-[#5C0000] text-white rounded hover:bg-[#4a0000] transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodReqDetails;
