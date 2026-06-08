import React from 'react';
import { Link } from 'react-router-dom';

// Hero Component
const Hero = () => {
  return (
    <section
      className="bg-gradient-to-r from-green-500 to-green-700 text-white py-24 px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', top: '8%', left: '5%', fontSize: '4rem', opacity: 0.18 }}>🥕</span>
        <span style={{ position: 'absolute', top: '18%', right: '10%', fontSize: '3.5rem', opacity: 0.16 }}>🍅</span>
        <span style={{ position: 'absolute', bottom: '15%', left: '12%', fontSize: '3rem', opacity: 0.14 }}>🥬</span>
        <span style={{ position: 'absolute', bottom: '10%', right: '18%', fontSize: '3.8rem', opacity: 0.15 }}>🌽</span>
        <span style={{ position: 'absolute', top: '40%', left: '45%', fontSize: '4.5rem', opacity: 0.12 }}>🍆</span>
        <span style={{ position: 'absolute', top: '60%', right: '35%', fontSize: '3rem', opacity: 0.14 }}>🧅</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Hero Content */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Fresh Vegetables<br />Delivered To Your<br />Doorstep
          </h1>
          
          <p className="text-lg md:text-xl mb-2 text-green-100">
            🌾 Farm Fresh • 🥗 Healthy • 💰 Affordable
          </p>

          <p className="text-base md:text-lg text-green-50 max-w-2xl mx-auto mb-8">
            Get the finest quality vegetables directly from farms to your table. 
            Premium quality guaranteed with same-day delivery in select areas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition transform hover:scale-105"
            >
              🛒 Shop Now
            </Link>
            <button className="inline-block bg-green-600 border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition">
              📱 Download App
            </button>
          </div>
        </div>

        {/* Hero Image/Icons */}
        <div className="mt-12 grid grid-cols-3 md:grid-cols-5 gap-4 text-4xl md:text-6xl">
          <div className="transform hover:scale-110 transition">🥕</div>
          <div className="transform hover:scale-110 transition">🍅</div>
          <div className="transform hover:scale-110 transition">🥬</div>
          <div className="transform hover:scale-110 transition">🧅</div>
          <div className="transform hover:scale-110 transition">🥒</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
