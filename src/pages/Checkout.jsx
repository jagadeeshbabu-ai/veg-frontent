import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Checkout Page Component
const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { cart, grandTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Create order
      const order = {
        id: Math.random(),
        date: new Date().toLocaleDateString(),
        items: cart,
        total: grandTotal,
        status: 'Confirmed',
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.pincode}`,
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // Clear cart
      clearCart();

      setLoading(false);
      alert('Order placed successfully!');
      navigate('/orders');
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Please Log In</h1>
            <p className="text-gray-600 mb-8 text-lg">
              You need to be logged in to checkout.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Add some products to proceed with checkout.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">💳 Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Shipping Address Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Shipping Address</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* Phone */}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* Address */}
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className="col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* City */}
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* State */}
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  {/* Pincode */}
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    className="col-span-2 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">💳 Payment Method</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* Card Number */}
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number (1234 5678 9012 3456)"
                    maxLength="19"
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/* Expiry Date */}
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      required
                    />

                    {/* CVV */}
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                      maxLength="4"
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                      required
                    />
                  </div>

                  {/* Test Card Info */}
                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    💡 For testing, use any card details (mock payment)
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-lg transition ${
                  loading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {loading ? 'Processing...' : '✓ Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-2">Total Amount</p>
                <p className="text-4xl font-bold text-green-600">₹{grandTotal.toFixed(2)}</p>
              </div>

              {/* Secure Payment Badge */}
              <div className="mt-6 bg-green-50 p-4 rounded-lg text-center text-sm text-green-800">
                🔐 Secure payment guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
