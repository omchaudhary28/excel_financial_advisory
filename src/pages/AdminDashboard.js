import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";
import { FiUsers, FiMessageSquare, FiStar, FiMail, FiPhone, FiChevronRight } from "react-icons/fi";

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

  if (loading) return <LoadingSpinner text="Loading Admin Dashboard..." />;
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  
  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
        activeTab === tabName
          ? "bg-primary text-white"
          : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Admin Dashboard</h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
        <TabButton tabName="queries" label="Queries" icon={<FiMessageSquare />} />
        <TabButton tabName="users" label="Users" icon={<FiUsers />} />
        <TabButton tabName="ratings" label="Ratings" icon={<FiStar />} />
      </div>

      <div className="overflow-x-auto">
        {activeTab === "queries" && (
          <Table queries={queries} />
        )}
        {activeTab === "users" && (
          <TableUsers users={users} makeAdmin={makeAdmin} />
        )}
        {activeTab === "ratings" && (
          <TableRatings feedback={feedback} />
        )}
      </div>
    </div>
  );
}

const Table = ({ queries }) => (
  <table className="w-full text-left table-auto">
    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
      <tr>
        <th className="px-6 py-3">Name</th>
        <th className="px-6 py-3">Subject</th>
        <th className="px-6 py-3 hidden md:table-cell">Message</th>
        <th className="px-6 py-3">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 dark:text-gray-200">
      {queries.map((q) => (
        <tr key={q.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 font-medium">{q.query_name}<br/><span className="text-xs text-gray-500">{q.query_email}</span></td>
          <td className="px-6 py-4">{q.subject}</td>
          <td className="px-6 py-4 hidden md:table-cell max-w-sm truncate">{q.message}</td>
          <td className="px-6 py-4">
            <a href={`mailto:${q.query_email}`} className="text-primary hover:underline inline-flex items-center gap-1"><FiMail/> Email</a>
            {q.user_phone && (
              <>
                <a href={`tel:${q.user_phone}`} className="text-primary hover:underline ml-4 inline-flex items-center gap-1"><FiPhone/> Call</a>
              </>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const TableUsers = ({ users, makeAdmin }) => (
  <table className="w-full text-left table-auto">
    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
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
        <tr key={u.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 font-medium">{u.name}</td>
          <td className="px-6 py-4">{u.email}</td>
          <td className="px-6 py-4 hidden md:table-cell">{u.phone}</td>
          <td className="px-6 py-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{u.role}</span></td>
          <td className="px-6 py-4">
            {u.role !== "admin" && (
              <button onClick={() => makeAdmin(u.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                Make Admin
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const TableRatings = ({ feedback }) => (
  <table className="w-full text-left table-auto">
    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
      <tr>
        <th className="px-6 py-3">User</th>
        <th className="px-6 py-3">Rating</th>
        <th className="px-6 py-3">Message</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 dark:text-gray-200">
      {feedback.map((f) => (
        <tr key={f.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="px-6 py-4 font-medium">{f.name}<br/><span className="text-xs text-gray-500">{f.email}</span></td>
          <td className="px-6 py-4"><div className="flex items-center gap-1">{f.rating} <FiStar className="text-yellow-400"/></div></td>
          <td className="px-6 py-4">{f.message}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminDashboard;
