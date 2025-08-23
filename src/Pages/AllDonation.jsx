import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider"; // adjust path as needed

const AllDonation = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role || "");
        })
        .catch((err) => {
          console.error("Error fetching user role:", err);
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get("https://assignment-no-twelve-server.vercel.app/donations/all")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this request?");
    if (!confirm) return;

    try {
      await axios.delete(`https://assignment-no-twelve-server.vercel.app/donations/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-[#5C0000] font-semibold tracking-wide">
        Loading...
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-[#5C0000] tracking-wide">
        All Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No donation requests found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
          <table className="min-w-full table-auto">
            <thead className="bg-[#5C0000]/10 text-[#5C0000]">
              <tr>
                {[
                  "Recipient",
                  "Location",
                  "Date/Time",
                  "Blood Group",
                  "Status",
                  "Requested By",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left font-semibold tracking-wide select-none text-sm"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-t hover:bg-[#5C0000]/10 transition-colors text-sm"
                >
                  <td className="px-6 py-3">{req.recipientName}</td>
                  <td className="px-6 py-3">
                    {req.district}, {req.upazila}
                  </td>
                  <td className="px-6 py-3">
                    {req.date} at {req.time}
                  </td>
                  <td className="px-6 py-3 font-bold">{req.bloodGroup}</td>
                  <td className="px-6 py-3 capitalize">{req.status}</td>
                  <td className="px-6 py-3">{req.requesterName || "N/A"}</td>
                  <td className="px-6 py-3 space-x-2 flex flex-wrap gap-2">
                    <Link to={`/dashboard/edit-donation/${req._id}`}>
                      <button
                        className="px-3 py-1 rounded-full bg-[#5C0000] text-white text-xs font-semibold hover:bg-[#450000] transition"
                        title="Edit Request"
                      >
                        Edit
                      </button>
                    </Link>
                    {role !== "volunteer" && (
                      <>
                        <button
                          className="px-3 py-1 rounded-full bg-[#5C0000] text-white text-xs font-semibold hover:bg-[#450000] transition"
                          onClick={() => handleDelete(req._id)}
                          title="Delete Request"
                        >
                          Delete
                        </button>
                        <Link to={`/dashboard/donation-details/${req._id}`}>
                          <button
                            className="px-3 py-1 rounded-full bg-[#5C0000] text-white text-xs font-semibold hover:bg-[#450000] transition"
                            title="View Details"
                          >
                            Details
                          </button>
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No donation requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDonation;
