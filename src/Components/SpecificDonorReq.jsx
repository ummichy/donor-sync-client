



// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../provider/AuthProvider";
// import { useNavigate } from "react-router";

// const SpecificDonorReq = () => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleteId, setDeleteId] = useState(null); // For delete confirmation modal
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`http://localhost:3000/donations/myrequests/${user.email}`)
//         .then((res) => {
//           setRequests(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError("Failed to load donation requests");
//           setLoading(false);
//           console.error(err);
//         });
//     }
//   }, [user]);

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.put(`http://localhost:3000/donations/${id}/status`, {
//         status: newStatus,
//       });
//       // Update locally
//       setRequests((prev) =>
//         prev.map((req) =>
//           req._id === id ? { ...req, status: newStatus } : req
//         )
//       );
//     } catch (err) {
//       alert("Failed to update status");
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       await axios.delete(`http://localhost:3000/donations/${deleteId}`);
//       setRequests((prev) => prev.filter((req) => req._id !== deleteId));
//       setDeleteId(null);
//     } catch (err) {
//       alert("Failed to delete request");
//       console.error(err);
//     }
//   };

//   if (loading) return <p>Loading your recent donation requests...</p>;
//   if (error) return <p className="text-red-600">{error}</p>;
//   if (!requests.length) return null; // hide if none

//   return (
//     <div className="max-w-5xl mx-auto my-8 px-4">
//       <h3 className="text-xl font-semibold mb-4 text-indigo-700">
//         Your 3 Most Recent Donation Requests
//       </h3>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-md shadow">
//           <thead className="bg-indigo-100">
//             <tr>
//               <th className="py-2 px-3 text-left border-b">Recipient Name</th>
//               <th className="py-2 px-3 text-left border-b">Location</th>
//               <th className="py-2 px-3 text-left border-b">Donation Date</th>
//               <th className="py-2 px-3 text-left border-b">Donation Time</th>
//               <th className="py-2 px-3 text-left border-b">Blood Group</th>
//               <th className="py-2 px-3 text-left border-b">Status</th>
//               <th className="py-2 px-3 text-left border-b">Donor Info</th>
//               <th className="py-2 px-3 text-center border-b">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {requests.map((req) => (
//               <tr key={req._id} className="border-b hover:bg-gray-50">
//                 <td className="py-2 px-3">{req.recipientName}</td>
//                 <td className="py-2 px-3">{`${req.district}, ${req.upazila}`}</td>
//                 <td className="py-2 px-3">{req.donationDate}</td>
//                 <td className="py-2 px-3">{req.donationTime}</td>
//                 <td className="py-2 px-3 font-semibold">{req.bloodGroup}</td>
//                 <td className="py-2 px-3 capitalize">{req.status}</td>

//                 <td className="py-2 px-3">
//                   {req.status === "inprogress" ? (
//                     <>
//                       <div>{req.requesterName}</div>
//                       <div className="text-sm text-gray-600">{req.requesterEmail}</div>
//                     </>
//                   ) : (
//                     "-"
//                   )}
//                 </td>

//                 <td className="py-2 px-3 text-center space-x-1">
//                   <button
//                     onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
//                     className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => setDeleteId(req._id)}
//                     className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
//                   >
//                     Delete
//                   </button>

//                   <button
//                     onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
//                   >
//                     View
//                   </button>

//                   {req.status === "inprogress" && (
//                     <>
//                       <button
//                         onClick={() => handleStatusChange(req._id, "done")}
//                         className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm mt-1 block"
//                       >
//                         Done
//                       </button>
//                       <button
//                         onClick={() => handleStatusChange(req._id, "canceled")}
//                         className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm mt-1 block"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* View all requests button */}
//       <div className="mt-6 text-center">
//         <button
//           onClick={() => navigate("/dashboard/all-requests")}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           View My All Requests
//         </button>
//       </div>

//       {/* Delete confirmation modal */}
//       {deleteId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full">
//             <h4 className="text-lg font-semibold mb-4">Confirm Delete</h4>
//             <p className="mb-4">Are you sure you want to delete this donation request?</p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 onClick={() => setDeleteId(null)}
//                 className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpecificDonorReq;

















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
    if (user?.email) {
      axios
        .get(`http://localhost:3000/donations/user/${user.email}`)
        .then((res) => {
          const recent = res.data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);
          setRequests(recent);
        })
        .catch((err) => console.error("Error fetching donations:", err));
    }
  }, [user]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/donations/${deleteId}`);
      setRequests((prev) => prev.filter((req) => req._id !== deleteId));
      setShowModal(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(`http://localhost:3000/donations/${id}`, { status });
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (!requests.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">Recent Donation Requests</h3>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="px-3 py-2 text-left">Recipient</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Blood</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Donor Info</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="border-t">
                <td className="px-3 py-2">{req.recipientName}</td>
                <td className="px-3 py-2">{req.district}, {req.upazila}</td>
                <td className="px-3 py-2">{new Date(req.donationDate).toLocaleDateString()}</td>
                <td className="px-3 py-2">{req.donationTime}</td>
                <td className="px-3 py-2 font-semibold">{req.bloodGroup}</td>
                <td className={`px-3 py-2 capitalize font-medium ${
                  req.status === 'pending' ? 'text-yellow-600' :
                  req.status === 'inprogress' ? 'text-blue-600' :
                  req.status === 'done' ? 'text-green-600' :
                  req.status === 'canceled' ? 'text-red-600' : ''
                }`}>
                  {req.status}
                </td>
                <td className="px-3 py-2">
                  {req.status === "inprogress" && req.donorName ? (
                    <>
                      <p className="font-medium">{req.donorName}</p>
                      <p className="text-xs text-gray-500">{req.donorEmail}</p>
                    </>
                  ) : (
                    "--"
                  )}
                </td>
                <td className="px-3 py-2 space-y-1 flex flex-col">
                  <button
                    onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(req._id);
                      setShowModal(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  {req.status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "done")}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, "canceled")}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded"
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
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/dashboard/my-donations")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          View My All Requests
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this donation request?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
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

