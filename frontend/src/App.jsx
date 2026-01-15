import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Login from './components/Login';
import CanteenMenu from './pages/CanteenMenu';

// Add this Route:


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/canteen/:canteenId" element={<CanteenMenu />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
