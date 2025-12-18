import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
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

    const res = await login(email, password);

    setLoading(false);

    if (res?.success) {
      navigate("/dashboard"); // ✅ redirect after login
    } else {
      setError(res?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h3 className="text-center mb-3">Welcome Back</h3>
        <p className="text-center text-muted mb-4">
          Sign in to your account
        </p>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <a href="/register">Register</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
