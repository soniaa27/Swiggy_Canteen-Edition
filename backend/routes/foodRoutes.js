const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const { protect, admin } = require('../middleware/auth');

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find({ available: true });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create food item (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update food item (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      food.name = req.body.name || food.name;
      food.description = req.body.description || food.description;
      food.price = req.body.price || food.price;
      food.category = req.body.category || food.category;
      food.image = req.body.image || food.image;
      food.available = req.body.available !== undefined ? req.body.available : food.available;

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete food item (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      await food.deleteOne();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
