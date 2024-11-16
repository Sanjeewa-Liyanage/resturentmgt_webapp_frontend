import React, { useState } from 'react'

export default function TestComponent() {
    //hooks
    //you cant add hook into if else or loop and need to be from the top to the bottom
    const [num, setNum] = useState(0);
    return (
        <div className="bg-red-900 w-full h-[100vh] flex justify-center items-center">
            <div className="bg-white w-[350px] h-[350px] flex justify-center items-center">
                <button className="w-[60px] h-[60px] bg-blue-800 rounded-full text-2xl text-white text-center" onClick={()=>{
                    
                    setNum(num-1);
                    console.log(num);
                }}>-</button>
                <span className="text-6xl mx-4">{num}</span>
                <button className="w-[60px] h-[60px] bg-blue-800 rounded-full text-2xl text-white text-center" onClick={()=>{
                    setNum(num+1);  
                    console.log(num);

                }}>+</button>

            </div>
        </div>
    )
}