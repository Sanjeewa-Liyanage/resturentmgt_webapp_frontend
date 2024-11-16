import "./login.css";
export default function Login() {  
    return(
        <div className="w-full h-[100vh]  pic-bg flex justify-center items-center">
            <div className="w-[400px] h-[400px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center ">
                <h1 className="text-4xl text-center text-white p-[15px] absolute top-[40px]">Login</h1>
                <input type="text" placeholder="Enter your email address " className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"/>
                <input type="password" placeholder="Enter your password" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] "/>
                <button className="w-[80%]  text-white h-[50px] absolute bottom-[40px]"style={{ backgroundColor: "#4EA8E6" }}>Login</button>
            </div>
        </div>
    )
}