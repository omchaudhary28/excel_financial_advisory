import React, { useState } from "react";
import axios from "axios";
import { FiStar } from "react-icons/fi";
import { LoadingSpinner } from "../components/Notifications";

const Rating = () => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFeedback = async (e) => {
    e.preventDefault();
    setStatus(null);
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/submit_rating.php",
        { rating, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setStatus("success");
        setMessage("");
        setRating(5);
      } else {
        setError(res.data.message || "Failed to submit feedback");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg" data-aos="fade-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
              Rate Our Service
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              We value your feedback to improve our services.
            </p>

            {status === "success" && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300 p-4 mb-6 rounded-lg">
                Thank you for your feedback!
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={submitFeedback} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Your Rating</label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-10 h-10 cursor-pointer transition-colors ${
                        (hoverRating || rating) >= star
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-200 mb-2">Feedback Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-primary-light"
                  rows={5}
                  placeholder="Tell us what you think..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                {loading ? <LoadingSpinner text="Submitting..." /> : "Submit Feedback"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
