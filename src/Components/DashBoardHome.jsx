// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../provider/AuthProvider";
// import SpecificDonorReq from "./SpecificDonorReq";
// import TotalUser from "./TotalUser";

// const DashboardHome = () => {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState("");

  

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
//         .then((res) => {
//           setRole(res.data?.role || "");
//         })
//         .catch((err) => {
//           console.error("Error fetching user role:", err);
//         });
//     }
//   }, [user]);

//   const renderRoleBadge = () => {
//     if (role === "donor") {
//       return (
//         <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
//           Donor
//         </span>
//       );
//     } else if (role === "volunteer") {
//       return (
//         <span className="inline-block px-4 py-1 rounded-full  text-blue-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
//           Volunteer
//         </span>
//       );
//     } else if (role === "admin") {
//       return (
//         <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
//           Admin
//         </span>
//       );
//     } else {
//       return null;
//     }
//   };

//   return (
//     <div className="min-h-screen  flex items-center justify-center px-4 py-10">
//       <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl flex flex-col p-10 hover:shadow-[#5C0000]/40 transition-shadow duration-300">
//         {/* Left accent bar */}
//         <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl bg-[#5C0000]" />

//         <h1 className="text-4xl font-extrabold text-[#5C0000] mb-4 z-10 relative">
//           Welcome{user?.displayName ? `, ${user.displayName}` : ""}!
//         </h1>
//         <p className="text-gray-700 text-xl mb-8 z-10 relative flex items-center gap-3">
//           You're logged in as a {renderRoleBadge()}. Thank you for your{" "}
//           {role === "donor"
//             ? "donations!"
//             : role === "volunteer"
//             ? "dedicated work!"
//             : role === "admin"
//             ? "administration efforts!"
//             : ""}
//         </p>

//         {/* Render components conditionally */}
//         <div className="z-10 relative">
//           {role === "donor" && <SpecificDonorReq />}
//           {(role === "admin" || role === "volunteer") && <TotalUser />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
 
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import SpecificDonorReq from "./SpecificDonorReq";
import TotalUser from "./TotalUser";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [totalFund, setTotalFund] = useState(0); // ✅ totalFund state

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

  // ✅ total fund fetching useEffect
  useEffect(() => {
    axios
      .get("https://assignment-no-twelve-server.vercel.app/fundings/total") // 🛠️ Replace with your actual endpoint
      .then((res) => setTotalFund(res.data.total))
      .catch((err) => console.error("Error fetching total fund:", err));
  }, []);

  const renderRoleBadge = () => {
    if (role === "donor") {
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
          Donor
        </span>
      );
    } else if (role === "volunteer") {
      return (
        <span className="inline-block px-4 py-1 rounded-full  text-blue-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
          Volunteer
        </span>
      );
    } else if (role === "admin") {
      return (
        <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold shadow-sm transition-transform transform hover:scale-105">
          Admin
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-10">
      <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl flex flex-col p-10 hover:shadow-[#5C0000]/40 transition-shadow duration-300">
        {/* Left accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl bg-[#5C0000]" />

        <h1 className="text-4xl font-extrabold text-[#5C0000] mb-4 z-10 relative">
          Welcome{user?.displayName ? `, ${user.displayName}` : ""}!
        </h1>
        <p className="text-gray-700 text-xl mb-2 z-10 relative flex items-center gap-3">
          You're logged in as a {renderRoleBadge()}. Thank you for your{" "}
          {role === "donor"
            ? "donations!"
            : role === "volunteer"
            ? "dedicated work!"
            : role === "admin"
            ? "administration efforts!"
            : ""}
        </p>

        {/* ✅ Optional display of total fund (if needed) */}
        <p className="text-gray-600 text-lg mb-6 z-10 relative">
          Total Fund Raised: <span className="font-bold text-[#5C0000]">{totalFund} ৳</span>
        </p>

        {/* Render components conditionally */}
        <div className="z-10 relative">
          {role === "donor" && <SpecificDonorReq />}
          {(role === "admin" || role === "volunteer") && <TotalUser />}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
