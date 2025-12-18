import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(e.target.email.value, e.target.password.value);

    if (res.success) {
      navigate("/profile");
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" required />
      <input name="password" type="password" required />
      {error && <p style={{color:"red"}}>{error}</p>}
      <button>Login</button>
    </form>
  );
}
