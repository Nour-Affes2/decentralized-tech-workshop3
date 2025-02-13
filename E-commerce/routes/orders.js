const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');

// 🟢 POST /orders - Create a new order
router.post('/', async (req, res) => {
    try {
        const { products } = req.body;
        let totalPrice = 0;

        for (let item of products) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).json({ error: `Product ${item.productId} not found` });
            totalPrice += product.price * item.quantity;
        }

        const newOrder = new Order({ products, totalPrice, status: "Pending" });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: 'Error creating order' });
    }
});

// 🟢 GET /orders/:userId - Retrieve all orders placed by a user (without authentication)
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

module.exports = router;

