

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import districts from "../../public/district.json";
// import upazilas from "../../public/upazila.json";
// import { AuthContext } from "../provider/AuthProvider";

// const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// const SearchDonor = () => {
//   const { user } = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     bloodGroup: "",
//     district: "",
//     upazila: ""
//   });

//   const [donors, setDonors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searched, setSearched] = useState(false);
//   const [currentUserStatus, setCurrentUserStatus] = useState("");

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
//         .then((res) => {
//           setCurrentUserStatus(res.data?.status || "");
//         })
//         .catch((err) => {
//           console.error("Error fetching user status:", err);
//         });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSearched(true);
//     try {
//       const res = await axios.get("https://assignment-no-twelve-server.vercel.app/users", {
//         params: formData
//       });
//       const filtered = res.data.filter(
//         (user) =>
//           // user.role === "donor" &&
//           user.status === "pending" &&
//           user.bloodGroup === formData.bloodGroup &&
//           user.district === formData.district &&
//           user.upazila === formData.upazila
//       );
//       setDonors(filtered);
//     } catch (err) {
//       console.error("Search error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (currentUserStatus !== "active") {
//     return (
//       <div className="p-4 max-w-3xl mx-auto">
//         <h2 className="text-2xl font-bold text-red-600 text-center">
//           Your account is not active. Please contact the admin.
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Search Blood Donors</h2>

//       <form
//         onSubmit={handleSearch}
//         className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
//       >
//         <select
//           name="bloodGroup"
//           value={formData.bloodGroup}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded"
//           required
//         >
//           <option value="">Select Blood Group</option>
//           {bloodGroups.map((bg) => (
//             <option key={bg} value={bg}>
//               {bg}
//             </option>
//           ))}
//         </select>

//         <select
//           name="district"
//           value={formData.district}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded"
//           required
//         >
//           <option value="">Select District</option>
//           {districts.map((district) => (
//             <option key={district.id} value={district.name}>
//               {district.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="upazila"
//           value={formData.upazila}
//           onChange={handleChange}
//           className="border px-3 py-2 rounded"
//           required
//         >
//           <option value="">Select Upazila</option>
//           {upazilas.map((u) => (
//             <option key={u.id} value={u.name}>
//               {u.name}
//             </option>
//           ))}
//         </select>

//         <button
//           type="submit"
//           className="md:col-span-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Search
//         </button>
//       </form>

//       {loading && <p className="text-center">Loading...</p>}

//       {!loading && searched && donors.length === 0 && (
//         <p className="text-center text-gray-600">No donors found.</p>
//       )}

//       {!loading && donors.length > 0 && (
//         <div className="grid gap-4 md:grid-cols-2">
//           {donors.map((donor) => (
//             <div
//               key={donor._id}
//               className="border p-4 rounded shadow-sm bg-white"
//             >
//               <h3 className="text-lg font-semibold">
//                 {donor.name || "Unnamed Donor"}
//               </h3>
//               <p>Blood Group: {donor.bloodGroup}</p>
//               <p>Location: {donor.district}, {donor.upazila}</p>
//               <p>Email: {donor.email}</p>
//               <p>Phone: {donor.phone || "N/A"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchDonor;


import React, { useState } from "react";
import axios from "axios";
import districts from "../../public/district.json";
import upazilas from "../../public/upazila.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const SearchDonor = () => {
  const [formData, setFormData] = useState({
    bloodGroup: "",
    district: "",
    upazila: ""
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get("https://assignment-no-twelve-server.vercel.app/donations", {
        params: {
          bloodGroup: formData.bloodGroup,
          district: formData.district,
          upazila: formData.upazila
        }
      });
      const filtered = res.data.filter(req => req.status === "pending");
      setResults(filtered);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Search Blood Donation Requests</h2>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          value={formData.upazila}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="md:col-span-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {!loading && searched && results.length === 0 && (
        <p className="text-center text-gray-500">No matching donation requests found.</p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((donation) => (
            <div key={donation._id} className="p-4 border rounded bg-white shadow-sm">
              <h3 className="font-semibold text-lg">{donation.recipientName}</h3>
              <p><strong>Blood Group:</strong> {donation.bloodGroup}</p>
              <p><strong>Hospital:</strong> {donation.hospitalName}</p>
              <p><strong>District:</strong> {donation.district}</p>
              <p><strong>Upazila:</strong> {donation.upazila}</p>
              <p><strong>Date:</strong> {donation.date}</p>
              <p><strong>Time:</strong> {donation.time}</p>
              <p><strong>Message:</strong> {donation.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDonor;
