import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Register Page Component
const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading: authLoading, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      if (user?.role === 'seller') {
        navigate('/seller/dashboard');
      } else if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [authLoading, isAuthenticated, user, navigate]);
  const [userType, setUserType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    agreeTerms: false,
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill all required fields');
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Check terms
    if (!formData.agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const response = await api.register(formData.name, formData.email, formData.password, userType);

      if (response.success) {
        register(response.user, response.token);
        alert(`Welcome ${response.user.name}! Account created successfully.`);
        navigate('/');
      }
    } catch (error) {
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🥬</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">FreshVeg Direct</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-3">Register as:</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUserType('customer')}
                className={`flex-1 py-2 rounded-lg font-bold transition ${
                  userType === 'customer'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👤 Customer
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`flex-1 py-2 rounded-lg font-bold transition ${
                  userType === 'seller'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🏪 Seller
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91-9876543210"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your address"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-center text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                className="mr-3 w-4 h-4"
                required
              />
              <span>
                I agree to the{' '}
                <a href="#" className="text-green-600 hover:text-green-700 font-bold">
                  Terms & Conditions
                </a>
              </span>
            </label>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                loading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? '⏳ Creating Account...' : '✓ Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-700 font-bold">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
