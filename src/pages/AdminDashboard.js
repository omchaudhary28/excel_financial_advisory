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
} from "react-icons/fi";

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
      setRatings(rRes.data.data || []);
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
      className={`px-4 py-2 rounded-lg font-semibold ${
        activeTab === tab ? "bg-primary text-white" : "text-gray-400"
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <TabButton tab="queries" label="Queries" icon={<FiMessageSquare />} />
        <TabButton tab="users" label="Users" icon={<FiUsers />} />
        <TabButton tab="ratings" label="Ratings" icon={<FiStar />} />
      </div>

      {activeTab === "queries" && (
        <table className="w-full">
          <tbody>
            {queries.map((q) => (
              <tr key={q.id}>
                <td>{q.query_name}</td>
                <td>{q.subject}</td>
                <td>{q.message}</td>
                <td>
                  <a href={`mailto:${q.query_email}`}><FiMail /></a>
                  {q.user_phone && (
                    <a href={whatsappLink(q.user_phone)} target="_blank" rel="noreferrer">
                      <FiPhone />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "users" && (
        <table className="w-full">
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || "-"}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button onClick={() => makeAdmin(u.id)}>
                      <FiCheckCircle /> Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "ratings" && (
        <table className="w-full">
          <tbody>
            {ratings.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.rating} ⭐</td>
                <td>{r.message}</td>
                <td>{r.approved ? "Approved" : "Pending"}</td>
                <td>
                  <button onClick={() => toggleApproval(r.id, !r.approved)}>
                    {r.approved ? "Hide" : "Approve"}
                  </button>
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
