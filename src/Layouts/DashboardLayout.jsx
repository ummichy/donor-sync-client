// // src/Layouts/DashboardLayout.jsx
// import React, { useState } from "react";
// import { NavLink, Outlet } from "react-router";
// import { Menu, X } from "lucide-react";

// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navItems = [
//     { name: "Dashboard Home", path: "/dashboard" },
//     { name: "Profile", path: "/dashboard/profile" },
//     // Add other dashboard links here
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
//         md:relative md:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between px-4 py-4 border-b">
//           <h2 className="text-xl font-bold text-indigo-600">Dashboard</h2>
//           <button
//             className="md:hidden text-gray-600 focus:outline-none"
//             onClick={() => setSidebarOpen(false)}
//           >
//             <X size={24} />
//           </button>
//         </div>
//         <nav className="flex flex-col px-4 py-6 space-y-2">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={({ isActive }) =>
//                 `block px-3 py-2 rounded-md font-medium ${
//                   isActive
//                     ? "bg-indigo-600 text-white"
//                     : "text-gray-700 hover:bg-indigo-200"
//                 }`
//               }
//               onClick={() => setSidebarOpen(false)} // close sidebar on mobile when clicking link
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       {/* Overlay for mobile sidebar */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black opacity-25 z-20 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Mobile top bar */}
//         <header className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
//           <button
//             className="text-gray-700 focus:outline-none"
//             onClick={() => setSidebarOpen(true)}
//           >

//             <Menu size={28} />
//           </button>
//           <h1 className="text-lg font-semibold text-indigo-600">Dashboard</h1>
//           <div /> {/* placeholder for spacing */}
//         </header>

//         {/* Page content */}
//         <main className="flex-1 overflow-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router"; // ✅ Use react-router-dom
import { Menu, X } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setUserRole(res.data?.role);
        })
        .catch((err) => {
          console.error("Failed to fetch user role", err);
        });
    }
  }, [user?.email]);

  const navItems = [
    { name: "Dashboard Home", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    ...(userRole === "donor"
      ? [{ name: "Create Donation Request", path: "/dashboard/create-donation-request" },
      { name: "My Donation Requests", path: "/dashboard/my-donations" }
      ]
      : []),
    ...(userRole === "admin"
      ? [{ name: "All Users", path: "/dashboard/all-users" },
      { name: "All Donations", path: "/dashboard/all-donations" },
      { name: "Content Management", path: "/dashboard/content-management" },


      ]
      : []),
    ...(userRole === "volunteer"
      ? [
        { name: "All Donations", path: "/dashboard/all-donations" },
        { name: "Content Management", path: "/dashboard/content-management" },


      ]
      : []),
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Dashboard</h2>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md font-medium ${isActive
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-indigo-200"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3">
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>
          <h1 className="text-lg font-semibold text-indigo-600">Dashboard</h1>
          <div />
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;


