import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router"; 
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
        .get(`https://assignment-no-twelve-server.vercel.app/users/${user.email}`)
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
      ? [
          { name: "Create Donation Request", path: "/dashboard/create-donation-request" },
          { name: "My Donation Requests", path: "/dashboard/my-donations" }
        ]
      : []),
    ...(userRole === "admin"
      ? [
          { name: "All Users", path: "/dashboard/all-users" },
          { name: "All Donations", path: "/dashboard/all-donations" },
          { name: "Content Management", path: "/dashboard/content-management" }
        ]
      : []),
    ...(userRole === "volunteer"
      ? [
          { name: "All Donations", path: "/dashboard/all-donations" },
          { name: "Content Management", path: "/dashboard/content-management" }
        ]
      : []),
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <button className="btn border border-[#5C0000] text-[#5C0000] px-4 py-2 rounded-2xl font-semibold hover:bg-[#5C0000] hover:text-white transition-colors">
                Home
              </button>
            </NavLink>
            <h2 className="text-xl font-bold text-[#5C0000]">Dashboard</h2>
          </div>
          <button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col px-5 py-6 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-colors
                ${
                  isActive
                    ? "bg-[#5C0000] text-white"
                    : "text-[#5C0000] hover:bg-[#F3E6E6]"
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
          className="fixed inset-0 bg-black opacity-20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <header className="md:hidden flex items-center justify-between bg-white shadow px-5 py-3 border-b border-gray-200">
          <button
            className="text-[#5C0000] focus:outline-none"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu size={28} />
          </button>
          <h1 className="text-lg font-semibold text-[#5C0000]">Dashboard</h1>
          <div />
        </header>

        <main className="flex-1 overflow-auto p-6 bg-white rounded-md shadow-sm mx-4 md:mx-6 my-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
