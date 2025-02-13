const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// 🟢 GET /products - Retrieve all products
router.get('/', async (req, res) => {
    try {
        const { category, inStock } = req.query;
        let filters = {};

        if (category) filters.category = category;
        if (inStock) filters.stockStatus = inStock === 'true';

        const products = await Product.find(filters);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// 🟢 GET /products/:id - Retrieve a specific product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// 🟢 POST /products - Add a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, stockStatus } = req.body;
        const newProduct = new Product({ name, description, price, category, stockStatus });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error adding product' });
    }
});

// 🟢 PUT /products/:id - Update an existing product
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// 🔴 DELETE /products/:id - Remove a product by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

module.exports = router;
