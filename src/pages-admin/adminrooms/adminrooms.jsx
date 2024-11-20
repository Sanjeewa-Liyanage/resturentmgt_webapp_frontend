
import React from "react";
import { useNavigate } from "react-router-dom";
export default function AdminRooms() {
    const navigate = useNavigate();

    const handleAddRoomClick = () => {
        // Navigate to the Add Room page
        navigate("/addrooms");
    };
    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Rooms Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Add Room Card */}
                <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold mb-4 text-blue-600">Add Room</h2>
                    <p className="text-gray-600 mb-4">Add a new room to the system with all necessary details.</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" 
                    onClick={handleAddRoomClick}
                    >
                        Add Room
                    </button>
                </div>

                {/* Update Room Card */}
                <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold mb-4 text-green-600">Update Room</h2>
                    <p className="text-gray-600 mb-4">Modify the details of an existing room.</p>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Update Room
                    </button>
                </div>

                {/* Delete & Disable Room Card */}
                <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
                    <h2 className="text-lg font-semibold mb-4 text-red-600">Delete & Disable Room</h2>
                    <p className="text-gray-600 mb-4">Remove a room or disable its availability.</p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                        Delete/Disable Room
                    </button>
                </div>
            </div>
        </div>
    );
}
