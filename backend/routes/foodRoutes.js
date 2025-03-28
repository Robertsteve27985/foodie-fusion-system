
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all foods
router.get('/', foodController.getFoods);

// Get food by ID
router.get('/:id', foodController.getFood);

// Get foods by category
router.get('/category/:category', foodController.getFoodsByCategory);

// Get popular foods
router.get('/filter/popular', foodController.getPopularFoods);

module.exports = router;
