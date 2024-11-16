export default function AdminFeedbacks() {
    const feedbacks = [
        {
          "feedbackId": 101,
          "user": "64b7d7c0f1f89c3a9e3e1b4f",
          "roomId": 1,
          "content": "The room was very clean and comfortable. I enjoyed my stay.",
          "rating": 5,
          "timeStamp": "2024-11-16T10:30:00.000Z",
          "approved": true
        },
        {
          "feedbackId": 102,
          "user": "64b7d7c0f1f89c3a9e3e1b50",
          "roomId": 2,
          "content": "Good service, but the food quality could be improved.",
          "rating": 3,
          "timeStamp": "2024-11-15T15:45:00.000Z",
          "approved": false
        },
        {
          "feedbackId": 103,
          "user": "64b7d7c0f1f89c3a9e3e1b51",
          "roomId": null,
          "content": "Had a pleasant experience. Will visit again.",
          "rating": 4,
          "timeStamp": "2024-11-14T12:00:00.000Z",
          "approved": true
        },
        {
          "feedbackId": 104,
          "user": "64b7d7c0f1f89c3a9e3e1b52",
          "roomId": 3,
          "content": "The staff was very helpful, but the room was a bit noisy.",
          "rating": 3,
          "timeStamp": "2024-11-13T18:20:00.000Z",
          "approved": false
        }
      ]
      
    
    return (
       <div className="w-full p-4">
        <h2 className ="text-2xl font-bold mb-4">Feedbacks</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-blue-400 text-white">
            <tr>
              <th className="border border-gray-300 p-2">Feedback ID</th>
              <th className="border border-gray-300 p-2">user</th>
              <th className="border border-gray-300 p-2">roomId</th>
              <th className="border border-gray-300 p-2">content</th>
              <th className="border border-gray-300 p-2">rating</th>
              <th className="border border-gray-300 p-2">timeStamp</th>
              <th className="border border-gray-300 p-2">approved</th>

            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedbackId} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2 text-center">
                  {feedback.feedbackId}
                </td>
                <td className="border border-gray-300 p-2">{feedback.user}</td>
                <td className="border border-gray-300 p-2">{feedback.roomId}</td>
                <td className="border border-gray-300 p-2">{feedback.content}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {feedback.rating}</td>
                <td className="border border-gray-300 p-2 text-center">{feedback.timeStamp}</td>
                <td className="border border-gray-300 p-2">{feedback.approved}</td>

                
              </tr>
            ))}
          </tbody>
        </table>
       </div>
    );
}