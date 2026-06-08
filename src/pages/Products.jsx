import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Loader from '../components/Loader';
import api from '../services/api';

// Products Page Component
const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load all products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const products = await api.getAllProducts();
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        
        setAllProducts(products);
        setCategories(uniqueCategories);
        setDisplayedProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and search products
  useEffect(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setDisplayedProducts(filtered);
  }, [searchQuery, selectedCategory, allProducts]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🛒 All Products</h1>
          <p className="text-gray-600 text-lg">Browse our complete collection of fresh vegetables</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar - Categories */}
          <div className="md:col-span-1">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Main Content - Products */}
          <div className="md:col-span-3">
            {loading ? (
              <Loader message="Loading products..." />
            ) : displayedProducts.length > 0 ? (
              <>
                {/* Results Count */}
                <div className="mb-6 bg-white p-4 rounded-lg">
                  <p className="text-gray-700 font-medium">
                    Found <span className="text-green-600 font-bold">{displayedProducts.length}</span> products
                    {searchQuery && ` matching "${searchQuery}"`}
                    {selectedCategory && ` in category "${selectedCategory}"`}
                  </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
                <p className="text-gray-600 mb-6">
                  {searchQuery
                    ? `No vegetables found matching "${searchQuery}"`
                    : 'No vegetables available in this category'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
