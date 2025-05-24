import React from 'react';
import { Link } from 'react-router-dom';

export const LoginSelectionPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-6 text-gray-900">Welcome! Please select your login type:</h1>
        <div className="space-x-4">
          <Link
            to="/login?role=employee"
            className="inline-block px-7 py-3 mb-4 text-white font-bold rounded-md bg-green-600 hover:bg-green-700 shadow-md transition duration-200"
          >
            Employee Login
          </Link>
          <Link
            to="/login?role=customer"
            className="inline-block px-7 py-3 mb-4 text-white font-bold rounded-md bg-blue-600 hover:bg-blue-700 shadow-md transition duration-200"
          >
            Customer Login
          </Link>
        </div>
      </div>
    </div>
  );
};
