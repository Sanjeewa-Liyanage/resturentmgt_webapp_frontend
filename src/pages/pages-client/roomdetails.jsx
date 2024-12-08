import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Headermod from "../../components/header/headermod";
import Footer from "../../components/footer/footer";

export default function RoomDetails() {
  const location = useLocation();
  const [roomId, setRoomId] = useState(location.state?.roomId || null); // Safely access roomId
  const [room, setRoom] = useState(null); // Room data
  const [error, setError] = useState(null); // Handle errors
  const [mainImage, setMainImage] = useState("");
 const [feedbacks, setFeedbacks] = useState([]); // Feedbacks for the room  
  const [reviews, setReviews] = useState([]); // Reviews for the room
  const [newComment, setNewComment] = useState(""); // New comment text
  const [userName, setUserName] = useState(""); // User name for the comment
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission status


  

  useEffect(() => {
    if (!roomId) {
      setError("Room ID is missing.");
      return;
    }

    // Fetch room details
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`)
      .then((res) => {
        const roomData = res.data.result;
        setRoom(roomData);
        setMainImage(roomData.photos?.[0] || "/default-room.jpg");
      })
      .catch((err) => {
        console.error("Error fetching room details:", err);
        setError("Failed to fetch room details.");
      });

    
    
  }, [roomId]);

  useEffect(() => {
    if (!roomId) {
      setError("Room ID is missing.");
      return;
    }
  
    // Fetch room details
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`)
      .then((res) => {
        const roomData = res.data.result;
        setRoom(roomData);
        setMainImage(roomData.photos?.[0] || "/default-room.jpg");
      })
      .catch((err) => {
        console.error("Error fetching room details:", err);
        setError("Failed to fetch room details.");
      });
  
    // Fetch reviews
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/room/${roomId}`)
      .then((res) => {
        const feedbacks = res.data.feedbacks; // Adjust this if the key is different
        const transformedReviews = feedbacks.map((feedback) => ({
          feedbackId: feedback.feedbackId,
          user: feedback.user.firstname || "Anonymous", // Fallback if no name
          roomId: feedback.roomId,
          content: feedback.content,
          rating: feedback.rating,
          timeStamp: feedback.timeStamp,
        }));
        setReviews(transformedReviews);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews.");
      });
  }, [roomId]);
  





  const handleSubmitReview = () => {
    if (!newComment.trim() || !userName.trim()) {
      alert("Please enter your name and comment.");
      return;
    }

    setIsSubmitting(true);

    const newReview = {
      feedbackId: reviews.length + 1,
      user: userName,
      roomId,
      content: newComment,
      rating: 4, // Assuming a static rating for simplicity
      timeStamp: new Date(),
      approved: true,
    };

    setReviews([...reviews, newReview]);
    setNewComment("");
    setUserName("");
    setIsSubmitting(false);
  };

  // Utility to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };
  const calculateSummary = () => {
    const totalReviews = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

    const ratingsCount = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      ratingsCount[review.rating - 1]++;
    });

    return {
      totalReviews,
      averageRating: averageRating.toFixed(1),
      ratingsCount,
    };
  };

  const summary = calculateSummary();

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p>Loading room details...</p>
      </div>
    );
  }

  return (
    <>
      <Headermod />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Room Details: {room.roomId}</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Image and Gallery */}
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={`Room ${room.roomId}`}
              className="w-full h-auto rounded-lg"
            />
            <div className="flex gap-2 mt-4">
              {room.photos?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg border ${
                    mainImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(img)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>

          {/* Room Details */}
          <div className="md:w-1/2">
            <p className="text-gray-700 text-lg">
              <strong>Category:</strong> {room.category}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Max Guests:</strong> {room.maxGuest}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Notes:</strong> {room.notes || "No additional notes available."}
            </p>
            <p className="text-gray-700 text-lg">
              <strong>Availability:</strong> {room.available ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
         {/* Review Summary */}
         <div className="border rounded-lg p-6 shadow mb-6 mt-6 w-[540px]">
  <h2 className="text-2xl font-bold mb-4">Review Summary</h2>
  <div className="flex items-center justify-between">
    <div className="text-4xl font-bold text-yellow-500">{summary.averageRating}</div>
    <div className="text-gray-700 text-lg">{summary.totalReviews} reviews</div>
  </div>
  
  {/* Average Rating in Stars */}
  <div className="flex items-center mt-2 mb-4">
    {renderStars(parseFloat(summary.averageRating))}
  </div>
  
  {/* Rating Breakdown by Star */}
  <div className="mt-4">
    {[5, 4, 3, 2, 1].map((star) => (
      <div key={star} className="flex items-center mb-2">
        <span className="text-gray-600">{star} star</span>
        <div className="flex-grow mx-2 bg-gray-200 rounded">
          <div
            className="bg-yellow-500 rounded h-2"
            style={{
              width: `${(summary.ratingsCount[star - 1] / summary.totalReviews) * 100 || 0}%`,
            }}
          ></div>
        </div>
        <span className="text-gray-600">{summary.ratingsCount[star - 1]}</span>
      </div>
    ))}
  </div>
</div>


        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review, index) => (
                <li key={index} className="border rounded-lg p-4 shadow">
                  <p className="text-gray-700">
                    <strong>{review.user}:</strong> {review.content}
                  </p>
                  <div className="flex items-center mt-2">{renderStars(review.rating)}</div>
                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(review.timeStamp).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No reviews yet. Be the first to leave a comment!</p>
          )}

          {/* Add Review Form */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">Leave a Comment</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-lg p-2"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <textarea
                placeholder="Your Comment"
                className="border rounded-lg p-2"
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleSubmitReview}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
