import React, { useEffect, useState } from "react";
import api from "../services/api";
import { LoadingSpinner } from "../components/Notifications";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("queries");

  const fetchAdminData = async () => {
    try {
      const res = await api.get("/admin_queries.php");
      if (!res.data.success) throw new Error();
      setUsers(res.data.users);
      setQueries(res.data.queries);
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
    try {
      await api.post("/admin_make_admin.php", { user_id: id });
      await fetchAdminData(); // 🔁 DB truth reload
    } catch {
      alert("Failed to promote user");
    }
  };

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

      <div className="flex gap-6 border-b mb-6">
        <button
          className={activeTab === "queries" ? "font-bold text-primary" : ""}
          onClick={() => setActiveTab("queries")}
        >
          Queries
        </button>
        <button
          className={activeTab === "users" ? "font-bold text-primary" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "users" && (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
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

      {activeTab === "queries" && (
        <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
          {JSON.stringify(queries, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default AdminDashboard;
