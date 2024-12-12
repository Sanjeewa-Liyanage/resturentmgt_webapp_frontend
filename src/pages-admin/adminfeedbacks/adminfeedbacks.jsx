import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import { FaCheck, FaTrashAlt } from "react-icons/fa"; // Importing icons for approval and deletion

export default function AdminFeedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbacksIsLoaded, setFeedbacksIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!feedbacksIsLoaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/feedbacks/pending")
                .then((res) => {
                    console.log(res.data);
                    setFeedbacks(res.data.feedbacks);
                    setFeedbacksIsLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching feedbacks:", error);
                });
        }
    }, [feedbacksIsLoaded]);

    const approveFeedback = (feedbackId) => {
        axios
            .put(import.meta.env.VITE_BACKEND_URL + `/api/feedbacks/approve/${feedbackId}`, {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res.data);
                // After approving, update the feedback state to reflect the change
                setFeedbacks((prevFeedbacks) =>
                    prevFeedbacks
                        .map((feedback) =>
                            feedback.feedbackId === feedbackId
                                ? { ...feedback, approved: true }
                                : feedback
                        )
                        // Filter out the approved feedback from the list
                        .filter((feedback) => !feedback.approved)
                );
            })
            .catch((error) => {
                console.error("Error approving feedback:", error);
            });
    };

    const deleteFeedback = (feedbackId) => {
        axios
            .delete(import.meta.env.VITE_BACKEND_URL + `/api/feedbacks/${feedbackId}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res.data);
                // After deleting, filter out the deleted feedback from the list
                setFeedbacks((prevFeedbacks) =>
                    prevFeedbacks.filter((feedback) => feedback.feedbackId !== feedbackId)
                );
            })
            .catch((error) => {
                console.error("Error deleting feedback:", error);
            });
    };

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-blue-400 text-white">
                    <tr>
                        <th className="border border-gray-300 p-2">Feedback ID</th>
                        <th className="border border-gray-300 p-2">User</th>
                        <th className="border border-gray-300 p-2">Room ID</th>
                        <th className="border border-gray-300 p-2">Content</th>
                        <th className="border border-gray-300 p-2">Rating</th>
                        <th className="border border-gray-300 p-2">Time Stamp</th>
                        <th className="border border-gray-300 p-2">Approved</th>
                        <th className="border border-gray-300 p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map((feedback) => (
                        <tr key={feedback.feedbackId} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2 text-center">{feedback.feedbackId}</td>
                            <td className="border border-gray-300 p-2">{feedback.user}</td>
                            <td className="border border-gray-300 p-2">{feedback.roomId}</td>
                            <td className="border border-gray-300 p-2">{feedback.content}</td>
                            <td className="border border-gray-300 p-2 text-center">{feedback.rating}</td>
                            <td className="border border-gray-300 p-2 text-center">{feedback.timeStamp}</td>
                            <td
                                className={`border border-gray-300 p-2 text-center ${
                                    feedback.approved ? "animate-blink text-green-500" : "text-red-500"
                                }`}
                            >
                                {feedback.approved ? "Yes" : "No"}
                            </td>
                            <td className="border border-gray-300 p-2 text-center flex space-x-2 justify-center">
                                {!feedback.approved && (
                                    <button
                                        onClick={() => approveFeedback(feedback.feedbackId)}
                                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-all duration-300"
                                    >
                                        <FaCheck size={20} />
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteFeedback(feedback.feedbackId)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-all duration-300"
                                >
                                    <FaTrashAlt size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
