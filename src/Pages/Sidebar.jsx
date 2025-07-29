// src/components/Sidebar.jsx
import { NavLink } from "react-router";
import { MdDashboard, MdBloodtype } from "react-icons/md";
import { FaUser, FaPlus } from "react-icons/fa";
import DashboardHome from "./DashboardHome";

const Sidebar = () => {
  return (
    <div className="w-64 bg-red-600 text-white min-h-screen pt-32">
      <h2 className="text-2xl font-bold mb-8">Donor Dashboard</h2>
      <ul className="space-y-4">
        <li><NavLink to="/dashboard"><DashboardHome /> Dashboard</NavLink></li>
        <li><NavLink to="/dashboard/profile"><FaUser /> Profile</NavLink></li>
        <li><NavLink to="/dashboard/my-donation-requests"><MdBloodtype /> My Donation Requests</NavLink></li>
        <li><NavLink to="/dashboard/create-donation-request"><FaPlus /> Create Request</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
