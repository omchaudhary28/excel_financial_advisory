import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { API_BASE_URL } from "../config"; // Import API_BASE_URL

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
        `${API_BASE_URL}/register.php`, // Use API_BASE_URL
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
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-black">
      <div className="w-full max-w-md" data-aos="fade-up">
        <div className="card overflow-hidden"> {/* Using card utility class */}
          <div className="px-8 pt-8 pb-6">
            <h2 className="text-3xl font-bold text-center text-text dark:text-white mb-2">
              Create Your Account
            </h2>
            <p className="text-center text-text-muted dark:text-gray-400 mb-8">
              Start your journey to financial freedom.
            </p>

            {error && (
              <div className="bg-danger/10 border border-danger text-danger p-4 mb-6 rounded-lg"> {/* Refined error styling */}
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  name="name" // Added name attribute
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

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
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" /> {/* Consistent icon color */}
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-14" // Apply global input style, only need pl-14
                  placeholder="••••••••"
                  value={form.confirm_password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center" // Using btn-primary utility
                disabled={loading}
              >
                {loading ? <LoadingSpinner text="Creating Account..." /> : "Register"}
              </button>
            </form>
            
            <div className="mt-8 text-center text-sm text-text-muted dark:text-gray-400">
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
