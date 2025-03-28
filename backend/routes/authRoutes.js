
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuth } = require('../middlewares/authMiddleware');

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get user profile
router.get('/profile', isAuth, authController.getProfile);

// Update user profile
router.put('/profile', isAuth, authController.updateProfile);

module.exports = router;
