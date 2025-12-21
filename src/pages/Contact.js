import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

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
      // label: "Phone",
      value: "+917499953708",
      href: "tel:+917499953708",
    },
    {
      icon: <FaEnvelope />,
      // label: "Email",
      value: "omchaudhary2111@gmail.com",
      href: "mailto:omchaudhary2111@gmail.com",
    },
    {
      icon: <FaWhatsapp />,
      // label: "WhatsApp",
      value: "+7499953708",
      href: "https://wa.me/7499953708",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-400">
            We're here to help. Reach out to us anytime.
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
                className="card flex items-center shadow-md hover:shadow-strong transition-all duration-300 border-2 border-transparent hover:border-primary dark:hover:border-primary transform hover:-translate-y-1"
              >
                <div className="text-3xl text-primary mr-5">{method.icon}</div>
                <div>
                  <p className="font-semibold text-lg text-text dark:text-text-inverted">
                    {method.label}
                  </p>
                  <p className="text-text-muted dark:text-gray-400">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="w-full" data-aos="fade-left" data-aos-delay="100">
            <div className="bg-background-light dark:bg-black rounded-2xl shadow-xl overflow-hidden dark:border dark:border-gray-800">
              <div className="px-8 pt-8 pb-6">
                <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>

                {status && (
                  <div className="bg-success-light dark:bg-success-dark/20 border border-success dark:border-success-light/30 text-success-dark dark:text-success-light px-4 py-3 rounded-lg mb-6">
                    {status}
                  </div>
                )}
                {error && (
                  <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger dark:border-danger-light/30 text-danger-dark dark:text-danger-light p-4 mb-6 rounded-lg">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <FiMessageSquare className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
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
                    className="w-full px-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                    placeholder="Your message..."
                    value={form.message}
                    onChange={handleChange}
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 disabled:bg-text-muted text-text-inverted font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
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