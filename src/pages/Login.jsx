import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Login Page Component
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading, user } = useAuth();
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
    email: '',
    password: '',
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
    
    if (!formData.email || !formData.password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await api.login(formData.email, formData.password, userType);

      if (response.success) {
        login(response.user, response.token);
        alert(`Welcome ${response.user.name}!`);
        
        // Redirect based on user role
        if (response.user.role === 'seller') {
          navigate('/seller/dashboard');
        } else if (response.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
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
          <p className="text-gray-600">Login to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-3">I am a:</label>
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
            
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Email Address</label>
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

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-bold mb-2">Password</label>
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

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-700">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-green-600 hover:text-green-700 font-bold">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                loading
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? '⏳ Logging in...' : '✓ Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <p className="font-bold mb-2">📝 Demo Credentials:</p>
            <p>Customer: test@example.com / password</p>
            <p>Seller: seller@example.com / password</p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center border-t pt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 hover:text-green-700 font-bold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
