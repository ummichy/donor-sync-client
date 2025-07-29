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
      .get(`http://localhost:3000/donations/${id}`)
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
      .put(`http://localhost:3000/donations/${id}`, {
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!donation) return <div className="p-6">Donation not found</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded shadow mt-16">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-semibold text-red-700 mb-6">
        Donation Request Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700">Requester Name:</h3>
          <p>{donation.requesterName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Recipient Name:</h3>
          <p>{donation.recipientName}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">District:</h3>
          <p>{donation.district}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Upazila:</h3>
          <p>{donation.upazila}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Donation Date:</h3>
          <p>{new Date(donation.donationDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Donation Time:</h3>
          <p>{donation.donationTime}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Blood Group:</h3>
          <p>{donation.bloodGroup}</p>
        </div>
        <div className="sm:col-span-2">
          <h3 className="font-semibold text-gray-700">Message:</h3>
          <p>{donation.message || "No additional message"}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700">Status:</h3>
          <p
            className={`capitalize font-medium ${
              donation.status === "pending"
                ? "text-yellow-600"
                : donation.status === "inprogress"
                ? "text-blue-600"
                : donation.status === "done"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {donation.status}
          </p>
        </div>
      </div>

      {donation.status === "pending" && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Donate
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[95%] sm:w-[400px]">
            <h3 className="text-xl font-semibold mb-4 text-center">Confirm Donation</h3>
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                Donor Name
              </label>
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-1">
                Donor Email
              </label>
              <input
                type="text"
                readOnly
                value={user?.email || ""}
                className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDonateConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodReqDetails;
