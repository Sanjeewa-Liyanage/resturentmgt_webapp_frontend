import axios from "axios";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

function UserTags(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setName(`${res.data.user.firstname} ${res.data.user.lastname}`);
          setUserFound(true);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      setName("Guest");
    }
  }, [userFound]);

  return (
    <div className="flex items-center space-x-4 cursor-pointer">
      {/* User Image */}
      <img
        className="rounded-full w-10 h-10 border-2 border-white object-cover shadow-md"
        src={props.image}
        alt="User Avatar"
      />

      {/* User Name */}
      <span className="text-[#334E68]  text-lg font-medium">{name}</span>

      {/* Logout Button */}
      <button
        className="flex items-center justify-center w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full shadow-lg"
        onClick={() => {
          localStorage.removeItem("token");
          setUserFound(false);
          window.location.href = "/login"; // Redirect to login on logout
        }}
      >
        <FaSignOutAlt size={18} color="white" />
      </button>
    </div>
  );
}

export default UserTags;
