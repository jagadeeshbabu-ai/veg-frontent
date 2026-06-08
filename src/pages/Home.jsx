import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import api from '../services/api';

// Home Page Component
const Home = () => {
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await api.getAllProducts();
        setProducts(data.slice(0, 12));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="p-10 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to FreshVeg</h1>
            <p className="text-gray-600 text-lg mb-8">
              Fresh vegetables, simple onboarding. Please login or register to continue.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/login"
                className="block bg-green-600 text-white px-6 py-4 rounded-2xl text-lg font-bold hover:bg-green-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-white border border-gray-300 text-gray-900 px-6 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition"
              >
                Register
              </Link>
            </div>

            <div className="mt-10 text-gray-500">
              <p className="text-sm">If you already have an account, click Login.</p>
              <p className="text-sm">If you are new, create an account first.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            🌽 Featured Vegetables
          </h2>
          <p className="text-gray-600 text-lg">
            Handpicked fresh vegetables for you
          </p>
        </div>

        {loading ? (
          <Loader message="Loading fresh vegetables..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/products"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition transform hover:scale-105"
              >
                View All Products →
              </Link>
            </div>
          </>
        )}
      </section>

      <section className="bg-green-50 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why Choose FreshVeg Direct?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery available in select areas. Fresh produce at your doorstep.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                100% fresh vegetables directly from farms. Quality checked before delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Farm-fresh vegetables at affordable prices. No middleman, direct from farms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">🎉 Special Offer!</h2>
          <p className="text-lg mb-6">
            Get 20% off on your first order with code: FRESHVEG20
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
