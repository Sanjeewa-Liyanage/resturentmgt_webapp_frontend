import React, { useState } from "react";
import { MediaSupabase,supabase } from "../../../utils/imgupload2";
import axios from "axios";

export default function AddRoom() {
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [available, setAvailable] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (photos.length === 0) {
      alert("Please upload at least one photo for the room.");
      setLoading(false);
      return;
    }

    try {
      // Upload images to Supabase and get their URLs
      const imageUrls = [];
      for (let i = 0; i < photos.length; i++) {
        const file = photos[i];
        const { data: uploadData, error: uploadError } = await MediaSupabase(file);

        if (uploadError) {
          console.error("Upload failed:", uploadError);
          continue;
        }
        console.log("Upload successful:", uploadData);

        // Retrieve the public URL
        const filePath = uploadData?.path || file.name;
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from("images")
          .getPublicUrl(filePath);

        if (publicUrlError) {
          console.error("Error fetching public URL:", publicUrlError);
          continue;
        }
        console.log("Public URL:", publicUrlData?.publicUrl);
        imageUrls.push(publicUrlData?.publicUrl);
      }

      // Prepare room data
      const newRoom = {
        roomId,
        category,
        maxGuests: parseInt(maxGuests),
        available,
        photos: imageUrls, // Array of image URLs
        specialDescription,
        notes,
      };

      // Save room details to the backend
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/rooms",
        newRoom,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Room added successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Error adding room:", error);
      alert("An error occurred while adding the room.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold text-center mb-5">Add Room</h1>
      <form
        onSubmit={handleAddRoom}
        className="max-w-lg mx-auto bg-white p-6 rounded shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="roomId" className="block font-medium text-gray-700 mb-2">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Room ID"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Category"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxGuests" className="block font-medium text-gray-700 mb-2">
            Maximum Guests
          </label>
          <input
            type="number"
            id="maxGuests"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Max Guests"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Available</label>
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="h-5 w-5"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photos" className="block font-medium text-gray-700 mb-2">
            Upload Photos (Select multiple)
          </label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border border-gray-300 p-2 rounded"
            multiple
          />
        </div>
        <div className="mb-4">
          <label htmlFor="specialDescription" className="block font-medium text-gray-700 mb-2">
            Special Description
          </label>
          <textarea
            id="specialDescription"
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Special Description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="notes" className="block font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Enter Notes"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 flex justify-center"
        >
          {loading ? (
            <div className="border-t-2 border-white w-[20px] h-[20px] rounded-full animate-spin"></div>
          ) : (
            "Add Room"
          )}
        </button>
      </form>
    </div>
  );
}
