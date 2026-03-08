const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add item to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const prod = await Product.findById(item.product);
      if (prod) {
        totalPrice += prod.price * item.quantity;
      }
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// Get user cart
exports.getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price image');

    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [], totalPrice: 0 } });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than 0' });
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    // Recalculate total price
    let totalPrice = 0;
    for (const cartItem of cart.items) {
      const prod = await Product.findById(cartItem.product);
      if (prod) {
        totalPrice += prod.price * cartItem.quantity;
      }
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res, next) => {
  try {
    const { id: productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    // Recalculate total price
    let totalPrice = 0;
    for (const item of cart.items) {
      const prod = await Product.findById(item.product);
      if (prod) {
        totalPrice += prod.price * item.quantity;
      }
    }
    cart.totalPrice = totalPrice;

    await cart.save();
    await cart.populate('items.product', 'name price image');

    res.status(200).json({ success: true, cart });
  } catch (error) {
    next(error);
  }
};

// Clear cart
exports.clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
};
