import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import { API_BASE_URL } from "../config";

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
        `${API_BASE_URL}/contact.php`,
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        setStatus("Message sent successfully! We will get back to you shortly.");
        setForm({ name: user?.name || "", email: user?.email || "", subject: "", message: "" });
      } else {
        setError(res.data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FaPhone className="text-primary" />,
      label: "Call Us",
      value: "+91 74999 53708",
      href: "tel:+917499953708",
    },
    {
      icon: <FaEnvelope className="text-primary" />,
      label: "Email Us",
      value: "omchaudhary2111@gmail.com",
      href: "mailto:omchaudhary2111@gmail.com",
    },
    {
      icon: <FaWhatsapp className="text-primary" />,
      label: "WhatsApp",
      value: "+91 74999 53708",
      href: "https://wa.me/7499953708",
    },
    {
      icon: <FaMapMarkerAlt className="text-primary" />,
      label: "Our Location",
      value: "123 Financial Street, Pune, India",
      href: "#", // Link to a map can be added here
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="p-8 lg:p-12" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Send a Message
            </h2>
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
                  <input id="name" name="name" type="text" required className="input pl-10" placeholder="Your Name" value={form.name} onChange={handleChange} />
                </div>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-gray-400" />
                  <input id="email" name="email" type="email" required className="input pl-10" placeholder="Your Email" value={form.email} onChange={handleChange} />
                </div>
              </div>
              <div className="relative">
                <FiMessageSquare className="absolute top-3 left-3 text-gray-400" />
                <input id="subject" name="subject" type="text" required className="input pl-10" placeholder="Subject" value={form.subject} onChange={handleChange} />
              </div>
              <div>
                <textarea id="message" name="message" rows="5" required className="input" placeholder="Your message..." value={form.message} onChange={handleChange}></textarea>
              </div>
              <div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center">
                  {loading ? <LoadingSpinner text="Sending..." /> : <><FiSend className="mr-2" /> Send Message</>}
                </button>
              </div>
            </form>
          </div>
          <div className="p-8 lg:p-12 bg-gray-100 dark:bg-gray-800/50" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <a key={index} href={method.href} target="_blank" rel="noopener noreferrer" className="flex items-start group">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    {React.cloneElement(method.icon, { className: "h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" })}
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{method.label}</p>
                    <p className="text-base text-gray-600 dark:text-gray-400">{method.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                    {/* Add social media links here */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;