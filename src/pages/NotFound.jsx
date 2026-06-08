import React from 'react';
import { Link } from 'react-router-dom';

// Not Found Page Component
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        
        {/* 404 Icon */}
        <div className="text-8xl mb-6">🚫</div>

        {/* Heading */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</p>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Illustration */}
        <div className="text-5xl mb-8">🥬❌</div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
          >
            Go to Home
          </Link>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-gray-600 text-sm mb-4">Need help?</p>
          <div className="flex justify-center gap-6">
            <a href="/" className="text-green-600 hover:text-green-700 font-bold">Home</a>
            <a href="/" className="text-green-600 hover:text-green-700 font-bold">Contact Us</a>
            <a href="/" className="text-green-600 hover:text-green-700 font-bold">FAQ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
