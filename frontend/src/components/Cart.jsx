import React from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Cart = ({ show, onClose }) => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart, user } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place order');
      navigate('/login');
      return;
    }

    try {
      const orderData = {
        items: cart.map((item) => ({
          food: item._id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getCartTotal(),
      };

      await api.post('/api/orders', orderData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      alert('Order placed successfully!');
      clearCart();
      onClose();
      navigate('/orders');
    } catch (error) {
      alert('Error placing order: ' + error.message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">₹{getCartTotal()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
