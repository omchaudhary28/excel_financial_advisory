import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Contact() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/contact.php",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setStatus("Message sent successfully!");
        setForm({ ...form, subject: "", message: "" });
      } else {
        setError(res.data.message || "Failed to send message");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-none mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold">Get in Touch</h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We're here to help. Send us a message or give us a call.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              {status && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md">
                  {status}
                </div>
              )}
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <a href="mailto:omchaudhary2111@gmail.com" className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    <span>omchaudhary2111@gmail.com</span>
                  </a>
                  <a href="tel:7499953708" className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    <span>7499953708</span>
                  </a>
                   <a href="https://wa.me/7499953708" className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413.003 6.556-5.338 11.891-11.893 11.891-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.451-4.437-9.889-9.888-9.889-5.451 0-9.887 4.434-9.889 9.888-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-3.7-.006-4.2-.006-1.2 0-1.5.3-1.8.6-.3.3-.9 1.2-.9 2.9 0 1.7.9 3.3 1.2 3.6.3.3 1.8 2.8 4.2 3.9 2.4 1.1 2.8 1.2 3.3 1.2.5 0 1.5-.2 1.8-.4.3-.2.9-1.2.9-2.9 0-1.7-.3-2.1-.6-2.4z"/></svg>
                    <span>WhatsApp</span>
                  </a>
                  <p className="flex items-center">
                    <svg className="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Pune, Maharashtra, India</span>
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.825680105394!2d73.85435961540196!3d18.52043038740123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0e522f4b4b9%3A0x8b3cf6b3b5b7b0f0!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620027735398!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '1rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;