import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        "http://localhost/FINANCIAL-project/api/get_testimonials.php"
      );

      if (res.data.success) {
        setTestimonials(res.data.data);
      } else {
        setError("Failed to load testimonials");
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, approved) => {
    try {
      await axios.post(
        "http://localhost/FINANCIAL-project/api/update_testimonial_status.php",
        {
          id,
          approved,
        }
      );
      fetchTestimonials();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Rating</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.email}</td>
                <td className="border p-2">{item.rating}</td>
                <td className="border p-2">{item.message}</td>
                <td className="border p-2">
                  {item.approved ? "Approved" : "Pending"}
                </td>
                <td className="border p-2 space-x-2">
                  {!item.approved && (
                    <button
                      onClick={() => updateStatus(item.id, true)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                  )}

                  {item.approved && (
                    <button
                      onClick={() => updateStatus(item.id, false)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Hide
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
