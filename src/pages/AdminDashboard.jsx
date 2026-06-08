import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ImageWrapper from '../components/ImageWrapper';

// Admin Dashboard Page Component
const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
      return;
    }

    // Load data
    loadData();
  }, [isAuthenticated, user, navigate]);

  // Load all data
  const loadData = async () => {
    try {
      const products = await api.getAllProducts();
      setAllProducts(products);

      const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(storedOrders);

      // Mock users data
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', joinDate: '2024-01-15' },
        { id: 2, name: 'Jane Seller', email: 'jane@example.com', role: 'seller', joinDate: '2024-02-10' },
        { id: 3, name: 'Bob Customer', email: 'bob@example.com', role: 'customer', joinDate: '2024-03-05' },
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">👑 Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome, Admin {user?.name}!</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">👥</div>
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{users.length}</p>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-gray-600 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-green-600">{allProducts.length}</p>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">📋</div>
            <p className="text-gray-600 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-purple-600">{orders.length}</p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-yellow-600">
              ₹{orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold border-b-4 transition ${
              activeTab === 'overview'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-bold border-b-4 transition ${
              activeTab === 'users'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 font-bold border-b-4 transition ${
              activeTab === 'products'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            📦 Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-bold border-b-4 transition ${
              activeTab === 'orders'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-800'
            }`}
          >
            📋 Orders
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-green-800 mb-2">✓ System Status</h3>
                  <p className="text-gray-700">All systems operational</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-800 mb-2">📊 Performance</h3>
                  <p className="text-gray-700">Server response time: 45ms</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Manage Users</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-gray-700 font-bold">Name</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-bold">Email</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-bold">Role</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-bold">Join Date</th>
                      <th className="px-6 py-3 text-left text-gray-700 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-700">{user.name}</td>
                        <td className="px-6 py-4 text-gray-700">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'seller'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{user.joinDate}</td>
                        <td className="px-6 py-4 text-gray-700">
                          <button className="text-red-600 hover:text-red-700 font-bold">Block</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Manage Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProducts.slice(0, 6).map(product => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <ImageWrapper
                      src={product.image}
                      alt={product.name}
                      wrapperClassName="w-full bg-gray-100 mb-3 p-2"
                      imageClassName="rounded-lg"
                      aspectRatio="4 / 3"
                    />
                    <h3 className="font-bold text-gray-800">{product.name}</h3>
                    <p className="text-sm text-gray-600">₹{product.price}/kg</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock} kg</p>
                    <button className="w-full mt-2 bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-600">No orders yet</p>
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
                      {orders.slice(0, 10).map((order, idx) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-700">{order.id.toString().slice(0, 8)}</td>
                          <td className="px-6 py-4 text-gray-700">{order.date}</td>
                          <td className="px-6 py-4 text-gray-700">{order.items.length}</td>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
