
const Food = require('../models/Food');

// Get all foods
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isAvailable: true });
    res.json(foods);
  } catch (error) {
    console.error('Get foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get food by ID
exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    res.json(food);
  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get foods by category
exports.getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.find({ category, isAvailable: true });
    
    res.json(foods);
  } catch (error) {
    console.error('Get foods by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get popular foods
exports.getPopularFoods = async (req, res) => {
  try {
    const foods = await Food.find({ isPopular: true, isAvailable: true });
    res.json(foods);
  } catch (error) {
    console.error('Get popular foods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
