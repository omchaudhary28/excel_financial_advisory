import React, { useState } from "react";
import axios from "axios";

const Rating = () => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/submit_rating.php",
        { rating, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setStatus("success");
        setMessage("");
        setRating(5);
      }
    } catch (err) {
      setStatus(err.response?.data?.message || "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 card">
      <h2 className="text-2xl font-bold mb-4">Rate Our Service</h2>

      {status === "success" && (
        <p className="text-green-600">Thanks for your feedback!</p>
      )}
      {status && status !== "success" && (
        <p className="text-red-600">{status}</p>
      )}

      <form onSubmit={submit} className="space-y-4">
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          className="w-full border p-2 rounded"
        >
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} ⭐
            </option>
          ))}
        </select>

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <button className="btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default Rating;
