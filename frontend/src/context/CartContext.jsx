import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const addToCart = (food) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === food._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(foodId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === foodId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    clearCart();
  };

  const value = {
    cart,
    user,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    login,
    logout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
