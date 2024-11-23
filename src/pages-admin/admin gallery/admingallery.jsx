import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules"; // Update this line
import "swiper/swiper-bundle.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGallery() {
    const [gallery, setGallery] = useState([]);
    const navigate = useNavigate();

    // Fetch gallery items
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
            .then((res) => {
                console.log("Gallery items:", res.data.list);
                setGallery(res.data.list);
            })
            .catch((error) => {
                console.error("Error fetching gallery:", error);
                alert("Failed to fetch gallery items.");
            });
    }, []);

    // Handle navigation to add gallery page
    const handleAddGallery = () => {
        navigate("add-gallery");
    };

    // Handle delete gallery item
    const handleDelete = (id) => {
        const token = localStorage.getItem("token"); // Retrieve the token
        console.log("Token:", token); // Ensure the token is present
    
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;
    
        axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                alert("Gallery item deleted successfully.");
                setGallery((prev) => prev.filter((item) => item._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting gallery item:", error);
                alert(error.response?.data?.message || "Failed to delete gallery item.");
            });
    };
    

    return (
        <div className="w-full p-5">
            <h1 className="text-2xl font-bold text-center mb-5 text-[#334E68]">
                Admin Gallery
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {gallery.map((item) => (
                    <div
                        key={item._id}
                        className="border rounded-lg shadow-md overflow-hidden bg-white"
                    >
                        {/* Swiper Slideshow for Images */}
                        <div className="w-full h-64">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                spaceBetween={10}
                                slidesPerView={1}
                                className="h-full"
                            >
                                {item.image.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`${item.name} - ${index + 1}`}
                                            className="w-full h-64 object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                {item.name}
                            </h2>
                            <p className="text-gray-600 mt-2">{item.description}</p>
                            <div className="mt-4 flex justify-end gap-3">
                                <Link
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                    to={"update-gallery/"}
                                    state={item}
                                >
                                    <FaEdit />
                                </Link>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Add Gallery Floating Button */}
            <button
                className="bg-[#7E5BEF] w-[60px] h-[60px] rounded-full text-2xl flex items-center justify-center fixed right-8 bottom-8 shadow-lg"
                onClick={handleAddGallery}
            >
                <FaPlus color="white" />
            </button>
        </div>
    );
}
