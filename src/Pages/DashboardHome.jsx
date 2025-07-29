import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";  
import axios from "axios";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`/api/donation-requests?requesterEmail=${user.email}&limit=3`)
        .then((res) => {
          const data = res.data;
          if (Array.isArray(data)) {
            setRequests(data);
          } else if (data.requests && Array.isArray(data.requests)) {
            setRequests(data.requests);
          } else {
            setRequests([]);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch requests:", err);
          setRequests([]);
        });
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios
        .delete(`/api/donation-requests/${id}`)
        .then(() => {
          setRequests((prev) => prev.filter((req) => req._id !== id));
        })
        .catch(() => alert("Failed to delete request"));
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName}</h1>

      {!Array.isArray(requests) || requests.length === 0 ? (
        <p>You have no recent donation requests.</p>
      ) : (
        <>
          <h2 className="text-xl mb-4">Your 3 Recent Donation Requests</h2>
          <table className="table-auto border-collapse w-full mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Recipient</th>
                <th className="border px-2 py-1">Location</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Time</th>
                <th className="border px-2 py-1">Blood Group</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Donor Info</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="border px-2 py-1">{req.recipientName}</td>
                  <td className="border px-2 py-1">
                    {req.recipientDistrict}, {req.recipientUpazila}
                  </td>
                  <td className="border px-2 py-1">{req.donationDate}</td>
                  <td className="border px-2 py-1">{req.donationTime}</td>
                  <td className="border px-2 py-1">{req.bloodGroup}</td>
                  <td className="border px-2 py-1">{req.status}</td>
                  <td className="border px-2 py-1">
                    {req.status === "inprogress" ? (
                      <>
                        <div>{user.displayName}</div>
                        <div>{user.email}</div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="border px-2 py-1 space-x-1">
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="bg-green-500 px-2 py-1 text-white rounded"
                          onClick={() => alert("Mark as done - implement later")}
                        >
                          Done
                        </button>
                        <button
                          className="bg-red-500 px-2 py-1 text-white rounded"
                          onClick={() => alert("Mark as canceled - implement later")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <Link
                      to={`/dashboard/donation-request/${req._id}/edit`}
                      className="bg-yellow-400 px-2 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="bg-gray-500 px-2 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/dashboard/donation-request/${req._id}`}
                      className="bg-blue-500 px-2 py-1 rounded text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to="/dashboard/my-donation-requests"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded"
          >
            View All My Requests
          </Link>
        </>
      )}
    </div>
  );
};

export default DashboardHome;
