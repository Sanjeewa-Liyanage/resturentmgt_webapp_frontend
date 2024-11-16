export default function AdminBooking() {
    // Sample data for demonstration
    const bookings = [
      {
        bookingId: 1,
        roomId: 101,
        email: "john.doe@example.com",
        status: "pending",
        reason: "Vacation stay",
        start: "2024-12-01",
        end: "2024-12-10",
        notes: "Late check-in",
        timeStamp: "2024-11-15",
      },
      {
        bookingId: 2,
        roomId: 202,
        email: "jane.smith@example.com",
        status: "approved",
        reason: "Business trip",
        start: "2024-11-20",
        end: "2024-11-25",
        notes: "Special diet requested",
        timeStamp: "2024-11-10",
      },
    ];
  
    return (
      <div className="w-full p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Bookings</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Room ID</th>
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
            {bookings.map((booking) => (
              <tr key={booking.bookingId} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {booking.bookingId}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.roomId}
                </td>
                <td className="border border-gray-300 p-2">{booking.email}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.status}
                </td>
                <td className="border border-gray-300 p-2">{booking.reason}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.start}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {booking.end}
                </td>
                <td className="border border-gray-300 p-2">{booking.notes}</td>
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
  