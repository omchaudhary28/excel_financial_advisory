import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/login.php",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        login(res.data);
        navigate("/"); // ✅ redirect to home
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md animate-fade-in-up" data-aos="fade-up">
        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-text-inverted mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-text dark:text-text-inverted mb-8">
              Sign in to continue to your account.
            </p>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-4 rounded-lg mb-6 animate-fade-in-up">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <strong className="font-bold block mb-2">Login Failed</strong>
                    <p className="text-sm dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div data-aos="fade-up" data-aos-delay="100">
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
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="150">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-text dark:text-text-inverted mb-2"
                >
                  🔐 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 bg-white dark:bg-gray-700 text-text dark:text-text-inverted placeholder-gray-400 dark:placeholder-gray-300 disabled:bg-gray-50 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                />
              </div>

              <div className="flex items-center justify-between" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 mt-1 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="remember" className="ml-3 text-sm text-text dark:text-text-inverted">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-dark font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <span className="text-sm text-text dark:text-text-inverted">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <p className="text-center text-text dark:text-text-inverted text-sm" data-aos="fade-up" data-aos-delay="300">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-primary-dark transition-colors duration-300"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
