
import { NavLink } from "react-router";
import { FaUser, FaHome, FaPlusCircle, FaListAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg pt-20">
        <div className="p-4 text-center border-b">
          <h2 className="text-xl font-bold text-red-600">Dashboard</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <NavLink to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaHome /> Home
          </NavLink>
          <NavLink to="/dashboard/profile" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaUser /> Profile
          </NavLink>
          <NavLink to="/dashboard/create-donation-request" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaPlusCircle /> Create Request
          </NavLink>
          <NavLink to="/dashboard/my-donation-requests" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaListAlt /> My Requests
          </NavLink>
        </nav>
      </aside>

    
    </div>
  );
};

export default DashboardLayout;
