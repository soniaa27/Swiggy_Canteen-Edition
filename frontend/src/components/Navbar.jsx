import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from './Cart';

const Navbar = () => {
  const { cart, user, logout } = useCart();
  const [showCart, setShowCart] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-600">Welcome to GJBC!</h1>
            </Link>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700">Hi, {user.name}</span>
                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2"
                  >
                    My Orders
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="text-gray-700 hover:text-orange-600 px-3 py-2"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-orange-600 px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-700 hover:text-orange-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Cart show={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default Navbar;
