import React from "react";

const ErrorMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm mx-auto p-6 text-center bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4">
          <span className="text-6xl text-red-500">⚠️</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Connection Timeout</h1>
        <p className="text-gray-600 mb-4">
          We couldn’t connect to the server. Please try again in a few minutes.
        </p>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={() => window.location.reload()}
        >
          Close
        </button>
        <a
          className="block mt-3 text-sm text-blue-500 hover:underline"
          href="https://support.example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default ErrorMessage;
