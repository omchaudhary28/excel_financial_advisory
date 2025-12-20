import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";
import { FiUsers, FiMessageSquare, FiStar, FiMail, FiPhone, FiCheckCircle } from "react-icons/fi";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");
  
  const toggleApproval = async (id, approved) => {
    await api.post("/admin_feedback_toggle.php", {
      id,
      approved
    });
    setFeedback(f =>
      f.map(x => x.id === id ? { ...x, approved } : x)
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
  
  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
        activeTab === tabName
          ? "bg-primary text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <TabButton tabName="queries" label="Queries" icon={<FiMessageSquare />} />
        <TabButton tabName="users" label="Users" icon={<FiUsers />} />
        <TabButton tabName="ratings" label="Ratings" icon={<FiStar />} />
      </div>

      <div className="bg-white dark:bg-black rounded-2xl shadow-xl overflow-hidden">
        {activeTab === "queries" && <QueriesTable queries={queries} whatsappLink={whatsappLink} />}
        {activeTab === "users" && <UsersTable users={users} makeAdmin={makeAdmin} />}
        {activeTab === "ratings" && <RatingsTable ratings={ratings} />}
      </div>
    </div>
  );
}



const QueriesTable = ({ queries, whatsappLink }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left table-auto">
      <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-sm">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Subject</th>
          <th className="px-6 py-3 hidden md:table-cell">Message</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 dark:text-gray-200">
        {queries.map((q) => (
          <tr key={q.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
            <td className="px-6 py-4 font-medium">{q.query_name}<br/><span className="text-xs text-gray-500 dark:text-gray-400">{q.query_email}</span></td>
            <td className="px-6 py-4">{q.subject}</td>
            <td className="px-6 py-4 hidden md:table-cell max-w-sm truncate">{q.message}</td>
            <td className="px-6 py-4 flex items-center gap-4">
              <a href={`mailto:${q.query_email}`} className="text-blue-500 hover:text-blue-600"><FiMail /></a>
              {q.user_phone && (
                <>
                  <a href={`tel:${q.user_phone}`} className="text-green-500 hover:text-green-600"><FiPhone /></a>
                  <a href={whatsappLink(q.user_phone)} className="text-green-500 hover:text-green-600">💬</a>
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
      <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-sm">
        <tr>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Email</th>
          <th className="px-6 py-3 hidden md:table-cell">Phone</th>
          <th className="px-6 py-3">Role</th>
          <th className="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 dark:text-gray-200">
        {users.map((u) => (
          <tr key={u.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
            <td className="px-6 py-4 font-medium">{u.name}</td>
            <td className="px-6 py-4">{u.email}</td>
            <td className="px-6 py-4 hidden md:table-cell">{u.phone || "-"}</td>
            <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'}`}>{u.role}</span></td>
            <td className="px-6 py-4">
              {u.role !== "admin" && (
                <button onClick={() => makeAdmin(u.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-2">
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
      <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 uppercase text-sm">
        <tr>
          <th className="px-6 py-3">User</th>
          <th className="px-6 py-3 hidden md:table-cell">Email</th>
          <th className="px-6 py-3">Rating</th>
          <th className="px-6 py-3">Feedback</th>
          <th className="px-6 py-3 hidden sm:table-cell">Date</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 dark:text-gray-200">
        {ratings.map((r) => (
          <tr key={r.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
            <td className="px-6 py-4 font-medium">{r.name || "User"}</td>
            <td className="px-6 py-4 hidden md:table-cell">{r.email}</td>
            <td className="px-6 py-4 flex items-center gap-1">{r.rating} <FiStar className="text-yellow-400" fill="currentColor"/></td>
            <td className="px-6 py-4 max-w-sm truncate">{r.message}</td>
            <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-500 dark:text-gray-400">{new Date(r.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminDashboard;
