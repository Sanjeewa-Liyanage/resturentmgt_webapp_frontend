import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    

    function handleRegister(){
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/", {
            email: email,
            password: password,
            lastname: lastName,
            firstname: firstName,
            whatsApp: whatsappNumber,
            phone: phoneNumber,
            type: "customer",
            emailVerified: false,
            disabled: false,
        })
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            window.location.href = "/login";
        })
        .catch((err) => {
            console.error("Register error:", err);
        });
    };
    

    return (
        <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
            <div className="w-[600px] h-[600px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center">
                <h1 className="text-4xl text-center text-white p-[15px] absolute top-[10px]">Register</h1>
                <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
                <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="first name"
                    onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="last name"
                    onChange={(e) => setLastName(e.target.value)} />
                <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="WhatsApp number"
                    onChange={(e) => setWhatsappNumber(e.target.value)} />
                <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)} />
                <button onClick={handleRegister} className="w-[80%] bg-blue-500 text-white h-[50px] rounded-md">Register</button>
            </div>
        </div>
    );
}

export default Register;