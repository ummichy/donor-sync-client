import React, { useContext } from "react";
import { Link, NavLink } from "react-router"; // ✅ fixed to "react-router-dom"
import { AuthContext } from "../Provider/AuthProvider";
import { FaHeartbeat } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { toast } from "react-toastify";
import Dashboard from "../Pages/Dashboard";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}>
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}>
          Blog
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/funding-links" className={({ isActive }) => isActive ? "text-blue-600 font-semibold" : ""}>
            Funding
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">

        {/* Logo & Brand Name on the Left */}
        <div>
          <Link to="/" className="text-2xl font-bold flex items-center gap-1 text-red-600">
            <FaHeartbeat className="text-red-600" />
            BloodBridge
          </Link>
        </div>

        {/* Navigation and Profile on the Right */}
        <div className="flex items-center gap-4">

          {/* Large Screen Nav */}
          <ul className="menu menu-horizontal hidden md:flex gap-3">
            {navLinks}
          </ul>

          {/* Avatar & Dropdown (Medium and Larger Devices Only) */}
          {user && (
            <div className="dropdown dropdown-end hidden md:block">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <img className="w-10 rounded-full" src={user.photoURL || "/default-avatar.png"} alt="avatar" />
              </div>
              <ul tabIndex={0} className="mt-3 z-[2] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                <li className="text-center text-sm font-semibold">{user.displayName}</li>
                <li>
                  <NavLink to="/dashboard" className="flex items-center gap-2">
                    <Dashboard /> Dashboard
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}

          {/* Login Button */}
          {!user && (
            <Link to="/login" className="btn btn-sm btn-neutral hidden md:flex">
              Login
            </Link>
          )}

          {/* Mobile dropdown menu */}
          <div className="dropdown dropdown-end md:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
              {user && (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
              {!user && (
                <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
