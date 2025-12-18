import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Import api service
import { LoadingSpinner } from '../components/Notifications'; // Assuming this component exists

function Profile() {
  const { user, setUser } = useAuth(); // Assuming setUser is available from AuthContext for updates
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
    created_at: user?.created_at || '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);


  // Update profileData if user changes (e.g., after login/registration)
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        created_at: user.created_at || '',
      });
    }
  }, [user]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    // Basic client-side validation for phone
    if (!profileData.name.trim()) {
      setError('Name cannot be empty.');
      setLoading(false);
      return;
    }
    if (!profileData.phone.trim()) {
      setError('Phone number cannot be empty.');
      setLoading(false);
      return;
    }
    if (!/^[0-9]{10}$/.test(profileData.phone.trim())) {
      setError('Invalid phone number format. Please enter a 10-digit number.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/update_profile.php', {
        id: user.id, // Ensure user ID is sent
        name: profileData.name,
        phone: profileData.phone,
      });

      if (response.data.success) {
        // Update context with potentially new user data from backend (e.g., phone might not be in initial session)
        setUser(response.data.user); 
        setIsEditing(false);
        setMessage(response.data.message);
      } else {
        setError(response.data.message || (response.data.errors && response.data.errors.join(', ')) || 'Failed to update profile.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred during profile update.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset profileData to original user values if cancelled
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || '',
      created_at: user?.created_at || '',
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    setPasswordLoading(true);

    const trimmedPasswordForm = {
      currentPassword: passwordForm.currentPassword.trim(),
      newPassword: passwordForm.newPassword.trim(),
      confirmNewPassword: passwordForm.confirmNewPassword.trim(),
    };

    // Client-side validation
    if (!trimmedPasswordForm.currentPassword || !trimmedPasswordForm.newPassword || !trimmedPasswordForm.confirmNewPassword) {
      setPasswordError('All password fields are required.');
      setPasswordLoading(false);
      return;
    }
    if (trimmedPasswordForm.newPassword !== trimmedPasswordForm.confirmNewPassword) {
      setPasswordError('New password and confirm new password do not match.');
      setPasswordLoading(false);
      return;
    }
    if (trimmedPasswordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setPasswordLoading(false);
      return;
    }

    try {
      const response = await api.post('/change_password.php', {
        current_password: trimmedPasswordForm.currentPassword,
        new_password: trimmedPasswordForm.newPassword,
        confirm_new_password: trimmedPasswordForm.confirmNewPassword,
      });

      if (response.data.success) {
        setPasswordMessage(response.data.message);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Clear form
      } else {
        setPasswordError(response.data.message || (response.data.errors && response.data.errors.join(', ')) || 'Failed to change password.');
      }
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'An unexpected error occurred during password change.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl p-8 border border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-text dark:text-text-inverted mb-6 text-center">User Profile</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {user ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-4xl font-bold flex-shrink-0 shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-2 text-text dark:text-text-inverted text-center md:text-left">
                {isEditing ? (
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light bg-white dark:bg-gray-700 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700"
                        disabled={loading}
                        autoComplete="name"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light bg-white dark:bg-gray-700 text-text dark:text-text-inverted disabled:bg-gray-50 dark:disabled:bg-gray-700"
                        disabled={loading}
                        autoComplete="tel"
                      />
                    </div>
                    {/* Email is not editable for security/complexity reasons on this simple profile page */}
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light text-text dark:text-text-inverted bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
                        disabled={true}
                        autoComplete="email"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-semibold">{profileData.name}</p>
                    <p className="text-md text-text dark:text-text-inverted">{profileData.email}</p>
                    <p className="text-md text-text dark:text-text-inverted">Role: {profileData.role}</p>
                    {profileData.phone && <p className="text-md text-text dark:text-text-inverted">Phone: {profileData.phone}</p>}
                    {profileData.created_at && (
                      <p className="text-sm text-text dark:text-text-inverted">
                        Member since: {new Date(profileData.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center md:justify-end space-x-4 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    {loading ? <LoadingSpinner /> : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-text dark:text-text-inverted font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* Change Password Section */}
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-text dark:text-text-inverted mb-4 text-center">Change Password</h2>
              
              {passwordError && (
                <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4">
                  {passwordError}
                </div>
              )}
              {passwordMessage && (
                <div className="bg-green-50 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-4">
                  {passwordMessage}
                </div>
              )}

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-sm mx-auto">
                <input type="text" name="username" autoComplete="username" value={user?.email || ''} hidden readOnly />
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light bg-white dark:bg-gray-700 text-text dark:text-text-inverted"
                    disabled={passwordLoading}
                    required
                    autoComplete="current-password"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light bg-white dark:bg-gray-700 text-text dark:text-text-inverted"
                    disabled={passwordLoading}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-text dark:text-text-inverted mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-1 focus:ring-primary-light bg-white dark:bg-gray-700 text-text dark:text-text-inverted"
                    disabled={passwordLoading}
                    required
                    autoComplete="new-password"
                  />
                </div>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md"
                >
                  {passwordLoading ? <LoadingSpinner /> : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p className="text-text dark:text-text-inverted text-center">Please log in to view your profile.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;