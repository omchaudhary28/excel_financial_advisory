import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { API_BASE_URL } from "../config"; // Import API_BASE_URL

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
        `${API_BASE_URL}/contact.php`, // Use API_BASE_URL
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
      // label: "Call Us", // Added label
      value: "+917499953708",
      href: "tel:+917499953708",
    },
    {
      icon: <FaEnvelope />,
      // label: "Email Us", // Added label
      value: "omchaudhary2111@gmail.com",
      href: "mailto:omchaudhary2111@gmail.com",
    },
    {
      icon: <FaWhatsapp />,
      // label: "WhatsApp", // Added label
      value: "+7499953708",
      href: "https://wa.me/7499953708",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-extrabold text-text dark:text-white tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-text-muted dark:text-gray-400">
            We're here to help. Reach out to us anytime for inquiries or support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6" data-aos="fade-right">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center p-6 shadow-md hover:shadow-strong transition-all duration-300 border-2 border-transparent hover:border-primary transform hover:-translate-y-1 group"
              >
                <div className="text-3xl text-primary group-hover:text-primary-light transition-colors mr-5">
                  {method.icon}
                </div>
                <div>
                  <p className="font-semibold text-xl text-text dark:text-text-inverted">
                    {method.label}
                  </p>
                  <p className="text-base text-text-muted dark:text-gray-400">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="w-full" data-aos="fade-left" data-aos-delay="100">
            <div className="card overflow-hidden"> {/* Using card utility class */}
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-2xl font-bold text-center text-text dark:text-white mb-6">
                  Send Us a Message
                </h2>

                {status && (
                  <div className="bg-success/10 border border-success text-success-dark p-4 mb-6 rounded-lg">
                    {status}
                  </div>
                )}
                {error && (
                  <div className="bg-danger/10 border border-danger text-danger p-4 mb-6 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="pl-14" // Apply global input style, only need pl-14
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-14" // Apply global input style, only need pl-14
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <FiMessageSquare className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="pl-14" // Apply global input style, only need pl-14
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="" // Apply global textarea style
                    placeholder="Your message..."
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center" // Using btn-primary utility
                  >
                    {loading ? <LoadingSpinner text="Sending..." /> : "Send Message"}
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