import React, { useState } from "react";
import { MediaSupabase, supabase } from "../../../utils/imgupload2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export function UpdateRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState(location.state.roomId || "");
  const [category, setCategory] = useState(location.state.category || "");
  const [maxGuest, setMaxGuest] = useState(location.state.maxGuest || "");
  const [available, setAvailable] = useState(location.state.available || false);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState(
    location.state.specialDescription || ""
  );
  const [notes, setNotes] = useState(location.state.notes || "");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handlePhotoChange = (e) => {
    setPhotos(e.target.files);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrls = photos.length
        ? await Promise.all(
            [...photos].map(async (file) => {
              const { data: uploadData, error: uploadError } = await MediaSupabase(file);

              if (uploadError) {
                console.error("Upload failed:", uploadError);
                throw uploadError;
              }

              const filePath = uploadData?.path || file.name;
              const { data: publicUrlData, error: publicUrlError } = supabase.storage
                .from("images")
                .getPublicUrl(filePath);

              if (publicUrlError) {
                console.error("Error fetching public URL:", publicUrlError);
                throw publicUrlError;
              }

              return publicUrlData?.publicUrl;
            })
          )
        : location.state.photos;

      const updatedRoom = {
        roomId,
        category,
        maxGuest: parseInt(maxGuest, 10),
        available: available === "true" || available === true,
        photos: imageUrls,
        specialDescription,
        notes,
      };

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Room updated successfully:", response.data);
      alert("Room updated successfully");
      setLoading(false);
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Error updating room:", error);
      alert("An error occurred while updating the room.");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5">
      <h1 className="text-2xl font-bold mb-5">Update Room</h1>
      <form onSubmit={handleUpdateRoom}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-gray-700">
              Room ID
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              disabled
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="maxGuest" className="block text-sm font-medium text-gray-700">
              Maximum Guests
            </label>
            <input
              type="number"
              id="maxGuest"
              name="maxGuest"
              value={maxGuest}
              onChange={(e) => setMaxGuest(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="available" className="block text-sm font-medium text-gray-700">
              Available
            </label>
            <select
              id="available"
              name="available"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
              Photos
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              onChange={handlePhotoChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              multiple
            />
          </div>
          <div>
            <label htmlFor="specialDescription" className="block text-sm font-medium text-gray-700">
              Special Description
            </label>
            <textarea
              id="specialDescription"
              name="specialDescription"
              value={specialDescription}
              onChange={(e) => setSpecialDescription(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 bg-blue-500 text-white p-2 block w-full rounded-md"
          disabled={loading}
        >
          {loading ? "Updating Room..." : "Update Room"}
        </button>
      </form>
    </div>
  );
}
