import React, { useState } from "react";
import api from "../services/api";

const QueryForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

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
        setStatus(res.data.message || "Failed to submit query");
      }
    } catch (err) {
      setStatus("Server error. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Raise a Query
      </h2>

      {status && (
        <div className="mb-4 text-center text-red-600">
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-3 rounded mb-6"
          placeholder="Message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default QueryForm;
