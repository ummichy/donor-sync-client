
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FaHome, FaUser, FaPlusCircle, FaListUl } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white p-4 hidden md:block">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-3">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : ""
              }
            >
              <FaHome className="inline-block mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : ""
              }
            >
              <FaUser className="inline-block mr-2" /> Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-donation-requests"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : ""
              }
            >
              <FaListUl className="inline-block mr-2" /> My Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-donation-request"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : ""
              }
            >
              <FaPlusCircle className="inline-block mr-2" /> Create Request
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar Toggle (Optional) */}
      <div className="md:hidden bg-red-600 text-white p-4">
        <details>
          <summary className="text-lg font-bold">Menu</summary>
          <ul className="space-y-2 mt-4">
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/dashboard/profile">Profile</Link></li>
            <li><Link to="/dashboard/my-donation-requests">My Requests</Link></li>
            <li><Link to="/dashboard/create-donation-request">Create Request</Link></li>
          </ul>
        </details>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
