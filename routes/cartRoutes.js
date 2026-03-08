const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.post('/cart', protect, addToCart);
router.get('/cart', protect, getCart);
router.put('/cart', protect, updateCartItem);
router.delete('/cart/:id', protect, removeCartItem);
router.delete('/cart', protect, clearCart);

module.exports = router;
