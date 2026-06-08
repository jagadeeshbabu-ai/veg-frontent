import React from 'react';

// CategoryFilter Component
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📂 Categories</h3>
      
      <div className="space-y-2">
        {/* All Products Option */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
            selectedCategory === null
              ? 'bg-green-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🌾 All Products ({categories.length})
        </button>

        {/* Category Options */}
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📦 {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
