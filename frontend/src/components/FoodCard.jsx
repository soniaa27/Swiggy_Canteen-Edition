import React from 'react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
            {food.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {food.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-800">₹{food.price}</span>
          <button
            onClick={() => addToCart(food)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
