import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ImageWrapper from '../components/ImageWrapper';

// Cart Page Component
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, grandTotal, totalItems } = useCart();
  const navigate = useNavigate();

  // Handle quantity decrease
  const handleDecreaseQty = (productId, quantity) => {
    if (quantity <= 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity - 1);
    }
  };

  // Handle quantity increase
  const handleIncreaseQty = (productId, quantity) => {
    updateQuantity(productId, quantity + 1);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 text-lg">
              Add some fresh vegetables to your cart to get started!
            </p>
            <Link
              to="/products"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b">
                <p className="font-bold text-gray-700">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
                </p>
              </div>

              {/* Cart Items List */}
              <div className="divide-y">
                {cart.map(item => (
                  <div key={item.id} className="p-6 flex gap-6 items-center">
                    
                    {/* Product Image */}
                    <ImageWrapper
                      src={item.image}
                      alt={item.name}
                      wrapperClassName="w-20 bg-white p-1 rounded-lg"
                      imageClassName="rounded-lg"
                      aspectRatio="1 / 1"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        to={`/products/${item.id}`}
                        className="text-lg font-bold text-gray-800 hover:text-green-600 transition"
                      >
                        {item.name}
                      </Link>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="text-green-600 font-bold text-lg mt-1">₹{item.price}/kg</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                      <button
                        onClick={() => handleDecreaseQty(item.id, item.quantity)}
                        className="text-xl text-gray-700 hover:text-red-600 w-8 h-8 flex items-center justify-center transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQty(item.id, item.quantity)}
                        className="text-xl text-gray-700 hover:text-green-600 w-8 h-8 flex items-center justify-center transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">{item.quantity} kg</p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-2xl text-red-500 hover:text-red-700 transition"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-4">
              <Link
                to="/products"
                className="text-green-600 hover:text-green-700 font-bold flex items-center"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Summary Details */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-3xl font-bold text-green-600">₹{grandTotal.toFixed(2)}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition mb-3"
              >
                Proceed to Checkout
              </button>

              {/* Promo Code */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none font-medium mb-2"
                />
                <button className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition">
                  Apply Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
