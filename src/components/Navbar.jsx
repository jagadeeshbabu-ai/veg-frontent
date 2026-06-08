import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `font-medium px-3 py-2 rounded-md ${isActive ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            {/* Left: Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center gap-2">
                <div className="text-2xl">🥬</div>
                <span className="text-xl font-bold text-gray-800">FreshVeg</span>
              </Link>
            </div>

            {/* Left: Home + Products */}
            <div className="hidden md:flex md:space-x-4 md:items-center">
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
              <NavLink to="/products" className={linkClass}>
                Products
              </NavLink>
            </div>
          </div>

          {/* Right: Cart + Auth (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" aria-label="View cart" className="relative">
              <div className="text-2xl text-gray-700 hover:text-green-600">🛒</div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700">{user?.name}</span>

                {user?.role === 'seller' && (
                  <NavLink to="/seller/dashboard" className={linkClass}>
                    Seller
                  </NavLink>
                )}
                {user?.role === 'admin' && (
                  <NavLink to="/admin/dashboard" className={linkClass}>
                    Admin
                  </NavLink>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/register" className="bg-green-600 text-white px-3 py-2 rounded-md font-medium hover:bg-green-700">
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {isOpen && (
          <div className="md:hidden mt-2 pb-4 border-t">
            <NavLink to="/" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`} end>
              Home
            </NavLink>
            <NavLink to="/products" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
              Products
            </NavLink>

            <Link to="/cart" className="block px-4 py-2 text-gray-700">Cart ({totalItems})</Link>

            <div className="border-t my-2"></div>

            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-gray-700">{user?.name}</div>
                {user?.role === 'seller' && (
                  <NavLink to="/seller/dashboard" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
                    Seller Dashboard
                  </NavLink>
                )}
                {user?.role === 'admin' && (
                  <NavLink to="/admin/dashboard" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
                    Admin Dashboard
                  </NavLink>
                )}
                <button onClick={handleLogout} className="w-full mt-2 bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({isActive}) => `block px-4 py-2 ${isActive ? 'text-green-600' : 'text-gray-700'}`}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
