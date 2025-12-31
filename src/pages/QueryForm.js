import React, { useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";
import { FiHelpCircle, FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";

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
        setStatus("Query submitted successfully! We will get back to you as soon as possible.");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError(res.data.message || "Failed to submit query. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="text-center">
          <FiHelpCircle className="mx-auto h-12 w-auto text-primary" />
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
            Submit a Query
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Have a question, concern, or feedback? Fill out the form below to let us know.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white dark:bg-black py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {status && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
              <p className="font-bold">Success</p>
              <p>{status}</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                    <FiUser className="absolute top-3 left-3 text-gray-400" />
                    <input id="name" type="text" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-black dark:text-white" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="relative">
                    <FiMail className="absolute top-3 left-3 text-gray-400" />
                    <input id="email" type="email" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-black dark:text-white" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className="relative">
                <FiMessageSquare className="absolute top-3 left-3 text-gray-400" />
                <input id="subject" type="text" required className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-black dark:text-white" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <textarea id="message" name="message" rows="5" required className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-black dark:text-white" placeholder="Please describe your query in detail..." value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center"
              >
                {loading ? <LoadingSpinner text="Submitting..." /> : <><FiSend className="mr-2"/>Submit Query</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;
