import React from 'react';
import { Link } from 'react-router-dom';

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🥬</div>
              <h3 className="text-xl font-bold text-white">FreshVeg Direct</h3>
            </div>
            <p className="text-sm">
              Fresh vegetables delivered to your doorstep. Farm fresh, healthy, and affordable.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-2xl hover:text-white transition">f</a>
              <a href="#" className="text-2xl hover:text-white transition">𝕏</a>
              <a href="#" className="text-2xl hover:text-white transition">📷</a>
              <a href="#" className="text-2xl hover:text-white transition">instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +91-7993879938</li>
              <li>📧 jaggubahi.com</li>
              <li>📍 srikakulam, India</li>
              <li>⏰ Mon-Sun: 6AM-10PM</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {currentYear} FreshVeg Direct. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
