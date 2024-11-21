import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props){
    const [name, setName] = useState("");
    const [userFound, setUserFound] = useState(false);

   
    //use effect function
    useEffect(
        () => {
            const token = localStorage.getItem("token");  
        if(token != null){
        console.log("Token:", token);
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
        .then((res) => {
            console.log("User data:", res.data);
            setName(res.data.user.firstname + " " + res.data.user.lastname);
            setUserFound(true);
        })
        .catch((err) => {
            console.error("User data error:", err);
        });
        
            
    }else{
        setName("guest");
    }
        },[userFound
            //dependencies array not sensitive to json objects
        ]
    )

   
    return(
        <div className="absolute right-0 flex  items-center cursor-pointer mr-2">
            <img className="rounded-full w-[75px] h-[75px]" src={props.image} alt="Avatar" />
            <span className="text-black ml-[5px] text-xl ">{name}</span>
            <button className=""onClick={()=>{
                localStorage.removeItem("token");
                setUserFound(false);

            }}>logout</button>
        </div>
    )
}

export default UserTag;