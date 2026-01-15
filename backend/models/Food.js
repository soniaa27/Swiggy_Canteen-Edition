const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Starters', 'Egg Factory', 'Sandwiches', 'Biryani', 'Pizza', 'Pasta', 'Rolls', 'Burger', 
    'Fried Rice', 'Combos', 'Milkshakes', 'Coolers', 'Breakfast', 'Lunch', 'Snacks', 
    'Beverages', 'Desserts', 'Dosa', 'Meals', 'Rice', 'Bread & Curry', 'Veg Curries', 'Combo'],
  },
  image: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  canteen: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Canteen',
  required: true,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'food' });

module.exports = mongoose.model('Food', foodSchema);
