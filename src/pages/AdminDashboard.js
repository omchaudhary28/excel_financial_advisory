import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LoadingSpinner } from '../components/Notifications';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('queries'); // 'queries' or 'users'
  const [activeQueryTab, setActiveQueryTab] = useState('all'); // 'all', 'queries', or 'contact'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/admin_queries.php');
        if (response.data.success) {
          setUsers(response.data.users);
          setQueries(response.data.queries);
        } else {
          setError('Failed to fetch data.');
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setError('Forbidden: You do not have permission to view this page.');
        } else {
          setError('An error occurred while fetching data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort queries
  const filteredQueries = queries
    .filter((query) => {
      if (activeQueryTab === 'all') {
        return true;
      }
      return query.type === activeQueryTab;
    })
    .filter(
      (query) =>
        (query.query_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (query.query_email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (query.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (query.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (query.user_name && query.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (query.user_email && query.user_email.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === 'name') {
        return a.query_name.localeCompare(b.query_name);
      }
      return 0;
    });

  // Filter and sort users
  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const getWhatsAppLink = (phone) => {
    if (!phone) return '#';
    const cleanedPhone = phone.replace(/\D/g, ''); // Remove non-digits
    return `https://wa.me/${cleanedPhone}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading admin dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in-up" data-aos="fade-up">
          <h1 className="text-5xl font-bold text-text dark:text-text-inverted mb-2">Admin Dashboard</h1>
          <p className="text-text dark:text-text-inverted text-lg">Manage and monitor all customer interactions</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg mb-8 animate-fade-in-up">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-lg font-semibold">{error}</span>
            </div>
          </div>
        )}

        {!error && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: 'Total Users', value: users.length, icon: '👥', color: 'from-primary to-accent' },
                { label: 'Total Queries', value: queries.length, icon: '📬', color: 'from-secondary to-primary-light' },
                {
                  label: 'New Users Today',
                  value: users.filter(
                    (u) => new Date(u.created_at).toDateString() === new Date().toDateString()
                  ).length,
                  icon: '📈',
                  color: 'from-accent to-secondary',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl p-8 border border-gray-100 dark:border-gray-700 hover-lift transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center text-3xl mb-4 text-white`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-text dark:text-text-inverted text-sm font-semibold mb-1">{stat.label}</h3>
                  <p className="text-text dark:text-text-inverted text-4xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Tabs for Users and Queries */}
            <div className="flex border-b border-gray-300 dark:border-gray-700 mb-8">
              <button
                className={`py-2 px-4 text-lg font-medium ${
                  activeTab === 'queries'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light'
                }`}
                onClick={() => setActiveTab('queries')}
              >
                Customer Queries
              </button>
              <button
                className={`py-2 px-4 text-lg font-medium ${
                  activeTab === 'users'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light'
                }`}
                onClick={() => setActiveTab('users')}
              >
                Registered Users
              </button>
            </div>

            {activeTab === 'queries' && (
              <div className="flex border-b border-gray-300 dark:border-gray-700 mb-8">
                <button
                  className={`py-2 px-4 text-lg font-medium ${
                    activeQueryTab === 'all'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light'
                  }`}
                  onClick={() => setActiveQueryTab('all')}
                >
                  All
                </button>
                <button
                  className={`py-2 px-4 text-lg font-medium ${
                    activeQueryTab === 'query'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light'
                  }`}
                  onClick={() => setActiveQueryTab('query')}
                >
                  Queries
                </button>
                <button
                  className={`py-2 px-4 text-lg font-medium ${
                    activeQueryTab === 'contact'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-text dark:text-text-inverted hover:text-primary dark:hover:text-primary-light'
                  }`}
                  onClick={() => setActiveQueryTab('contact')}
                >
                  Contact
                </button>
              </div>
            )}

            {/* Search and Filter */}
            <div
              className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg dark:shadow-xl p-6 border border-gray-100 dark:border-gray-700 mb-8 animate-fade-in-up"
              data-aos="fade-up"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search Input */}
                <div>
                  <label htmlFor="search" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                    🔍 Search {activeTab === 'queries' ? 'Queries' : 'Users'}
                  </label>
                  <input
                    id="search"
                    type="text"
                    placeholder={`Search by name, email, ${activeTab === 'queries' ? 'subject or message' : 'or phone'}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-300"
                  />
                </div>

                {/* Sort Dropdown */}
                <div>
                  <label htmlFor="sort" className="block text-sm font-semibold text-text dark:text-text-inverted mb-2">
                    ↕️ Sort By
                  </label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-primary focus:ring-primary-light transition-all duration-300"
                  >
                    <option value="date">Latest First</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {activeTab === 'queries' && (
              <div
                className="bg-background-light dark:bg-background-dark rounded-xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                data-aos="fade-up"
              >
                {filteredQueries.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-900 text-text dark:text-text-inverted">
                          <th className="px-6 py-4 text-left text-sm font-bold">Query By</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Subject</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Message</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Type</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredQueries.map((query, index) => (
                          <tr
                            key={query.id}
                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-primary-light/10 dark:hover:bg-background-dark transition-all duration-300 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay={50 + index * 30}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                  {(query.user_name || query.query_name).charAt(0).toUpperCase()}
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-semibold text-text dark:text-text-inverted">
                                    {query.user_name || query.query_name}
                                  </span>
                                  <span className="text-sm text-text dark:text-text-inverted">
                                    {query.user_email || query.query_email}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-text dark:text-text-inverted font-medium">{query.subject}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-text dark:text-text-inverted max-w-xs truncate" title={query.message}>
                                {query.message}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-text dark:text-text-inverted">{query.type}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-text dark:text-text-inverted">
                                  {new Date(query.created_at).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-text dark:text-text-inverted">
                                  {new Date(query.created_at).toLocaleTimeString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {query.user_phone && (
                                  <a
                                    href={`tel:${query.user_phone}`}
                                    className="text-primary hover:text-primary-dark"
                                    title="Call"
                                  >
                                    📞
                                  </a>
                                )}
                                {query.user_phone && (
                                  <a
                                    href={getWhatsAppLink(query.user_phone)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-secondary-dark"
                                    title="WhatsApp"
                                  >
                                    💬
                                  </a>
                                )}
                                <a
                                  href={`mailto:${query.user_email || query.query_email}`}
                                  className="text-red-500 hover:text-red-600"
                                  title="Email"
                                >
                                  📧
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-text dark:text-text-inverted mb-2">No Queries Found</h3>
                    <p className="text-text dark:text-text-inverted">
                      {searchTerm ? 'Try adjusting your search criteria' : 'No queries have been submitted yet.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div
                className="bg-background-light dark:bg-background-dark rounded-xl shadow-2xl dark:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in-up"
                data-aos="fade-up"
              >
                {filteredUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-200 dark:bg-gray-900 text-text dark:text-text-inverted">
                          <th className="px-6 py-4 text-left text-sm font-bold">User Name</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Phone</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Registered On</th>
                          <th className="px-6 py-4 text-left text-sm font-bold">Contact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <tr
                            key={user.id}
                            className="border-b border-gray-200 dark:border-gray-700 hover:bg-primary-light/10 dark:hover:bg-background-dark transition-all duration-300 hover-lift"
                            data-aos="fade-up"
                            data-aos-delay={50 + index * 30}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-text dark:text-text-inverted">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`mailto:${user.email}`}
                                className="text-primary hover:text-primary-dark hover:underline transition-colors duration-300"
                              >
                                {user.email}
                              </a>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-text dark:text-text-inverted">{user.phone || 'N/A'}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-text dark:text-text-inverted">
                                  {new Date(user.created_at).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-text dark:text-text-inverted">
                                  {new Date(user.created_at).toLocaleTimeString()}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {user.phone && (
                                  <a
                                    href={`tel:${user.phone}`}
                                    className="text-primary hover:text-primary-dark"
                                    title="Call"
                                  >
                                    📞
                                  </a>
                                )}
                                {user.phone && (
                                  <a
                                    href={getWhatsAppLink(user.phone)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-secondary-dark"
                                    title="WhatsApp"
                                  >
                                    💬
                                  </a>
                                )}
                                <a
                                  href={`mailto:${user.email}`}
                                  className="text-red-500 hover:text-red-600"
                                  title="Email"
                                >
                                  📧
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="text-6xl mb-4">🤷</div>
                    <h3 className="text-2xl font-bold text-text dark:text-text-inverted mb-2">No Users Found</h3>
                    <p className="text-text dark:text-text-inverted">
                      {searchTerm ? 'Try adjusting your search criteria' : 'No registered users yet.'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Footer Info */}
            <div className="mt-8 text-center text-text dark:text-text-inverted text-sm" data-aos="fade-up">
              {activeTab === 'queries'
                ? `Showing ${filteredQueries.length} of ${queries.length} queries`
                : `Showing ${filteredUsers.length} of ${users.length} users`}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
