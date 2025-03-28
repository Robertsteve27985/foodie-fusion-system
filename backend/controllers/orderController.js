
const Order = require('../models/Order');
const Food = require('../models/Food');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, orderType, customerInfo } = req.body;
    
    // Calculate total amount
    let totalAmount = 0;
    
    for (const item of items) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food item not found: ${item.food}` });
      }
      
      totalAmount += food.price * item.quantity;
    }
    
    // Create new order
    const order = new Order({
      user: req.userId || null,
      items,
      totalAmount,
      orderType,
      customerInfo
    });
    
    await order.save();
    
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate('items.food')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.food');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (req.userId && order.user && order.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
