import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LoadingSpinner } from '../components/Notifications';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess('');

    const trimmedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );
    setFormData(trimmedFormData);

    // Frontend validation
    const newErrors = [];
    if (!trimmedFormData.name) {
      newErrors.push('Name is required.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedFormData.email)) {
      newErrors.push('Invalid email format.');
    }
    if (!/^[0-9]{10}$/.test(trimmedFormData.phone)) {
      newErrors.push('Invalid phone number format. Please enter a 10-digit number.');
    }
    if (trimmedFormData.password !== trimmedFormData.confirm_password) {
      newErrors.push('Passwords do not match.');
    }
    if (trimmedFormData.password.length < 6) {
      newErrors.push('Password must be at least 6 characters long.');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await register(
        trimmedFormData.name,
        trimmedFormData.email,
        trimmedFormData.password,
        trimmedFormData.confirm_password,
        trimmedFormData.phone
      );

      if (response.data.success) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
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

  const inputFields = [
    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: '👤' },
    { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com', icon: '📧' },
    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 (555) 123-4567', icon: '📱' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in-up" data-aos="fade-up">
        {/* Card */}
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header Gradient */}
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>

          <div className="px-8 pt-8 pb-6">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-2">Create Account</h2>
            <p className="text-center text-text dark:text-text-inverted mb-8">Join thousands of successful investors</p>

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
                    <strong className="font-bold block mb-2">Validation Error</strong>
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
                  <div>
                    <strong className="font-bold">Success!</strong>
                    <p className="text-sm dark:text-green-200">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {!success && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Input Fields */}
                {inputFields.map((field, index) => (
                  <div key={field.name} data-aos="fade-up" data-aos-delay={`${100 + index * 50}`}>
                    <label htmlFor={field.name} className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                      {field.icon} {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      autoComplete={field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'tel'}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>
                ))}

                {/* Password Fields */}
                <div data-aos="fade-up" data-aos-delay="250">
                  <label htmlFor="password" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                    🔐 Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPasswords ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div data-aos="fade-up" data-aos-delay="300">
                  <label htmlFor="confirm_password" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                    🔐 Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type={showPasswords ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light transition-colors"
                      aria-label={showPasswords ? 'Hide password' : 'Show password'}
                    >
                      {showPasswords ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start" data-aos="fade-up" data-aos-delay="350">
                  <input
                    type="checkbox"
                    id="agree"
                    required
                    className="w-4 h-4 mt-1 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="agree" className="ml-3 text-sm text-text dark:text-text-inverted">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-primary hover:text-primary-dark font-semibold">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" className="text-primary hover:text-primary-dark font-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  {loading ? <LoadingSpinner text="Creating account..." /> : 'Create Account'}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-text dark:text-text-inverted">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-text dark:text-text-inverted text-sm" data-aos="fade-up" data-aos-delay="450">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors duration-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-text dark:text-text-inverted text-xs mt-6">
          We respect your privacy. Your data is encrypted and secure.
        </p>
      </div>
    </div>
  );
}

export default Register;
