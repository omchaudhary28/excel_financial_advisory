import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://excel-financial-advisory-backend.onrender.com/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Server unreachable. Please try again later.");
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
              Create Your Account
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
              Start your journey to financial freedom.
            </p>

            {error && (
              <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger dark:border-danger-light/30 text-danger-dark dark:text-danger-light p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-slate-300 dark:border-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300 placeholder-slate-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                  value={form.confirm_password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-text-muted text-text-inverted font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? <LoadingSpinner text="Creating Account..." /> : "Register"}
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-primary hover:underline transition-transform duration-200 hover:-translate-y-0.5">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
