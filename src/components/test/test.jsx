import React, { useState } from 'react'

import uploadimg from '../../utils/imgupload'

export default function TestComponent() {
    const [file, setFile] = useState(null);
    //hooks
    //you cant add hook into if else or loop and need to be from the top to the bottom
uploadimg();
    return (
        <div className="bg-white w-full h-[100vh] flex justify-center items-center">
           <input type="file" className="" defaultValue={file} onChange={(e)=>{
            setFile(e.target.files[0]);

           }} />

           <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
           onClick={()=>{
                uploadimg(file);
           }}
           >
                Upload
           </button>
        </div>
    )
}