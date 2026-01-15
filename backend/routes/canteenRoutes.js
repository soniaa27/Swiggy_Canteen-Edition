const express = require('express');
const router = express.Router();
const Canteen = require('../models/Canteen');
const Food = require('../models/Food');

// Get all canteens
router.get('/', async (req, res) => {
  try {
    const canteens = await Canteen.find();
    res.json(canteens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single canteen by ID (THIS WAS MISSING!)
router.get('/:id', async (req, res) => {
  try {
    const canteen = await Canteen.findById(req.params.id);
    if (canteen) {
      res.json(canteen);
    } else {
      res.status(404).json({ message: 'Canteen not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all foods in a canteen
router.get('/:id/foods', async (req, res) => {
  try {
    const foods = await Food.find({ canteen: req.params.id, available: true });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
