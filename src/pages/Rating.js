import { useState } from "react";
import api from "../services/api";

export default function Rating() {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/submit_rating.php", { rating, message });
      if (res.data.success) {
        setStatus("Thank you! Your feedback is submitted.");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus("You have already submitted feedback.");
      } else {
        setStatus("Something went wrong.");
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto card">
      <h2 className="text-2xl font-bold mb-4">Rate Our Service</h2>

      {status && <p className="mb-4">{status}</p>}

      <form onSubmit={submit} className="space-y-4">
        <select
          value={rating}
          onChange={(e) => setRating(+e.target.value)}
          className="w-full border p-2 rounded"
        >
          {[5,4,3,2,1].map(n => (
            <option key={n}>{n} ⭐</option>
          ))}
        </select>

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}
