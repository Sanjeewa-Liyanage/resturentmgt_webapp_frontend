import "./login.css";
import { useState } from "react";
import axios from "axios";


export default function Login() {  
const[email , setEmail] = useState("");
const[password , setPassword] = useState("");


function handleLogin() {
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
        email: email,
        password: password,
    })
    .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);

        const userType = res.data.user.type; 
        console.log("User type:", userType);

        if (userType === "admin") {
            console.log("Redirecting to admin page...");
            window.location.href = "/admin";
        } else {
            console.log("Redirecting to home page...");
            window.location.href = "/";
        }
    })
    .catch((err) => {
        console.error("Login error:", err);
    });
}



    return(
        <div className="w-full h-[100vh]  pic-bg flex justify-center items-center">
            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center ">
                <h1 className="text-4xl text-center text-white p-[15px] absolute top-[40px]">Login</h1>
                <input type="text" placeholder="Enter your email address " className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" defaultValue={email}
                onChange={(e)=>{
                    setEmail(e.target.value);

                }}/>
                <input type="password" placeholder="Enter your password" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] " defaultValue={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                 
                <button className="w-[80%]  text-white h-[50px] absolute bottom-[40px]"style={{ backgroundColor: "#4EA8E6" }}
                onClick={handleLogin}>Login</button>

                <p className="text-white absolute bottom-[10px]">Don't have an account? <a href="/register" className="text-[#4EA8E6]">Register</a></p>
            </div>
        </div>
    )
}