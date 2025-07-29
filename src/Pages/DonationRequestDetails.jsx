import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/http://localhost:3000/donation-requests/${id}`)
      .then(res => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load donation request:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (!request) {
    return <div className="text-center py-6 text-red-500">Donation request not found.</div>;
  }

  const {
    recipientName,
    bloodGroup,
    recipientDistrict,
    recipientUpazila,
    hospitalName,
    fullAddress,
    donationDate,
    donationTime,
    requesterName,
    requesterEmail,
    requestMessage,
    status
  } = request;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>
      
      <div className="mb-4">
        <strong>Recipient Name:</strong> {recipientName}
      </div>
      <div className="mb-4">
        <strong>Blood Group:</strong> {bloodGroup}
      </div>
      <div className="mb-4">
        <strong>Location:</strong> {recipientDistrict}, {recipientUpazila}
      </div>
      <div className="mb-4">
        <strong>Hospital:</strong> {hospitalName}
      </div>
      <div className="mb-4">
        <strong>Full Address:</strong> {fullAddress}
      </div>
      <div className="mb-4">
        <strong>Donation Date:</strong> {donationDate}
      </div>
      <div className="mb-4">
        <strong>Donation Time:</strong> {donationTime}
      </div>
      <div className="mb-4">
        <strong>Requester Name:</strong> {requesterName}
      </div>
      <div className="mb-4">
        <strong>Requester Email:</strong> {requesterEmail}
      </div>
      <div className="mb-4">
        <strong>Message:</strong> {requestMessage}
      </div>
      <div className="mb-4">
        <strong>Status:</strong>{" "}
        <span className="capitalize px-2 py-1 rounded bg-gray-200 inline-block">
          {status}
        </span>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
