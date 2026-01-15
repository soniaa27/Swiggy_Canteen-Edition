import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [canteens, setCanteens] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [newFood, setNewFood] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    canteen: '',
  });
  const { user } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchOrders();
    fetchFoods();
    fetchCanteens();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/food');
      setFoods(response.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const fetchCanteens = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/canteens');
      setCanteens(response.data);
    } catch (error) {
      console.error('Error fetching canteens:', error);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5001/api/orders/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchOrders();
    } catch (error) {
      alert('Error updating order status');
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/food', newFood, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert('Food item added successfully!');
      setNewFood({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        canteen: '',
      });
      fetchFoods();
    } catch (error) {
      alert('Error adding food item');
    }
  };

  const deleteFood = async (foodId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5001/api/food/${foodId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchFoods();
      } catch (error) {
        alert('Error deleting food item');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-6 flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 ${
            activeTab === 'orders'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('foods')}
          className={`px-4 py-2 ${
            activeTab === 'foods'
              ? 'border-b-2 border-orange-600 text-orange-600'
              : 'text-gray-600'
          }`}
        >
          Food Items
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Customer: {order.user.name}</p>
                  <p className="text-sm text-gray-500">Email: {order.user.email}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-xl font-bold">₹{order.totalAmount}</span>
              </div>

              <div className="border-t pt-4 mb-4">
                {order.items.map((item, index) => (
                  <p key={index} className="text-gray-700">
                    {item.food.name} x {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex space-x-2">
                {['Pending', 'Preparing', 'Ready', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => updateOrderStatus(order._id, status)}
                    className={`px-3 py-1 rounded ${
                      order.status === status
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'foods' && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Food Item</h2>
            <form onSubmit={handleAddFood} className="space-y-4">

              <input
                type="text"
                placeholder="Food Name"
                value={newFood.name}
                onChange={e => setNewFood({ ...newFood, name: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={newFood.description}
                onChange={e => setNewFood({ ...newFood, description: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newFood.price}
                onChange={e => setNewFood({ ...newFood, price: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Category"
                value={newFood.category}
                onChange={e => setNewFood({ ...newFood, category: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newFood.image}
                onChange={e => setNewFood({ ...newFood, image: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <select
                value={newFood.canteen}
                onChange={e => setNewFood({ ...newFood, canteen: e.target.value })}
                required
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Select Canteen</option>
                {canteens.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
              >
                Add Food Item
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foods.map((food) => (
              <div key={food._id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-32 object-cover rounded mb-2"
                  onError={e => e.target.src='/images/default_food.jpg'}
                />
                <h3 className="font-bold">{food.name}</h3>
                <p className="text-sm text-gray-600">{food.category}</p>
                <p className="text-sm text-gray-600">{canteens.find(c => c._id === food.canteen)?.name || ''}</p>
                <p className="font-semibold">₹{food.price}</p>
                <button
                  onClick={() => deleteFood(food._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
