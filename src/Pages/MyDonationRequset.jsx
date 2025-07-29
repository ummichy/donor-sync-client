import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const PAGE_SIZE = 5;

const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch user's donation requests from backend
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/donations/user/${user.email}`)
      .then((res) => {
        setRequests(res.data);
        setFilteredRequests(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch donation requests:", err);
      });
  }, [user]);

  // Filter requests by status
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(
        requests.filter(
          (req) => req.status.toLowerCase() === statusFilter.toLowerCase()
        )
      );
    }
    setCurrentPage(1); // Reset to first page when filter changes
  }, [statusFilter, requests]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredRequests.length / PAGE_SIZE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">My Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label htmlFor="statusFilter" className="font-medium text-gray-700">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-3 py-2 text-left text-sm font-semibold">Recipient</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">District</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Blood Group</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Date</th>
              <th className="px-3 py-2 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedRequests.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No donation requests found.
                </td>
              </tr>
            ) : (
              paginatedRequests.map((req) => (
                <tr key={req._id}>
                  <td className="px-3 py-2 whitespace-nowrap">{req.recipientName}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{req.district}</td>
                  <td className="px-3 py-2 whitespace-nowrap font-semibold">{req.bloodGroup}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(req.donationDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-3 py-2 whitespace-nowrap font-semibold capitalize ${
                      req.status === "pending"
                        ? "text-yellow-600"
                        : req.status === "inprogress"
                        ? "text-blue-600"
                        : req.status === "done"
                        ? "text-green-600"
                        : req.status === "canceled"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {req.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 rounded border border-indigo-600 text-indigo-600 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "border-indigo-600 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 rounded border border-indigo-600 text-indigo-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;
