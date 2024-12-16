import React, { useState } from "react";
import Navbar from "../navbar/navbar.jsx";

function Header() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [feedback, setFeedback] = useState(null); // For success/error messages

  const handleBooking = async () => {
    // Validate inputs
    const token = localStorage.getItem("token");
    if (!startDate || !endDate || !category) {
      setFeedback({ type: "error", message: "All fields are required." });
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/bookings/create-by-category", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start: startDate,  // Use startDate
          end: endDate,      // Use endDate
          category: category,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setFeedback({ type: "success", message: data.message });
      } else {
        setFeedback({ type: "error", message: data.message || "Booking failed." });
      }
    } catch (error) {
      console.error("Error:", error);
      setFeedback({ type: "error", message: "An unexpected error occurred." });
    }
  };
  

  return (
    <>
      <Navbar />
      <header className="relative">
        <video
          className="w-full h-[720px] object-cover brightness-50"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://storage.googleapis.com/weapp_sl/bg.mp4" type="video/mp4" />
          <img src="back2.jpg" alt="Fallback Image" className="w-full h-full object-cover" />
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Sunway Luxury Hotels</h1>
          <p className="text-lg mt-2">Discover Stunning Views and Sunset Vibes</p>
          <button className="mt-4 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200">
            Explore More
          </button>
        </div>

        {/* Booking using category */}
        <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full">
              <div className="w-full md:w-auto">
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="w-full md:w-auto">
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div className="w-full md:w-auto">
                <select
                  className="border border-gray-300 p-2 rounded w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Luxury Suite">Luxury Suite</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Standard Room">Standard Room</option>
                  <option value="Family Room">Family Room</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="mt-4 md:mt-0 bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Book Now
            </button>
          </div>
          {feedback && (
            <div
              className={`mt-4 p-4 text-white rounded ${
                feedback.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {feedback.message}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
