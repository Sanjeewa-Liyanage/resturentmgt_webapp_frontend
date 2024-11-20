import axios from "axios";
import React, { useState } from "react";

export default function AddRoom() {

    const token = localStorage.getItem("token");
    const [roomId, setRoomId] = useState('');
    const [category, setCategory] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [available, setAvailable] = useState(false); // State for checkbox
    const [photos, setPhotos] = useState('');
    const [specialDescription, setSpecialDescription] = useState('');
    const [notes, setNotes] = useState('');

    function handleAddRoom() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/rooms/", {
            roomId: roomId,
            category: category,
            maxGuests: maxGuests,
            available: available, // Use the state value
            photos: photos,
            specialDescription: specialDescription,
            notes: notes,
        }, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
        }).then((res) => {
            console.log(res.data);
            alert("Room added successfully");
        });
    }

    return (
        <div className="w-full h-[100vh] pic-bg flex justify-center items-center">
            <div className="w-[600px] h-[600px] backdrop-blur-md rounded-lg flex flex-col items-center relative justify-center">
                <h1 className="text-4xl text-center text-white p-[15px] absolute top-[10px]">Add Room</h1>
                <input type="text" value={roomId} onChange={(e) => setRoomId(e.target.value)} className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mt-[60px] mb-[20px]" placeholder="Room ID" />
                
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
                    placeholder="Category"
                />
                <input
                    type="text"
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[60px]"
                    placeholder="Max Guests"
                />
                {/* Checkbox */}
                <div className="absolute left-[60px] top-[285px] flex items-center">
                    <label htmlFor="available" className="block text-sm font-medium text-white mr-2">Available</label>
                    <input
                        type="checkbox"
                        id="available"
                        name="available"
                        checked={available}
                        onChange={(e) => setAvailable(e.target.checked)}
                        className="h-5 w-5"
                    />
                </div>
                <input
                    type="text"
                    value={photos}
                    onChange={(e) => setPhotos(e.target.value)}
                    className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
                    placeholder="Photos URL"
                />
                <input
                    type="text"
                    value={specialDescription}
                    onChange={(e) => setSpecialDescription(e.target.value)}
                    className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
                    placeholder="Special Description"
                />
                <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-[80%] bg-[#00000000] border-[2px] text-white placeholder:text-white h-[50px] px-[5px] mb-[20px]"
                    placeholder="Notes"
                />
                <button
                    onClick={handleAddRoom}
                    className="w-[80%] bg-blue-500 text-white h-[50px] rounded-md">
                    Add Room
                </button>
            </div>
        </div>
    );
}
