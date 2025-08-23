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

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`https://assignment-no-twelve-server.vercel.app/donations/user/${user.email}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setRequests(res.data);
        setFilteredRequests(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch donation requests:", err);
      });
  }, [user]);

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
    setCurrentPage(1);
  }, [statusFilter, requests]);

  const totalPages = Math.ceil(filteredRequests.length / PAGE_SIZE);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-extrabold mb-6 text-[#5C0000] text-center">
        My Donation Requests
      </h2>

      {/* Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <label
          htmlFor="statusFilter"
          className="font-semibold text-gray-800"
        >
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border border-[#5C0000] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5C0000] text-gray-700"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#5C0000] shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#5C0000] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                Recipient
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                District
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                Blood Group
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {paginatedRequests.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  No donation requests found.
                </td>
              </tr>
            ) : (
              paginatedRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-[#f4ebe9] transition-colors duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">
                    {req.recipientName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {req.district}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold text-[#5C0000]">
                    {req.bloodGroup}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {new Date(req.donationDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`px-4 py-3 whitespace-nowrap font-semibold capitalize ${
                      req.status === "pending"
                        ? "text-yellow-600"
                        : req.status === "inprogress"
                        ? "text-blue-600"
                        : req.status === "done"
                        ? "text-green-600"
                        : req.status === "canceled"
                        ? "text-[#5C0000]"
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded border border-[#5C0000] text-[#5C0000] disabled:opacity-50 hover:bg-[#5C0000] hover:text-white transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded border text-sm font-semibold transition ${
                currentPage === i + 1
                  ? "bg-[#5C0000] text-white border-[#5C0000]"
                  : "border-[#5C0000] text-[#5C0000] hover:bg-[#f2e8e7]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded border border-[#5C0000] text-[#5C0000] disabled:opacity-50 hover:bg-[#5C0000] hover:text-white transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;
