import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";
import {
  FiUsers,
  FiMessageSquare,
  FiStar,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiGlobe, // Added for website reach icon
} from "react-icons/fi";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [stats, setStats] = useState({}); // New state for statistics
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");

  const fetchAdminData = async () => {
    try {
      const [queriesRes, usersRes, ratingsRes, statsRes] = await Promise.all([
        api.get("/admin_queries.php"),
        api.get("/admin_users.php"),
        api.get("/admin_feedback.php"),
        api.get("/admin_stats.php"), // New API call
      ]);

      if (!queriesRes.data.success || !usersRes.data.success || !statsRes.data.success) {
        throw new Error();
      }

      setQueries(queriesRes.data.data || queriesRes.data.queries || []);
      setUsers(usersRes.data.data || usersRes.data.users || []);
      setRatings(ratingsRes.data.data || []);
      setStats(statsRes.data.data); // Set statistics state
    } catch (err) {
      setError("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const toggleApproval = async (id, approved) => {
    try {
      await api.post("/admin_feedback_toggle.php", { id, approved });
      setRatings((prev) =>
        prev.map((r) => (r.id === id ? { ...r, approved } : r))
      );
    } catch {
      setError("Failed to update approval status.");
    }
  };

  const makeAdmin = async (id) => {
    try {
      await api.post("/admin_make_admin.php", { user_id: id });
      fetchAdminData();
    } catch {
      alert("Failed to promote user");
    }
  };

  const whatsappLink = (phone) =>
    phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "#";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-danger">
        {error}
      </div>
    );
  }

  const TabButton = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition duration-200 ease-in-out ${
        activeTab === tab
          ? "bg-primary text-text-inverted shadow-strong"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-5 flex items-center justify-between bg-white dark:bg-gray-800 shadow-strong rounded-lg">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Website Reach</p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.website_reach}</h2>
          </div>
          <FiGlobe className="text-primary-light text-4xl" />
        </div>
        <div className="card p-5 flex items-center justify-between bg-white dark:bg-gray-800 shadow-strong rounded-lg">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Queries</p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total_queries}</h2>
          </div>
          <FiMessageSquare className="text-secondary-light text-4xl" />
        </div>
        <div className="card p-5 flex items-center justify-between bg-white dark:bg-gray-800 shadow-strong rounded-lg">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total_users}</h2>
          </div>
          <FiUsers className="text-success-light text-4xl" />
        </div>
        <div className="card p-5 flex items-center justify-between bg-white dark:bg-gray-800 shadow-strong rounded-lg">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">New Users This Weekend</p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.new_users_weekend}</h2>
          </div>
          <FiUsers className="text-info-light text-4xl" />
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <TabButton tab="queries" label="Queries" icon={<FiMessageSquare />} />
        <TabButton tab="users" label="Users" icon={<FiUsers />} />
        <TabButton tab="ratings" label="Ratings" icon={<FiStar />} />
      </div>

          <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow-strong">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-950 text-gray-600 dark:text-white uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Query Name</th>
                <th className="py-3 px-6 text-left">Subject</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-center">Contact</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-white text-sm font-light">
              {queries.map((q, index) => (
                <tr
                  key={q.id}
                  className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {q.query_name}
                  </td>
                  <td className="py-3 px-6 text-left">{q.subject}</td>
                  <td className="py-3 px-6 text-left">{q.message}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <a
                        href={`mailto:${q.query_email}`}
                        className="text-primary hover:text-primary-light"
                        title="Send Email"
                      >
                        <FiMail className="w-5 h-5" />
                      </a>
                      {q.user_phone && (
                        <a
                          href={whatsappLink(q.user_phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-green-500 hover:text-green-600"
                          title="Contact via WhatsApp"
                        >
                          <FiPhone className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "users" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-strong">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-white text-sm font-light">
              {users.map((u, index) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {u.name}
                  </td>
                  <td className="py-3 px-6 text-left">{u.email}</td>
                  <td className="py-3 px-6 text-left">{u.phone || "-"}</td>
                  <td className="py-3 px-6 text-left">{u.role}</td>
                  <td className="py-3 px-6 text-center">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(u.id)}
                        className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1"
                      >
                        <FiCheckCircle className="w-4 h-4" /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "ratings" && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-strong">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Rating</th>
                <th className="py-3 px-6 text-left">Message</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-white text-sm font-light">
              {ratings.map((r, index) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 ease-in-out"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="py-3 px-6 text-left">{r.email}</td>
                  <td className="py-3 px-6 text-left">{r.rating} ⭐</td>
                  <td className="py-3 px-6 text-left">{r.message}</td>
                  <td className="py-3 px-6 text-left">
                    <span
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                        r.approved
                          ? "text-green-900 dark:text-green-200"
                          : "text-orange-900 dark:text-orange-200"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`absolute inset-0 opacity-50 rounded-full ${
                          r.approved
                            ? "bg-green-200 dark:bg-green-700"
                            : "bg-orange-200 dark:bg-orange-700"
                        }`}
                      ></span>
                      <span className="relative">
                        {r.approved ? "Approved" : "Pending"}
                      </span>
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => toggleApproval(r.id, !r.approved)}
                      className={`${
                        r.approved ? "btn-danger" : "btn-primary"
                      } text-xs py-2 px-4 inline-flex items-center gap-1`}
                    >
                      {r.approved ? "Hide" : "Approve"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )}
      </div>
    </div>
  );
}

export default AdminDashboard;
