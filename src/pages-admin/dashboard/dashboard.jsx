import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaCalendarTimes, FaCommentDots, FaClipboardCheck, FaUsers } from "react-icons/fa";
import { BiBed } from "react-icons/bi";

// Register required components for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchBookingCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/counts`
        );
        const data = response.data.data;

        // Prepare data for the graph
        const categories = Object.keys(data);
        const counts = Object.values(data);

        setChartData({
          labels: categories,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "#FF6384", // Red
                "#36A2EB", // Blue
                "#FFCE56", // Yellow
                "#4BC0C0", // Teal
                "#9966FF", // Purple
              ], // Add more colors if needed
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchBookingCounts();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div
      style={{
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridGap: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Statistics Widgets */}
      {[
        { title: "Total Pending Bookings", value: "360", trend: "4.5%", icon: <FaCalendarTimes /> },
        { title: "Total Pending Feedbacks", value: "380", trend: "4.5%", icon: <FaCommentDots /> },
        { title: "Total Booked", value: "436", trend: "4.5%", icon: <FaClipboardCheck /> },
        { title: "Available Rooms", value: "64", trend: "4.5%", icon: <BiBed /> },
        { title: "Total Users", value: "64", trend: "4.5%", icon: <FaUsers /> },
      ].map((stat, index) => (
        <div
          key={index}
          style={{
            gridColumn: "span 3",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem" }}>{stat.icon}</div>
          <h3>{stat.title}</h3>
          <p style={{ fontSize: "1.5rem", margin: "10px 0" }}>{stat.value}</p>
          <span style={{ color: "green" }}>▲ {stat.trend}</span>
        </div>
      ))}

      {/* Room Status Grid */}
      <div
        style={{
          gridColumn: "span 8",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3>Room Status</h3>
        {/* Placeholder grid for room statuses */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "10px",
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: i % 3 === 0 ? "#36A2EB" : "#FF6384",
                padding: "10px",
                borderRadius: "5px",
                color: "#fff",
                textAlign: "center",
              }}
            >
              {`Room ${i + 1}`}
            </div>
          ))}
        </div>
      </div>

      {/* Pie Chart */}
      {/* Pie Chart */}
<div
  style={{
    gridColumn: "span 4",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "300px", // Fix height
  }}
>
  <h3 style={{ marginBottom: "20px" }}>Bookings by Category</h3>
  <div style={{ width: "100%", height: "100%" }}>
    <Pie
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Prevent infinite height scaling
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Bookings by Category" },
        },
      }}
    />
  </div>
</div>

    </div>
  );
};

export default Dashboard;
