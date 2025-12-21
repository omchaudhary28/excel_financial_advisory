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

  // 🔑 LOGIC FIX: approval updates ratings directly
  const toggleApproval = async (id, approved) => {
    await api.post("/admin_feedback_approve.php", { id, approved });

    setRatings((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, approved } : r
      )
    );
  };

  const fetchAdminData = async () => {
    try {
      const [qRes, rRes] = await Promise.all([
        api.get("/admin_queries.php"),
        api.get("/admin_feedback.php"),
      ]);

      if (!qRes.data.success) throw new Error();

      setUsers(qRes.data.users || []);
      setQueries(qRes.data.queries || []);

      // ✅ ALWAYS ARRAY (prevents .map crash)
      setRatings(
        Array.isArray(rRes.data?.data)
          ? rRes.data.data
          : []
      );
    } catch {
      setError("Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const makeAdmin = async (id) => {
    await api.post("/admin_make_admin.php", { user_id: id });
    fetchAdminData();
  };

  const whatsappLink = (phone) =>
    phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "#";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-danger-light text-danger p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b pb-4">
        <button onClick={() => setActiveTab("queries")}>Queries</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("ratings")}>Ratings</button>
      </div>

      {activeTab === "ratings" && (
        <RatingsTable
          ratings={ratings}
          toggleApproval={toggleApproval}
        />
      )}
    </div>
  );
}

/* -------- TABLE (UI UNCHANGED) -------- */

const RatingsTable = ({ ratings, toggleApproval }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Feedback</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {ratings.map((item) => (
          <tr key={item.id}>
            <td>{item.name || "User"}</td>
            <td>{item.email}</td>
            <td>
              {item.rating} <FiStar />
            </td>
            <td>{item.message}</td>
            <td>
              <button
                onClick={() =>
                  toggleApproval(item.id, !item.approved)
                }
              >
                {item.approved ? "Hide" : "Approve"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
