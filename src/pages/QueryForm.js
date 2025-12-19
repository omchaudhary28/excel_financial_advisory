import React, { useState } from "react";
import api from "../services/api";

const QueryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/submit_query.php", {
        name,
        email,
        subject,
        message,
      });

      if (res.data.success) {
        setStatus("Query submitted successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError(res.data.message || "Failed to submit query");
      }
    } catch (err) {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in-up" data-aos="fade-up">
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>

          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-2">
              Raise a Query
            </h2>
            <p className="text-center text-text dark:text-text-inverted mb-8">
              We're here to help.
            </p>

            {status && (
              <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="font-bold">Success!</strong>
                    <p className="text-sm dark:text-green-200">{status}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="font-bold block mb-2">Error</strong>
                    <p className="text-sm dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="name" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                  👤 Your Name
                </label>
                <input
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="150">
                <label htmlFor="email" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                  📧 Email
                </label>
                <input
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="subject" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="250">
                <label htmlFor="message" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                  placeholder="Message"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {loading ? "Submitting..." : "Submit Query"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
