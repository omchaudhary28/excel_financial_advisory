import React from 'react';
import { FaInstagram } from 'react-icons/fa';

function Instagram() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <FaInstagram className="mx-auto h-24 w-24 text-pink-500" />
        <h1 className="mt-8 text-4xl font-extrabold text-gray-900 dark:text-white">
          Instagram Integration
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          We're working on bringing our financial insights to Instagram. Follow us for visual content on market trends and investment tips.
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-pink-600"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

export default Instagram;
