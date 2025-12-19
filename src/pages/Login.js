import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/login.php",
        {
          email: email.trim(),
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.data || !res.data.success) {
        setError(res.data?.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Save auth
      login(res.data);

      // ✅ Redirect to HOME
      navigate("/", { replace: true });
    } catch (err) {
      setError("Unable to login. Please try again.");
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
              Welcome Back!
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              Sign in to continue to your account.
            </p>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-300 p-4 mb-6 rounded-md">
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  🔐 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-opacity-90 font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 hover-lift shadow-lg disabled:shadow-none disabled:cursor-not-allowed mt-6"
              >
                {loading ? <LoadingSpinner text="Signing in..." /> : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                or
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:text-opacity-90"
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