import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://excel-financial-advisory-backend.onrender.com"
    : "http://localhost/FINANCIAL-project/backend-render";

const PAGE_SIZE = 5;

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [userPage, setUserPage] = useState(1);
  const [queryPage, setQueryPage] = useState(1);
  const [ratingPage, setRatingPage] = useState(1);

  const token = localStorage.getItem("token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  /* ================= LOAD DATA ================= */
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
      const res = await axios.get(`${API_BASE}/admin_stats.php`, authConfig);
      setStats(res.data || {});
    } catch {
      setStats({});
    }
  };

  /* ================= USERS ================= */
  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/admin_users.php`, authConfig);
    const data = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
      ? res.data.data
      : [];
    setUsers(data);
  };

  /* ================= QUERIES ================= */
  const fetchQueries = async () => {
    const res = await axios.get(`${API_BASE}/admin_queries.php`, authConfig);
    const data = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
      ? res.data.data
      : [];
    setQueries(data);
  };

  /* ================= RATINGS ================= */
  const fetchRatings = async () => {
    const res = await axios.get(`${API_BASE}/admin_feedback.php`, authConfig);
    const data = Array.isArray(res.data)
      ? res.data
      : Array.isArray(res.data.data)
      ? res.data.data
      : [];
    setRatings(data);
  };

  /* ================= ROOT FIX: PAGE RESET ================= */
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
    if (userPage > totalPages) setUserPage(1);
  }, [users, userPage]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(queries.length / PAGE_SIZE));
    if (queryPage > totalPages) setQueryPage(1);
  }, [queries, queryPage]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(ratings.length / PAGE_SIZE));
    if (ratingPage > totalPages) setRatingPage(1);
  }, [ratings, ratingPage]);

  /* ================= SAFE PAGINATION ================= */
  const paginate = (data, page) => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  };

  const totalUserPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const totalQueryPages = Math.max(1, Math.ceil(queries.length / PAGE_SIZE));
  const totalRatingPages = Math.max(1, Math.ceil(ratings.length / PAGE_SIZE));

  /* ================= APPROVE / HIDE ================= */
  const toggleApproval = async (id, approved) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("approved", approved);

     await axios.post(
  `${API_BASE}/admin_feedback_toggle.php`,
  formData,
  { ...authConfig, withCredentials: true }
);


      fetchRatings();
    } catch {
      alert("Failed to update approval");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded">
          <p>Total Users</p>
          <p className="text-xl font-bold">{stats.total_users ?? "-"}</p>
        </div>
        <div className="border p-4 rounded">
          <p>Total Queries</p>
          <p className="text-xl font-bold">{stats.total_queries ?? "-"}</p>
        </div>
        <div className="border p-4 rounded">
          <p>Total Ratings</p>
          <p className="text-xl font-bold">{stats.total_ratings ?? "-"}</p>
        </div>
      </div>

      {/* ===== USERS ===== */}
      <h2 className="text-xl font-bold mb-2">Users</h2>
      <table className="min-w-full border mb-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {paginate(users, userPage).map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-8">
        <button disabled={userPage <= 1} onClick={() => setUserPage(p => p - 1)}>Prev</button>
        <span className="mx-2">{userPage} / {totalUserPages}</span>
        <button disabled={userPage >= totalUserPages} onClick={() => setUserPage(p => p + 1)}>Next</button>
      </div>

      {/* ===== QUERIES ===== */}
      <h2 className="text-xl font-bold mb-2">Queries</h2>
      <table className="min-w-full border mb-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {paginate(queries, queryPage).map((q) => (
            <tr key={q.id}>
              <td className="border p-2">{q.name}</td>
              <td className="border p-2">{q.email}</td>
              <td className="border p-2">{q.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-8">
        <button disabled={queryPage <= 1} onClick={() => setQueryPage(p => p - 1)}>Prev</button>
        <span className="mx-2">{queryPage} / {totalQueryPages}</span>
        <button disabled={queryPage >= totalQueryPages} onClick={() => setQueryPage(p => p + 1)}>Next</button>
      </div>

      {/* ===== RATINGS (RESTORED) ===== */}
      <h2 className="text-xl font-bold mb-2">Ratings</h2>
      <table className="min-w-full border mb-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginate(ratings, ratingPage).map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.rating}</td>
              <td className="border p-2">
                {r.approved ? "Approved" : "Pending"}
              </td>
              <td className="border p-2">
                {r.approved ? (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => toggleApproval(r.id, 0)}
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => toggleApproval(r.id, 1)}
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button disabled={ratingPage <= 1} onClick={() => setRatingPage(p => p - 1)}>Prev</button>
        <span className="mx-2">{ratingPage} / {totalRatingPages}</span>
        <button disabled={ratingPage >= totalRatingPages} onClick={() => setRatingPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
