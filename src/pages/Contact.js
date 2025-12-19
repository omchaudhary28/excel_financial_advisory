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

  const contactOptions = [
    {
      name: "Phone",
      value: "7499953708",
      href: "tel:7499953708",
      icon: "📞",
    },
    {
      name: "Email",
      value: "omchaudhary2111@gmail.com",
      href: "mailto:omchaudhary2111@gmail.com",
      icon: "📧",
    },
    {
      name: "WhatsApp",
      value: "7499953708",
      href: "https://wa.me/7499953708",
      icon: "💬",
    },
  ];

  return (
    <div className="bg-background-light dark:bg-gray-900 text-text dark:text-white">
      {/* Header Section */}
      <section className="py-24 text-center bg-gradient-to-r from-primary to-accent text-white">
        <h1 className="text-5xl font-extrabold mb-4" data-aos="fade-up">Contact Us</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90" data-aos="fade-up" data-aos-delay="100">
          We'd love to hear from you. Reach out with any questions or to schedule a consultation.
        </p>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" data-aos="fade-right">
            <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
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
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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

          {/* Contact Info and Map */}
          <div className="mt-12 lg:mt-0" data-aos="fade-left">
            <h2 className="text-3xl font-bold mb-6">Direct Contact</h2>
            <div className="space-y-6">
              {contactOptions.map((option) => (
                <a key={option.name} href={option.href} className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl mr-4">{option.icon}</div>
                  <div>
                    <p className="font-semibold text-lg">{option.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{option.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4">Our Location</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.825680105394!2d73.85435961540196!3d18.52043038740123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0e522f4b4b9%3A0x8b3cf6b3b5b7b0f0!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620027735398!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;