import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';
import ImageWrapper from '../components/ImageWrapper';
import api from '../services/api';

// Product Details Page Component
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Load product details on mount
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          navigate('/not-found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        navigate('/not-found');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) {
    return <Loader message="Loading product details..." />;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6 text-gray-600">
          <Link to="/products" className="text-green-600 hover:text-green-700">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-2xl p-8">
              <ImageWrapper
                src={product.image}
                alt={product.name}
                wrapperClassName="w-full max-w-[420px] bg-white"
                imageClassName="rounded-xl"
                aspectRatio="1 / 1"
                objectFit="contain"
              />
            </div>

            {/* Product Info */}
            <div>
              {/* Category */}
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                  {product.category}
                </span>
              </div>

              {/* Name and Price */}
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-green-600">₹{product.price}</div>
                <div className="text-sm text-gray-600">per kg</div>
                <div className="text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                <p className="text-lg font-bold text-gray-800 mb-2">Availability</p>
                <div className={`inline-block px-4 py-2 rounded-lg font-bold ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `✓ In Stock (${product.stock} kg available)` : 'Out of Stock'}
                </div>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="mb-6">
                  <label className="block text-lg font-bold text-gray-800 mb-2">Quantity (kg)</label>
                  <select
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full md:w-40 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none font-medium"
                  >
                    {[...Array(Math.min(10, product.stock))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} kg
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add to Cart Button */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 px-6 py-3 rounded-lg font-bold text-lg transition ${
                    product.stock > 0
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  🛒 Add to Cart
                </button>
                <Link
                  to="/cart"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition text-center"
                >
                  View Cart
                </Link>
              </div>

              {/* Additional Info */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-3">ℹ️ More Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ 100% Fresh and Natural</li>
                  <li>✓ No Pesticides or Chemicals</li>
                  <li>✓ Directly from Farms</li>
                  <li>✓ Free Delivery on orders above ₹500</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* You can add related products here */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
              More products coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
