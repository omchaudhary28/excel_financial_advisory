import React, { useState } from 'react';

function LinkedIn() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    // In a real app, this would trigger the LinkedIn OAuth flow
    setIsConnected(true);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-4">LinkedIn Integration</h1>
      <p className="mb-6 text-gray-600">Connect your professional profile to sync employment data with your financial portfolio.</p>
      
      {isConnected ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Connected!</strong>
          <span className="block sm:inline"> Your LinkedIn account is successfully linked.</span>
        </div>
      ) : (
        <button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Connect with LinkedIn
        </button>
      )}
    </div>
  );
}

export default LinkedIn;
