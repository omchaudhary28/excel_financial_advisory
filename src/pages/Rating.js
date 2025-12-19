import React, { useState } from "react";
import axios from "axios";

const Rating = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const submitFeedback = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/submit_rating.php",
        { rating, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (res.data.success) {
        setStatus("success");
        setMessage("");
        setRating(5);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Rate Our Service</h2>

      {status === "success" && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Thank you for your feedback!
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          Failed to submit feedback
        </div>
      )}

      <form onSubmit={submitFeedback} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {[5,4,3,2,1].map(n => (
              <option key={n} value={n}>{n} ⭐</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Feedback</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Rating;
