import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { LoadingSpinner } from '../components/Notifications';

function QueryForm() {
  const { user } = useAuth();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');
    setLoading(true);

    try {
      const response = await api.post('/submit_query.php', {
        user_id: user ? user.id : null, // If user is logged in
        name: user ? user.name : 'Guest', // Use user's name if logged in
        email: user ? user.email : '', // Use user's email if logged in
        subject,
        message,
        type: 'query',
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        setSubject('');
        setMessage('');
        setTimeout(() => setSuccess(''), 5000); // Clear success message after 5 seconds
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-md mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-text dark:text-text-inverted text-center mb-6">Raise a Query</h2>
        <p className="text-center text-text dark:text-text-inverted mb-8">
          Have a question or need assistance? Submit your query here.
        </p>

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
              <div>
                <strong className="font-bold block mb-2">Error!</strong>
                <ul className="list-disc list-inside text-sm dark:text-red-200 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
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
          {/* Subject Input */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="e.g., Account Inquiry, Service Request"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              disabled={loading}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
            />
          </div>

          {/* Message Input */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Describe your query in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              disabled={loading}
              autoComplete="off"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
          >
            {loading ? <LoadingSpinner text="Submitting..." /> : 'Submit Query'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QueryForm;