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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 form-container">
      <div className="w-full max-w-md animate-fade-in-up" data-aos="fade-up">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-2">
              Reset Password
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Enter your email to receive a reset link.
            </p>

            {message && (
              <div
                className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 mb-6 rounded-md"
                role="alert"
              >
                {message}
              </div>
            )}

            {error && (
              <div
                className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6 rounded-md"
                role="alert"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  📧 Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled autoComplete="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
              >
                {loading ? <LoadingSpinner text="Sending..." /> : 'Send Reset Link'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                or
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-opacity-90"
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
