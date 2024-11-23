import React, { useState } from "react";
import uploadimg from "../../../utils/imgupload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function UpdateGallery() {
    const location = useLocation();
    const [title, setTitle] = useState(location.state.name);
    const [description, setDescription] = useState(location.state.description);
    const [images, setImages] = useState([]);
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    async function handleUpdateGallery(e) {
        e.preventDefault();

        try {
            // If no new images, use the existing image(s)
            const imageUrls = images.length
                ? await Promise.all(
                      [...images].map(async (file) => {
                          const snapshot = await uploadimg(file);
                          return await getDownloadURL(snapshot.ref);
                      })
                  )
                : location.state.image; // Existing image

            const newGallery = {
                name: title,
                description,
                image: imageUrls,
            };

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${encodeURIComponent(location.state.name)}`,
                newGallery,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);
            alert("Gallery updated successfully");
        } catch (error) {
            console.error("Error updating gallery:", error);
            alert("An error occurred while updating the gallery.");
        }
    }

    return (
        <div className="container mx-auto mt-10 p-5">
            <form onSubmit={handleUpdateGallery}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-gray-400 p-2 block w-full mt-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border-2 border-gray-400 p-2 block w-full mt-2"
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="border-2 border-gray-400 p-2 block w-full mt-2"
                    multiple
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 block w-full mt-2"
                >
                    Update Gallery
                </button>
            </form>
        </div>
    );
}
