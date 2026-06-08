import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import ImageWrapper from '../components/ImageWrapper';

// Orders Page Component
const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load orders on mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders.reverse()); // Show latest first
    setLoading(false);
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <Loader message="Loading your orders..." />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📦 My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛍️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping now!
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                
                {/* Order Header */}
                <div className="bg-green-50 border-l-4 border-green-600 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Order ID: <span className="font-bold">{order.id.toString().slice(0, 8)}</span></p>
                    <p className="text-sm text-gray-600">Date: <span className="font-bold">{order.date}</span></p>
                    <p className="text-sm text-gray-600">Delivery Address: <span className="font-bold">{order.address}</span></p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-3xl font-bold text-green-600">₹{order.total.toFixed(2)}</div>
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mt-2 ${
                      order.status === 'Confirmed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'Confirmed' ? '✓ ' : ''}{order.status}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 border-t">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Items:</h3>
                  <div className="space-y-3">
                    {order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between py-2 border-b">
                        <div className="flex items-center gap-4">
                          <ImageWrapper
                            src={item.image}
                            alt={item.name}
                            wrapperClassName="w-12 bg-white p-1 rounded-lg"
                            imageClassName="rounded-lg"
                            aspectRatio="1 / 1"
                          />
                          <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                          </div>
                        </div>
                        <div className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-gray-50 p-6 flex gap-4">
                  <button className="flex-1 border-2 border-green-600 text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-green-50 transition">
                    Track Order
                  </button>
                  <button
                    onClick={() => navigate('/products')}
                    className="flex-1 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
