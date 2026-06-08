import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ImageWrapper from './ImageWrapper';

// ProductCard Component
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Handle add to cart
  const handleAddToCart = () => {
    addToCart(product);
    // You could add a toast notification here
  };

  return (
    <div className="card bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      
      {/* Product Image */}
      <div className="relative">
        <ImageWrapper
          src={product.image}
          alt={product.name}
          wrapperClassName="p-3"
          imageClassName="rounded-xl hover:scale-105 transition-transform duration-300"
          aspectRatio="4 / 3"
        />
        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {product.stock > 0 ? '✓ In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        
        {/* Category Badge */}
        <div className="mb-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </div>
            <div className="text-xs text-gray-500">per kg</div>
          </div>
          <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 border-2 border-green-600 text-green-600 px-3 py-2 rounded-lg font-bold hover:bg-green-50 transition text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 px-3 py-2 rounded-lg font-bold transition ${
              product.stock > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            🛒 Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
