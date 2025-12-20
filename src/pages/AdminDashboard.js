import React, { useState, useEffect } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [feedback, setFeedback] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [activeTab, setActiveTab] = useState("queries"); // queries | users
  const [activeQueryTab, setActiveQueryTab] = useState("all"); // all | query | contact

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Missing auth token");
        }

        // 🔐 ADMIN QUERIES
        const res = await api.get("/admin_queries.php", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.data?.success) {
          throw new Error("Invalid admin response");
        }

        setUsers(res.data.users || []);
        setQueries(res.data.queries || []);

        // 🔐 FEEDBACK (optional endpoint)
        try {
          const feedbackRes = await api.get("/admin_feedback.php", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setFeedback(feedbackRes.data?.data || feedbackRes.data || []);
        } catch {
          // feedback endpoint may not exist yet — ignore safely
          setFeedback([]);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else if (err.response?.status === 403) {
          setError("Forbidden: Admin access required.");
        } else {
          setError("Failed to load admin dashboard data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const getWhatsAppLink = (phone) => {
    if (!phone) return "#";
    return `https://wa.me/${phone.replace(/\D/g, "")}`;
  };

  /* ---------------- FILTERING ---------------- */

  const filteredQueries = queries
    .filter((q) => (activeQueryTab === "all" ? true : q.type === activeQueryTab))
    .filter((q) =>
      [
        q.query_name,
        q.query_email,
        q.subject,
        q.message,
        q.user_name,
        q.user_email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.created_at) - new Date(a.created_at)
        : a.query_name.localeCompare(b.query_name)
    );

  const filteredUsers = users
    .filter((u) =>
      [u.name, u.email, u.phone]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.created_at) - new Date(a.created_at)
        : a.name.localeCompare(b.name)
    );

  /* ---------------- RENDER ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading admin dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-8">
          <button
            onClick={() => setActiveTab("queries")}
            className={activeTab === "queries" ? "font-bold text-primary" : ""}
          >
            Queries
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "font-bold text-primary" : ""}
          >
            Users
          </button>
        </div>

        {/* Feedback */}
        {feedback.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4">User Feedback</h3>
            {feedback.map((f) => (
              <div key={f.id} className="border p-4 rounded mb-3">
                <p>
                  <strong>Rating:</strong> {f.rating} ⭐
                </p>
                <p>{f.message}</p>
                <p className="text-sm text-gray-500">{f.created_at}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="mb-6 w-full p-3 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tables */}
        {activeTab === "queries" ? (
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(filteredQueries, null, 2)}
          </pre>
        ) : (
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(filteredUsers, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
