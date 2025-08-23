import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

const SpecificDonorReq = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      if (!user?.email) return;
      try {
        const token = await user.getIdToken();
        const res = await axios.get(
          `https://assignment-no-twelve-server.vercel.app/donations/user/${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const recent = res.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3);
        setRequests(recent);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    fetchDonations();
  }, [user]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://assignment-no-twelve-server.vercel.app/donations/${deleteId}`);
      setRequests((prev) => prev.filter((req) => req._id !== deleteId));
      setShowModal(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`https://assignment-no-twelve-server.vercel.app/donations/${id}`, { status });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (!requests.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#5C0000]">
        Recent Donation Requests
      </h3>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
          <thead className="bg-[#5C0000] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Blood</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Donor Info</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">{req.recipientName}</td>
                <td className="px-4 py-3 text-gray-600">{req.district}, {req.upazila}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(req.donationDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-gray-600">{req.donationTime}</td>
                <td className="px-4 py-3 font-semibold text-[#5C0000]">{req.bloodGroup}</td>
                <td className={`px-4 py-3 capitalize font-semibold ${
                  req.status === 'pending' ? 'text-yellow-600' :
                  req.status === 'inprogress' ? 'text-blue-600' :
                  req.status === 'done' ? 'text-green-600' :
                  req.status === 'canceled' ? 'text-red-700' : ''
                }`}>
                  {req.status}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {req.status === "inprogress" && req.donorName ? (
                    <>
                      <p className="font-medium">{req.donorName}</p>
                      <p className="text-xs text-gray-400">{req.donorEmail}</p>
                    </>
                  ) : (
                    "--"
                  )}
                </td>
                <td className="px-4 py-3 flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                    className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setDeleteId(req._id); setShowModal(true); }}
                    className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
                    className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
                  >
                    View
                  </button>
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "done")}
                        className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "canceled")}
                        className="px-3 py-1 rounded bg-gray-400 hover:bg-gray-500 text-white text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/dashboard/my-donations")}
          className="px-6 py-2 rounded bg-[#5C0000] hover:bg-[#450000] text-white font-semibold"
        >
          View All Requests
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-[#5C0000]">Confirm Delete</h2>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this donation request?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded font-medium text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded font-medium text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificDonorReq;
