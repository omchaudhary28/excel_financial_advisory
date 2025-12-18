import api from "../services/api";

const handleSubmit = async (e) => {
  e.preventDefault();

  await api.post("/submit_query.php", {
    name,
    email,
    subject,
    message,
  });
};
