import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!donation) return <div className="p-6">Donation details not found</div>;

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
                : donation.status === "canceled"
                ? "text-red-600"
                : ""
            }`}
          >
            {donation.status}
          </p>
        </div>

        {donation.status === "inprogress" && donation.donorName && (
          <div className="sm:col-span-2">
            <h3 className="font-semibold text-gray-700">Donor Info:</h3>
            <p className="font-medium">{donation.donorName}</p>
            <p className="text-sm text-gray-600">{donation.donorEmail}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetails;
