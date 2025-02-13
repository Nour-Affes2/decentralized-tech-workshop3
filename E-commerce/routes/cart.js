const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');

// 🟢 POST /cart/:userId - Add a product to the cart
router.post('/:userId', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.params.userId });

        if (!cart) {
            cart = new Cart({ userId: req.params.userId, products: [], totalPrice: 0 });
        }

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const existingProduct = cart.products.find(item => item.productId.equals(productId));
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        cart.totalPrice += product.price * quantity;
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

// 🟢 GET /cart/:userId - Retrieve the current state of the user's cart
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        res.json(cart || { products: [], totalPrice: 0 });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// 🔴 DELETE /cart/:userId/item/:productId - Remove a specific product from the cart
router.delete('/:userId/item/:productId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.products = cart.products.filter(item => !item.productId.equals(req.params.productId));
        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.quantity * (item.productId.price || 0), 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error removing item from cart' });
    }
});

module.exports = router;
