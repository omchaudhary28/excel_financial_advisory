import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");

  const fetchAdminData = async () => {
    try {
      const [qRes, rRes] = await Promise.all([
        api.get("/admin_queries.php"),
        api.get("/admin_feedback.php"),
      ]);

      if (!qRes.data.success) throw new Error();

      setUsers(qRes.data.users || []);
      setQueries(qRes.data.queries || []);
      setRatings(rRes.data.data || rRes.data || []);
    } catch (err) {
      setError("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await api.post("/admin_make_admin.php", { user_id: id });
      await fetchAdminData(); // reload DB truth
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
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-6">
        <button onClick={() => setActiveTab("queries")}>Queries</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("ratings")}>Ratings</button>
      </div>

      {/* ================= QUERIES ================= */}
      {activeTab === "queries" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Message</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-2">{q.query_name}</td>
                <td className="p-2">{q.query_email}</td>
                <td className="p-2">{q.subject}</td>
                <td className="p-2">{q.message}</td>
                <td className="p-2 space-x-2">
                  <a href={`mailto:${q.query_email}`}>📧</a>
                  {q.user_phone && (
                    <>
                      <a href={`tel:${q.user_phone}`}>📞</a>
                      <a href={whatsappLink(q.user_phone)}>💬</a>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= USERS ================= */}
      {activeTab === "users" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.phone || "-"}</td>
                <td className="p-2 font-semibold">{u.role}</td>
                <td className="p-2">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(u.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ================= RATINGS ================= */}
      {activeTab === "ratings" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Feedback</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.name || "User"}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.phone || "-"}</td>
                <td className="p-2">{r.rating} ⭐</td>
                <td className="p-2">{r.message}</td>
                <td className="p-2">
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
