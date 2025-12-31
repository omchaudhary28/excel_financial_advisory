import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/Notifications";
import { FiUser, FiPhone, FiMail, FiUpload, FiLock, FiSave } from "react-icons/fi";
import { API_BASE_URL } from "../config";

function Profile() {
  const { user, login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
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
      if (!token) throw new Error("Unauthorized");

      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone", phone.trim());
      formData.append("email", user?.email);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const res = await axios.post(`${API_BASE_URL}/update_profile.php`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || !res.data.success) throw new Error(res.data?.message || "Update failed");

      const updatedUser = { ...user, name, phone, avatar: res.data.user?.avatar || user.avatar };
      login({ token, user: updatedUser });
      setAvatarFile(null);
      setSuccess("Profile updated successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");
      
      const res = await axios.post(`${API_BASE_URL}/change_password.php`, {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (!res.data || !res.data.success) throw new Error(res.data?.message || "Password change failed");
      
      setPasswordSuccess("Password changed successfully.");
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });

    } catch (err) {
      setPasswordError(err.response?.data?.message || err.message || "Unable to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card overflow-hidden">
          <div className="md:grid md:grid-cols-3">
            <div className="md:col-span-1 p-8 bg-background-light dark:bg-background-dark flex flex-col items-center justify-center text-center">
              <div className="relative w-40 h-40 mb-4">
                <div className="w-full h-full rounded-full ring-4 ring-primary ring-offset-4 ring-offset-background-light dark:ring-offset-background-dark overflow-hidden flex items-center justify-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-background-light dark:bg-background-dark flex items-center justify-center">
                      <span className="text-6xl font-bold text-text dark:text-text-inverted">{getInitials(user?.name)}</span>
                    </div>
                  )}
                </div>
                <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 cursor-pointer bg-primary text-white rounded-full p-2 hover:bg-primary-dark transition-transform duration-300 transform hover:scale-110">
                  <FiUpload className="w-5 h-5" />
                  <input type="file" id="avatar-upload" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <h2 className="text-3xl font-bold text-text dark:text-text-inverted mt-4">{name}</h2>
              <p className="text-text-muted">{user?.email}</p>
            </div>

            <div className="md:col-span-2 p-8">
              <h3 className="text-2xl font-bold text-text dark:text-text-inverted mb-6">Profile Settings</h3>
              {error && <div className="bg-danger/10 border-l-4 border-danger text-danger p-4 mb-6" role="alert">{error}</div>}
              {success && <div className="bg-success/10 border-l-4 border-success text-success p-4 mb-6" role="alert">{success}</div>}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <FiUser className="absolute top-3 left-3 text-gray-400" />
                  <input id="name" type="text" required className="form-input pl-10" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-gray-400" />
                  <input id="phone" type="tel" required className="form-input pl-10" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="relative">
                  <FiMail className="absolute top-3 left-3 text-gray-400" />
                  <input id="email" type="email" disabled className="form-input pl-10 cursor-not-allowed" value={user?.email || ""} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center">
                  {loading ? <LoadingSpinner text="Saving..." /> : <><FiSave className="mr-2"/>Save Changes</>}
                </button>
              </form>

              <hr className="my-8 border-gray-200 dark:border-gray-700" />

              <h3 className="text-2xl font-bold text-text dark:text-text-inverted mb-6">Change Password</h3>
              {passwordError && <div className="bg-danger/10 border-l-4 border-danger text-danger p-4 mb-6" role="alert">{passwordError}</div>}
              {passwordSuccess && <div className="bg-success/10 border-l-4 border-success text-success p-4 mb-6" role="alert">{passwordSuccess}</div>}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                 <div className="relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400" />
                    <input id="current-password" type="password" required className="form-input pl-10" placeholder="Current Password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} />
                </div>
                 <div className="relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400" />
                    <input id="new-password" type="password" required className="form-input pl-10" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}/>
                </div>
                 <div className="relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400" />
                    <input id="confirm-password" type="password" required className="form-input pl-10" placeholder="Confirm New Password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}/>
                </div>
                <button type="submit" disabled={passwordLoading} className="btn-secondary w-full flex items-center justify-center">
                  {passwordLoading ? <LoadingSpinner text="Updating..." /> : <><FiLock className="mr-2"/>Update Password</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;