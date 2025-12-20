import React, { useState } from "react";
import api from "../services/api";

const Rating = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (e) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const res = await api.post("/submit_rating.php", {
        rating,
        message,
      });

      if (res.data.success) {
        setStatus({ type: "success", text: res.data.message });
        setMessage("");
        setRating(5);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus({
          type: "error",
          text: "You have already submitted feedback.",
        });
      } else {
        setStatus({
          type: "error",
          text: "Failed to submit feedback. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-background-light dark:bg-background-dark p-6 rounded-xl shadow-strong">
      <h2 className="text-2xl font-bold mb-4">Rate Our Service</h2>

      {status && (
        <div
          className={`p-3 rounded mb-4 ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.text}
        </div>
      )}

      <form onSubmit={submitFeedback} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} ⭐
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Feedback</label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800"
            rows={4}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Rating;
