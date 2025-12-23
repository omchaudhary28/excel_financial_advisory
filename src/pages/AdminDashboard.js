import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://excel-financial-advisory-backend.onrender.com"
    : "http://localhost/FINANCIAL-project/backend-render";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchQueries();
    fetchRatings();
    // eslint-disable-next-line
  }, []);

  /* ================= STATS ================= */
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/admin_stats.php`,
        authConfig
      );
      setStats(res.data || {});
    } catch (err) {
      console.error("Stats API failed");
      setStats({});
    }
  };

  /* ================= USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/admin_users.php`,
        authConfig
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setUsers(data);
    } catch (err) {
      console.error("Users API failed");
      setUsers([]);
    }
  };

  /* ================= QUERIES ================= */
  const fetchQueries = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/admin_queries.php`,
        authConfig
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setQueries(data);
    } catch (err) {
      console.error("Queries API failed");
      setQueries([]);
    }
  };

  /* ================= RATINGS ================= */
  const fetchRatings = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/admin_feedback.php`,
        authConfig
      );

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];

      setRatings(data);
    } catch (err) {
      console.error("Ratings API failed");
      setRatings([]);
      setError("Failed to load ratings");
    }
  };

  /* ================= APPROVE / HIDE ================= */
  const toggleApproval = async (id, approved) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("approved", approved);

      await axios.post(
        `${API_BASE}/admin_feedback_toggle.php`,
        formData,
        authConfig
      );

      fetchRatings();
    } catch (err) {
      console.error("Approval toggle failed");
      alert("Failed to update approval");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xl font-bold">
            {stats.total_users ?? "-"}
          </p>
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Total Queries</p>
          <p className="text-xl font-bold">
            {stats.total_queries ?? "-"}
          </p>
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-500">Total Ratings</p>
          <p className="text-xl font-bold">
            {stats.total_ratings ?? "-"}
          </p>
        </div>
      </div>

      {/* ===== USERS ===== */}
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <table className="min-w-full border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== QUERIES ===== */}
      <h2 className="text-xl font-bold mb-2">Queries</h2>
      <table className="min-w-full border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((q) => (
            <tr key={q.id}>
              <td className="border p-2">{q.name}</td>
              <td className="border p-2">{q.email}</td>
              <td className="border p-2">{q.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== RATINGS ===== */}
      <h2 className="text-xl font-bold mb-2">Ratings</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.rating}</td>
              <td className="border p-2">
                {r.approved ? "Approved" : "Pending"}
              </td>
              <td className="border p-2">
                {r.approved ? (
                  <button
                    onClick={() => toggleApproval(r.id, 0)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    onClick={() => toggleApproval(r.id, 1)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
