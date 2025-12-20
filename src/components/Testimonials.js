import React, { useEffect, useState } from "react";
import api from "../services/api";

const Testimonials = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/feedback_public.php")
      .then((res) => {
        if (res.data?.success) {
          setFeedback(res.data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-text-muted">Loading feedback...</p>;
  }

  if (feedback.length === 0) {
    return (
      <p className="text-center text-text-muted">
        No feedback available yet.
      </p>
    );
  }

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-4">
        What Our Clients Say
      </h2>
      <p className="text-center text-text-muted mb-10">
        Real stories from people we’ve helped.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {feedback.map((f, i) => (
          <div key={i} className="card">
            <h4 className="font-semibold text-lg">{f.name}</h4>

            <div className="text-yellow-400 my-2">
              {"★".repeat(f.rating)}
              {"☆".repeat(5 - f.rating)}
            </div>

            <p className="italic text-text-muted">"{f.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
