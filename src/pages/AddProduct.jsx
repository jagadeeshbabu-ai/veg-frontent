import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Add Product Page Component
const AddProduct = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    stock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=400&h=300&fit=crop',
  });

  // Check authentication
  if (!isAuthenticated || user?.role !== 'seller') {
    navigate('/login');
    return null;
  }

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    // Save product to localStorage
    const products = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseFloat(formData.stock),
    };

    products.push(newProduct);
    localStorage.setItem('sellerProducts', JSON.stringify(products));

    setTimeout(() => {
      setLoading(false);
      alert('Product added successfully!');
      navigate('/seller/manage-products');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">➕ Add New Product</h1>
        <p className="text-gray-600 mb-8">Add a vegetable to your store</p>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Fresh Tomato"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
              >
                <option>Vegetables</option>
                <option>Root Vegetables</option>
                <option>Leafy Vegetables</option>
                <option>Fruits</option>
                <option>Legumes</option>
                <option>Spices</option>
                <option>Cruciferous</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Price */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Price per KG (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 45"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  required
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Stock Available (KG) *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                  min="0"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
              />
              {formData.image && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <ImageWrapper
                    src={formData.image}
                    alt="Product"
                    wrapperClassName="w-32 border border-gray-200 bg-white"
                    imageClassName="rounded-lg"
                    aspectRatio="1 / 1"
                    onError={() => {
                      setFormData(prev => ({
                        ...prev,
                        image: 'https://via.placeholder.com/150'
                      }));
                    }}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-bold text-lg transition ${
                  loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {loading ? '⏳ Adding...' : '✓ Add Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/seller/manage-products')}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
