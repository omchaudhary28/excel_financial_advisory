import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Testimonials = () => {
  const [list, setList] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api
      .get("/public_feedback.php")
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setList(res.data.data);
          setIndex(0);
        }
      })
      .catch(() => {});
  }, []);

  const next = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % list.length);
  }, [list.length]);

  const prev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + list.length) % list.length);
  };

  useEffect(() => {
    if (list.length > 1) {
      const timer = setTimeout(next, 5000); // Change testimonial every 5 seconds
      return () => clearTimeout(timer);
    }
  }, [index, list.length, next]);

  if (!list.length) {
    return (
      <section className="py-16 text-center text-text-muted">
        No feedback available yet.
      </section>
    );
  }

  const current = list[index];

  return (
    <section className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-text dark:text-text-inverted">What Our Clients Say</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Real stories from people we’ve helped achieve their financial goals.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden relative h-64">
            {list.map((testimonial, i) => (
              <div
                key={i}
                className="absolute w-full transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === index ? 1 : 0 }}
              >
                <div className="card p-8 text-center">
                  <img
                    src={testimonial.avatar || "/avatar.png"}
                    alt="Client Avatar"
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary"
                  />
                  <h4 className="font-semibold text-xl mb-1 text-text dark:text-text-inverted">{testimonial.name}</h4>
                  <div className="text-yellow-400 my-2 text-2xl">
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </div>
                  <p className="italic text-text-muted text-lg">
                    “{testimonial.message}”
                  </p>
                </div>
              </div>
            ))}
          </div>

          {list.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8 card rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                <FiChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-8 card rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                <FiChevronRight className="h-6 w-6 text-primary" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
