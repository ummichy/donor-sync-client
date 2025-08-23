import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get("https://assignment-no-twelve-server.vercel.app/users").then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.status === filter));
    }
    setCurrentPage(1);
  }, [filter, users]);

  const updateUser = async (email, updateObj) => {
    await axios.put(`https://assignment-no-twelve-server.vercel.app/users/${email}`, updateObj);
    const updated = users.map((user) =>
      user.email === email ? { ...user, ...updateObj } : user
    );
    setUsers(updated);
  };

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-[#5C0000] tracking-wide">
        All Users
      </h2>

      <div className="mb-6 flex flex-wrap gap-3">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-white font-semibold transition
              ${
                filter === status
                  ? "bg-[#5C0000] shadow-lg"
                  : "bg-[#5C0000]/70 hover:bg-[#5C0000]/90"
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full table-auto">
          <thead className="bg-[#5C0000]/10 text-[#5C0000]">
            <tr>
              {["Avatar", "Email", "Name", "Role", "Status", "Actions"].map(
                (head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left font-semibold tracking-wide select-none"
                  >
                    {head}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-[#5C0000]/10 transition-colors"
              >
                <td className="px-6 py-3">
                  <img
                    src={
                      user?.photoURL?.startsWith("http")
                        ? user.photoURL
                        : "https://via.placeholder.com/40"
                    }
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-3 text-sm font-medium text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-3 text-sm">{user.name || "N/A"}</td>
                <td className="px-6 py-3 text-sm font-semibold text-[#5C0000]">
                  {user.role}
                </td>
                <td
                  className={`px-6 py-3 font-semibold text-sm ${
                    user.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user.status}
                </td>
                <td className="px-6 py-3 space-x-2 flex flex-wrap">
                  {user.status === "active" && (
                    <button
                      onClick={() => updateUser(user.email, { status: "blocked" })}
                      className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                      title="Block User"
                    >
                      Block
                    </button>
                  )}
                  {user.status === "blocked" && (
                    <button
                      onClick={() => updateUser(user.email, { status: "active" })}
                      className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                      title="Unblock User"
                    >
                      Unblock
                    </button>
                  )}
                  {user.role !== "volunteer" && (
                    <button
                      onClick={() => updateUser(user.email, { role: "volunteer" })}
                      className="px-3 py-1 rounded-full bg-[#5C0000] text-white text-xs font-semibold hover:bg-[#5c3a3a] transition"
                      title="Make Volunteer"
                    >
                      Volunteer
                    </button>
                  )}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => updateUser(user.email, { role: "admin" })}
                      className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition"
                      title="Make Admin"
                    >
                      Admin
                    </button>
                  )}
                  {user.role !== "donor" && (
                    <button
                      onClick={() => updateUser(user.email, { role: "donor" })}
                      className="px-3 py-1 rounded-full bg-yellow-600 text-white text-xs font-semibold hover:bg-yellow-700 transition"
                      title="Make Donor"
                    >
                      Donor
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {currentUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full font-semibold transition
              ${
                currentPage === i + 1
                  ? "bg-[#5C0000] text-white shadow-lg"
                  : "bg-[#5C0000]/60 text-white hover:bg-[#5C0000]/80"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
