import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

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

  const contactMethods = [
    {
      icon: <FaPhone />,
      label: "Phone",
      value: "+917499953708",
      href: "tel:+917499953708",
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: "omchaudhary2111@gmail.com",
      href: "mailto:omchaudhary2111@gmail.com",
    },
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      value: "+1234567890",
      href: "https://wa.me/1234567890",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-extrabold text-text dark:text-text-inverted tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-text-muted dark:text-gray-400">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-text dark:text-text-inverted">
              Contact Information
            </h3>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl text-primary mr-4">{method.icon}</div>
                <div>
                  <p className="font-semibold text-text dark:text-text-inverted">
                    {method.label}
                  </p>
                  <p className="text-text-muted dark:text-gray-400">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div
            className="w-full animate-fade-in-up"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-2xl font-bold text-center text-text dark:text-text-inverted mb-2">
                  Send a Message
                </h2>
                <p className="text-center text-text-muted dark:text-gray-400 mb-8">
                  Or reach us via the form below.
                </p>

                {status && (
                  <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-6">
                    {status}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-text dark:text-text-inverted mb-2"
                    >
                      👤 Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-text dark:text-text-inverted mb-2"
                    >
                      📧 Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-text dark:text-text-inverted mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                      placeholder="Regarding..."
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-text dark:text-text-inverted mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                      placeholder="Your message..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-4"
                  >
                    {loading ? (
                      <LoadingSpinner text="Sending..." />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;