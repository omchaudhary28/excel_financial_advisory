import { useEffect, useState } from "react";
import api from "../services/api";

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    api.get("/feedback_public.php").then(res => {
      if (res.data.success) setList(res.data.data);
    });
  }, []);

  if (!list.length) return <p className="text-center">No feedback yet.</p>;

  const f = list[i];

  return (
    <div className="card text-center max-w-xl mx-auto py-8 px-6">
      <div className="relative overflow-hidden min-h-[150px] flex items-center justify-center"> {/* Added min-h to prevent layout shift */}
        <div className="absolute inset-0 transition-opacity duration-500 ease-in-out" key={i}> {/* Key change forces re-render and transition */}
          <img
            src={f.avatar || "/avatar.png"}
            className="w-16 h-16 mx-auto rounded-full mb-3 object-cover"
            alt="User Avatar"
          />
          <h4 className="font-semibold text-text dark:text-text-inverted text-lg mb-1">{f.name}</h4>
          <p className="text-yellow-500 text-xl mb-3">{"★".repeat(f.rating)}</p> {/* Added star styling */}
          <p className="italic text-text-muted dark:text-gray-200 text-base">"{f.message}"</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8"> {/* Increased margin-top */}
        <button
          onClick={() => setI((i - 1 + list.length) % list.length)}
          className="p-3 rounded-full bg-primary-light text-text-inverted hover:bg-primary transition-colors duration-200 transform hover:scale-110 shadow-md"
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setI((i + 1) % list.length)}
          className="p-3 rounded-full bg-primary-light text-text-inverted hover:bg-primary transition-colors duration-200 transform hover:scale-110 shadow-md"
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
  );
}
