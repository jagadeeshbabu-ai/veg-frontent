import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ImageWrapper from '../components/ImageWrapper';

// Manage Products Page Component
const ManageProducts = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Check authentication and load products
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'seller') {
      navigate('/login');
      return;
    }

    loadProducts();
  }, [isAuthenticated, user, navigate]);

  // Load products from localStorage
  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    setProducts(storedProducts);
  };

  // Handle delete product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      alert('Product deleted successfully!');
    }
  };

  // Handle edit start
  const handleEditStart = (product) => {
    setEditingId(product.id);
    setEditData({ ...product });
  };

  // Handle edit change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle save edit
  const handleSaveEdit = (id) => {
    const updatedProducts = products.map(p =>
      p.id === id
        ? { ...p, ...editData }
        : p
    );
    localStorage.setItem('sellerProducts', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setEditingId(null);
    alert('Product updated successfully!');
  };

  if (!isAuthenticated || user?.role !== 'seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Manage Products</h1>
            <p className="text-gray-600">Edit or delete your products</p>
          </div>
          <Link
            to="/seller/add-product"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            ➕ Add Product
          </Link>
        </div>

        {/* Products List */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Yet</h2>
            <p className="text-gray-600 mb-8">Add your first product to get started</p>
            <Link
              to="/seller/add-product"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition"
            >
              Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                
                {/* Product Image */}
                <ImageWrapper
                  src={product.image}
                  alt={product.name}
                  wrapperClassName="w-full bg-gray-200 p-3"
                  imageClassName="rounded-lg"
                  aspectRatio="4 / 3"
                />

                {/* Product Details */}
                <div className="p-6">
                  {editingId === product.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editData.price}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                        step="0.01"
                      />
                      <input
                        type="number"
                        name="stock"
                        value={editData.stock}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      />
                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                        rows="3"
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      ></textarea>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleSaveEdit(product.id)}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="text-xl font-bold text-green-600">₹{product.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Stock</p>
                          <p className="text-xl font-bold text-blue-600">{product.stock} kg</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditStart(product)}
                          className="flex-1 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-bold hover:bg-blue-50 transition"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 border-2 border-red-600 text-red-600 py-2 rounded-lg font-bold hover:bg-red-50 transition"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
