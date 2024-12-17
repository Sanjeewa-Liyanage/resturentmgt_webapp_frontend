import React, { useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Loader2 from "../../components/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";


export default function AdminBooking() {
  const [bookings, setBookings] = useState([]);
  const [approvedBookings, setApprovedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/bookings/pending-bookings",{
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
  })
      .then((response) => {
        console.log(response.data);
        setBookings(response.data.bookings);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      }); 
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/bookings/approved-bookings", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response.data);
      setApprovedBookings(response.data.bookings);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, []);

  const approveBooking = (bookingId) => {
    const token = localStorage.getItem("token");
    axios
      .put(import.meta.env.VITE_BACKEND_URL + `/api/bookings/approve/${bookingId}`, {}, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res.data);
        setBookings((prevBookings) =>
          prevBookings
            .map((booking) =>
              booking.bookingId === bookingId
                ? { ...booking, status: "approved" }
                : booking
            )
            .filter((booking) => booking.status !== "approved")
        );
      }).catch((error) => {
        console.error("Error approving booking:", error);
      });

  }
    const bookRoom = (roomId) => {
      const token = localStorage.getItem("token");
      axios
        .put(import.meta.env.VITE_BACKEND_URL + `/api/rooms/book/${roomId}`, {}, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }).then((res) => {
          console.log(res.data);
          setRooms((prevRooms) =>
            prevRooms
              .map((room) =>
                room.roomId === roomId
                  ? { ...room, status: "booked" }
                  : room
              )
              .filter((room) => room.status !== "booked")
          );
        }).catch((error) => {
          console.error("Error booking room:", error);
        })
    }

    useEffect(() => {
      const token = localStorage.getItem("token");
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/bookings/pending-count", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("count",response.data);
        setPendingCount(response.data.count);
        setLoading(false);
      }).catch((error) => {
        console.error(error);
        setLoading(false);
      })
    })
  
    return (
      <div className="w-full p-4">
        <div className="h-[80px] sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-indigo-500 p-4 shadow-lg mb-4 flex justify-between items-center rounded-lg">
    {/* Aligning the pending count to the left corner */}
    <div className="flex items-center space-x-4">
      <p className="font-bold text-white text-[18px]">
        You have {pendingCount} bookings to approve
      </p>
    </div>

    {/* Centered search bar and button */}
    <div className="flex-1 flex justify-center items-center space-x-4">
      <input 
        type="text" 
        className="w-64 h-10 px-4 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
        placeholder="Search bookings..."
      />
      <button className="px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition duration-200 ease-in-out">
        <FaSearch />
      </button>
    </div>

    {/* Right-aligned delete button */}
    <button className="px-6 py-2 rounded-full flex items-center m-3 text-white bg-red-600 hover:bg-red-700 focus:outline-none transition duration-200 ease-in-out">
      Delete Ended Bookings <FaTrash className="ml-3"/>
    </button>
  </div>


        <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Room ID</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Reason</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Notes</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {booking.bookingId}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.roomId}
                </td>
                <td className="border border-gray-300 p-2">{booking.category}</td>
                <td className="border border-gray-300 p-2">{booking.email}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.status}
                </td>
                <td className="border border-gray-300 p-2">{booking.reason ||"no specific data"}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.start}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.end}
                </td>
                <td className="border border-gray-300 p-2">{booking.notes||"no specific data"}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.timeStamp}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => {
                      approveBooking(booking.bookingId);
                      bookRoom(booking.roomId);
                    }}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-2xl font-bold mb-4 mt-4">Approved Bookings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Room ID</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Reason</th>
              <th className="border border-gray-300 p-2">Start Date</th>
              <th className="border border-gray-300 p-2">End Date</th>
              <th className="border border-gray-300 p-2">Notes</th>
              <th className="border border-gray-300 p-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {approvedBookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {booking.bookingId}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.roomId}
                </td>
                <td className="border border-gray-300 p-2">{booking.category}</td>
                <td className="border border-gray-300 p-2">{booking.email}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.status}
                </td>
                <td className="border border-gray-300 p-2">{booking.reason ||"no specific data"}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.start}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.end}
                </td>
                <td className="border border-gray-300 p-2">{booking.notes||"no specific data"}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.timeStamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
  