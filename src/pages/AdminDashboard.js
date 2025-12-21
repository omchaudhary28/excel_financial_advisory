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
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");

  const toggleApproval = async (id, approved) => {
    await api.post("/admin_feedback_toggle.php", { id, approved });
    setFeedback((f) =>
      f.map((x) => (x.id === id ? { ...x, approved } : x))
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

      // ✅ LOGIC FIX: ALWAYS SET ARRAY
      setRatings(
        Array.isArray(rRes.data?.ratings)
          ? rRes.data.ratings
          : Array.isArray(rRes.data?.data)
          ? rRes.data.data
          : []
      );
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
      await fetchAdminData();
    } catch {
      alert("Failed to promote user");
    }
  };

  const whatsappLink = (phone) =>
    phone ? `https://wa.me/${phone.replace(/\D/g, "")}` : "#";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-danger-light text-danger p-4 rounded-lg shadow-md">
          {error}
        </div>
      </div>
    );
  }

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
        activeTab === tabName
          ? "bg-primary text-text-inverted shadow-lg"
          : "text-text-muted dark:text-text-inverted hover:bg-gray-200 dark:hover:bg-gray-800 transform hover:-translate-y-2 hover:shadow-lg"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <TabButton tabName="queries" label="Queries" icon={<FiMessageSquare />} />
        <TabButton tabName="users" label="Users" icon={<FiUsers />} />
        <TabButton tabName="ratings" label="Ratings" icon={<FiStar />} />
      </div>

      <div className="card">
        {activeTab === "queries" && (
          <QueriesTable queries={queries} whatsappLink={whatsappLink} />
        )}
        {activeTab === "users" && (
          <UsersTable users={users} makeAdmin={makeAdmin} />
        )}
        {activeTab === "ratings" && <RatingsTable ratings={ratings} />}
      </div>
    </div>
  );
}

/* ---------------- TABLES (UNCHANGED UI) ---------------- */

const QueriesTable = ({ queries, whatsappLink }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left table-auto">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-text-muted dark:text-gray-300 uppercase text-sm">
        <tr>
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Subject</th>
          <th className="px-6 py-3 border-b hidden md:table-cell">Message</th>
          <th className="px-6 py-3 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {queries.map((q) => (
          <tr key={q.id}>
            <td className="px-6 py-4">
              {q.query_name}
              <br />
              <span className="text-xs text-gray-500">
                {q.query_email}
              </span>
            </td>
            <td className="px-6 py-4">{q.subject}</td>
            <td className="px-6 py-4 hidden md:table-cell truncate">
              {q.message}
            </td>
            <td className="px-6 py-4 flex gap-4">
              <a href={`mailto:${q.query_email}`}><FiMail /></a>
              {q.user_phone && (
                <>
                  <a href={`tel:${q.user_phone}`}><FiPhone /></a>
                  <a href={whatsappLink(q.user_phone)}>💬</a>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const UsersTable = ({ users, makeAdmin }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left table-auto">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 uppercase text-sm">
        <tr>
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Email</th>
          <th className="px-6 py-3 border-b hidden md:table-cell">Phone</th>
          <th className="px-6 py-3 border-b">Role</th>
          <th className="px-6 py-3 border-b">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td className="px-6 py-4">{u.name}</td>
            <td className="px-6 py-4">{u.email}</td>
            <td className="px-6 py-4 hidden md:table-cell">{u.phone || "-"}</td>
            <td className="px-6 py-4">{u.role}</td>
            <td className="px-6 py-4">
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
  </div>
);

const RatingsTable = ({ ratings }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left table-auto">
      <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 uppercase text-sm">
        <tr>
          <th className="px-6 py-3 border-b">User</th>
          <th className="px-6 py-3 border-b hidden md:table-cell">Email</th>
          <th className="px-6 py-3 border-b">Rating</th>
          <th className="px-6 py-3 border-b">Feedback</th>
          <th className="px-6 py-3 border-b hidden sm:table-cell">Date</th>
        </tr>
      </thead>
      <tbody>
        {ratings.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4">{item.name || "User"}</td>
            <td className="px-6 py-4 hidden md:table-cell">{item.email}</td>
            <td className="px-6 py-4 flex gap-1">
              {item.rating} <FiStar />
            </td>
            <td className="px-6 py-4 truncate">{item.message}</td>
            <td className="px-6 py-4 hidden sm:table-cell">
              {new Date(item.created_at).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
