import React, { useEffect, useState } from "react";
import api from "../services/api";

const Testimonials = () => {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api
      .get("/feedback_public.php")
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setList(res.data.data);
          setIndex(0);
        }
      })
      .catch(() => {});
  }, []);

  if (!list.length) {
    return (
      <section className="py-16 text-center text-text-muted">
        No feedback available yet.
      </section>
    );
  }

  const current = list[index];

  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold text-center mb-4">
        What Our Clients Say
      </h2>

      <p className="text-center text-text-muted mb-10">
        Real stories from people we’ve helped.
      </p>

      <div className="max-w-xl mx-auto card text-center">
        <img
          src={current.avatar || "/avatar.png"}
          alt="Client Avatar"
          className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
        />

        <h4 className="font-semibold text-lg">{current.name}</h4>

        <div className="text-yellow-400 my-2">
          {"★".repeat(current.rating)}
          {"☆".repeat(5 - current.rating)}
        </div>

        <p className="italic text-text-muted">
          “{current.message}”
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() =>
            setIndex((index - 1 + list.length) % list.length)
          }
          className="px-4 py-2 rounded border"
        >
          ◀
        </button>

        <button
          onClick={() =>
            setIndex((index + 1) % list.length)
          }
          className="px-4 py-2 rounded border"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
