import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiPhone, FiMail, FiUpload } from "react-icons/fi"; // Added FiUpload
import { API_BASE_URL } from "../config"; // Import API_BASE_URL

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Create a URL for local preview
    } else {
      setAvatarFile(null);
      setAvatarPreview(user?.avatar || null);
    }
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

      if (!token) {
        setError("Unauthorized");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("full_name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("mobile", phone.trim());
      formData.append("email", user?.email);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.post(
        `${API_BASE_URL}/update_profile.php`, // Use API_BASE_URL
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data || !res.data.success) {
        setError(res.data?.message || "Update failed");
        return;
      }

      const updatedUser = {
        ...user,
        name,
        phone,
        avatar: res.data.user?.avatar || user.avatar,
      };

      login({ token, user: updatedUser });
      setAvatarFile(null);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg" data-aos="fade-up">
        <div className="card overflow-hidden"> {/* Using card utility class */}
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ring-4 ring-primary/20 overflow-hidden">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="User Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"> {/* Theme-aware background */}
                    <span className="text-5xl font-bold text-gray-800 dark:text-gray-200"> {/* Theme-aware text */}
                      {getInitials(user?.name)}
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <label
                htmlFor="avatar-upload"
                className="btn-primary inline-flex items-center" // Using btn-primary utility class
              >
                <FiUpload className="mr-2" /> Change Avatar
              </label>
              <h2 className="text-3xl font-bold text-text dark:text-white mt-6">
                {name}
              </h2>
              <p className="text-text-muted dark:text-gray-400">{user?.email}</p>
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger text-danger p-4 mb-6 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-success/10 border border-success text-success-dark p-4 mb-6 rounded-lg">
                {success}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-12" // Apply global input style, only need pl-12
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <FiPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="pl-12" // Apply global input style, only need pl-12
                  placeholder="1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  className="pl-12 cursor-not-allowed bg-gray-100 dark:bg-gray-700 text-text-muted dark:text-gray-500" // Refined disabled styling
                  value={user?.email || ""}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center" // Using btn-primary utility
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