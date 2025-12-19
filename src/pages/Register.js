import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        // ✅ SHOW REAL BACKEND MESSAGE
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      navigate("/login");
    } catch (err) {
      setError("Server unreachable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="card w-full max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-text dark:text-text-inverted mb-6">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-500 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full flex justify-center"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}