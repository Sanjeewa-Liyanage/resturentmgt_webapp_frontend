import { useEffect } from "react";
import { useUser } from "../../auth/user.context";
import axios from "axios";

function UserTags() {
  const { userName, setUserName, userImage, setUserImage } = useUser();

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
          const name = `${res.data.user.firstname} ${res.data.user.lastname}`;
          const image = res.data.user.image;
          console.log("User data:", name, image);
          setUserName(name);
          setUserImage(image);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      setUserName("Guest");
      setUserImage(null);
    }
  }, [setUserName, setUserImage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName("Guest");
    setUserImage(null);
  };

  return (
    <div className="flex items-center space-x-4 cursor-pointer ml-auto">
      {/* User Image */}
      {userImage ? (
        <img
          className="rounded-full w-10 h-10 border-2 border-white object-cover shadow-md"
          src={userImage}
          alt="User Avatar"
        />
      ) : (
        <div className="rounded-full w-10 h-10 border-2 border-gray-300 bg-gray-100 flex items-center justify-center">
          <span className="text-white">?</span>
        </div>
      )}

      {/* User Name */}
      <span className="text-white text-lg font-medium">{userName}</span>

      {/* Login/Logout Button */}
      {userName !== "Guest" ? (
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

export default UserTags;