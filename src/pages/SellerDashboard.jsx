import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Seller Dashboard Page Component
const SellerDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'seller') {
      navigate('/login');
      return;
    }

    // Load products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
    setProducts(storedProducts);

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== 'seller') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🏪 Seller Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-green-600">{products.length}</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-purple-600">
              ₹{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </p>
          </div>

          {/* Ratings */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-600 text-sm">Seller Rating</p>
            <p className="text-3xl font-bold text-yellow-600">4.8/5.0</p>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Add Product */}
          <Link
            to="/seller/add-product"
            className="bg-green-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition text-center"
          >
            <div className="text-5xl mb-4">➕</div>
            <h2 className="text-2xl font-bold mb-2">Add New Product</h2>
            <p>List a new vegetable in your store</p>
          </Link>

          {/* Manage Products */}
          <Link
            to="/seller/manage-products"
            className="bg-blue-600 text-white rounded-lg shadow-lg p-8 hover:shadow-xl transition text-center"
          >
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">Manage Products</h2>
            <p>Edit or delete your products</p>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Recent Orders</h2>
          
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold">Order ID</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold">Date</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold">Items</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold">Amount</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((order, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-700">{order.id.toString().slice(0, 8)}</td>
                      <td className="px-6 py-4 text-gray-700">{order.date}</td>
                      <td className="px-6 py-4 text-gray-700">{order.items.length} items</td>
                      <td className="px-6 py-4 text-gray-700 font-bold">₹{order.total.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
