import { useState } from "react";
import api from "../services/api";
import { FiStar } from "react-icons/fi";

export default function Rating() {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/submit_rating.php", { rating, message });
      if (res.data.success) {
        setStatus({ type: 'success', message: "Thank you! Your feedback is submitted." });
      } else {
        setStatus({ type: 'error', message: res.data.message || "Something went wrong." });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus({ type: 'error', message: "You have already submitted feedback." });
      } else {
        setStatus({ type: 'error', message: "Something went wrong." });
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto card">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">Rate Our Service</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-8">We'd love to hear your feedback!</p>

      {status.message && (
        <div className={`mb-4 p-3 rounded-lg text-center ${
          status.type === 'success'
            ? 'bg-success-light dark:bg-success-dark/20 text-success-dark dark:text-success-light'
            : 'bg-danger-light dark:bg-danger-dark/20 text-danger-dark dark:text-danger-light'
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <FiStar
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors duration-200 ${
                star <= rating ? "text-yellow-400 fill-current transform hover:scale-110" : "text-gray-400 transform hover:scale-110"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
          placeholder="Your feedback..."
        />

        <button className="w-full bg-primary hover:bg-primary/90 disabled:bg-text-muted text-text-inverted font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
          disabled={!rating} // Disable if no rating selected
        >
          Submit
        </button>
      </form>
    </div>
  );
}
