import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

export default function CategoryDetails() {
  const location = useLocation();
  const [name, setName] = useState(location.state?.name || ""); // Get category name from state
  const [category, setCategory] = useState(null); // Category data
  const [rooms, setRooms] = useState([]); // List of available rooms
  const [error, setError] = useState(null); // Handle errors
  const [mainImage, setMainImage] = useState(""); // State for the prioritized (main) image

  useEffect(() => {
    if (!name) {
      setError("Category name is missing.");
      return;
    }

    // Fetch category details
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/category/${name}`)
      .then((res) => {
        const fetchedCategory = res.data.category;
        setCategory(fetchedCategory);
        setMainImage(fetchedCategory.image?.[0] || "/default-category.jpg"); // Set the first image as the default main image
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
        setError("Failed to load category details. Please try again later.");
      });

    // Fetch available rooms for the category
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/availableRooms?category=${name}`)
      .then((res) => {
        setRooms(res.data.rooms);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setError("Failed to load available rooms. Please try again later.");
      });
  }, [name]);

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading category details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header with Category Name */}
      <h1 className="text-3xl font-bold text-center mb-6">{category.name}</h1>

      {/* Image Gallery */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Main Image */}
        <div className="md:w-1/2">
          <img
            src={mainImage}
            alt={category.name}
            className="w-full h-auto rounded-lg"
          />
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 mt-4">
            {category.image?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-lg border ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)} // Update the main image when clicked
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <p className="text-gray-700 text-lg">{category.description || "No description available."}</p>
          {category.price && (
            <p className="mt-4 text-2xl font-bold text-green-500">
              Price: ${category.price.toFixed(2)}
            </p>
          )}

          {/* Specifications */}
          {category.specifications && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Specifications:</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                {Object.entries(category.specifications).map(([key, value], index) => (
                  <li key={index}>
                    <span className="font-semibold">{key}: </span>
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-4">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Details */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        {category.features && category.features.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {category.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No additional details available.</p>
        )}
      </div>

      {/* Available Rooms */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div key={room._id} className="border rounded-lg p-4 shadow">
                <img
                  src={room.photos?.[0] || "/default-room.jpg"}
                  alt={room.category}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-xl font-bold mt-2">{room.category}</h3>
                <p className="text-gray-700">{room.roomId}</p>
                <p className="text-gray-700">Max Guests: {room.maxGuest}</p>
                <p className="text-green-500 font-semibold">Available</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No rooms available for this category.</p>
        )}
      </div>
    </div>
  );
}
