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
import { API_BASE_URL } from "../config"; // Import API_BASE_URL

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");

  const toggleApproval = async (id, approved) => {
    try {
      await api.post(`${API_BASE_URL}/admin_feedback_toggle.php`, { id, approved }); // Use API_BASE_URL
      setFeedback((f) =>
        f.map((x) => (x.id === id ? { ...x, approved } : x))
      );
    } catch (err) {
      setError("Failed to toggle approval status.");
    }
  };

  const fetchAdminData = async () => {
    try {
      const [qRes, rRes] = await Promise.all([
        api.get(`${API_BASE_URL}/admin_queries.php`),
        api.get(`${API_BASE_URL}/admin_feedback.php`),
      ]);

      if (!qRes.data.success) throw new Error();

      setUsers(qRes.data.users || []);
      setQueries(qRes.data.queries || []);
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
      await api.post(`${API_BASE_URL}/admin_make_admin.php`, { user_id: id }); // Use API_BASE_URL
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
        <div className="bg-danger/10 border border-danger text-danger p-4 rounded-lg">
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
          : "text-text-muted dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transform hover:-translate-y-0.5 hover:shadow-md"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10" data-aos="fade-up">
      <h1 className="text-3xl font-bold mb-6 text-text dark:text-white">
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4" data-aos="fade-up" data-aos-delay="100">
        <TabButton tabName="queries" label="Queries" icon={<FiMessageSquare className="w-5 h-5" />} />
        <TabButton tabName="users" label="Users" icon={<FiUsers className="w-5 h-5" />} />
        <TabButton tabName="ratings" label="Ratings" icon={<FiStar className="w-5 h-5" />} />
      </div>

      <div className="card" data-aos="fade-up" data-aos-delay="200">
        {activeTab === "queries" && (
          <QueriesTable queries={queries} whatsappLink={whatsappLink} />
        )}
        {activeTab === "users" && (
          <UsersTable users={users} makeAdmin={makeAdmin} />
        )}
        {activeTab === "ratings" && (
          <RatingsTable ratings={ratings} toggleApproval={toggleApproval} />
        )}
      </div>
    </div>
  );
}

const BaseTable = ({ children }) => (
  <div className="overflow-x-auto rounded-lg shadow-md">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </table>
  </div>
);

const TableHead = ({ children }) => (
  <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>{children}</tr>
  </thead>
);

const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-text-muted dark:text-gray-300 uppercase tracking-wider">
    {children}
  </th>
);

const TableBody = ({ children }) => (
  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
    {children}
  </tbody>
);

const TableRow = ({ children, index }) => (
  <tr className={index % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}>
    {children}
  </tr>
);

const TableData = ({ children, className = "" }) => (
  <td className={`px-6 py-4 whitespace-nowrap text-sm text-text dark:text-gray-200 ${className}`}>
    {children}
  </td>
);

const QueriesTable = ({ queries, whatsappLink }) => (
  <BaseTable>
    <TableHead>
      <TableHeader>Name</TableHeader>
      <TableHeader>Subject</TableHeader>
      <TableHeader className="hidden md:table-cell">Message</TableHeader>
      <TableHeader>Actions</TableHeader>
    </TableHead>
    <TableBody>
      {queries.map((q, index) => (
        <TableRow key={q.id} index={index}>
          <TableData>
            {q.query_name}
            <br />
            <span className="text-xs text-text-muted dark:text-gray-500">
              {q.query_email}
            </span>
          </TableData>
          <TableData>{q.subject}</TableData>
          <TableData className="hidden md:table-cell truncate max-w-xs">{q.message}</TableData>
          <TableData>
            <div className="flex gap-3 text-lg">
              <a href={`mailto:${q.query_email}`} className="text-primary hover:text-primary-light transition-colors"><FiMail /></a>
              {q.user_phone && (
                <>
                  <a href={`tel:${q.user_phone}`} className="text-primary hover:text-primary-light transition-colors"><FiPhone /></a>
                  <a href={whatsappLink(q.user_phone)} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 transition-colors">💬</a>
                </>
              )}
            </div>
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  </BaseTable>
);

const UsersTable = ({ users, makeAdmin }) => (
  <BaseTable>
    <TableHead>
      <TableHeader>Name</TableHeader>
      <TableHeader>Email</TableHeader>
      <TableHeader className="hidden md:table-cell">Phone</TableHeader>
      <TableHeader>Role</TableHeader>
      <TableHeader>Action</TableHeader>
    </TableHead>
    <TableBody>
      {users.map((u, index) => (
        <TableRow key={u.id} index={index}>
          <TableData>{u.name}</TableData>
          <TableData>{u.email}</TableData>
          <TableData className="hidden md:table-cell">{u.phone || "-"}</TableData>
          <TableData>{u.role}</TableData>
          <TableData>
            {u.role !== "admin" && (
              <button onClick={() => makeAdmin(u.id)} className="btn-primary btn-sm flex items-center gap-1">
                <FiCheckCircle /> Make Admin
              </button>
            )}
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  </BaseTable>
);

const RatingsTable = ({ ratings, toggleApproval }) => (
  <BaseTable>
    <TableHead>
      <TableHeader>User</TableHeader>
      <TableHeader className="hidden md:table-cell">Email</TableHeader>
      <TableHeader>Rating</TableHeader>
      <TableHeader>Feedback</TableHeader>
      <TableHeader>Status</TableHeader>
      <TableHeader>Date</TableHeader>
      <TableHeader>Actions</TableHeader>
    </TableHead>
    <TableBody>
      {ratings.map((item, index) => (
        <TableRow key={item.id} index={index}>
          <TableData>{item.name || "User"}</TableData>
          <TableData className="hidden md:table-cell">{item.email}</TableData>
          <TableData>
            <div className="flex items-center gap-1 text-yellow-500">
              {item.rating} <FiStar />
            </div>
          </TableData>
          <TableData className="truncate max-w-xs">{item.message}</TableData>
          <TableData>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                item.approved
                  ? "bg-success/20 text-success"
                  : "bg-danger/20 text-danger"
              }`}
            >
              {item.approved ? "Approved" : "Pending"}
            </span>
          </TableData>
          <TableData>{new Date(item.created_at).toLocaleString()}</TableData>
          <TableData>
            <button
              onClick={() => toggleApproval(item.id, !item.approved)}
              className={`${item.approved ? "btn-danger" : "btn-success"} btn-sm`} // Apply btn classes
            >
              {item.approved ? "Hide" : "Approve"}
            </button>
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  </BaseTable>
);

export default AdminDashboard;
