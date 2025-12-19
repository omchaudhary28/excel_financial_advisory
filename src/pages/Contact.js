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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl animate-fade-in-up" data-aos="fade-up">
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          <div className="px-8 pt-8 pb-8">
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-8">
              Get in Touch
            </h2>
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Left side: Contact options */}
              <div className="flex flex-col justify-center mb-8 lg:mb-0">
                <h3 className="text-xl font-bold text-text dark:text-text-inverted mb-4 text-center lg:text-left">
                  Direct Contact
                </h3>
                <p className="text-center lg:text-left text-text dark:text-text-inverted mb-6">
                  Reach out to us directly through any of these channels.
                </p>
                <div className="space-y-4">
                  {contactOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center text-left hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                      data-aos="fade-up"
                      data-aos-delay={100 + index * 50}
                    >
                      <span className="text-3xl mr-4">{option.icon}</span>
                      <div>
                        <span className="font-semibold text-text dark:text-text-inverted">{option.name}</span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">{option.value}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right side: Contact form */}
              <div>
                <h3 className="text-xl font-bold text-text dark:text-text-inverted mb-4 text-center lg:text-left">
                  Send a Message
                </h3>
                {status && (
                  <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                    <strong className="font-bold">Success! </strong>{status}
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                    <strong className="font-bold">Error: </strong>{error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div data-aos="fade-up" data-aos-delay="100">
                    <label htmlFor="name" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      👤 Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300"
                    />
                  </div>

                  <div data-aos="fade-up" data-aos-delay="150">
                    <label htmlFor="email" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      📧 Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300"
                    />
                  </div>

                  <div data-aos="fade-up" data-aos-delay="200">
                    <label htmlFor="subject" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Regarding my account"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300"
                    />
                  </div>

                  <div data-aos="fade-up" data-aos-delay="250">
                    <label htmlFor="message" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows="5"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    {loading ? "Sending..." : "Send Message"}
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
