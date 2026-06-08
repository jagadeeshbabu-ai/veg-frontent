import React, { useState } from 'react';

// SearchBar Component
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle search input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search vegetables... (e.g., Tomato, Spinach, Carrot)"
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none font-medium text-gray-700 placeholder-gray-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl text-green-600 hover:text-green-700 transition"
        >
          🔍
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
