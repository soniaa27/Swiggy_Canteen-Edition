import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard';

const CATEGORIES = ['All', 'Starters', 'Breakfast', 'Lunch', 'Snacks', 'Beverages', 'Desserts', 'Pizza', 'Pasta', 'Biryani', 'Rolls'];

const CanteenMenu = () => {
  const { canteenId } = useParams();
  const navigate = useNavigate();
  const [canteen, setCanteen] = useState(null);
  const [foods, setFoods] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCanteenData();
  }, [canteenId]);

  const fetchCanteenData = async () => {
    try {
      setLoading(true);
      const [canteenRes, foodsRes] = await Promise.all([
        axios.get(`http://localhost:5001/api/canteens/${canteenId}`),
        axios.get(`http://localhost:5001/api/canteens/${canteenId}/foods`),
      ]);
      setCanteen(canteenRes.data);
      setFoods(foodsRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching canteen data:', err);
      setError('Failed to load canteen. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = filteredCategory === 'All'
    ? foods
    : foods.filter(f => f.category === filteredCategory);

  if (loading) {
    return <div className="max-w-5xl mx-auto pt-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto pt-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!canteen) {
    return <div className="max-w-5xl mx-auto pt-8 text-center">Canteen not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto pt-8 pb-4 px-4">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="mb-4 text-orange-600 hover:text-orange-700 flex items-center"
      >
        ← Back to All Canteens
      </button>

      {/* Canteen Header */}
      <div className="flex items-center space-x-4 mb-6 bg-white p-4 rounded-lg shadow">
        <img 
          src={canteen.image} 
          alt={canteen.name} 
          className="w-24 h-24 object-cover rounded"
          onError={e => e.target.src='/images/default.jpg'}
        />
        <div>
          <h1 className="text-3xl font-bold">{canteen.name}</h1>
          <p className="text-gray-600">{canteen.description}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              filteredCategory === cat 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setFilteredCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFoods.map(food => <FoodCard key={food._id} food={food} />)}
      </div>

      {filteredFoods.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No items available in this category
        </p>
      )}
    </div>
  );
};

export default CanteenMenu;
