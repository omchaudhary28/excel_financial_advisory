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
    <div className="card text-center max-w-xl mx-auto">
      <img
        src={f.avatar || "/avatar.png"}
        className="w-16 h-16 mx-auto rounded-full mb-3"
      />
      <h4 className="font-semibold">{f.name}</h4>
      <p>{"★".repeat(f.rating)}</p>
      <p className="italic">"{f.message}"</p>

      <div className="flex justify-center gap-4 mt-4">
        <button onClick={() => setI((i-1+list.length)%list.length)}>◀</button>
        <button onClick={() => setI((i+1)%list.length)}>▶</button>
      </div>
    </div>
  );
}
