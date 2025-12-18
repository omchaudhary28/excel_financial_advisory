import React, { useState } from "react";
import api from "../services/api";

export default function QueryForm() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [messageText, setMessageText] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/submit_query.php", {
        name: fullName,
        email: emailAddress,
        subject: subjectText,
        message: messageText,
      });

      if (res.data?.success) {
        setSuccess("Query submitted successfully!");
        setFullName("");
        setEmailAddress("");
        setSubjectText("");
        setMessageText("");
      } else {
        setError(res.data?.message || "Submission failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Raise a Query
        </h2>

        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 text-sm">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subjectText}
            onChange={(e) => setSubjectText(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <textarea
            placeholder="Your Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows="4"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            {loading ? "Submitting..." : "Submit Query"}
          </button>
        </form>
      </div>
    </div>
  );
}
