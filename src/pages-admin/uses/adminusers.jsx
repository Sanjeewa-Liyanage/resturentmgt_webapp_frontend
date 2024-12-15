import React, { useEffect, useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import axios from "axios";
import Loader2 from "../../components/loader/loader";

export default function AdminUsers() {
  const [bannedUsers, setBannedUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/banned`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setBannedUsers(res.data.users || []);
      })
      .catch((error) => {
        console.error("Error fetching banned users:", error);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/active`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setActiveUsers(res.data.users || []);
      })
      .catch((error) => {
        console.error("Error fetching active users:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const banUser = (userId) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/disable/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchUsers(); // Refresh tables after banning
      })
      .catch((error) => {
        console.error("Error banning user:", error);
      });
  };

  const unbanUser = (userId) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/enable/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchUsers(); // Refresh tables after unbanning
      })
      .catch((error) => {
        console.error("Error unbanning user:", error);
      });
  };

  if (isLoading) {
    return Loader2();
  }

  return (
    <div className="p-4 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        {bannedUsers.length === 0 && activeUsers.length === 0 ? (
          <p className="text-center text-gray-500">No users to display.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#334e68]">
                <th className="border border-gray-300 px-4 py-2 text-white">#</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bannedUsers.map((user, index) => (
                <tr key={user.userId} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-red-500">Banned</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="text-gray-500 px-2 py-1 rounded"
                      onClick={() => unbanUser(user.userId)}
                    >
                      <FaUnlock className="hover:text-[#7e5bef]" />
                    </button>
                  </td>
                </tr>
              ))}
              {activeUsers.map((user, index) => (
                <tr key={user.userId} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">
                    {bannedUsers.length + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  <td className="border border-gray-300 px-4 py-2 text-green-500">Active</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="text-gray-500 px-2 py-1 rounded"
                      onClick={() => banUser(user.userId)}
                    >
                      <FaLock className="hover:text-[#7e5bef]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
}
