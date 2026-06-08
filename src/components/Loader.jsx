import React from 'react';

// Loader Component
const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loader mb-4"></div>
      <p className="text-gray-600 font-medium text-lg">{message}</p>
    </div>
  );
};

export default Loader;
