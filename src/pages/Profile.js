import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiPhone, FiMail } from "react-icons/fi";

function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (
      parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };


  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.post(
        "https://excel-financial-advisory-backend.onrender.com/update_profile.php",
        formData, // Send FormData
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data || !res.data.success) {
        setError(res.data?.message || "Update failed");
        setLoading(false);
        return;
      }

      // Assuming the backend returns the updated user object with the new avatar URL
      const updatedUser = { ...user, name, phone, avatar: res.data.user?.avatar || user.avatar };
      login({ token, user: updatedUser });
      setAvatarFile(null); // Clear the file input
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg" data-aos="fade-up">
        <div className="bg-background-light dark:bg-black rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ring-4 ring-primary/20 overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center">
                    <span className="text-5xl font-bold text-text-inverted">
                      {getInitials(user?.name)}
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden" // Hide the default input
                onChange={handleAvatarChange}
              />
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-text-inverted bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light cursor-pointer transition-all duration-200 transform hover:scale-105"
              >
                Change Avatar
              </label>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-6">
                {name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>

            {error && (
              <div className="bg-danger-light dark:bg-danger-dark/20 border border-danger dark:border-danger-light/30 text-danger-dark dark:text-danger-light p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-success-light dark:bg-success-dark/20 border border-success dark:border-success-light/30 text-success-dark dark:text-success-light p-4 mb-6 rounded-lg">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary-light"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <FiPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-primary-light"
                  placeholder="1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-light dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 cursor-not-allowed text-gray-500"
                  value={user?.email || ""}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-text-muted text-text-inverted font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
              >
                {loading ? <LoadingSpinner text="Saving..." /> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;