import React, { useState } from "react";
import uploadimg from "../../utils/imgupload";  // Assume this handles the image upload to Firebase
import { getDownloadURL } from "firebase/storage";
import axios from "axios";

export default function AddCategory() {
  const [name, setname] = useState("");
  const [price, setprice] = useState(0);
  const [features, setfeatures] = useState("");
  const [description, setdescription] = useState("");
  const [images, setimages] = useState([]); // Store multiple images
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const handleImageChange = (e) => {
    setimages(Array.from(e.target.files)); // Convert FileList to array
  };

  const HandleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      setloading(false);
      return;
    }

    try {
      const imageUrls = [];  // Array to hold URLs of uploaded images

      // Upload images one by one and collect their URLs
      for (let i = 0; i < images.length; i++) {
        const snapshot = await uploadimg(images[i]);  // uploadimg should return a snapshot
        const url = await getDownloadURL(snapshot.ref);  // Get download URL from Firebase
        imageUrls.push(url);  // Push URL into the array
      }

      const featureArray = features.split(",").map((f) => f.trim());
      const newCategory = {
        name: name,
        price: parseFloat(price),
        features: featureArray,
        description,
        image: imageUrls,  // Send array of image URLs
      };

      // Make the API request to create the new category
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/category", newCategory, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      setloading(false);
      alert("Category added successfully!");

    } catch (error) {
      console.error("Error handling form submission:", error);
      setloading(false);
      alert("An error occurred while uploading the images.");
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Add Category</h1>
      <form onSubmit={HandleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700 mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter category name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter price"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="features" className="block font-medium text-gray-700 mb-2">
            Features (comma-separated)
          </label>
          <input
            type="text"
            id="features"
            value={features}
            onChange={(e) => setfeatures(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter features, separated by commas"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium text-gray-700 mb-2">
            Upload Images
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 flex justify-center"
        >
          {loading ? (
            <div className="border-t-2 border-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span>Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
