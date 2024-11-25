import axios from "axios";
import { useEffect, useState } from "react";

function UserTag() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
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
          setImage(res.data.user.image);
          console.log("User data:", res.data.user);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      setName("Guest");
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="flex items-center space-x-4 cursor-pointer ml-auto">
      {/* User Image */}
      {token && image ? (
        <img
          className="rounded-full w-10 h-10 border-2 border-white object-cover shadow-md"
          src={image}
          alt="User Avatar"
        />
      ) : (
        <div className="rounded-full w-10 h-10 border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
          <span className="text-white">?</span>
        </div>
      )}

      {/* User Name */}
      <span className="text-white text-lg font-medium">{name}</span>

      {/* Login/Logout Button */}
      {token ? (
        <button
          className="flex items-center justify-center text-red-500 hover:text-red-600 rounded-full shadow-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          className="flex items-center justify-center text-blue-500 hover:text-blue-600 rounded-full shadow-lg"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default UserTag;
