import React, { useState } from "react";

const BookingSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Single search bar state
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/bookings/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
  
      if (response.ok) {
        console.log("data", data);
        setResults(data.bookings || []);
        setError("");
      } else {
        setResults([]);
        setError(data.message || "Error fetching results.");
      }
    } catch (err) {
      setResults([]);
      setError("An error occurred while fetching results.");
      console.error(err);
    }
  };
  

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Search Bookings</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Room ID, Booking ID, Email, Category, or Status"
          value={searchQuery}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Display Error */}
      {error && (
        <p style={{ color: "red", fontWeight: "bold", marginBottom: "20px" }}>
          {error}
        </p>
      )}

      {/* Display Results */}
      <div>
        {results.length === 0 && !error && <p>No bookings found.</p>}
        {results.map((booking) => (
          <div
            key={booking.bookingId}
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>Room ID:</strong> {booking.roomId}
            </p>
            <p>
              <strong>Booking ID:</strong> {booking.bookingId}
            </p>
            <p>
              <strong>Category:</strong> {booking.category}
            </p>
            <p>
              <strong>Email:</strong> {booking.email}
            </p>
            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            <p>
              <strong>Start:</strong> {new Date(booking.start).toLocaleDateString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(booking.end).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingSearch;
