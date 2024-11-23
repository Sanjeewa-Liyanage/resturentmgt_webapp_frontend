import React from "react";
import uploadimg from "../../../utils/imgupload";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import { useState } from "react";

export default function AddGallery() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [images, setimages] = useState([]);

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login";
    }

    const handleImageChange = (e) => {
        setimages(e.target.files);

    }

    async function handleAddGallery(e) {
        e.preventDefault();
    
        if (images.length === 0) {
            alert("Please upload at least one photo for the gallery.");
            return;
        }
    
        try {
            const imageUrls = [];
            for (let i = 0; i < images.length; i++) {
                const snapshot = await uploadimg(images[i]);
                const url = await getDownloadURL(snapshot.ref);
                imageUrls.push(url);
            }
    
            const newGallery = {
                name:title,
                description,
                image: imageUrls, // Array of strings (URLs)
            };
    
            console.log("Payload being sent:", newGallery); // Debug log
    
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/gallery",
                newGallery,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log(response.data);
            alert("Gallery added successfully");
        } catch (error) {
            console.error("Error adding gallery:", error);
            alert("An error occurred while adding the gallery.",error);
        }
    }
    
    return(
        <div className="container mx-auto mt-10 p-5">
            <form onSubmit={handleAddGallery}>
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
                    Add Gallery
                </button>
            </form>
        </div>
    );

}