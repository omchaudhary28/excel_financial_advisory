import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // ✅ SAFE derived values (NO crashes)
  const displayName =
    user?.name ||
    (user?.email ? user.email.split("@")[0] : "");

  const avatarLetter =
    displayName ? displayName.charAt(0).toUpperCase() : "?";

  // Load user data safely
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/update_profile.php",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setStatus("Profile updated successfully");
      } else {
        setError(res.data.message || "Update failed");
      }
    } catch {
      setError("Server error. Please try again.");
    }
  };

  // ✅ HARD GUARD — prevents blank screen
  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>

      {status && (
        <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
          {status}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white flex items-center justify-center text-xl font-bold">
            {avatarLetter}
          </div>

          <div>
            <p className="font-semibold">{displayName}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              disabled
              className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-3 rounded hover:bg-primary-dark"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded bg-gray-300"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
