import "./login.css";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user)); // Save user details

        const userType = res.data.user.type;
        if (userType === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        if (err.response && err.response.status === 403) {
          toast.error("User disabled, please contact support");
        } else if(err.response && err.response.status === 401) {
          toast.error("Password is incorrect");
        }else{
          toast.error("An error occurred, please try again");
        }
      });
  }

  return (
    <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
       <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center ">
       
        <h1 className="text-4xl text-center text-white p-[15px] absolute top-[40px]">
          Login
        </h1>
        <input
          type="text"
          placeholder="Enter your email address"
          className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px]"
          defaultValue={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="w-[80%] text-white h-[50px] absolute bottom-[40px]"
          style={{ backgroundColor: "#4EA8E6" }}
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-white absolute bottom-[10px]">
          Don't have an account?{" "}
          <a href="/register" className="text-[#4EA8E6]">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
