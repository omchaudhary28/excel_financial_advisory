import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FiMail, FiLock } from "react-icons/fi";
import { API_BASE_URL } from "../config"; // Import API_BASE_URL

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
        `${API_BASE_URL}/login.php`, // Use API_BASE_URL
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

      login(res.data);

      navigate("/", { replace: true });
    } catch (err) {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-black">
      <div className="w-full max-w-md" data-aos="fade-up">
        <div className="card overflow-hidden"> {/* Using card utility class */}
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-text-muted dark:text-gray-400 mb-8">
              Sign in to access your account.
            </p>

            {error && (
              <div className="bg-danger/10 border border-danger text-danger p-4 mb-6 rounded-lg"> {/* Refined error styling */}
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center custom-checkbox">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="form-checkbox"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-text dark:text-gray-200"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Forgot password?
                </Link>              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center" // Using btn-primary utility
              >
                {loading ? <LoadingSpinner text="Signing in..." /> : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-text-muted dark:text-gray-400">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="font-semibold text-primary hover:underline transition-transform duration-200 hover:-translate-y-0.5">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;