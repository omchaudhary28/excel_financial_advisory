import React, { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

function LinkedIn() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // In a real app, this would trigger the LinkedIn OAuth flow
    setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <FaLinkedin className="mx-auto h-24 w-24 text-blue-700" />
        <h1 className="mt-8 text-4xl font-extrabold text-gray-900 dark:text-white">
          LinkedIn Integration
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Connect your professional network with your financial portfolio. Sync your employment data to get personalized financial advice.
        </p>
        <div className="mt-10">
          {isConnected ? (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Connected!</strong>
              <span className="block sm:inline"> Your LinkedIn account is successfully linked.</span>
            </div>
          ) : (
            <button 
              onClick={handleConnect} 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
            >
              Connect with LinkedIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default LinkedIn;
