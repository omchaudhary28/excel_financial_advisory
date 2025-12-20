import React, { useEffect, useState } from "react";
import api from "../services/api";

const Testimonials = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const res = await api.get("/feedback_public.php");
        if (res.data?.success) {
          setFeedback(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Loading testimonials...
      </section>
    );
  }

  if (!feedback.length) {
    return (
      <section className="py-16 text-center text-gray-500">
        No feedback available yet.
      </section>
    );
  }

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {feedback.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-strong"
            >
              {/* Rating */}
              <div className="flex items-center mb-3">
                <span className="text-yellow-400 text-lg">
                  {"★".repeat(item.rating)}
                </span>
                <span className="text-gray-400 ml-2 text-sm">
                  ({item.rating}/5)
                </span>
              </div>

              {/* Message */}
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                “{item.message}”
              </p>

              {/* Name */}
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                — {item.name || "Verified Client"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
