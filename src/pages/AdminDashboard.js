import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://excel-financial-advisory-backend.onrender.com"
    : "http://localhost/FINANCIAL-project/backend-render";

const AdminDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin_feedback.php`, {
        withCredentials: true,
      });
      setRatings(res.data.data || res.data);
    } catch (err) {
      setError("Failed to load ratings");
    }
  };

  const toggleApproval = async (id, approved) => {
    try {
      await axios.post(
        `${API_BASE}/admin_feedback_toggle.php`,
        { id, approved },
        { withCredentials: true }
      );
      fetchRatings();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {error && <p className="text-red-500">{error}</p>}

      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {ratings.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.rating}</td>
              <td className="border p-2">
                {r.approved ? "Approved" : "Pending"}
              </td>
              <td className="border p-2">
                {r.approved ? (
                  <button
                    onClick={() => toggleApproval(r.id, 0)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hide
                  </button>
                ) : (
                  <button
                    onClick={() => toggleApproval(r.id, 1)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
