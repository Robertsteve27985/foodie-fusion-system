
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { isAuth, optionalAuth } = require('../middlewares/authMiddleware');

// Create new order (works for both auth users and guests)
router.post('/', optionalAuth, orderController.createOrder);

// Get all orders for a user
router.get('/user', isAuth, orderController.getUserOrders);

// Get single order
router.get('/:id', optionalAuth, orderController.getOrder);

module.exports = router;
