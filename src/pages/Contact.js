import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { LoadingSpinner } from '../components/Notifications';

function Contact() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/contact.php', { ...formData, type: 'contact' });
      if (response.data.success) {
        setSuccess(response.data.message);
        setFormData((prev) => ({ ...prev, message: '' }));
        setTimeout(() => setSuccess(''), 5000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    { icon: '📧', title: 'Email', content: 'omchaudhary2111@gmail.com', color: 'from-blue-500 to-cyan-500', link: 'mailto:omchaudhary2111@gmail.com' },
    { icon: '📱', title: 'Call', content: '+91 7499953708', color: 'from-purple-500 to-pink-500', link: 'tel:+917499953708' },
    { icon: '💬', title: 'WhatsApp', content: '+91 7499953708', color: 'from-green-500 to-emerald-500', link: 'https://wa.me/917499953708' },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in-up" data-aos="fade-up">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
          Get in Touch
        </h1>
        <p className="text-xl text-text dark:text-text-inverted max-w-2xl mx-auto">
          Have questions about our services? We'd love to hear from you. Get in touch with our team today.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? "_blank" : "_self"}
              rel={method.link.startsWith('http') ? "noopener noreferrer" : ""}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-gray-700 hover-lift flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${method.color === 'from-blue-500 to-cyan-500' ? 'from-primary to-accent text-white' : method.color === 'from-purple-500 to-pink-500' ? 'from-accent to-primary-light text-white' : 'from-secondary to-accent text-white'} flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {method.icon}
              </div>
              <h3 className="text-xl font-bold text-text dark:text-text-inverted mb-2">{method.title}</h3>
              <p className="text-text dark:text-text-inverted">{method.content}</p>
            </a>
          ))}
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div data-aos="fade-right" className="animate-fade-in-up">
            <h2 className="text-4xl font-bold text-text dark:text-text-inverted mb-6">Send us a Message</h2>
            <p className="text-text dark:text-text-inverted mb-8 leading-relaxed">
              Our team of financial experts is ready to help you achieve your financial goals. Fill out the form below
              and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                'Quick Response Time',
                'Expert Financial Advisors',
                'Secure & Confidential',
                'Available 24/7',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary-light/10 dark:hover:bg-background-dark transition-all duration-300"
                  data-aos="fade-right"
                  data-aos-delay={100 + index * 50}
                >
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white text-sm font-bold">
                    ✓
                  </div>
                  <span className="text-text dark:text-text-inverted font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div data-aos="fade-left" className="animate-fade-in-up">
            <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>

              <div className="p-8">
                {/* Error Alert */}
                {errors.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <ul className="list-disc list-inside text-sm dark:text-red-200">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Success Alert */}
                {success && (
                  <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{success}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div data-aos="fade-up" data-aos-delay="100">
                    <label htmlFor="name" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading || !!user}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Email Input */}
                  <div data-aos="fade-up" data-aos-delay="150">
                    <label htmlFor="email" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading || !!user}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Message Input */}
                  <div data-aos="fade-up" data-aos-delay="200">
                    <label htmlFor="message" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell us about your financial goals..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      autoComplete="off"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                    data-aos="fade-up"
                    data-aos-delay="250"
                  >
                    {loading ? <LoadingSpinner text="Sending..." /> : 'Send Message'}
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
