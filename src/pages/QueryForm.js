import React, { useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

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
<div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg" data-aos="fade-up">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden dark:border dark:border-slate-700">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Raise a Query
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
              Have a question or need assistance? Let us know.
            </p>

            {status && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-300 p-4 mb-6 rounded-lg">
                {status}
              </div>
            )}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 text-red-700 dark:text-red-400 p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Your Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <FiMessageSquare className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="subject"
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <textarea
                id="message"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-slate-500"
                placeholder="Your message..."
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                {loading ? <LoadingSpinner text="Submitting..." /> : "Submit Query"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
