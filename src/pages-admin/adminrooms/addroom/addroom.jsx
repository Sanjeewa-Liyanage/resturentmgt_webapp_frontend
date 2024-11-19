export default function AddRoom() {
    return(
        <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
        <div className="w-[600px] h-[600px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center">
            <h1 className="text-4xl text-center text-white p-[15px] absolute top-[10px]">Add Room</h1>
            <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="Category" />
            <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[60px]" placeholder="Max Guests" />
            
            {/* Move checkbox to the left corner */}
            <div className="absolute left-[60px] top-[220px] flex items-center">
                <label htmlFor="available" className="block text-sm font-medium text-white mr-2">Available</label>
                <input
                    type="checkbox"
                    id="available"
                    name="available"
                    className="h-5 w-5"
                />
            </div>

            <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="Photos URL" />
            <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="Special Description" />
            <input type="text" className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]" placeholder="Notes" />
            <button  className="w-[80%] bg-blue-500 text-white h-[50px] rounded-md">Add Room</button>
        </div>
    </div>  
    )
}
