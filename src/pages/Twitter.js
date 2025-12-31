import React from 'react';
import { FaTwitter } from 'react-icons/fa';

function Twitter() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <FaTwitter className="mx-auto h-24 w-24 text-blue-400" />
        <h1 className="mt-8 text-4xl font-extrabold text-gray-900 dark:text-white">
          Twitter Integration
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Get real-time financial news and updates by following our Twitter feed. Integration with our platform is coming soon!
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500"
          >
            Follow us on Twitter
          </a>
        </div>
      </div>
    </div>
  );
}

export default Twitter;
