import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FiMail, FiLock } from "react-icons/fi";

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

      login(res.data);

      navigate("/", { replace: true });
    } catch (err) {
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md" data-aos="fade-up">
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden dark:border dark:border-gray-800">
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
              Sign in to access your account.
            </p>

            {error && (
              <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger dark:border-danger-light/30 text-danger-dark dark:text-danger-light p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
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
                    className="ml-2 block text-sm text-slate-900 dark:text-slate-100"
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
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
              >
                {loading ? <LoadingSpinner text="Signing in..." /> : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
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