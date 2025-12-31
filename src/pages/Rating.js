import { useState } from "react";
import api from "../services/api";
import { FiStar, FiSend } from "react-icons/fi";
import { LoadingSpinner } from "../components/Notifications";

export default function Rating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({});
    try {
      const res = await api.post("/submit_rating.php", { rating, message });
      if (res.data.success) {
        setStatus({ type: 'success', message: "Thank you for your valuable feedback!" });
        setRating(0);
        setMessage("");
      } else {
        setStatus({ type: 'error', message: res.data.message || "Something went wrong." });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setStatus({ type: 'error', message: "You have already submitted feedback." });
      } else {
        setStatus({ type: 'error', message: "An unexpected server error occurred." });
      }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="text-center">
            <FiStar className="mx-auto h-12 w-auto text-primary" />
            <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
                Rate Our Service
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                We value your feedback. Please take a moment to rate your experience.
            </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {status.message && (
            <div className={`mb-6 p-4 rounded-lg text-center font-medium ${
              status.type === 'success'
                ? 'bg-green-100 border border-green-200 text-green-800'
                : 'bg-red-100 border border-red-200 text-red-800'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-4">
                    Your overall rating
                </label>
                <div className="flex justify-center items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                    key={star}
                    className={`h-10 w-10 cursor-pointer transition-all duration-200 transform ${
                        (hoverRating || rating) >= star ? "text-yellow-400 fill-current scale-110" : "text-gray-300 dark:text-gray-600"
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    />
                ))}
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your feedback
                </label>
                <div className="mt-1">
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="input"
                        placeholder="Tell us about your experience..."
                    />
                </div>
            </div>

            <div>
                <button 
                    type="submit" 
                    className="btn-primary w-full flex items-center justify-center"
                    disabled={loading || rating === 0}
                >
                    {loading ? <LoadingSpinner text="Submitting..." /> : <><FiSend className="mr-2"/>Submit Feedback</>}
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
