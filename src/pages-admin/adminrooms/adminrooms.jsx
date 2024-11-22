import React, { useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [roomsIsLoaded, setRoomsIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!roomsIsLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/rooms")
                .then((res) => {
                    console.log(res.data);
                    setRooms(res.data.rooms);
                    setRoomsIsLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching rooms:", error);
                });
        }
    }, [roomsIsLoaded]);

    const toggleAvailability = (roomId) => {
        const currentRoom = rooms.find((room) => room.roomId === roomId);
        const currentStatus = currentRoom?.available ? "available" : "not available";

        const confirmChange = window.confirm(
            `The room is currently ${currentStatus}. Do you want to change its availability?`
        );

        if (!confirmChange) {
            return;
        }

        const updatedRooms = rooms.map((room) =>
            room.roomId === roomId ? { ...room, available: !room.available } : room
        );
        setRooms(updatedRooms);

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}/available`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to update availability");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Availability updated successfully:", data);
            })
            .catch((error) => {
                console.error("Error updating availability:", error);
                const revertedRooms = rooms.map((room) =>
                    room.roomId === roomId ? { ...room, available: !room.available } : room
                );
                setRooms(revertedRooms);
            });
    };

    function HandlePlus() {
        console.log("Plus button clicked");
        navigate("add-room");
    }

    return (
        <div className="container mx-auto mt-10 p-5">
            <button
                className="bg-[#7E5BEF] w-[60px] h-[60px] rounded-full text-2xl flex items-center justify-center fixed right-8 bottom-8"
                onClick={() => {
                    HandlePlus();
                }}
            >
                <FaPlus color="white" />
            </button>
            <h1 className="text-2xl font-bold text-center mb-5 text-[#334E68]">Room Table</h1>
            <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
                <thead className="bg-[#334E68] text-white">
                    <tr>
                        <th className="border border-gray-300">Room ID</th>
                        <th className="border border-gray-300">Category</th>
                        <th className="border border-gray-300">Max Guest</th>
                        <th className="border border-gray-300">Available</th>
                        <th className="border border-gray-300 w-[150px] items-center justify-center">Photos</th>
                        <th className="border border-gray-300">Special Description</th>
                        <th className="border border-gray-300">Notes</th>
                        <th className="border border-gray-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300">{room.roomId}</td>
                            <td className="border border-gray-300">{room.category}</td>
                            <td className="border border-gray-300">{room.maxGuests}</td>
                            <td className="border border-gray-300 text-center">
                                <button
                                    onClick={() => toggleAvailability(room.roomId)}
                                    className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 ${
                                        room.available ? "bg-green-500" : "bg-red-500"
                                    }`}
                                >
                                    <span
                                        className={`inline-block w-5 h-5 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
                                            room.available ? "translate-x-6" : "translate-x-0"
                                        }`}
                                    ></span>
                                </button>
                            </td>
                            <td className="border border-gray-300 flex flex-col gap-2 items-center justify-centers">
                                {room.photos &&
                                    room.photos.map((photo, photoIndex) => (
                                        <img
                                            key={photoIndex}
                                            src={photo}
                                            alt={`Room ${room.roomId} - ${photoIndex}`}
                                            className="w-16 h-16 object-cover justify-center items-center"
                                        />
                                    ))}
                            </td>
                            <td className="border border-gray-300">{room.specialDescription}</td>
                            <td className="border border-gray-300">{room.notes}</td>
                            <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full items-center justify-center"
                                    onClick={() => {
                                        // Delete handler
                                    }}
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                                <button
                                    className="bg-[#7E5BEF] hover:bg-[#6840ef] text-white font-bold py-2 px-4 rounded-full"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
