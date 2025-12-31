import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiUsers, FiMessageSquare, FiStar, FiBarChart2 } from "react-icons/fi";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://excel-financial-advisory-backend.onrender.com"
    : "http://localhost/FINANCIAL-project/backend-render";

const PAGE_SIZE = 5;

const StatCard = ({ icon, title, value, color }) => (
  <div className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105`}>
    <div className="flex items-center">
      <div className={`p-3 rounded-full bg-${color}-100 dark:bg-${color}-900`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value ?? "-"}</p>
      </div>
    </div>
  </div>
);

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

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchQueries();
    fetchRatings();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin_stats.php`, authConfig);
      setStats(res.data || {});
    } catch {
      setStats({});
    }
  };

  const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/admin_users.php`, authConfig);
    const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
    setUsers(data);
  };

  const fetchQueries = async () => {
    const res = await axios.get(`${API_BASE}/admin_queries.php`, authConfig);
    const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
    setQueries(data);
  };

  const fetchRatings = async () => {
    const res = await axios.get(`${API_BASE}/admin_feedback.php`, authConfig);
    const data = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
    setRatings(data);
  };

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

  const paginate = (data, page) => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  };

  const totalUserPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const totalQueryPages = Math.max(1, Math.ceil(queries.length / PAGE_SIZE));
  const totalRatingPages = Math.max(1, Math.ceil(ratings.length / PAGE_SIZE));

  const toggleApproval = async (id, approved) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("approved", approved);

      await axios.post(`${API_BASE}/admin_feedback_toggle.php`, formData, { ...authConfig, withCredentials: true });
      fetchRatings();
    } catch {
      alert("Failed to update approval");
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center">
            <FiBarChart2 className="mr-3 text-primary" />
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Welcome back, Admin. Here's a summary of your application's activity.
          </p>
        </header>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard icon={<FiUsers className="text-blue-500" />} title="Total Users" value={stats.total_users} color="blue" />
          <StatCard icon={<FiMessageSquare className="text-green-500" />} title="Total Queries" value={stats.total_queries} color="green" />
          <StatCard icon={<FiStar className="text-yellow-500" />} title="Total Ratings" value={stats.total_ratings} color="yellow" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== USERS ===== */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Users</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(users, userPage).map((u) => (
                    <tr key={u.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-3 text-gray-800 dark:text-gray-200">{u.name}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="btn-secondary" disabled={userPage <= 1} onClick={() => setUserPage(p => p - 1)}>Prev</button>
              <span className="text-sm text-gray-600 dark:text-gray-400">{userPage} / {totalUserPages}</span>
              <button className="btn-secondary" disabled={userPage >= totalUserPages} onClick={() => setUserPage(p => p + 1)}>Next</button>
            </div>
          </div>

          {/* ===== QUERIES ===== */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Queries</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                    <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {paginate(queries, queryPage).map((q) => (
                    <tr key={q.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="p-3 text-gray-800 dark:text-gray-200">{q.name}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 truncate max-w-xs">{q.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button className="btn-secondary" disabled={queryPage <= 1} onClick={() => setQueryPage(p => p - 1)}>Prev</button>
              <span className="text-sm text-gray-600 dark:text-gray-400">{queryPage} / {totalQueryPages}</span>
              <button className="btn-secondary" disabled={queryPage >= totalQueryPages} onClick={() => setQueryPage(p => p + 1)}>Next</button>
            </div>
          </div>
        </div>

        {/* ===== RATINGS ===== */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Ratings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Name</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Rating</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(ratings, ratingPage).map((r) => (
                  <tr key={r.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-3 text-gray-800 dark:text-gray-200">{r.name}</td>
                    <td className="p-3 text-yellow-500 font-bold">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${r.approved ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                        {r.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      {r.approved ? (
                        <button className="btn-danger" onClick={() => toggleApproval(r.id, 0)}>Hide</button>
                      ) : (
                        <button className="btn-success" onClick={() => toggleApproval(r.id, 1)}>Approve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button className="btn-secondary" disabled={ratingPage <= 1} onClick={() => setRatingPage(p => p - 1)}>Prev</button>
            <span className="text-sm text-gray-600 dark:text-gray-400">{ratingPage} / {totalRatingPages}</span>
            <button className="btn-secondary" disabled={ratingPage >= totalRatingPages} onClick={() => setRatingPage(p => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
