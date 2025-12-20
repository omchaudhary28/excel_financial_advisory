import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [activeTab, setActiveTab] = useState("queries");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const q = await api.get("/admin_queries.php");
        setUsers(q.data.users);
        setQueries(q.data.queries);

        const f = await api.get("/admin_feedback.php");
        setFeedback(f.data.data);
      } catch {
        setError("Failed to load admin dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const makeAdmin = async (id) => {
    await api.post("/admin_make_admin.php", { user_id: id });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: "admin" } : u))
    );
  };

  if (loading) return <LoadingSpinner text="Loading Admin..." />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-6 mb-6">
        <button onClick={() => setActiveTab("queries")}>Queries</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("ratings")}>Ratings</button>
      </div>

      {activeTab === "queries" && (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id}>
                <td>{q.query_name}</td>
                <td>{q.query_email}</td>
                <td>{q.subject}</td>
                <td>{q.message}</td>
                <td>
                  <a href={`mailto:${q.query_email}`}>📧</a>{" "}
                  {q.user_phone && (
                    <>
                      <a href={`tel:${q.user_phone}`}>📞</a>{" "}
                      <a href={`https://wa.me/${q.user_phone}`}>💬</a>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "users" && (
        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button onClick={() => makeAdmin(u.id)}>
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "ratings" && (
        <table className="w-full border">
          <thead>
            <tr>
              <th>User</th><th>Email</th><th>Rating</th><th>Message</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((f) => (
              <tr key={f.id}>
                <td>{f.name}</td>
                <td>{f.email}</td>
                <td>{f.rating} ⭐</td>
                <td>{f.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
