import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { LoadingSpinner } from '../components/Notifications';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Invalid email format.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/forgot-password.php', { email: trimmedEmail });
      if (response.data.success) {
        setMessage(response.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-md animate-fade-in-up" data-aos="fade-up">
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-2">Reset Password</h2>
            <p className="text-center text-text dark:text-text-inverted mb-8">Enter your email to receive a reset link</p>

            {message && (
              <div
                className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up"
                role="alert"
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{message}</span>
                </div>
              </div>
            )}

            {error && (
              <div
                className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up"
                role="alert"
              >
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="email" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                {loading ? <LoadingSpinner text="Sending..." /> : 'Send Reset Link'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-text dark:text-text-inverted">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <p className="text-center text-text dark:text-text-inverted text-sm" data-aos="fade-up" data-aos-delay="250">
              Remembered your password?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
